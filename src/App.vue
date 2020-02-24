<template>
  <div id="app" class="p-3 h-screen flex flex-col">
    <!-- render all the pages here //-->
    <router-view class="flex-1"/>
  </div>
</template>

<script>
  import { EventBus } from './utils/event-bus.js';

  export default {
    name: 'Home',
    methods: {
      /**
       * Router request to change page called using events
       * @param page
       */
      changePage(page) {
        this.$router.push(page);
      }
    },
    mounted() {
      // Internal message bus for changing page
      EventBus.$on('change-page', page => {
        this.changePage(page);
      });

      // External event bus from Electron for changing page. Used with menus
      require('electron').ipcRenderer.on('change-page', (event, page) => {
        this.changePage(page);
      })
    }
  }
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
