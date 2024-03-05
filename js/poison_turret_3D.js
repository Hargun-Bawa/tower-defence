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
        bulletMesh: {type: Type.Mesh},
        bulletMaterial: {type: Type.Material}
    };
   start() {
        state.poisonTurret3D = this; }
}
