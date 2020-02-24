<template>
  <div class="h-full flex flex-col">

    <!-- header play area //-->
    <div id="play-area" class="flex-0 flex border-b mb-4 pb-2">

      <!-- player controls //-->
      <div class="w-1/5 flex mr-5">

        <DefaultButton>
          <font-awesome-icon icon="step-backward" />
        </DefaultButton>

        <button
                @click="playPause()"
                class="flex-0 h-10 bg-transparent hover:bg-blue-700 text-black-500 font-semibold hover:text-white py-2 px-4 hover:border-transparent outline-none focus:outline-none">
          <font-awesome-icon icon="play" />
        </button>


        <DefaultButton>
          <font-awesome-icon icon="step-forward" />
        </DefaultButton>

      </div>
      <!-- end player controls //-->

      <!-- play status //-->
      <div class="w-4/5">
        <div id="track" class="ml-20" v-html="trackDetails.title || '&nbsp;'"></div>
        <div id="artist" class="ml-20" v-html="trackDetails.artist || '&nbsp;'"></div>
        <div id="progress" class="flex mt-2">
          <div class="mr-5" v-html="trackPlayTime"></div>
          <div class="w-full bg-grey-light">
            <div class="bg-blue-500 text-xs leading-none h-5 py-2 text-center text-white"
                 :style="'width: ' + trackPercent"></div>
          </div>
          <div class="ml-5" v-html="trackDuration"></div>
        </div>
      </div>
      <!-- end play status//-->

    </div>
    <!-- end header play area //-->


    <div id="main" class="flex-1 flex flex-grow">

      <div class="w-1/5 mr-3 flex flex-col">
        <div class="text-xl flex-0">Source</div>
        <div class="flex-1 border p-3">
          <!-- library/playlist lists //-->
          <!-- todo: make this work //-->
          <div><font-awesome-icon icon="music" /> Media Library</div>
          <div><font-awesome-icon icon="list-ul" /> Metal</div>
          <div><font-awesome-icon icon="list-ul" /> 2012</div>
          <!-- end library/playlist lists //-->
        </div>
        <div class="flex-0 flex mt-2 mb-2">
          <!-- todo: make this work //-->
          <DefaultButton>
            Add
          </DefaultButton>
          <DefaultButton>
            Delete
          </DefaultButton>
        </div>
        <!-- cover image //-->
          <div class="flex-0">
            <!-- todo: make this work //-->
            <img src="https://placekitten.com/300/300" style="width: 100%; height: 100%;" />
          </div>
        <!-- end cover image //-->
      </div>
      <div class="w-4/5 h-full flex flex-col">
        <div class="text-xl flex-0">Media Library</div>
        <div class="text-xl flex-1 border p-3">

            <!-- todo: add loading spinner //-->
            <!-- Media library //-->
            <table class="text-left w-full h-full text-sm">

              <thead class="flex w-full">
                <tr class="flex w-full mb-2 border-b">
                  <th class="pb-1 w-3/12">Title</th>
                  <th class="pb-1 w-3/12">Artist</th>
                  <th class="pb-1 w-3/12">Album</th>
                  <th class="pb-1 w-1/12">Year</th>
                  <th class="pb-1 w-1/12 text-right">Track</th>
                  <th class="pb-1 w-1/12 text-right">Time</th>
                </tr>
              </thead>

              <tbody class="flex flex-col overflow-y-scroll w-full media-library">
                <tr v-for="track in library"
                    v-bind:key="track.entryId"
                    @click="currentTrackId = track.entryId"
                    :class="track.entryId === currentTrackId ? 'bg-blue-200' : ''"
                    class="flex flex-0 w-full mb-2">

                  <td class="p-1 w-3/12" v-html="track.title"></td>
                  <td class="p-1 w-3/12" v-html="track.artist"></td>
                  <td class="p-1 w-3/12" v-html="track.album"></td>
                  <td class="p-1 w-1/12" v-html="track.year"></td>
                  <td class="p-1 w-1/12 text-right" v-html="track.tracknum"></td>
                  <td class="p-1 w-1/12 text-right" v-html="track.duration"></td>

                </tr>
              </tbody>

            </table>
            <!-- End Media library //-->

        </div>
      </div>

    </div>

    <!-- footer //-->
    <div id="status" class="flex-0 mt-2 text-sm">
      <!-- todo: make this work. stats should be saved and only calculated when a change to the list is made //-->
      Media Library - 8,118 Items - 3 Weeks, 1 Day, 3 Hours, 9 Minutes, 43 Seconds.
    </div>
    <!-- end footer //-->


  </div>
</template>

<script>
import DefaultButton from './../components/DefaultButton.vue'
import { getTracks, getTrackDetails } from '@/utils/db'
import Player from './../utils/player'

/* eslint-disable no-console */
export default {
  name: 'Home',
  components: {
    DefaultButton
  },
  data () {
    return {
      library: [],
      queue: [],
      currentTrackId: -1,
    }
  },
  methods: {
    playPause () {
      Player.stop();
    }
  },
  computed: {
    trackPlayTime () {
      return this.$store.state.trackPlayTime > 0 ? Player.formatTime(this.$store.state.trackPlayTime) : '';
    },
    trackDetails () {
      return this.$store.state.trackDetails;
    },
    trackDuration () {
      return this.$store.state.trackDuration > 0 ? Player.formatTime(this.$store.state.trackDuration) : '';
    },
    trackPercent () {
      return this.$store.getters.trackDurationPercent;
    }
  },
  watch: {
    /**
     * When the track id changes, update the player
     * @param trackId
     */
    currentTrackId: function (trackId) {
      getTrackDetails(trackId).then(data => {
        // Update the sore with the current track data
        this.$store.commit('updateTrackDetails', data);

        // todo: add file:// to the database rather than inline here
        Player.play('file://' + data.url);
      })
    }
  },
  mounted() {
    getTracks().then(data => {
      this.library = data;
    })
  }
}
</script>

<style>
  .media-library {
    /* hacky. do not like */
    height: calc(100vh - 250px);
  }
</style>
