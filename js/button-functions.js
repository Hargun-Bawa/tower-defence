import {Component, Property} from '@wonderlandengine/api';
import { state } from './game';

/**
 * button-functions
 */
export class ButtonFunctions extends Component {
    static TypeName = 'button-functions';
    /* Properties that are configurable in the editor */
    static Properties = {
        param: Property.float(1.0)
    };

    start() {

        state.buttonFunctions.push(function() { state.damage+= 50, state.currency -= 10, state.log("damage increased by 50"); state.needsUpdate = true; });
        console.log(state.buttonFunctions);
    }


    update(dt) {
        /* Called every frame. */
    }
}
