import { Component, Property, Type } from '@wonderlandengine/api';
import { turretAimer } from './turret-aimer';
import { state } from './game';
import { ProjectileSpawner } from './projectile-spawner';

/**
 * turret-spawner
 * this code will allow the player to spawn turrets in the location
 * the cursor is pointing   
 */
const tempQuat2 = new Float32Array(8);
export class TurretSpawner extends Component {
    static TypeName = 'turret-spawner';
    static Properties = {
        defaultMesh: { type: Type.Mesh },
        defaultMaterial: { type: Type.Material },
        bulletMesh: { type: Type.Mesh },
        bulletMaterial: { type: Type.Material },
        shootingCD: { type: Type.Int, default: 1 },
        damage: { type: Type.Int, default: 20 },
        turretCost: { type: Type.Int, default: 25 },
    };


    /// drone turret?

    init() {
        /* the timer is temporary and used to spawn a turret every 10 seconds for testing purposes*/
        this.timer = 0;
        this.name = 'dave';
        state.turretSpawner = this;
        state.buildT = function () {
            if (state.currency >= this.turretCost && state.pauseBuilding === false) {
                let turret = this.makeTurret();
                state.spawnedTurrets += 1;
                state.currency -= this.turretCost;
                // state.needsUpdate is for the Hud update function specifically
                // if the hud just calles update as it wants it eventually breaks
                state.needsUpdate = true;
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

    update(dt) {
        //* eventualy This code should take in a location from the user and build a turret there maybe using a build queue? 
    }

    makeTurret() {
        // adds the object to the scene, and all of the components and meshes
        // and the properties of the turret. 
        // !!!! IMPORTANT. The turret object itself is granted ownersip of all of the functions 
        // related to turret operation. Any additional functionality should follow this standard
        // The turret object3D should be given the necessary properties and functions to pass onto children
        // TODO make the towers spawn at ground level instead of floating

        const obj = this.engine.scene.addObject();
        // NULL objects for function/property allocation from children
        obj.target = null;
        obj.shoot = null;
        obj.cd = this.shootingCD;
        obj.name = "sam";
        obj.damage = this.damage;
        const mesh = obj.addComponent('mesh');
        mesh.mesh = this.defaultMesh;
        mesh.material = this.defaultMaterial;
        obj.bulletMesh = {
            mesh: this.bulletMesh,
            material: this.bulletMaterial
        }
        obj.addComponent("collision", {
            collider: WL.Collider.Sphere,
            extents: [5, 0, 0],
            group: 1 << 5,
            // this code is a test to see how to trigger Collision Onhit and onleave that has
            // some documentation on wonderland, but I cant figre out how to use
            // IF we can get it working it would make aiming and shooting signifficantly
            //   more efficient
            CollisionEventType: 1,
            active: true,
        });

        mesh.active = true;
        // aimer is its own named object because of a previous version, it should just be added as
        // obj.addComponent(turretAimer) but that crrrently gives errors
        const aimer = obj.addComponent(turretAimer);
        obj.addComponent(ProjectileSpawner);

        // Sets tower position, makes it float flat independent of spawn angle, and scale
        obj.setTransformLocal(this.object.getTransformWorld(tempQuat2));
        const x = new Float32Array(3);
        obj.setScalingLocal([0.2, 0.4, 0.2]);
        obj.setRotationLocal([0, 0, 0, 1]);

        obj.active = true;
        // pushes the turrets to a vector in state
        // state.turrets can be called in other classes for bugfixing.
        state.turrets.push(obj);
        obj.setDirty();
    }

}
