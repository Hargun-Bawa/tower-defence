import { CollisionEventType, Component, Property } from '@wonderlandengine/api';
import { state } from "./game";

/**
 * Turretaimer
 */
export class turretAimer extends Component {
    static TypeName = 'turret-aimer';
    /* Properties that are configurable in the editor */
    static Properties = {
    };

    start() {
        console.log('start() with param', this.param);
    }
    init() {
        this.timer = 0;
        this.hits = 0;
    }
    seek() {
        const collision = this.object.getComponent('collision');
        const overlaps = collision.queryOverlaps();
        for (const coll of overlaps) {
            if (coll.object.name === "dave") {


                console.log(this.object.target);
                if (this.object.target === null || this.object.target.walked < coll.object.walked) {
                    this.object.target = coll.object;
                }
                else { this.object.target = null; }
            }
        }
    }

    update(dt) {
        this.timer += dt;
        let g = new Float32Array(3);
        // this function checks to see if there is an enemy target in default range
        if (this.object.target == null || this.object.target.objectId < 0) {
            this.seek();
        }
        // if there is a target in range, makes the turret look at and then fire at said target,
        // TODO find some way to lock the non Y axis rotation
        if (this.object.target && this.object.target.isDestroyed == false) {
            let g = new Float32Array(3);
            // this part of the code checks to make sure the target is still in range, and then shoots
            // at the target and deletes it if the target is at less than or equal to 0 hp
            const collision = this.object.getComponent('collision');
            const overlaps = collision.queryOverlaps();
            let fired = false;
            for (const coll of overlaps) {
                if (fired == false && coll.object === this.object.target) {
                    console.log(this.object.turret);
                    this.object.turret.lookAt(this.object.target.getPositionWorld(), [0, 1, 0]);
                    if (this.timer > this.object.cd) {
                        this.object.shoot(this.object.turret.getForwardWorld(g));
                        this.object.target.health -= this.object.damage;
                        if (this.object.status != null) {
                            this.object.target.poisoned = true;
                            this.object.target.poisonStack += 1;
                            console.log(this.object.target.poisonStack);
                        }
                        this.timer = 0;
                        if (this.object.target.health <= 0) { 
                            state.currency += this.object.target.value; 
                            this.object.target.destroy(); 
                            state.needsUpdate = true; 
                            state.enemiesDestroyed++; 
                        }
                    }
                    fired = true;
                }
            }
            if (!fired) { this.object.target = null };
        }
    }
}
