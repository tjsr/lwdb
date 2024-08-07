import { seconds, timeToSeconds } from "./timeUtils.js";

type PowerLevel = number;
type HeroEXP = number;
type Coins = number;
type Iron = number;
type Food = number;

interface UpgradeStats {
  iron: Iron;
  coins: Coins;
  food: Food;
}

interface BuildingUpgradeStats extends UpgradeStats {
  buildings: Building[];
  experienceGains: HeroEXP;
  buildTime: seconds;
}

interface BarracksUpgradeStats extends BuildingUpgradeStats {
  unitTrainingCap: number;
  unitTrainingLevel: number;
}

interface Building {
  level: number;
  upgradeRequirements: BarracksUpgradeStats;
  power: PowerLevel;
}

interface Barracks extends Building {
  unitTrainingCap: number;
  unitTrainingLevel: number;
}

export const barracks: Barracks[] = [
  {
    level: 19,
    power: 40800,
    unitTrainingCap: 460,
    unitTrainingLevel: 6,
    upgradeRequirements: {
      buildTime: timeToSeconds("3d 19:35:10"),
      buildings: [],
      coins: 11100000,
      experienceGains: 17000000,
      food: 27900000,
      iron: 27900000,
      unitTrainingCap: 470,
      unitTrainingLevel: 7,
    },
  },
];
