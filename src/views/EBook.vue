<template>
  <div class="ebook">
    <e-book-title-bar :ifTitleAndMenuShow="ifTitleAndMenuShow" />
    <div class="read-wrapper">
      <div id="read"></div>
      <div class="mask">
        <div class="left" @click="prevPage"></div>
        <div class="center" @click="toggleTitleAndMenu"></div>
        <div class="right" @click="nextPage"></div>
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
</template>

<script>
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
      ifTitleAndMenuShow: false,
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
      themes: null,
      themeList: [
        {
          name: "default",
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
      defaultTheme: 0,
      // 图书是否是可用状态
      bookAvailable: false,
      navigation: {},
    };
  },

  methods: {
    // 目录链接跳转
    jumpTo(href) {
      this.rendition.display(href);
      this.hideTitleAndMenuShow();
    },
    hideTitleAndMenuShow() {
      // 隐藏标题栏和菜单栏
      this.ifTitleAndMenuShow = false;
      // 隐藏菜单弹出的设置栏
      this.$refs.menuBar.hideSetting();
      // 隐藏目录
      this.$refs.menuBar.hideContent();
    },
    // 进度条的数值 (0-100)
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
      // this.themeList.forEach((theme) => {
      //   this.rendition.themes.register(theme.name, theme.style);
      // });
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
      }
    },
    prevPage() {
      this.ifTitleAndMenuShow = false;
      if (this.rendition) {
        this.rendition.prev().then(() => {
          // 点击上一页,控制进度条变化
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
          // 点击上一页,控制进度条变化
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
    // 电子书的解析和渲染
    showEpub() {
      // 生成 Ebook
      this.book = new Epub(DOWNLOAD_URL);
      // 生成 Rendtion
      this.rendition = this.book.renderTo("read", {
        width: window.innerWidth,
        height: window.innerHeight,
      });
      // 通过 Rendtion.display 渲染电子书
      this.rendition.display();
      // 获取 Theme 对象
      this.themes = this.rendition.themes;
      // 设置默认字体
      this.setFontSize(this.defaultFontSize);
      // this.themes.register(name, styles)
      // this.themes.select(name)
      this.registerTheme();
      this.setTheme(this.defaultTheme);
      // 获取 Locations 对象
      // 通过 epubjs 的钩子函数来实现
      this.book.ready
        .then((chars) => {
          return this.book.locations.generate(chars);
        })
        .then(() => {
          this.navigation = this.book.navigation;
          this.locations = this.book.locations;
          this.bookAvailable = true;
        });
      // console.log(this.book.locations);
    },
  },

  mounted() {
    const html = document.querySelector("html");
    let fontSize = window.innerWidth / 10;
    fontSize = fontSize > 50 ? 50 : fontSize;
    html.style.fontSize = fontSize + "px";
    this.showEpub();
  },
};
</script>

<style scoped lang="sass">
@import "@/assets/scss/global"
.ebook
  position: relative
  overflow: hidden
  .read-wrapper
    width: 100%
    height: 100%
    .mask
      position: absolute
      top: 0
      left: 0
      right: 0
      bottom: 0
      z-index: 100
      display: flex
      // width: 100%
      // height: 100%
      .left
        height: 100%
        flex: 0 0 px2rem(100)
      .center
        height: 100%
        flex: 1
      .right
        height: 100%
        flex: 0 0 px2rem(100)
</style>