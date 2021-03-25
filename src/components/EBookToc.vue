<template>
  <transition name="slide-right">
    <div class="toc-wrapper w-75 bg-light z-300 shadow" v-show="ifShowContent">
      <ul class="list-group">
        <li
          class="list-group-item list-group-item-action p-0"
          v-for="(item, index) in tocList"
          :key="index"
          @click="jumpTo(item.href)"
        >
          <div class="btn btn-light d-block text-left" :class="item.padding">
            {{ item.label }}
          </div>
        </li>
      </ul>
    </div>
  </transition>
</template>

<script>
export default {
  name: "EBookTOC",
  data() {
    return {
      tocList: [],
    };
  },
  props: {
    ifShowContent: Boolean,
    navigation: Object,
    toc: Array,
    bookAvailable: Boolean,
  },
  watch: {
    toc() {
      if (this.toc) {
        this.getToc(this.toc);
      }
    },
  },
  methods: {
    jumpTo(href) {
      console.log(this.navigation);
      this.$emit("jumpTo", href);
    },
    getToc(list, depth) {
      for (let item of list) {
        if (!depth) {
          depth = 0;
          item = { ...item, depth: 0, padding: "pl-3" };
        } else {
          item = { ...item, depth, padding: `pl-${depth + 3}` };
        }
        this.tocList.push(item);
        if (item.subitems) {
          this.getToc(item.subitems, depth + 1);
        }
      }
    },
  },
  created() {
    if (this.toc) {
      this.getToc(this.toc);
    }
  },
};
</script>

<style scoped lang="scss">
.toc-wrapper {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>