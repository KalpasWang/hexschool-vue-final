<template>
  <transition name="slide-right">
    <div class="toc-wrapper w-75 bg-light shadow" v-show="ifShowContent">
      <ul class="list-group" v-if="navigation.toc">
        <li
          class="list-group-item"
          v-for="(item, index) in navigation.toc"
          :key="index"
          @click="jumpTo(item.href)"
        >
          <span class="">{{ item.label }}</span>
        </li>
      </ul>
    </div>
  </transition>
</template>

<script>
export default {
  name: "EBookTOC",
  props: {
    ifShowContent: Boolean,
    navigation: Object,
    bookAvailable: Boolean,
  },
  methods: {
    jumpTo(href) {
      console.log(this.navigation);
      this.$emit("jumpTo", href);
    },
  },
};
</script>

<style scoped lang="scss">
.toc-wrapper {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  overflow-y: auto;
}
</style>