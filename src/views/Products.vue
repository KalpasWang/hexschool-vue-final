<template>
  <div>
    <BookModal ref="bookModal" @save="updateProduct" />
    <h1
      class="display-4 d-flex justify-content-between align-items-center my-4"
    >
      所有書籍
      <button @click="openModal({})" class="btn btn-primary">新增書籍</button>
    </h1>
    <div class="table-responsive">
      <table class="table table-hover vertical-align">
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
            <td class="align-middle" width="72">{{ item.origin_price }}</td>
            <td class="align-middle" width="72">{{ item.price }}</td>
            <td class="align-middle" width="100">
              <span v-if="item.is_enabled" class="text-success">是</span>
              <span v-else class="text-secondary">否</span>
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
  </div>
</template>

<script>
import BookModal from "@/components/BookModal";

export default {
  name: "Products",
  data() {
    return {
      products: [],
    };
  },
  components: {
    BookModal,
  },
  methods: {
    getProducts() {
      const path = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_API_PARAMS}/admin/products/all`;
      this.$http.get(path).then((res) => {
        console.log(path, res.data);
        if (res.data.success) {
          this.products = Object.values(res.data.products).reverse();
        }
      });
    },

    openModal(item) {
      this.$refs.bookModal.show(item);
    },

    updateProduct(item) {
      console.log(item);
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
          console.log(res.data);
          if (res.data.success) {
            vm.getProducts();
          } else {
            console.log("編輯失敗：", res.data);
          }
          vm.$refs.bookModal.hide();
        })
        .catch((err) => {
          console.log("Error: ", err);
          vm.$refs.bookModal.hide();
        });
    },

    deleteProduct(item) {
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
          } else {
            console.log("刪除失敗");
          }
          vm.$refs.bookModal.hide();
        })
        .catch((err) => {
          console.log(err);
          console.log("刪除失敗");
          vm.$refs.bookModal.hide();
        });
    },
  },

  created() {
    this.getProducts();
  },
};
</script>