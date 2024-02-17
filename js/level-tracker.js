import { Component, Type, Property } from '@wonderlandengine/api';
import { state } from './game';
/**
 * level-tracker
 */
export class LevelTracker extends Component {
    static TypeName = 'level-tracker';
    /* Properties that are configurable in the editor */
    static Properties = {
        level: { type: Type.Int, default: 1 },
        timer: { type: Type.Int, default: state.timer },
        day: { type: Type.Bool, default: true },

    };

    init() {

    }
    start() {
    }

    update(dt) {
        this.timer += dt;
        if (this.day) {
            if (this.timer > state.buildTime) {
                this.day = false;
            }
        }

    }
}
