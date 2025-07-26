"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Sword, Shield, Star, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { dungeonData } from "@/data/dungeon-list.data";

const difficultyColors = {
  "Très Facile": "bg-green-500/20 text-green-300 border-green-500/30",
  Facile: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  Moyen: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  Difficile: "bg-orange-500/20 text-orange-300 border-orange-500/30",
  "Très Difficile": "bg-red-500/20 text-red-300 border-red-500/30",
};

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const filteredDungeons = useMemo(() => {
    if (!searchQuery) return dungeonData;
    return dungeonData.filter(
      (dungeonData) =>
        dungeonData.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dungeonData.boss.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dungeonData.difficulty.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 p-6"
      >
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-white font-['Sora'] tracking-tight">
            Dofus{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-teal-400">
              Guides
            </span>
          </h1>
        </div>
      </motion.header>

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative z-10 py-20 px-6"
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6 font-['Sora']"
          >
            Explorez les{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-teal-400">
              Donjons
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto"
          >
            Découvrez tous les secrets des donjons de Dofus avec nos guides
            détaillés
          </motion.p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="relative max-w-2xl mx-auto"
          >
            <div
              className={`relative backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 transition-all duration-300 ${
                isSearchFocused
                  ? "shadow-2xl shadow-purple-500/25 scale-105"
                  : "shadow-xl"
              }`}
            >
              <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
              <Input
                type="text"
                placeholder="Rechercher un donjon, un boss..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className="w-full pl-16 pr-6 py-6 text-lg bg-transparent border-0 text-white placeholder-gray-400 focus:ring-0 focus:outline-none"
              />
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Dungeons Grid */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="relative z-10 px-6 pb-20"
      >
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredDungeons.map((dungeon, index) => (
                <motion.div
                  key={dungeon.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group"
                >
                  <Link href={`/dungeon/${dungeon.id}`}>
                    <div className="relative backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 overflow-hidden hover:border-purple-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20">
                      {/* Image */}
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={dungeon.image || "/placeholder.svg"}
                          alt={dungeon.name}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-white mb-2 font-['Sora']">
                          {dungeon.name}
                        </h3>

                        <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                          {dungeon.description}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          <Badge
                            variant="outline"
                            className="bg-purple-500/20 text-purple-300 border-purple-500/30"
                          >
                            <Sword className="w-3 h-3 mr-1" />
                            Niveau {dungeon.level}
                          </Badge>
                          <Badge
                            variant="outline"
                            className={
                              difficultyColors[
                                dungeon.difficulty as keyof typeof difficultyColors
                              ]
                            }
                          >
                            <Shield className="w-3 h-3 mr-1" />
                            {dungeon.difficulty}
                          </Badge>
                          <Badge
                            variant="outline"
                            className="bg-teal-500/20 text-teal-300 border-teal-500/30"
                          >
                            <Users className="w-3 h-3 mr-1" />
                            {dungeon.players}
                          </Badge>
                        </div>

                        {/* Boss */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-gray-300">
                            <Star className="w-4 h-4 mr-2 text-yellow-400" />
                            <span className="text-sm">
                              Boss: {dungeon.boss}
                            </span>
                          </div>
                        </div>

                        {/* Hover button */}
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          whileHover={{ opacity: 1, y: 0 }}
                          className="absolute inset-x-6 bottom-6 opacity-0 group-hover:opacity-100 transition-all duration-300"
                        >
                          <Button className="w-full bg-gradient-to-r from-purple-600 to-teal-600 hover:from-purple-700 hover:to-teal-700 text-white border-0">
                            Voir le guide
                          </Button>
                        </motion.div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredDungeons.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Aucun donjon trouvé
              </h3>
              <p className="text-gray-400">
                Essayez avec d&apos;autres mots-clés
              </p>
            </motion.div>
          )}
        </div>
      </motion.section>
    </div>
  );
}
