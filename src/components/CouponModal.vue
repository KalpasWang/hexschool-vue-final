<template>
  <div>
    <transition name="overlay-fade">
      <div v-if="showModal" class="modal-overlay"></div>
    </transition>
    <transition name="modal-fade">
      <div
        v-if="showModal"
        class="modal d-block my-5 overflow-auto"
        tabindex="-1"
        role="dialog"
        aria-labelledby="couponModal"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content border-0">
            <div class="modal-header bg-dark text-white">
              <h5 class="modal-title">
                <span>新增優惠券</span>
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
                @click="hide"
              >
                <span class="text-light" aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="form-group">
                <label for="title">標題</label>
                <input
                  type="text"
                  class="form-control"
                  id="title"
                  v-model="tempCoupon.title"
                  placeholder="請輸入標題"
                />
              </div>
              <div class="form-group">
                <label for="coupon_code">優惠碼</label>
                <input
                  type="text"
                  class="form-control"
                  id="coupon_code"
                  v-model="tempCoupon.code"
                  placeholder="請輸入優惠碼"
                />
              </div>
              <div class="form-group">
                <label for="due_date">到期日</label>
                <input
                  type="date"
                  class="form-control"
                  id="due_date"
                  v-model="due_date"
                />
              </div>
              <div class="form-group">
                <label for="price">折扣百分比</label>
                <input
                  type="number"
                  class="form-control"
                  id="price"
                  v-model="tempCoupon.percent"
                  placeholder="請輸入折扣百分比"
                />
              </div>
              <div class="form-group">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    :true-value="1"
                    :false-value="0"
                    v-model="tempCoupon.is_enabled"
                    id="is_enabled"
                  />
                  <label class="form-check-label" for="is_enabled">
                    是否啟用
                  </label>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-outline-secondary"
                data-dismiss="modal"
                @click="hide"
              >
                取消
              </button>
              <button type="button" class="btn btn-primary" @click="emitResult">
                確認
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>


<script>
export default {
  name: "CouponModal",
  data() {
    return {
      showModal: false,
      tempCoupon: {
        due_date: (Date.now() / 1000).toFixed(0),
      },
    };
  },

  computed: {
    due_date: {
      get() {
        const dateAndTime = new Date(this.tempCoupon.due_date * 1000)
          .toISOString()
          .split("T");
        return dateAndTime[0];
      },
      set(val) {
        if (val instanceof Date) {
          this.tempCoupon.due_date = val;
        } else {
          this.tempCoupon.due_date = Math.floor(new Date(val) / 1000);
        }
      },
    },
  },

  methods: {
    show(item) {
      Object.assign(this.tempCoupon, item);
      console.log(item);
      console.log(this.tempCoupon);
      this.showModal = true;
    },

    hide() {
      // 還原為預設值
      this.tempCoupon = this.$options.data().tempCoupon;
      this.showModal = false;
    },

    emitResult() {
      console.log(this.tempCoupon);
      this.$emit("save", this.tempCoupon);
    },
  },
};
</script>

<style>
.overlay-fade-enter-active,
.overlay-fade-leave-active {
  transition: all 0.2s;
}

.overlay-fade-enter,
.overlay-fade-leave-active {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: all 0.4s;
}

.modal-fade-enter,
.modal-fade-leave-active {
  opacity: 0;
  transform: translateY(-20px);
}

.modal-overlay {
  position: fixed;
  box-sizing: border-box;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  z-index: 999;
  opacity: 1;
}
</style>
