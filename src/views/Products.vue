<template>
  <div>
    <h1
      class="display-4 d-flex justify-content-between align-items-center my-4"
    >
      所有書籍
      <button @click="openModal" class="btn btn-primary">新增書籍</button>
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
              <button class="btn btn-sm btn-outline-primary mr-1">編輯</button>
              <button class="btn btn-sm btn-outline-danger">刪除</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "Products",
  data() {
    return {
      products: [],
    };
  },
  methods: {
    getProducts() {
      const path = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_API_PARAMS}/admin/products`;
      this.$http.get(path).then((res) => {
        console.log(path, res.data);
        if (res.data.success) {
          this.products = res.data.products;
        }
      });
    },

    openModal() {},
  },

  created() {
    this.getProducts();
  },
};
</script>