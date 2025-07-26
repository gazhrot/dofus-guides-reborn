import fs from "fs/promises";

const API_BASE_URL = "https://api.dofusdb.fr";
const BATCH_SIZE = 10; // On récupère les donjons 10 par 10

// Met le script en pause pour ne pas surcharger l'API
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchBossDetails(monsterIds) {
  if (!monsterIds || monsterIds.length === 0) return null;
  for (const monsterId of monsterIds) {
    try {
      const response = await fetch(`${API_BASE_URL}/monsters/${monsterId}`);
      if (!response.ok) continue;
      const monster = await response.json();
      if (monster && monster.isBoss) {
        return monster; // On a trouvé le boss, on le retourne
      }
      await sleep(50); // Petite pause pour ne pas spammer l'API des monstres
    } catch (e) {
      console.error(`Impossible de fetch le monstre ${monsterId}`);
    }
  }
  return null;
}

async function main() {
  console.log("Démarrage de la récupération optimisée...");

  // 1. Récupérer le nombre total de donjons
  const totalResponse = await fetch(`${API_BASE_URL}/dungeons?$limit=0`);
  const { total } = await totalResponse.json();
  console.log(`Nombre total de donjons à récupérer : ${total}`);

  // 2. Préparer tous les appels pour chaque "page" de donjons
  const fetchPromises = [];
  for (let i = 0; i < total; i += BATCH_SIZE) {
    const url = `${API_BASE_URL}/dungeons?$limit=${BATCH_SIZE}&$skip=${i}&lang=fr`;
    fetchPromises.push(fetch(url).then((res) => res.json()));
  }

  console.log(
    `Envoi de ${fetchPromises.length} requêtes pour récupérer les lots...`
  );
  const allPages = await Promise.all(fetchPromises);
  const allDungeonsFromList = allPages.flatMap((page) => page.data);

  console.log(
    `Récupération de ${allDungeonsFromList.length} donjons. Recherche des détails des boss...`
  );

  // 3. Pour chaque donjon, trouver le boss et formater les données
  const finalDungeonData = [];
  for (const dungeon of allDungeonsFromList) {
    const boss = await fetchBossDetails(dungeon.monsters);

    if (!boss) {
      console.warn(`--> Boss non trouvé pour le donjon "${dungeon.name.fr}".`);
      continue;
    }

    finalDungeonData.push({
      id: dungeon.id,
      name: dungeon.name.fr,
      level: dungeon.optimalPlayerLevel,
      boss: boss.name.fr,
      difficulty: "Facile",
      players: "1-8",
      description:
        "Un donjon parfait pour les débutants avec des récompenses intéressantes.",
      image: `${API_BASE_URL}/img/maps/0.25/${dungeon.entranceMapId}.jpg`,
      bossImage: boss.img,
    });

    console.log(`- Données pour "${dungeon.name.fr}" assemblées.`);
  }

  // 4. Trier et générer le fichier final
  const sortedData = finalDungeonData.sort((a, b) => a.level - b.level);

  const fileContent = `
// Fichier généré automatiquement le ${new Date().toLocaleString("fr-FR")}

export type Dungeon = {
  id: number;
  name: string;
  level: number;
  boss: string;
  image: string;
  bossImage: string;
};

export const dungeonData: Dungeon[] = ${JSON.stringify(sortedData, null, 2)};
`;

  await fs.writeFile("./src/data/dungeon-list.data.ts", fileContent, "utf-8");
  console.log(
    `\n✅ Fichier src/data/dungeon-list.data.ts généré avec ${finalDungeonData.length} donjons !`
  );
}

main().catch(console.error);
