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
            <div class="modal-header bg-secondary">
              <h5 class="modal-title">
                <span>新增產品</span>
              </h5>
              <button
                type="button"
                class="btn-close"
                data-dismiss="modal"
                aria-label="Close"
                @click="hide"
              ></button>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-sm-4">
                  <div class="mb-3">
                    <label class="form-label d-block">
                      輸入圖片網址
                      <input
                        type="text"
                        class="form-control"
                        v-model="tempProduct.image"
                        placeholder="請輸入圖片連結"
                      />
                    </label>
                  </div>
                  <div class="mb-3">
                    <label class="form-label d-block">
                      或 上傳圖片
                      <i v-if="uploadingImg" class="fas fa-spinner fa-spin"></i>
                      <input
                        type="file"
                        class="form-control"
                        ref="files"
                        @change="uploadImage"
                      />
                    </label>
                  </div>
                  <img
                    v-if="tempProduct.image"
                    img="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=828346ed697837ce808cae68d3ddc3cf&auto=format&fit=crop&w=1350&q=80"
                    class="img-fluid"
                    :src="tempProduct.image"
                    alt=""
                  />
                </div>
                <div class="col-sm-8">
                  <div class="mb-3">
                    <label class="form-label d-block">
                      標題
                      <input
                        type="text"
                        class="form-control"
                        v-model="tempProduct.title"
                        placeholder="請輸入標題"
                      />
                    </label>
                  </div>

                  <div class="row g-3">
                    <div class="mb-3 col-md-6">
                      <label class="form-label d-block">
                        分類
                        <input
                          type="text"
                          class="form-control"
                          v-model="tempProduct.category"
                          placeholder="請輸入分類"
                        />
                      </label>
                    </div>
                    <div class="mb-3 col-md-6">
                      <label class="form-label d-block">
                        單位
                        <input
                          type="text"
                          class="form-control"
                          v-model="tempProduct.unit"
                          placeholder="請輸入單位"
                        />
                      </label>
                    </div>
                  </div>

                  <div class="row g-3">
                    <div class="mb-3 col-md-6">
                      <label class="form-label d-block">
                        原價
                        <input
                          type="number"
                          class="form-control"
                          v-model="tempProduct.origin_price"
                          placeholder="請輸入原價"
                        />
                      </label>
                    </div>
                    <div class="mb-3 col-md-6">
                      <label class="form-label d-block">
                        售價
                        <input
                          type="number"
                          class="form-control"
                          v-model="tempProduct.price"
                          placeholder="請輸入售價"
                        />
                      </label>
                    </div>
                  </div>

                  <div class="mb-3">
                    <label class="form-label d-block">
                      產品描述
                      <textarea
                        type="text"
                        class="form-control"
                        v-model="tempProduct.description"
                        placeholder="請輸入產品描述"
                      ></textarea>
                    </label>
                  </div>
                  <div class="mb-3">
                    <label class="form-label d-block">
                      說明內容
                      <textarea
                        type="text"
                        class="form-control"
                        v-model="tempProduct.content"
                        placeholder="請輸入產品說明內容"
                      ></textarea>
                    </label>
                  </div>
                  <div class="mb-3">
                    <div class="form-check">
                      <label class="form-check-label">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          v-model="tempProduct.is_enabled"
                          :true-value="1"
                          :false-value="0"
                        />
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
  name: "ProductModal",
  data() {
    return {
      showModal: false,
      tempProduct: {},
      uploadingImg: false,
    };
  },
  methods: {
    show(item) {
      Object.assign(this.tempProduct, item);
      this.showModal = true;
    },

    hide() {
      // 還原為預設值
      this.tempProduct = this.$options.data().tempProduct;
      this.showModal = false;
    },

    emitResult() {
      this.$emit("save", this.tempProduct);
    },

    async uploadImage() {
      this.uploadingImg = true;
      // console.log(this);
      const uploadedFile = this.$refs.files.files[0];
      if (uploadedFile.size > 1024 * 1024) {
        this.$notify({
          group: "alert",
          title: "檔案必須小於 1MB",
          type: "error",
        });
        this.uploadingImg = false;
        return;
      }
      if (!uploadedFile.type.match("image/.+")) {
        this.$notify({
          group: "alert",
          title: "Content type 必須是 image",
          type: "error",
        });
        this.uploadingImg = false;
        return;
      }
      if (uploadedFile.name < 32) {
        this.$notify({
          group: "alert",
          title: "檔案名稱長度小於32",
          type: "error",
        });
        this.uploadingImg = false;
        return;
      }
      try {
        const path = `${this.$apiPath}/api/${this.$apiParams}/admin/upload`;
        const formData = new FormData();
        formData.append("file-to-upload", uploadedFile);
        const res = await this.$http.post(path, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log(res.data);
        if (res.data.success) {
          this.$set(this.tempProduct, "image", res.data.imageUrl);
          this.uploadingImg = false;
          this.$notify({
            group: "alert",
            title: res.data.message,
            type: "success",
          });
        } else {
          throw new Error(res.data.message);
        }
      } catch (error) {
        this.uploadingImg = false;
        this.$notify({
          group: "alert",
          title: error.message,
          type: "error",
        });
      }
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
