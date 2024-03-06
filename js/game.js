
/**
 * game and state together hold the random functions and game information that needs to be accessed across the file.
 * update it whenever you need to add something at agame level 
 */
// Global TODO
// Music/sound - Ron
// Extra types of towers - Hieu
// Enemy types - Saul
// Flying enemy 
// Boss monster/ seige weapon
// High Score
// terrain collision
// Turrets spawn at cursor instead of where player is standing 
// Off limit building paths
// See through/semi transparent hud
// Fix animation
// Sync day/night with level and sun/moon

import { ButtonFunctions } from "./button-functions"


// onHOver?  cursor hover for upgrade details for individual towers?
// alternatively, 
export const state = {
    EnemySpawner: [],
    //this is the function that spawns enemeies
    spawn: null,
    spawnedEnemies: 0,
    currentEnemies: [],
    maxEnemies: 15,
    enemiesDestroyed: 0,

    health: 100,
    getHealth: function () { return this.health.toString() },
    getCurrency: function () { return this.currency.toString() },

    turretSpawner: [],
    turrets: [],
    buildT: null, 
    spawnedTurrets: 0,
    maxTurrets: 10,
    currency: 50,

    needsUpdate: false,
    gameOver: false,
    selectedTurret : "poison",
    shipHit:null,
    buildTime : 15,

    levelUp : null,
    day: true,
    pauseEnemies: true,
    pauseBuilding: false,

    t : ButtonFunctions,
    buttonFunctions: [],
    attackDamagecost: 50,
    attackRangeCost: 50,
    attackSpeedCost: 50,
    profitUpCost: 50,
    healthUpCost: 50,

    attackDamage: 10,
    attackRange: 10,
    attackSpeed: 10,
    profitUp: 10,
    healthUp: 10,

    defaultTurret3D: null,
    poisonTurret3D: null,

    getAttackDamageCost: function () { return this.attackDamagecost.toString() },
    getAttackRangeCost: function () { return this.attackRangeCost.toString() },
    getAttackSpeedCost: function () { return this.attackSpeedCost.toString() },
    getProfitUpCost: function () { return this.profitUpCost.toString() },
    getHealthUpCost: function () { return this.healthUpCost.toString() },
}
 