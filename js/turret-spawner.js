import { Component, Property, Type } from '@wonderlandengine/api';
import { turretAimer } from './turret-aimer';
import { state } from './game';
import { ProjectileSpawner } from './projectile-spawner';
import { Default } from './default';
import { Poison } from './poison';
import { DefaultTurret3D  } from './default_turret_3D';
/**
 * turret-spawner
 * this code will allow the player to spawn turrets in the location
 * the cursor is pointing   
 */
export class TurretSpawner extends Component {
    static TypeName = 'turret-spawner';
    static Properties = {
        defaultMesh: { type: Type.Mesh },
        defaultMaterial: { type: Type.Material },
        poisonMesh: { type: Type.Mesh },
        poisonMaterial: { type: Type.Material },
        shootingCD: { type: Type.Int, default: 1 },
        damage: { type: Type.Int, default: 20 },
        turretCost: { type: Type.Int, default: 25 },
        defaultTurret: { type: Type.Object},
        defaultBase: {type: Type.Object},

    };


    /// poison turret?

    init() {
        this.timer = 0;
        this.name = 'dave';
        this.makeTurret = null;
        state.turretSpawner = this;
        state.defaultMesh = new Component("Object", { mesh: this.defaultMesh, material: this.defaultMaterial });
        state.poisonMesh = new Component("mesh", { mesh: this.poisonMesh, material: this.poisonMaterial });
        state.buildT = function () {
            if (state.currency >= this.turretCost && state.pauseBuilding === false) {

                let tempTurret = null;
                if (state.selectedTurret === "default") {
                    tempTurret = new Default;

                    let turret = tempTurret.makeTurret(this);
                    state.spawnedTurrets += 1;
                    state.currency -= this.turretCost;
                    // state.needsUpdate is for the Hud update function specifically
                    // if the hud just calles update as it wants it eventually breaks
                    state.needsUpdate = true;
                }
                if (state.selectedTurret === "poison") {
                    tempTurret = new Poison;
                    let turret = tempTurret.makeTurret(this);
                    state.spawnedTurrets += 1;
                    state.currency -= this.turretCost;
                    // state.needsUpdate is for the Hud update function specifically
                    // if the hud just calles update as it wants it eventually breaks
                    state.needsUpdate = true;
                }
            }
        }.bind(this);
    }
    static onRegister(engine) {
        engine.registerComponent(turretAimer);
        engine.registerComponent(ProjectileSpawner);
    }
    start() {
        console.log('start turret spawner');
    }
}
