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
        aria-labelledby="bookModal"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content border-0">
            <div class="modal-header bg-dark text-white">
              <h5 class="modal-title">
                <span>新增產品</span>
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
              <div class="row">
                <div class="col-sm-4">
                  <div class="form-group">
                    <label for="image">輸入圖片網址</label>
                    <input
                      type="text"
                      class="form-control"
                      id="image"
                      v-model="tempBook.imageUrl"
                      placeholder="請輸入圖片連結"
                    />
                  </div>
                  <div class="form-group">
                    <label for="customFile"
                      >或 上傳圖片
                      <i class="fas fa-spinner fa-spin"></i>
                    </label>
                    <input
                      type="file"
                      id="customFile"
                      class="form-control"
                      ref="files"
                    />
                  </div>
                  <img
                    img="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=828346ed697837ce808cae68d3ddc3cf&auto=format&fit=crop&w=1350&q=80"
                    class="img-fluid"
                    :src="tempBook.imageUrl"
                    alt=""
                  />
                </div>
                <div class="col-sm-8">
                  <div class="form-group">
                    <label for="title">標題</label>
                    <input
                      type="text"
                      class="form-control"
                      id="title"
                      v-model="tempBook.title"
                      placeholder="請輸入標題"
                    />
                  </div>

                  <div class="form-row">
                    <div class="form-group col-md-6">
                      <label for="category">分類</label>
                      <input
                        type="text"
                        class="form-control"
                        id="category"
                        v-model="tempBook.category"
                        placeholder="請輸入分類"
                      />
                    </div>
                    <div class="form-group col-md-6">
                      <label for="price">單位</label>
                      <input
                        type="unit"
                        class="form-control"
                        id="unit"
                        v-model="tempBook.unit"
                        placeholder="請輸入單位"
                      />
                    </div>
                  </div>

                  <div class="form-row">
                    <div class="form-group col-md-6">
                      <label for="origin_price">原價</label>
                      <input
                        type="number"
                        class="form-control"
                        id="origin_price"
                        v-model="tempBook.origin_price"
                        placeholder="請輸入原價"
                      />
                    </div>
                    <div class="form-group col-md-6">
                      <label for="price">售價</label>
                      <input
                        type="number"
                        class="form-control"
                        id="price"
                        v-model="tempBook.price"
                        placeholder="請輸入售價"
                      />
                    </div>
                  </div>
                  <hr />

                  <div class="form-group">
                    <label for="description">產品描述</label>
                    <textarea
                      type="text"
                      class="form-control"
                      id="description"
                      v-model="tempBook.description"
                      placeholder="請輸入產品描述"
                    ></textarea>
                  </div>
                  <div class="form-group">
                    <label for="content">說明內容</label>
                    <textarea
                      type="text"
                      class="form-control"
                      id="content"
                      v-model="tempBook.content"
                      placeholder="請輸入產品說明內容"
                    ></textarea>
                  </div>
                  <div class="form-group">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        v-model="tempBook.is_enabled"
                        :true-value="1"
                        :false-value="0"
                        id="is_enabled"
                      />
                      <label class="form-check-label" for="is_enabled">
                        是否啟用
                      </label>
                    </div>
                  </div>
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
  name: "BookModal",
  props: ["item"],
  data() {
    return {
      showModal: false,
      tempBook: {},
    };
  },

  created() {
    if (this.item) {
      this.data = this.item;
    }
  },

  methods: {
    show() {
      this.showModal = true;
    },

    hide() {
      // 還原為預設值
      this.tempBook = this.$options.data().tempBook;
      this.showModal = false;
    },

    emitResult() {
      this.$emit("save", this.tempBook);
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
