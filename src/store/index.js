import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    playerState: -1, // playing, pause, stop
    trackPlayTime: 0,
    trackDetails: {},
    trackDuration: 0
  },
  mutations: {
    /**
     * Current play time
     * @param state
     * @param value
     */
    updateTrackPlayTime (state, value) {
      state.trackPlayTime = value;
    },

    /**
     * The current playing tack details
     * @param state
     * @param value
     */
    updateTrackDetails(state, value) {
      state.trackDetails = value;
    },

    /**
     * The current playing tack duration
     * @param state
     * @param value
     */
    updateTrackDuration(state, value) {
      state.trackDuration = value;
    },

    /**
     *
     * @param state
     * @param value
     */
    updatePlayerState(state, value) {
      state.playerState = value;
    }
  },
  getters: {
    /**
     * Calculate how much of the track has been played in %
     * @param state
     * @returns {string}
     */
    trackDurationPercent: state => {
      if (state.trackDuration > 0 && state.trackPlayTime) {
        return (state.trackDuration / state.trackPlayTime * 100) + '%';
      }

      return '0';
    }
  }
})
