import { Type, Component, Property } from '@wonderlandengine/api';
import { state } from "./game";

/**
 * ship
 */
export class Ship extends Component {
    static TypeName = 'ship';
    /// Currency earned from defeating monsters can be invested in the ship
    /// these properties define critical and non critical systems needed to 
    /// repair the ship and escape the planet. when reaching certain values
    /// they also upgrade the users turrets/ personal stats 


    static Properties = {
        // default health value 
        // Other values can only be upgraded once hull threshholds are reached
        /// IE Hull must be level 2 before shields can become level 2 
        hull: { type: Type.Int, default: 200 },
        // reduces the amount of damage done by enemies 
        shields: { type: Type.Int, default: 0 },
        // increases the attack range of turrets
        scanners: { type: Type.Int, default: 0 },
        /// allows for more ( or maybe different ) turrets
        autofactories: { type: Type.Int, default: 0 },
        /// Increases attack speed 
        targettingSystems: { type: Type.Int, default: 0 },
        /// increases the amount of money earned from killing enemies
        harvestingDroids: { type: Type.Int, default: 0 },
        /// Provides more material/ currency 
        fuelGenerators: { type: Type.Int, default: 0 },
    };


    init() {
        state.ship = this;
        state.needsUpdate = true;
        state.shipHit = function (damage) {
            this.hull -= damage;
            state.health = this.getHealth();
        }.bind(this);
        state.purchase = function (selector, amount) {
            switch (selector) {
                case 0:
                    this.hull += amount;
                    state.currency -= amount;
                    state.turretSpawner.damage += 20;
                    console.log(state.turretSpawner);
                    for (let i = 0; i < state.turrets.length; i++) {
                        console.log(" test", state.turrets[i].damage);
                        state.turrets[i].damage += 20;
                    }
                    state.turretSpawner.damage += 20;
                    break;
                case 1:
                    state.currency -= amount;
                    state.turretSpawner.damage += 20;
                    console.log(state.turretSpawner);
                    for (let i = 0; i < state.turrets.length; i++) {
                        console.log(" test", state.turrets[i].damage);
                        state.turrets[i].damage += 20;
                    }
                    state.turretSpawner.damage += 20;
                    this.shields += amount;
                    break;
                case 2:
                    state.currency -= amount;
                    state.turretSpawner.damage += 20;
                    console.log(state.turretSpawner);
                    for (let i = 0; i < state.turrets.length; i++) {
                        console.log(" test", state.turrets[i].damage);
                        state.turrets[i].damage += 20;
                    }
                    state.turretSpawner.damage += 20;
                    this.scanners += amount;
                    break;
                case 3:
                    state.currency -= amount;
                    state.turretSpawner.damage += 20;
                    console.log(state.turretSpawner);
                    for (let i = 0; i < state.turrets.length; i++) {
                        console.log(" test", state.turrets[i].damage);
                        state.turrets[i].damage += 20;
                    }
                    state.turretSpawner.damage += 20;
                    this.autofactories += amount;
                    break;
                case 4:
                    state.currency -= amount;
                    state.turretSpawner.damage += 20;
                    console.log(state.turretSpawner);
                    for (let i = 0; i < state.turrets.length; i++) {
                        console.log(" test", state.turrets[i].damage);
                        state.turrets[i].damage += 20;
                    }
                    state.turretSpawner.damage += 20;
                    this.targettingSystems += amount;
                    break;
                case 5:
                    state.currency -= amount;
                    state.turretSpawner.damage += 20;
                    console.log(state.turretSpawner);
                    for (let i = 0; i < state.turrets.length; i++) {
                        console.log(" test", state.turrets[i].damage);
                        state.turrets[i].damage += 20;
                    }
                    state.turretSpawner.damage += 20;
                    this.harvestingDroids += amount;
                    break;
                case 6:
                    state.currency -= amount;
                    this.fuelGenerators += amount;
                    break;
            }
        }.bind(this);
    }
    setHealth() {
        let health = 0;
        return health;
    }
}
