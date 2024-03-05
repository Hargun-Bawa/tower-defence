import {Component, Object3D, Property, Type} from '@wonderlandengine/api';
import {state } from './game';
/**
 * poison_turret_3D
 */
export class PoisonTurret3D extends Component {
    static TypeName = 'poison_turret_3D';
    /* Properties that are configurable in the editor */
    static Properties = {
        turret: {type: Type.Object},
        base:{type: Type.Object},
    };

    start() {
        state.poisonTurret3D = this; }
    init(){
        
    }
    update(dt) {
        /* Called every frame. */
    }
}
