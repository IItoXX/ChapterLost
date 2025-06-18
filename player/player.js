class Player {
    constructor({
        name,
        maxHp = 100,
        attack = 10,
        defense = 10,
        xp = 0,
        level = 1,
        gold = 0,
        inventory = [],
        statusEffects = []
    }) {
        this.name = name;
        this.maxHp = maxHp;
        this.hp = maxHp;
        this.attack = attack;
        this.defense = defense;
        this.xp = xp;
        this.level = level;
        this.gold = gold;
        this.inventory = inventory;
        this.statusEffects = statusEffects;
    }

    receiveDamage(amount) {
        const damage = Math.max(amount - this.defense, 0);
        this.hp -= damage;
        if (this.hp < 0) this.hp = 0;
    }

    heal(amount) {
        this.hp = Math.min(this.maxHp, this.hp + amount);
    }

    gainXP(amount) {
        this.xp += amount;
        while (this.xp >= this.xpToNextLevel) {
        this.levelUp();
        }
    }

    xpToLevelUp() {
        return this.level * 100;
    }

    levelUp() {
        this.level++;
        this.xp -= this.xpToNextLevel;
        this.xpToNextLevel = Math.floor(this.xpToNextLevel * 1.5);
        this.maxHp = Math.floor(this.maxHp * 1.2);
        this.hp = this.maxHp;
        this.baseAttack = Math.floor(this.baseAttack * 1.2);
        this.attack = this.baseAttack;
        this.baseDefense = Math.floor(this.baseDefense * 1.2);
        this.defense = this.baseDefense;
        alert("Niveau supérieur atteint !");
    }

    addItem(item) {
        this.inventory.push(item);
    }

    removeItem(item) {
        const index = this.inventory.indexOf(item);
        if (index !== -1) {
            this.inventory.splice(index, 1);
            return true;
        }
        return false;
    }

    addStatusEffect(effect) {
        this.statusEffects.push(effect);
    }

    removeStatusEffect(effect) {
        const index = this.statusEffects.indexOf(effect);
        if (index !== -1) {
            this.statusEffects.splice(index, 1);
            return true;
        }
        return false;
    }
}
