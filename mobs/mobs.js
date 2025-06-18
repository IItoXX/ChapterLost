class CreatureForet {
    constructor({ name, maxHp, attack, baseAttack, baseDefense, xpReward }) {
        this.name = name;
        this.maxHp = maxHp;
        this.hp = maxHp;
        this.attack = attack;
        this.baseAttack = baseAttack;
        this.baseDefense = baseDefense;
        this.defense = baseDefense;
        this.xpReward = xpReward;
    }
}

const champignon = new CreatureForet({
    name: "Champignon",
    maxHp: 35,
    attack: 4,
    baseAttack: 4,
    baseDefense: 8,
    xpReward: 12
});
const loup = new CreatureForet({
    name: "Loup",
    maxHp: 35,
    attack: 4,
    baseAttack: 4,
    baseDefense: 8,
    xpReward: 12
});
const espritForet = new CreatureForet({
    name: "Esprit de la Forêt",
    maxHp: 70,
    attack: 8,
    baseAttack: 8,
    baseDefense: 18,
    xpReward: 40
});


class Gobelin {
    constructor({ name, maxHp, attack, baseAttack, baseDefense, xpReward }) {
        this.name = name;
        this.maxHp = maxHp;
        this.hp = maxHp;
        this.attack = attack;
        this.baseAttack = baseAttack;
        this.baseDefense = baseDefense;
        this.defense = baseDefense;
        this.xpReward = xpReward;
    }
}

const gobelin = new Gobelin({
    name: "Gobelin",
    maxHp: 40,
    attack: 3,
    baseAttack: 3,
    baseDefense: 10,
    xpReward: 10
});

const gobelinGuerrier = new Gobelin({
    name: "Gobelin Guerrier",
    maxHp: 60,
    attack: 5,
    baseAttack: 5,
    baseDefense: 20,
    xpReward: 35
});

const chefGobelin = new Gobelin({
    name: "Chef Gobelin",
    maxHp: 150,
    attack: 15,
    baseAttack: 15,
    baseDefense: 50,
    xpReward: 100
});


class ChevalierMaudit {
    constructor({ name, maxHp, attack, baseAttack, baseDefense, xpReward }) {
        this.name = name;
        this.maxHp = maxHp;
        this.hp = maxHp;
        this.attack = attack;
        this.baseAttack = baseAttack;
        this.baseDefense = baseDefense;
        this.defense = baseDefense;
        this.xpReward = xpReward;
    }
}

const chevalierOmbre = new ChevalierMaudit({
    name: "Chevalier de l'Ombre",
    maxHp: 80,
    attack: 10,
    baseAttack: 10,
    baseDefense: 25,
    xpReward: 60
});
const magicienOmbre = new ChevalierMaudit({
    name: "Magicien de l'Ombre",
    maxHp: 80,
    attack: 10,
    baseAttack: 10,
    baseDefense: 25,
    xpReward: 60
});
const seigneurMaudit = new ChevalierMaudit({
    name: "Seigneur Maudit",
    maxHp: 200,
    attack: 20,
    baseAttack: 20,
    baseDefense: 60,
    xpReward: 150
});


class CreatureDesert {
    constructor({ name, maxHp, attack, baseAttack, baseDefense, xpReward }) {
        this.name = name;
        this.maxHp = maxHp;
        this.hp = maxHp;
        this.attack = attack;
        this.baseAttack = baseAttack;
        this.baseDefense = baseDefense;
        this.defense = baseDefense;
        this.xpReward = xpReward;
    }
}

const scorpionGeant = new CreatureDesert({
    name: "Scorpion Géant",
    maxHp: 50,
    attack: 7,
    baseAttack: 7,
    baseDefense: 12,
    xpReward: 25
});
const espritDuMirage = {
    name: "Esprit du Mirage",
    maxHp: 55,
    hp: 55,
    attack: 9,
    baseAttack: 9,
    baseDefense: 18,
    defense: 18,
    xpReward: 35
};
const verDesSables = new CreatureDesert({
    name: "Ver des Sables",
    maxHp: 120,
    attack: 13,
    baseAttack: 13,
    baseDefense: 35,
    xpReward: 80
});