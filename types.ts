export enum BragLevel {
  EXTREME_HUMILITY = -4,
  VERY_HUMBLE = -3,
  MODEST = -2,
  POLITE = -1,
  NEUTRAL = 0,
  CONFIDENT = 1,
  PROUD = 2,
  ARROGANT = 3,
  GOD_MODE = 4,
}

export const LEVEL_DESCRIPTIONS: Record<number, { label: string; emoji: string; color: string }> = {
  [-4]: { label: "Self-Deprecating", emoji: "🙇‍♂️", color: "text-blue-200" },
  [-3]: { label: "Very Humble", emoji: "😓", color: "text-blue-300" },
  [-2]: { label: "Modest", emoji: "😌", color: "text-cyan-300" },
  [-1]: { label: "Polite", emoji: "🙂", color: "text-teal-300" },
  [0]: { label: "Neutral", emoji: "😐", color: "text-gray-300" },
  [1]: { label: "Confident", emoji: "😏", color: "text-yellow-300" },
  [2]: { label: "Proud", emoji: "😎", color: "text-orange-400" },
  [3]: { label: "Arrogant", emoji: "😤", color: "text-red-400" },
  [4]: { label: "God Mode", emoji: "👑", color: "text-red-600" },
};
