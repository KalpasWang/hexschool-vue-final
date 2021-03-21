<template>
  <div class="ebook container-fluid">
    <div
      v-if="errorMsg.length > 0"
      class="ebook__error d-flex justify-content-center align-items-center"
    >
      {{ errorMsg }}
    </div>
    <div class="row">
      <e-book-title-bar :ifTitleAndMenuShow="ifTitleAndMenuShow" />
      <div class="ebook__wrapper">
        <div id="read"></div>
        <div class="ebook__mask">
          <div class="ebook__left-area" @click="prevPage"></div>
          <div class="ebook__center-area" @click="toggleTitleAndMenu"></div>
          <div class="ebook__right-area" @click="nextPage"></div>
        </div>
      </div>
      <e-book-menu-bar
        :ifTitleAndMenuShow="ifTitleAndMenuShow"
        :fontSizeList="fontSizeList"
        :defaultFontSize="defaultFontSize"
        @setFontSize="setFontSize"
        :themeList="themeList"
        :defaultTheme="defaultTheme"
        @setTheme="setTheme"
        :bookAvailable="bookAvailable"
        @onProgressChange="onProgressChange"
        :navigation="navigation"
        @jumpTo="jumpTo"
        ref="menuBar"
      />
    </div>
  </div>
</template>

<script>
import { SETLOADING } from "@/store/modules/mutation-types";
import EBookTitleBar from "@/components/EBookTitleBar";
import EBookMenuBar from "@/components/EBookMenuBar";
import Epub from "epubjs";
const DOWNLOAD_URL = "/static/content1.epub";

export default {
  name: "Ebook",
  components: {
    EBookMenuBar,
    EBookTitleBar,
  },

  data() {
    return {
      book: null,
      rendition: null,
      locations: null,
      navigation: null,
      ifTitleAndMenuShow: false,
      errorMsg: "",
      bookAvailable: false,
      fontSizeList: [
        { fontSize: 12 },
        { fontSize: 14 },
        { fontSize: 16 },
        { fontSize: 18 },
        { fontSize: 20 },
        { fontSize: 22 },
        { fontSize: 24 },
      ],
      defaultFontSize: 20,
      defaultTheme: 0,
      themes: null,
      themeList: [
        {
          name: "light",
          style: {
            body: {
              color: "#000",
              background: "#fff",
            },
          },
        },
        {
          name: "night",
          style: {
            body: {
              color: "#fff",
              background: "#000",
            },
          },
        },
        {
          name: "gold",
          style: {
            body: {
              color: "#000",
              background: "#F1DFCF",
            },
          },
        },
      ],
    };
  },

  methods: {
    // 跳轉到指定的位置
    jumpTo(href) {
      this.rendition.display(href);
      this.hideTitleAndMenuShow();
    },
    hideTitleAndMenuShow() {
      this.ifTitleAndMenuShow = false;
      this.$refs.menuBar.hideSetting();
      // 隱藏目錄
      this.$refs.menuBar.hideContent();
    },
    // progress bar 的數值 (0-100)
    onProgressChange(progress) {
      const percentage = progress / 100;
      const location =
        percentage > 0 ? this.locations.cfiFromPercentage(percentage) : 0;
      this.rendition.display(location);
    },
    setTheme(index) {
      // this.themes.select(this.themeList[index].name);
      const theme = this.themeList[index];
      this.rendition.themes.override("color", theme.style.body.color, true);
      this.rendition.themes.override(
        "background",
        theme.style.body.background,
        true
      );
      this.defaultTheme = index;
    },
    registerTheme() {
      this.themeList.forEach((theme) => {
        this.rendition.themes.register(theme.name, theme.style);
      });
    },
    setFontSize(fontSize) {
      this.defaultFontSize = fontSize;
      if (this.themes) {
        this.themes.fontSize(fontSize + "px");
      }
    },
    toggleTitleAndMenu() {
      this.ifTitleAndMenuShow = !this.ifTitleAndMenuShow;
      if (!this.ifTitleAndMenuShow) {
        this.$refs.menuBar.hideSetting();
        this.$refs.menuBar.hideContent();
      }
    },
    prevPage() {
      this.ifTitleAndMenuShow = false;
      if (this.rendition) {
        this.rendition.prev().then(() => {
          // 控制 progress bar 往後
          if (this.locations) {
            const currentLocation = this.rendition.currentLocation();
            let progress = Math.ceil(
              this.locations.percentageFromCfi(currentLocation.start.cfi) * 100
            );
            this.$refs.menuBar.onProgressInput(progress);
          }
        });
      }
    },
    nextPage() {
      this.ifTitleAndMenuShow = false;
      if (this.rendition) {
        this.rendition.next().then(() => {
          // 控制 progress bar 往前
          if (this.locations) {
            const currentLocation = this.rendition.currentLocation();
            let progress = Math.ceil(
              this.locations.percentageFromCfi(currentLocation.start.cfi) * 100
            );
            this.$refs.menuBar.onProgressInput(progress);
          }
        });
      }
    },
    resizeEpub() {
      const width = window.innerWidth;
      const height = window.innerHeight;
      this.rendition.resize(width, height);
      // this.rendition.destroy();
      // this.showEpub();
    },
    // 渲染 epub 檔案
    showEpub() {
      this.$store.commit(SETLOADING, true);
      // 生成 Ebook
      this.book = new Epub(DOWNLOAD_URL);
      // 生成 Rendtion
      this.rendition = this.book.renderTo("read", {
        width: "calc(100% - 15px)",
        height: "100vh",
      });
      this.rendition.display();
      this.themes = this.rendition.themes;
      this.setFontSize(this.defaultFontSize);
      // this.registerTheme();
      this.setTheme(this.defaultTheme);
      // 產生 epub 的 位置與導覽物件
      this.book.ready
        .then((chars) => {
          return this.book.locations.generate(chars);
        })
        .then(() => {
          this.navigation = this.book.navigation;
          this.locations = this.book.locations;
          window.addEventListener("resize", this.resizeEpub);
          this.bookAvailable = true;
          this.$store.commit(SETLOADING, false);
        })
        .catch(() => {
          this.$store.commit(SETLOADING, false);
          this.errorMsg = "對不起，目前無法閱覽";
        });
    },
  },

  mounted() {
    // const html = document.querySelector("html");
    // html.style.fontSize = "44px";
    this.showEpub();
  },

  beforeDestroy() {
    window.removeEventListener("resize", this.resizeEpub);
  },
};
</script>

<style scoped lang="scss">
.ebook {
  position: relative;
  overflow: hidden;

  &__error {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 300;
  }

  &__wrapper {
    width: 100%;
    height: 100%;
  }

  &__mask {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 100;
    display: flex;
  }

  &__left-area {
    height: 100%;
    flex: 0 0 2.5rem;
  }

  &__center-area {
    height: 100%;
    flex: 1;
  }

  &__right-area {
    height: 100%;
    flex: 0 0 2.5rem;
  }
}
</style>