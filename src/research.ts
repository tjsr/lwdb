interface ResearchTechTree {
  name: string;
};

const treeFromName = (name: string): ResearchTechTree => {
  return {
    name: name,
  };
};

export const trees: ResearchTechTree[] = [
  treeFromName("Development"),
  treeFromName("Economy"),
  treeFromName("Hero"),
  treeFromName("Units"),
  treeFromName("Garage 1"),
  treeFromName("Garage 2"),
  treeFromName("Garage 3"),
  treeFromName("Allaince Duel"),
  treeFromName("Intercity Truck"),
  treeFromName("Special Forces"),
  treeFromName("Garage 4"),
  treeFromName("Siege to Seize"),
  treeFromName("Defence Fortifications"),
];
