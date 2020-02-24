<template>
  <div class="about">
    <span @click="goHome" class="mr-5"><font-awesome-icon icon="arrow-left" /></span><span class="text-xl">Preferences</span>

    <div class="flex mt-5">
      <div class="flex-0 mr-5 overflow-hidden border-r-2 bg-white mb-4 w-1/4">
        <div class="flex cursor-pointer px-4 py-2 text-lg text-grey-darkest border-b-0">
          <div class="pl-2">Playback</div>
        </div>
        <div class="flex cursor-pointer px-4 py-2 text-lg text-grey-darkest border-b-0" style="border-left: 4px solid #e2624b !important;">
          <div class="pl-2">Media Library</div>
        </div>
        <div class="flex cursor-pointer px-4 py-2 text-lg text-grey-darkest border-b-0">
          <div class="pl-2">Plugins</div>
        </div>
      </div>

      <div class="flex-1 bg-white mb-4 w-1/4">

        <div class="md:flex md:items-top mb-3">
          <div class="md:w-1/4 flex-0">
            <label class="text-gray-500 font-bold" >
              Database Location
            </label>
          </div>
          <div class="md:w-3/4 flex-1 bg-gray-200 text-gray-700 py-2 px-4">
            ./tuniac.db
          </div>
        </div>

        <div class="md:flex md:items-top mb-3">
          <div class="md:w-1/4 flex-0">
            <label class="text-gray-500 font-bold" >
              Database Stats
            </label>
          </div>
          <div class="md:w-3/4 flex-1 bg-gray-200 text-gray-700 py-2 px-4">
            Lorem
            <br />Ipsum
          </div>
        </div>

        <div class="md:flex md:items-top mb-3">
          <div class="md:w-1/4">
            <label class="text-gray-500 font-bold" for="import">
              Import Database
            </label>
          </div>
          <div class="md:w-2/4 ml-2">
            <input class="bg-gray-200 appearance-none border-2 border-gray-200 w-full py-2 px-4 text-gray-700 focus:outline-none focus:bg-white focus:border-blue-500" id="import" type="file" />
            <small class="text-gray-500" >Note this will override your existing data</small>
          </div>

          <button class="md:w-1/4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-5">
            <font-awesome-icon icon="upload" /> Upload
          </button>
        </div>

        <hr class="mb-5" />

        <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          Clear Database
        </button>
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-5">
          <font-awesome-icon icon="download" /> Download Database
        </button>

      </div>
    </div>

  </div>
</template>


<script>
  import { EventBus } from './../utils/event-bus.js'

  /* eslint-disable no-console */
  export default {
    name: 'Preferences',
    components: {
    },
    methods: {
      goHome () {
        EventBus.$emit('change-page', '/');
      }
    }
  }
</script>
