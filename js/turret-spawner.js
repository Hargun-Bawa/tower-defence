import { Component, Property, Type } from '@wonderlandengine/api';
import { turretAimer} from './turret-aimer';
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
        bulletMesh: { type: Type.Mesh},
        bulletMaterial: { type : Type.Material},
        shootingCD: { type: Type.Int, default: 2 },

    };
    init() {
    /* the timer is temporary and used to spawn a turret every 10 seconds for testing purposes*/
        this.timer = 0;
        this.name ='dave';
        state.turretSpawner = this;
        state.buildT = function () {
            let turret = this.makeTurret();
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
        this.timer += dt;
        if (this.timer >10 && state.spawned < 1){
            this.timer = 0; 
            state.spawned ++;
           state.buildT();
        }
    }

    makeTurret() {
        // adds the object to the scene, and all of the components and meshes
        // TODO make the towers spawn at ground level instead of floating
        const obj = this.engine.scene.addObject();
        obj.target = null;
        obj.shoot = null;
        obj.cd = this.shootingCD;
        obj.name = "sam";
        obj.dir = [0,0,0];
        obj.setTransformLocal(this.object.getTransformWorld(tempQuat2));
        const mesh = obj.addComponent('mesh')
        mesh.mesh = this.defaultMesh;
        mesh.material = this.defaultMaterial;
        mesh.active = true;
        const aimer = obj.addComponent(turretAimer);
        obj.addComponent(ProjectileSpawner);
        obj.active = true;
        state.turrets.push(obj);        
        obj.setDirty();
    }

}
