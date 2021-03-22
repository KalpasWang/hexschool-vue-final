<template>
  <transition name="slide-up">
    <div
      class="menu-bar container-md px-0 shadow z-200"
      v-show="ifTitleAndMenuShow"
    >
      <!-- 設定選單 -->
      <div
        class="z-200 bg-light w-100"
        v-show="ifTitleAndMenuShow && ifSettingShow"
      >
        <!-- 設定文字大小 -->
        <div class="flex-center p-3" v-if="showTag === 0">
          <div
            class="flex-center align-middle pr-2"
            :style="{
              fontSize: inputText.size + 'px',
              width: '60px',
              height: '60px',
            }"
          >
            文
          </div>
          <div class="d-flex flex-grow-1">
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
        <div class="d-flex pt-2" v-if="showTag === 1">
          <!-- 排列背景顏色 -->
          <div
            class="flex-grow-1 d-flex flex-column"
            v-for="(item, index) in themeList"
            :key="index"
            @click="setTheme(index)"
          >
            <div
              class="theme-box border rounded-lg flex-grow-1 pb-6 mx-2"
              :class="{ 'border-primary': index === defaultTheme }"
              :style="{ background: item.style.body.background }"
            ></div>
            <div
              class="flex-center text-center text-md"
              :class="{
                'text-primary font-weight-bold': index === defaultTheme,
              }"
            >
              <span>{{ item.name }}</span>
              <check-icon v-if="index === defaultTheme" size="4x"></check-icon>
            </div>
          </div>
        </div>
        <!-- 設定進度 -->
        <div class="d-flex p-3" v-if="showTag === 2">
          <div class="flex-center flex-grow-1">
            <input
              class="form-control-range mb-0"
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
          <div class="text-lg align-middle ml-3">
            <span>{{ progress + "%" }}</span>
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

      <!-- 目錄物件 -->
      <e-book-toc
        :ifShowContent="ifShowContent"
        v-show="ifShowContent"
        :navigation="navigation"
        :bookAvailable="bookAvailable"
        @jumpTo="jumpTo"
      />
    </div>
  </transition>
</template>

<script>
import EBookToc from "@/components/EBookToc";
import {
  MenuIcon,
  GitCommitIcon,
  SunIcon,
  TypeIcon,
  CheckIcon,
} from "vue-feather-icons";

export default {
  name: "EBookMenuBar",
  components: {
    EBookToc,
    MenuIcon,
    GitCommitIcon,
    SunIcon,
    TypeIcon,
    CheckIcon,
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

.theme-box {
  border-width: 3px;

  &:hover {
    opacity: 0.8;
  }
}
</style>
