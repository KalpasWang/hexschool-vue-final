<template>
  <transition name="slide-up">
    <div
      class="menu-bar container-md px-0 shadow z-200"
      v-show="ifTitleAndMenuShow"
    >
      <!-- 設定選單 -->
      <div
        class="z-200 w-100"
        :class="backgroundStyle"
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
                @change="setFontSize($event.target.value)"
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
              class="theme-box border rounded-lg flex-grow-1 pb-6 mx-2 btn"
              :class="{
                'border-primary': index === defaultTheme,
                'btn-light': themeList[index].name === 'light',
                'btn-dark': themeList[index].name === 'dark',
                'btn-gold': themeList[index].name === 'gold',
              }"
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
              v-model="progress"
              :disabled="!bookAvailable"
            />
          </div>
          <div class="text-lg align-middle ml-3">
            <span>{{ progress + "%" }}</span>
          </div>
        </div>
      </div>

      <!-- 主選單 -->
      <div
        class="z-200 d-flex w-100 shadow-sm"
        :class="backgroundStyle"
        v-show="ifTitleAndMenuShow"
      >
        <!-- 目錄按鈕 -->
        <div
          class="py-2 flex-grow-1 btn btn-lg rounded-0"
          :class="buttonStyle"
          @click="showSetting(3)"
        >
          <menu-icon class="icon-lg" size="4x"></menu-icon>
        </div>
        <!-- 進度條按鈕 -->
        <div
          class="py-2 flex-grow-1 btn btn-lg rounded-0"
          :class="buttonStyle"
          @click="showSetting(2)"
        >
          <git-commit-icon class="icon-lg" size="4x"></git-commit-icon>
        </div>
        <!-- 背景主題按鈕 -->
        <div
          class="py-2 flex-grow-1 btn btn-lg rounded-0"
          :class="buttonStyle"
          @click="showSetting(1)"
        >
          <sun-icon class="icon-lg" size="4x"></sun-icon>
        </div>
        <!-- 文字大小按鈕 -->
        <div
          class="py-2 flex-grow-1 btn btn-lg rounded-0"
          :class="buttonStyle"
          @click="showSetting(0)"
        >
          <type-icon class="icon-lg" size="4x"></type-icon>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
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
    MenuIcon,
    GitCommitIcon,
    SunIcon,
    TypeIcon,
    CheckIcon,
  },
  data() {
    return {
      ifSettingShow: false,
      showTag: 0,
      progress: 0,
      theme: null,
      inputText: {
        min: 16,
        max: 36,
        size: this.defaultFontSize,
      },
    };
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
    defaultFontSize: Number,
    themeList: Array,
    defaultTheme: Number,
    bookAvailable: Boolean,
    navigation: Object,
  },
  methods: {
    jumpTo(href) {
      this.$emit("jumpTo", href);
    },
    setProgress(progress) {
      this.progress = progress;
    },
    onProgressChange(progress) {
      this.progress = +progress;
      this.$emit("onProgressChange", progress);
    },
    setTheme(index) {
      this.theme = this.themeList[index];
      this.$emit("setTheme", index);
    },
    setFontSize(fontSize) {
      this.$emit("setFontSize", fontSize);
    },
    showSetting(tag) {
      this.showTag = tag;
      if (this.showTag === 3) {
        this.ifSettingShow = false;
        this.$emit("showToc");
      } else {
        this.ifSettingShow = true;
      }
    },
    hideSetting() {
      this.ifSettingShow = false;
    },
  },
  created() {
    this.theme = this.themeList[this.defaultTheme];
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
