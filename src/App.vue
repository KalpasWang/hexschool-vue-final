<template>
  <div id="app">
    <Loading :active.sync="isLoading"></Loading>
    <router-view />
    <notifications group="alert" />
  </div>
</template>

<script>
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import { mapGetters } from "vuex";

export default {
  name: "App",
  computed: {
    ...mapGetters(["isLoading"]),
  },
  components: {
    Loading,
  },
};
</script>

<style lang="scss">
@import "./assets/scss/all";
html,
body {
  width: 100%;
  height: 100%;
  min-height: 100vh;
}

#app {
  // font-family: Avenir, Helvetica, Arial, sans-serif;
  // -webkit-font-smoothing: antialiased;
  // -moz-osx-font-smoothing: grayscale;
  text-align: center;
  // color: #2c3e50;
  font-weight: 400;
}

.notification-title {
  font-weight: bold !important;
}

.notification-title,
.notification-content {
  font-size: 1rem !important;
}
</style>
