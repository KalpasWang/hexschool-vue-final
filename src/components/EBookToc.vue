<template>
  <transition name="slide-right">
    <div class="content">
      <div class="content-wrapper shadow" v-if="bookAvailable">
        <div
          class="content-item"
          v-for="(item, index) in navigation.toc"
          :key="index"
          @click="jumpTo(item.href)"
        >
          <span class="text">{{ item.label }}</span>
        </div>
      </div>
      <div class="empty" v-else>讀取中...</div>
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

<style scoped lang="sass">
@import "@/assets/scss/global"
.content
  .content-wrapper
    position: absolute
    bottom: 0
    left: 0
    z-index: 102
    display: flex
    flex-direction: column
    width: 75%
    height: 100%
    background: white
    h5
      @include center
      padding-top: px2rem(10)
      font-size: px2rem(20)
    .content-item
      flex: 1
      width: 100%
      // height: px2rem(10)
      // line-height: px2rem(10)
      // padding-left: px2rem(15)
      .text
        width: 100%
        color: #333
        cursor: pointer
        font-size: 20px
</style>