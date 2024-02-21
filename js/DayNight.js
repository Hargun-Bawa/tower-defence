import { Component, Property, Type } from '@wonderlandengine/api';
import {state } from './game';
/**
 * DayNight
 */
export class DayNight extends Component {
    static TypeName = 'DayNight';
    /* Properties that are configurable in the editor */
    static Properties = {
        dayTimer: { type: Type.Int, default: 3 },
        nightTimer: { type: Type.Int, default: 3 },
    };

    start() {
        console.log('start() with param', this.param);
    }

    init() {
        this.timer1 = 0;
        this.timer2 = 0;
        this.temp = 1; 
        this.r = 1;
        this.g = 1;
        this.b = 1;
    }



    update(dt) {
        /*this.timer += dt;
        let x = new Float32Array(3);

        if (this.timer > this.endDayTimer) {
            this.r -= .001;
            this.g -= .001;
            this.b -= .001;
            this.temp -= .001;

            while (this.temp < .2) {
                this.r = 1;
                this.g = 1;
                this.b = 1;
                if (this.r == 1) {
                    this.timer = 0;
                    this.temp = 1;
                }
            }
            x = [this.r, this.g, this.b];
            this.object.getComponent('light').setColor(x);
        }*/

        this.timer1 += dt;
        let x = new Float32Array(3);

        if (this.timer1 > this.dayTimer) {

            if (this.temp > .2) { // light out
                this.r -= .001;
                this.g -= .001;
                this.b -= .001;
                this.temp -= .001;
                state.day = true;
                state.pauseBuilding = false;
                state.pauseEnemies = true;
            }
            else { 

                this.timer2 += dt;
                if (this.timer2 > this.nightTimer) { // light back up
                    this.r += .001;
                    this.g += .001;
                    this.b += .001;
                    state.day = false;
                    state.pauseEnemies = false;
                    state.pauseBuilding = true;
                }

                if (this.r == 1) { // light out again
                    this.temp = 1;
                    this.timer1 = 0;
                    this.timer2 = 0;
                }
            }

            x = [this.r, this.g, this.b];
            this.object.getComponent('light').setColor(x);
        }

    }
}
