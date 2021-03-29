<template>
  <transition name="slide-down">
    <div
      class="title-bar container-md px-4 py-3 shadow z-200 flex-start-center"
      :class="backgroundStyle"
      v-show="ifTitleAndMenuShow"
    >
      <div class="btn p-2 rounded-circle" :class="buttonStyle">
        <a href="#" @click.prevent="$router.go(-1)">
          <arrow-left-icon size="4x" class="icon-lg"></arrow-left-icon>
        </a>
      </div>
      <div class="ml-4 text-lg align-top">
        {{ title }}
      </div>
    </div>
  </transition>
</template>

<script>
import { ArrowLeftIcon } from "vue-feather-icons";
export default {
  name: "TitleBar",
  components: {
    ArrowLeftIcon,
  },
  computed: {
    backgroundStyle() {
      return {
        "bg-light": this.theme.name === "light",
        "bg-dark": this.theme.name === "dark",
        "bg-gold": this.theme.name === "gold",
        "text-white": this.theme.name === "dark",
        "text-black": this.theme.name === "light" || this.theme.name === "gold",
      };
    },
    buttonStyle() {
      return {
        "btn-light": this.theme.name === "light",
        "btn-dark": this.theme.name === "dark",
        "btn-gold": this.theme.name === "gold",
      };
    },
  },
  props: {
    ifTitleAndMenuShow: {
      type: Boolean,
      default: false,
    },
    title: String,
    id: String,
    theme: Object,
  },
};
</script>

<style scoped lang="scss">
.title-bar {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  overflow: hidden;
}
</style>