"use client";

import { motion } from "framer-motion";
import {
  ArrowLeft,
  Sword,
  Shield,
  Users,
  Star,
  Clock,
  Trophy,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { dungeonData } from "@/data/dungeon.data";
import { use } from "react";

const difficultyColors = {
  "Très Facile": "bg-green-500/20 text-green-300 border-green-500/30",
  Facile: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  Moyen: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  Difficile: "bg-orange-500/20 text-orange-300 border-orange-500/30",
  "Très Difficile": "bg-red-500/20 text-red-300 border-red-500/30",
};

export default function DungeonDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const dungeon = dungeonData[id as keyof typeof dungeonData];

  if (!dungeon) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Donjon non trouvé
          </h1>
          <Link href="/">
            <Button className="bg-gradient-to-r from-purple-600 to-teal-600">
              Retour à l&apos;accueil
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 p-6"
      >
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <Link href="/">
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-white font-['Sora']">
            Guide détaillé
          </h1>
        </div>
      </motion.header>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-20">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative mb-12"
        >
          <div className="relative h-96 rounded-3xl overflow-hidden">
            <Image
              src={dungeon.image || "/placeholder.svg"}
              alt={dungeon.name}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8">
              <h1 className="text-5xl font-bold text-white mb-4 font-['Sora']">
                {dungeon.name}
              </h1>
              <div className="flex flex-wrap gap-3">
                <Badge
                  variant="outline"
                  className="bg-purple-500/20 text-purple-300 border-purple-500/30 text-lg px-4 py-2"
                >
                  <Sword className="w-4 h-4 mr-2" />
                  Niveau {dungeon.level}
                </Badge>
                <Badge
                  variant="outline"
                  className={`${
                    difficultyColors[
                      dungeon.difficulty as keyof typeof difficultyColors
                    ]
                  } text-lg px-4 py-2`}
                >
                  <Shield className="w-4 h-4 mr-2" />
                  {dungeon.difficulty}
                </Badge>
                <Badge
                  variant="outline"
                  className="bg-teal-500/20 text-teal-300 border-teal-500/30 text-lg px-4 py-2"
                >
                  <Users className="w-4 h-4 mr-2" />
                  {dungeon.players}
                </Badge>
                <Badge
                  variant="outline"
                  className="bg-orange-500/20 text-orange-300 border-orange-500/30 text-lg px-4 py-2"
                >
                  <Clock className="w-4 h-4 mr-2" />
                  {dungeon.duration}
                </Badge>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card className="backdrop-blur-xl bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle className="text-white font-['Sora'] flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-400" />
                    Description
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 leading-relaxed">
                    {dungeon.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Strategy */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Card className="backdrop-blur-xl bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle className="text-white font-['Sora'] flex items-center gap-2">
                    <Sword className="w-5 h-5 text-purple-400" />
                    Stratégie générale
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 leading-relaxed">
                    {dungeon.strategy}
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Mechanics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Card className="backdrop-blur-xl bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle className="text-white font-['Sora'] flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-red-400" />
                    Mécaniques du boss
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {dungeon.mechanics.map((mechanic, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-gray-300">{mechanic}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Boss Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <Card className="backdrop-blur-xl bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle className="text-white font-['Sora'] flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-400" />
                    Boss principal
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xl font-semibold text-purple-300">
                    {dungeon.boss}
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Rewards */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <Card className="backdrop-blur-xl bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle className="text-white font-['Sora'] flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-yellow-400" />
                    Récompenses
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {dungeon.rewards.map((reward, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full" />
                        <span className="text-gray-300 text-sm">{reward}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            {/* Tips */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <Card className="backdrop-blur-xl bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle className="text-white font-['Sora'] flex items-center gap-2">
                    <Shield className="w-5 h-5 text-teal-400" />
                    Conseils
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {dungeon.tips.map((tip, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-teal-400 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-gray-300 text-sm">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
