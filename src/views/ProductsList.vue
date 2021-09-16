<template>
  <div class="py-2">
    <ProductModal ref="productModal" @save="updateProduct" />
    <h1
      class="display-4 d-flex justify-content-between align-items-center mb-4"
    >
      產品列表
      <button @click="openModal({})" class="btn btn-primary">新增產品</button>
    </h1>
    <div class="table-responsive">
      <table class="table table-hover border border-secondary">
        <thead class="bg-secondary">
          <th scope="col">圖片</th>
          <th scope="col">產品類別</th>
          <th scope="col">產品名稱</th>
          <th scope="col">原價</th>
          <th scope="col">售價</th>
          <th scope="col">是否啟用</th>
          <th scope="col">編輯</th>
        </thead>
        <tbody>
          <tr v-for="item in adminProducts" :key="item.id">
            <td class="align-middle" width="72">
              <img class="img-fluid" :src="item.image" />
            </td>
            <td class="align-middle">{{ item.category }}</td>
            <td class="align-middle">{{ item.title }}</td>
            <td class="align-middle" width="72">
              {{ item.origin_price | currency }}
            </td>
            <td class="align-middle" width="72">{{ item.price | currency }}</td>
            <td class="align-middle" width="100">
              <span v-if="item.is_enabled" class="text-secondary">
                <i class="far fa-circle"></i>
              </span>
              <span v-else class="text-secondary">
                <i class="fas fa-times"></i>
              </span>
            </td>
            <td class="align-middle" width="150">
              <button
                class="btn btn-sm btn-outline-primary mr-1"
                @click="openModal(item)"
              >
                編輯
              </button>
              <button
                class="btn btn-sm btn-outline-danger"
                @click="deleteProduct(item)"
              >
                刪除
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <Pagination
      v-if="adminPagination.totalPages > 1"
      class="mt-5"
      :pages="adminPagination.totalPages"
      :current="adminPagination.currentPage"
      :hasPrev="adminPagination.hasPrev"
      :hasNext="adminPagination.hasNext"
      @getPage="getProducts"
    />
  </div>
</template>

<script>
import ProductModal from "@/components/ProductModal";
import Pagination from "@/components/Pagination";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "ProductsList",
  data() {
    return {};
  },
  components: {
    ProductModal,
    Pagination,
  },
  computed: {
    ...mapGetters([
      "adminProducts",
      "adminPagination",
      "adminProductsMsg",
      "adminProductsMsgType",
    ]),
  },
  methods: {
    ...mapActions(["startLoading", "endLoading"]),
    async getProducts(page = 1) {
      this.startLoading();
      await this.$store.dispatch("fetchAdminProducts", page);
      this.endLoading();
      if (this.adminProductsMsg) {
        this.$notify({
          group: "alert",
          title: "取得產品列表失敗",
          text: this.adminProductsMsg,
          type: this.adminProductsMsgType,
        });
      }
    },
    openModal(item) {
      this.$refs.productModal.show(item);
    },
    async updateProduct(item) {
      this.startLoading();
      await this.$store.dispatch("updateAdminProduct", item);
      this.$refs.productModal.hide();
      if (this.adminProductsMsg) {
        const title =
          this.adminProductsMsgType === "error" ? "上傳失敗" : "上傳成功";
        this.$notify({
          group: "alert",
          title: title,
          text: this.adminProductsMsg,
          type: this.adminProductsMsgType,
          duration: 2000,
        });
      }
      if (this.adminProductsMsgType === "success") {
        setTimeout(() => {
          this.getProducts(this.adminPagination.currentPage);
        }, 2000);
      }
      this.endLoading();
    },

    async deleteProduct(item) {
      const confirmResult = confirm(`確定要刪除 ${item.title} 這項產品嗎？`);
      if (!confirmResult) {
        return;
      }
      this.startLoading();
      await this.$store.dispatch("deleteAdminProduct", item);
      if (this.adminProductsMsg) {
        const title =
          this.adminProductsMsgType === "error" ? "刪除失敗" : "刪除成功";
        this.$notify({
          group: "alert",
          title: title,
          text: this.adminProductsMsg,
          type: this.adminProductsMsgType,
          duration: 2000,
        });
      }
      if (this.adminProductsMsgType === "success") {
        setTimeout(() => {
          this.getProducts(this.adminPagination.currentPage);
        }, 2000);
      }
      this.endLoading();
    },
  },

  created() {
    this.getProducts();
  },
};
</script>