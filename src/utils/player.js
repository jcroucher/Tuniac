/**
 * Audio player functions
 */

import {Howl} from 'howler' // https://howlerjs.com/
import store from "./../store";

let player = null;
let volume = 0.5;

export default {

    play (url) {
        let that = this;

        if (player) { // Stop the current player before starting the new one
            this.stop();
        }

        player = new Howl({
            src: [url],
            autoplay: true,
            loop: false,
            volume: volume,
            onplay: function () {
                store.commit('updateDuration', player.duration());
                requestAnimationFrame(that.step.bind(that)); // This updates the track time
            },
            onend: function() {
                console.log('Finished!');
            }
        });

        player.play();
    },

    step: function () {
        if (player === null) {
            return;
        }

        let seek = player.seek() || 0;

        // Store the current track time in the vuex store so we can use it in other components
        store.commit('updateTime',
            this.formatTime(seek));

        // Keep loading ourselves if we are still playing
        if (player.playing()) {
            requestAnimationFrame(this.step.bind(this));
        }
    },

    stop () {
        if (player !== null) {
            player.stop();
        }

        player = null;
        store.commit('updateTime', this.formatTime(0));
    },

    pause () {
        player.pause();
    },

    /**
     * Total track length
     * @returns {*}
     */
    duration () {
        return player.duration();
    },


    /**
     * Convert the track length in seconds to M:S
     * @param duration
     * @returns {string}
     */
    formatTime: function (duration) {
        const d = Math.round(duration); // Round before doing anything as we don't want decimals in our numbers
        const minutes = Math.floor(d / 60) || 0;
        const seconds = (d - minutes * 60) || 0;

        return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
    },
}
