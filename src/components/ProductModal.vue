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
                      v-model="tempProduct.image"
                      placeholder="請輸入圖片連結"
                    />
                  </div>
                  <div class="form-group">
                    <label for="customFile">
                      或 上傳圖片
                      <i v-if="uploadingImg" class="fas fa-spinner fa-spin"></i>
                    </label>
                    <input
                      type="file"
                      id="customFile"
                      class="form-control"
                      ref="files"
                      @change="uploadImage"
                    />
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
                  <div class="form-group">
                    <label for="title">標題</label>
                    <input
                      type="text"
                      class="form-control"
                      id="title"
                      v-model="tempProduct.title"
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
                        v-model="tempProduct.category"
                        placeholder="請輸入分類"
                      />
                    </div>
                    <div class="form-group col-md-6">
                      <label for="price">單位</label>
                      <input
                        type="unit"
                        class="form-control"
                        id="unit"
                        v-model="tempProduct.unit"
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
                        v-model="tempProduct.origin_price"
                        placeholder="請輸入原價"
                      />
                    </div>
                    <div class="form-group col-md-6">
                      <label for="price">售價</label>
                      <input
                        type="number"
                        class="form-control"
                        id="price"
                        v-model="tempProduct.price"
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
                      v-model="tempProduct.description"
                      placeholder="請輸入產品描述"
                    ></textarea>
                  </div>
                  <div class="form-group">
                    <label for="content">說明內容</label>
                    <textarea
                      type="text"
                      class="form-control"
                      id="content"
                      v-model="tempProduct.content"
                      placeholder="請輸入產品說明內容"
                    ></textarea>
                  </div>
                  <div class="form-group">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        v-model="tempProduct.is_enabled"
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

    uploadImage() {
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
      const vm = this;
      const path = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_API_PARAMS}/admin/upload`;
      const formData = new FormData();
      formData.append("file-to-upload", uploadedFile);
      this.$http
        .post(path, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          // console.log(res.data);
          if (res.data.success) {
            vm.$set(vm.tempProduct, "image", res.data.imageUrl);
            vm.uploadingImg = false;
            this.$notify({
              group: "alert",
              title: "上傳成功",
              type: "success",
            });
          }
        })
        .catch((err) => {
          vm.uploadingImg = false;
          this.$notify({
            group: "alert",
            title: "上傳失敗",
            text: err.message,
            type: "error",
          });
        });
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
