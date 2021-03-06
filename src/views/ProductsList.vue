<template>
  <div class="py-2">
    <BookModal ref="bookModal" @save="updateProduct" />
    <h1
      class="display-4 d-flex justify-content-between align-items-center mb-4"
    >
      所有書籍
      <button @click="openModal({})" class="btn btn-primary">新增書籍</button>
    </h1>
    <div class="table-responsive">
      <table class="table table-hover shadow-sm vertical-align bg-white">
        <thead class="thead-light text-center">
          <th>圖片</th>
          <th>書籍類別</th>
          <th>書籍名稱</th>
          <th>原價</th>
          <th>優惠價</th>
          <th>是否啟用</th>
          <th>編輯</th>
        </thead>
        <tbody>
          <tr v-for="item in products" :key="item.id">
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
      v-if="totalPages > 1"
      class="mt-5"
      :pages="totalPages"
      :current="currentPage"
      :hasPrev="hasPrev"
      :hasNext="hasNext"
      @getPage="getProducts"
    />
  </div>
</template>

<script>
import BookModal from "@/components/BookModal";
import Pagination from "@/components/Pagination";
import { SETLOADING } from "@/store/modules/mutation-types";

export default {
  data() {
    return {
      products: [],
      totalPages: 1,
      currentPage: 1,
      hasPrev: false,
      hasNext: false,
    };
  },
  components: {
    BookModal,
    Pagination,
  },
  methods: {
    getProducts(page = 1) {
      this.$store.commit(SETLOADING, true);
      const path = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_API_PARAMS}/admin/products?page=${page}`;
      this.$http
        .get(path)
        .then((res) => {
          console.log(path, res.data);
          if (res.data.success) {
            this.products = res.data.products;
            if (res.data.pagination) {
              this.totalPages = res.data.pagination.total_pages;
              this.currentPage = res.data.pagination.current_page;
              this.hasPrev = res.data.pagination.has_pre;
              this.hasNext = res.data.pagination.has_next;
            }
          } else {
            this.$notify({
              group: "alert",
              title: "取得產品列表失敗",
              text: res.data.message,
              type: "error",
            });
          }
        })
        .catch((err) => {
          this.$notify({
            group: "alert",
            title: "無法取得產品列表",
            text: err.message,
            type: "error",
          });
        })
        .finally(() => {
          this.$store.commit(SETLOADING, false);
        });
    },

    openModal(item) {
      this.$refs.bookModal.show(item);
    },

    updateProduct(item) {
      // console.log(item);
      this.$store.commit(SETLOADING, true);
      let path = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_API_PARAMS}/admin/product`;
      let method = "post";
      const isNew = item.id ? false : true;
      const vm = this;
      if (!isNew) {
        path = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_API_PARAMS}/admin/product/${item.id}`;
        method = "put";
      }
      this.$http[method](path, { data: item })
        .then((res) => {
          // console.log(res.data);
          if (res.data.success) {
            vm.getProducts();
            this.$notify({
              group: "alert",
              title: "上傳成功",
              text: res.data.message,
              type: "success",
            });
          } else {
            this.$notify({
              group: "alert",
              title: "上傳失敗",
              text: res.data.message,
              type: "error",
            });
          }
        })
        .catch((err) => {
          this.$notify({
            group: "alert",
            title: "上傳失敗",
            text: err.message,
            type: "error",
          });
        })
        .finally(() => {
          vm.$refs.bookModal.hide();
          vm.$store.commit(SETLOADING, false);
        });
    },

    deleteProduct(item) {
      this.$store.commit(SETLOADING, true);
      const vm = this;
      let path = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_API_PARAMS}/admin/product/${item.id}`;
      console.log(item);
      const confirmResult = confirm(`確定要刪除 ${item.title} 這項產品嗎？`);
      if (!confirmResult) {
        return;
      }
      this.$http
        .delete(path)
        .then((res) => {
          console.log(res.data);
          if (res.data.success) {
            vm.getProducts();
            this.$notify({
              group: "alert",
              title: "刪除成功",
              text: res.data.message,
              type: "success",
            });
          } else {
            this.$notify({
              group: "alert",
              title: "刪除失敗",
              text: res.data.message,
              type: "error",
            });
          }
        })
        .catch((err) => {
          this.$notify({
            group: "alert",
            title: "刪除失敗",
            text: err.message,
            type: "error",
          });
        })
        .finally(() => {
          vm.$store.commit(SETLOADING, false);
        });
    },
  },

  created() {
    this.getProducts();
  },
};
</script>