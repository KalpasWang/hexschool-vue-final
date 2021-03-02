<template>
  <div id="app">
    <Loading :active.sync="isLoading"></Loading>
    <router-view />
    <notifications group="errorMsg" />
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

#app {
  // font-family: Avenir, Helvetica, Arial, sans-serif;
  // -webkit-font-smoothing: antialiased;
  // -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.notification-title,
.notification-content {
  font-size: 1.2rem !important;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
