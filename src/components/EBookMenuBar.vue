<template>
  <transition name="slide-up">
    <div class="menu-bar z-200" v-show="ifTitleAndMenuShow">
      <!-- 設定選單 -->
      <div
        class="z-200 bg-white w-100 shadow-sm"
        v-show="ifTitleAndMenuShow && ifSettingShow"
      >
        <!-- 設定文字大小 -->
        <div
          class="flex-center p-2"
          v-show="showTag === 0"
          :fontSizeList="fontSizeList"
        >
          <div
            class="flex-center align-middle px-2"
            :style="{ fontSize: inputText.min + 'px' }"
          >
            字
          </div>
          <div
            class="flex-center align-middle pr-4"
            :style="{ fontSize: inputText.max + 'px' }"
          >
            字
          </div>
          <div class="d-flex flex-grow-1 mx-3">
            <div class="flex-center flex-grow-1">
              <input
                type="range"
                class="form-control-range mb-0"
                :max="inputText.max"
                :min="inputText.min"
                step="1"
                v-model="inputText.size"
              />
              <label class="text-lg mb-0 align-middle ml-3">
                {{ inputText.size }}
              </label>
            </div>
          </div>
        </div>
        <!-- 設定背景主題 -->
        <div class="setting-theme" v-show="showTag === 1">
          <div
            class="setting-theme-item"
            v-for="(item, index) in themeList"
            :key="index"
            @click="setTheme(index)"
          >
            <div
              class="preview"
              :style="{ background: item.style.body.background }"
              :class="{ 'no-border': item.style.body.background !== '#fff' }"
            ></div>
            <div class="text" :class="{ selected: index === defaultTheme }">
              {{ item.name }}
            </div>
          </div>
        </div>
        <!-- 設定進度 -->
        <div class="setting-progress" v-show="showTag === 2">
          <div class="progress-wrapper">
            <input
              class="progress"
              type="range"
              max="100"
              min="0"
              step="1"
              @change="onProgressChange($event.target.value)"
              @input="onProgressInput($event.target.value)"
              v-model="progress"
              :disabled="!bookAvailable"
              ref="progress"
            />
          </div>
          <div class="text-wrapper">
            <span>{{ bookAvailable ? progress + "%" : "讀取中..." }}</span>
          </div>
        </div>
      </div>

      <!-- 主選單 -->
      <div
        class="z-200 d-flex bg-light w-100 shadow-sm"
        v-show="ifTitleAndMenuShow"
      >
        <!-- 目錄按鈕 -->
        <div
          class="py-2 flex-grow-1 btn btn-light btn-lg rounded-0"
          @click="showSetting(3)"
        >
          <menu-icon class="icon-lg" size="4x"></menu-icon>
        </div>
        <!-- 進度條按鈕 -->
        <div
          class="py-2 flex-grow-1 btn btn-light btn-lg rounded-0"
          @click="showSetting(2)"
        >
          <git-commit-icon class="icon-lg" size="4x"></git-commit-icon>
        </div>
        <!-- 背景主題按鈕 -->
        <div
          class="py-2 flex-grow-1 btn btn-light btn-lg rounded-0"
          @click="showSetting(1)"
        >
          <sun-icon class="icon-lg" size="4x"></sun-icon>
        </div>
        <!-- 文字大小按鈕 -->
        <div
          class="py-2 flex-grow-1 btn btn-light btn-lg rounded-0"
          @click="showSetting(0)"
        >
          <type-icon class="icon-lg" size="4x"></type-icon>
        </div>
      </div>

      <e-book-toc
        :ifShowContent="ifShowContent"
        v-show="ifShowContent"
        :navigation="navigation"
        :bookAvailable="bookAvailable"
        @jumpTo="jumpTo"
      />
      <transition name="fade">
        <div
          class="content-mask"
          v-show="ifShowContent"
          @click="hideContent"
        ></div>
      </transition>
    </div>
  </transition>
</template>

<script>
import EBookToc from "@/components/EBookToc";
import { MenuIcon, GitCommitIcon, SunIcon, TypeIcon } from "vue-feather-icons";

export default {
  name: "EBookMenuBar",
  components: {
    EBookToc,
    MenuIcon,
    GitCommitIcon,
    SunIcon,
    TypeIcon,
  },
  data() {
    return {
      ifSettingShow: false,
      ifShowContent: false,
      showTag: 0,
      progress: 0,
      inputText: {
        min: 16,
        max: 36,
        size: this.defaultFontSize,
      },
    };
  },
  props: {
    ifTitleAndMenuShow: {
      type: Boolean,
      default: false,
    },
    fontSizeList: Array,
    defaultFontSize: Number,
    themeList: Array,
    defaultTheme: Number,
    bookAvailable: Boolean,
    navigation: Object,
  },
  methods: {
    hideContent() {
      this.ifShowContent = false;
    },
    jumpTo(href) {
      this.$emit("jumpTo", href);
    },
    onProgressInput(progress) {
      this.progress = progress;
      this.$refs.progress.style.backgroundSize = `${this.progress % 100}%`;
    },
    onProgressChange(progress) {
      this.$emit("onProgressChange", progress);
    },
    setTheme(index) {
      this.$emit("setTheme", index);
    },
    setFontSize(fontSize) {
      this.$emit("setFontSize", fontSize);
    },
    showSetting(tag) {
      this.showTag = tag;
      if (this.showTag === 3) {
        this.ifSettingShow = false;
        this.ifShowContent = true;
      } else {
        this.ifSettingShow = true;
      }
    },
    hideSetting() {
      this.ifSettingShow = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.menu-bar {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>

.menu-bar
  .menu-wrapper
    position: absolute
    bottom: 0
    left: 0
    z-index: 101
    display: flex
    width: 100%
    background: white
    &.hide-box-shadow
      box-shadow: none
    .icon-wrapper
      flex: 1
      @include center()
      .icon
        font-size: 44px
      // .icon-progress
      //   font-size: px2rem(28)
      // .icon-bright
      //   font-size: px2rem(24)
  .setting-wrapper
    position: absolute
    bottom: px2rem(48)
    left: 0
    z-index: 101
    width: 100%
    height: px2rem(60)
    box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, .15)
    background: white
    .setting-font-size
      display: flex
      height: 100%
      .preview
        flex: 0 0 px2rem(40)
        @include center
      .select
        display: flex
        flex: 1
        .select-wrapper
          flex: 1
          display: flex
          align-items: center
          &:first-child
            .line
              &:first-child
                border-top: none
            .point-wrapper
              border-left: none
          &:last-child
            .line
              &:last-child
                border-top: none
            .point-wrapper
              border-left: none
          .line
            flex: 1
            height: 0
            justify-content: center
            border-top: px2rem(1) solid #ccc
          .point-wrapper
            position: relative
            flex: 0 0 0
            width: 0
            height: px2rem(7)
            border-left: px2rem(1) solid #ccc
            .point
              position: absolute
              top: px2rem(-8)
              left: px2rem(-10)
              width: px2rem(20)
              height: px2rem(20)
              border-radius: 50%
              background: white
              border: px2rem(1) solid #ccc
              box-shadow: 0 px2rem(4) px2rem(4) rgba(0, 0, 0, .15)
              @include center
              .small-point
                width: px2rem(5)
                height: px2rem(5)
                background: black
                border-radius: 50%
    .setting-theme
      height: 100%
      display: flex
      .setting-theme-item
        flex: 1
        display: flex
        flex-direction: column
        padding: px2rem(5)
        box-sizing: border-box
        .preview
          flex: 1
          border: px2rem(1) solid #ccc
          box-sizing: border-box
          &.no-border
            border: none
        .text
          flex: 0 0 px2rem(20)
          font-size: px2rem(11)
          color: #ccc
          @include center
          &.selected
            color: #333
    .setting-progress
      position: relative
      width: 100%
      height: 100%
      .progress-wrapper
        width: 100%
        height: 100%
        @include center
        padding: 0 px2rem(30)
        box-sizing: border-box
        .progress
          width: 100%
          -webkit-appearance: none
          outline: none
          height: px2rem(2)
          background: -webkit-linear-gradient(#999, #999) no-repeat, #ddd
          background-size: 0 100%
          &.focus
            outline: none
          &::-webkit-slider-thumb
            -webkit-appearance: none
            height: px2rem(20)
            width: px2rem(20)
            border-radius: 50%
            background: white
            box-shadow: 0 4px 4px 0 rgba(0, 0, 0, .15)
            border: px2rem(1) solid #ddd
      .text-wrapper
        position: absolute
        width: 100%
        height: 10%
        top: px2rem(50)
        @include center
        font-size: px2rem(12)
    .content-mask
      position: absolute
      top: 0
      left: 0
      z-index: 101
      display: flex
      width: 100%
      height: 100%
      background: rgba(51, 51, 51, .8)
