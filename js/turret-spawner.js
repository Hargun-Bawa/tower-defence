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
        shootingCD: { type: Type.Int, default: 2 },
    };
    init() {
        /* the timer is temporary and used to spawn a turret every 10 seconds for testing purposes*/
        this.timer = 0;
        this.name = 'dave';
        state.turretSpawner = this;
        state.buildT = function () {
            if(state.currency >= 25){
            let turret = this.makeTurret();
            state.currency -= 25;
            state.needsUpdate = true;
            }
        }.bind(this);
    }
    static onRegister(engine) {
        engine.registerComponent(turretAimer);
        engine.registerComponent(ProjectileSpawner);
    }
    start() {
        console.log('start() turret spawner');
    }


    update(dt) {
        //* eventualy This code should take in a location from the user and build a turret there maybe using a build queue? 
    }

    makeTurret() {
        // adds the object to the scene, and all of the components and meshes
        // TODO make the towers spawn at ground level instead of floating
        const obj = this.engine.scene.addObject();
        obj.target = null;
        obj.targets = new Set();
        obj.shoot = null;
        obj.cd = this.shootingCD;
        obj.name = "sam";
        obj.setTransformLocal(this.object.getTransformWorld(tempQuat2));
        const x = new Float32Array(3);
        obj.setScalingLocal([0.2, 0.4, 0.2]);
        obj.setRotationLocal([0, 0, 0, 1]);
        const mesh = obj.addComponent('mesh')
        mesh.mesh = this.defaultMesh;
        mesh.material = this.defaultMaterial;
        obj.addComponent("collision", {
            collider: WL.Collider.Sphere,
            extents: [5, 0, 0],
            group: 1 << 5,
            CollisionEventType: 1,
            active: true,
        });
        mesh.active = true;
        const aimer = obj.addComponent(turretAimer);
        obj.addComponent(ProjectileSpawner);
        obj.active = true;
        state.turrets.push(obj);
        obj.setDirty();
    }

}
