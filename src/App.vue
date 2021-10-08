<template>
  <div id="app" class="text-center fw-normal">
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

.notification-title {
  font-weight: bold !important;
}

.notification-title,
.notification-content {
  font-size: 1rem !important;
}
</style>
