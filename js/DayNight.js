import { Component, Property, Type } from '@wonderlandengine/api';
import { state } from './game';
/**
 * DayNight
 */
export class DayNight extends Component {
    static TypeName = 'DayNight';
    /* Properties that are configurable in the editor */
    static Properties = {
        dayTimer: { type: Type.Int, default: 2 },
    };

    start() {
        console.log('start() with param', this.param);
    }

    init() {
        this.timer1 = 0;
        this.timer2 = 0;
        this.r = .5;
        this.g = .5;
        this.b = .5;
        this.mod = .005;
    }



    update(dt) {
        this.timer1 += dt;
        let x = new Float32Array(3);

        if (this.timer1 > .125) {
            this.r += this.mod;
            this.g += this.mod;
            this.b += this.mod;
            this.timer1 = 0;
            if (this.r > 1 || this.r < .2) {
                state.day = !state.day;
                state.pauseEnemies = !state.pauseEnemies;
                state.pauseBuilding = !state.pauseBuilding;
                this.mod *= -1;
                this.r += this.mod * 3;
                this.g += this.mod * 3;
                this.b += this.mod * 3;
                state.levelUp();
            }
            x = [this.r, this.g, this.b];
            this.object.getComponent('light').setColor(x);
        }

    }
}
