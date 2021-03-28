<template>
  <div class="ebook container-fluid">
    <div
      v-if="errorMsg.length > 0"
      class="ebook__error z-300 bg-white d-flex justify-content-center align-items-center"
    >
      {{ errorMsg }}
    </div>
    <div class="row">
      <e-book-title-bar
        :ifTitleAndMenuShow="ifTitleAndMenuShow"
        :title="title"
        :id="id"
        :theme="themeList[defaultTheme]"
      />
      <div class="w-100 h-100">
        <div id="read"></div>
        <div class="ebook__mask d-flex z-100">
          <div class="ebook__left-area h-100" @click="prevPage"></div>
          <div
            class="ebook__center-area h-100"
            @click="toggleTitleAndMenu"
          ></div>
          <div class="ebook__right-area h-100" @click="nextPage"></div>
        </div>
      </div>
      <e-book-menu-bar
        :ifTitleAndMenuShow="ifTitleAndMenuShow"
        :defaultFontSize="defaultFontSize"
        :themeList="themeList"
        :defaultTheme="defaultTheme"
        :bookAvailable="bookAvailable"
        :navigation="navigation"
        @showToc="showToc"
        @setFontSize="setFontSize"
        @setTheme="setTheme"
        @onProgressChange="onProgressChange"
        @jumpTo="jumpTo"
        ref="menuBar"
      />
    </div>
    <!-- 目錄物件 -->
    <e-book-toc
      v-show="ifShowContent"
      :toc="toc"
      :navigation="navigation"
      :theme="themeList[defaultTheme]"
      :bookAvailable="bookAvailable"
      @jumpTo="jumpTo"
    />
  </div>
</template>

<script>
import { SET_LOADING } from "@/store/modules/mutation-types";
import EBookTitleBar from "@/components/EBookTitleBar";
import EBookMenuBar from "@/components/EBookMenuBar";
import EBookToc from "@/components/EBookToc";
import Epub from "epubjs";
const DOWNLOAD_URL = "/static/content3.epub";

export default {
  name: "Ebook",
  components: {
    EBookMenuBar,
    EBookTitleBar,
    EBookToc,
  },
  props: ["title", "id"],

  data() {
    return {
      book: null,
      rendition: null,
      locations: null,
      navigation: null,
      toc: null,
      ifTitleAndMenuShow: false,
      ifShowContent: false,
      errorMsg: "",
      bookAvailable: false,
      defaultFontSize: 20,
      defaultTheme: 0,
      themes: null,
      themeList: [
        {
          name: "light",
          style: {
            body: {
              color: "#000",
              background: "#eef2f6",
            },
          },
        },
        {
          name: "dark",
          style: {
            body: {
              color: "#eef2f6",
              background: "#212529",
            },
          },
        },
        {
          name: "gold",
          style: {
            body: {
              color: "#000",
              background: "#f1dfcf",
            },
          },
        },
      ],
    };
  },

  methods: {
    showToc() {
      this.ifShowContent = true;
    },
    // 跳轉到指定的位置
    jumpTo(href) {
      this.rendition.display(href);
      this.hideTitleAndMenuShow();
    },
    hideTitleAndMenuShow() {
      this.ifTitleAndMenuShow = false;
      this.ifShowContent = false;
      this.$refs.menuBar.hideSetting();
    },
    // progress bar 的數值 (0-100)
    onProgressChange(progress) {
      const percentage = progress / 100;
      let location =
        percentage > 0 ? this.locations.cfiFromPercentage(percentage) : 0;
      if (percentage === 1) {
        location = this.locations.cfiFromLocation(this.locations.total - 1);
      }
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
        this.ifShowContent = false;
      }
    },
    prevPage() {
      this.ifTitleAndMenuShow = false;
      if (this.ifShowContent) {
        this.ifShowContent = false;
      } else if (this.rendition) {
        this.rendition.prev().then(() => {
          // 控制 progress bar 往後
          if (this.locations) {
            const currentLocation = this.rendition.currentLocation();
            let progress = Math.ceil(
              this.locations.percentageFromCfi(currentLocation.start.cfi) * 100
            );
            this.$refs.menuBar.setProgress(progress);
          }
        });
      }
    },
    nextPage() {
      this.ifTitleAndMenuShow = false;
      if (this.ifShowContent) {
        this.ifShowContent = false;
      } else if (this.rendition) {
        this.rendition.next().then(() => {
          // 控制 progress bar 往前
          if (this.locations) {
            const currentLocation = this.rendition.currentLocation();
            let progress = Math.ceil(
              this.locations.percentageFromCfi(currentLocation.start.cfi) * 100
            );
            this.$refs.menuBar.setProgress(progress);
          }
        });
      }
    },
    resizeEpub() {
      const width = window.innerWidth;
      const height = window.innerHeight;
      this.rendition.resize(width, height);
    },
    // 渲染 epub 檔案
    showEpub() {
      this.$store.commit(SET_LOADING, true);
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
        .then(() => {
          return this.book.locations.generate();
        })
        .then(() => {
          return this.book.loaded.navigation;
        })
        .then(({ toc }) => {
          this.toc = toc;
          this.navigation = this.book.navigation;
          this.locations = this.book.locations;
          window.addEventListener("resize", this.resizeEpub);
          this.bookAvailable = true;
          this.$store.commit(SET_LOADING, false);
        })
        .catch(() => {
          this.$store.commit(SET_LOADING, false);
          this.errorMsg = "無法開啟此書";
        });
    },
  },

  mounted() {
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
  }

  &__mask {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  &__left-area {
    flex: 0 0 20%;
  }

  &__center-area {
    flex: 1;
  }

  &__right-area {
    flex: 0 0 20%;
  }
}
</style>