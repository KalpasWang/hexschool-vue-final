<template>
  <div class="container-fluid">
    <div id="reader" class="reader"></div>
  </div>
</template>
<script>
import ePub from "epubjs";
export default {
  name: "EpubReader",
  data() {
    return {
      book: null,
      rendition: null,
      show: false,
    };
  },
  methods: {
    showEpub() {
      this.book = ePub("/static/content1.epub");

      this.book.ready.then(() => {
        this.show = true;
      });
      this.rendition = this.book.renderTo("reader", {
        width: "100%",
        height: "100%",
        spread: "always",
      });
      this.rendition.display();
      console.log(this.book);
      console.log(this.rendition);
    },
  },
  mounted() {
    this.showEpub();
    console.log(this.$route.params);
  },
};
</script>
<style scoped>
/* html,
body {
  width: 100%;
  height: 100vh;
} */

.container-fluid {
  position: relative;
}

.reader {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>