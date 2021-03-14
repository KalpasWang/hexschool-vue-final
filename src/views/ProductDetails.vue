<template>
  <div class="container p-4">
    <div class="row p-3 shadow-sm bg-white">
      <div class="col-md-3">
        <img :src="product.image" class="w-100" alt="product image" />
      </div>
      <div class="col-md-9">
        <div class="relative">
          <h2 class="text-left">{{ product.title }}</h2>
          <p class="text-left">{{ product.category }}</p>
          <div class="buttons d-flex justify-content-end mt-5 p-2">
            <button class="btn btn-info rounded-pill mr-2">免費試閱</button>
            <button
              v-if="product.origin_price && product.price"
              class="btn btn-primary rounded-pill"
            >
              購物去：<del>{{ product.origin_price | currency }}</del>
              {{ product.price | currency }}
            </button>
            <button
              v-else-if="product.price"
              class="btn btn-primary rounded-pill"
            >
              購物去：{{ product.price | currency }}
            </button>
            <button
              v-else-if="product.origin_price"
              class="btn btn-primary rounded-pill"
            >
              購物去：{{ product.origin_price | currency }}
            </button>
          </div>
        </div>
      </div>
      <div class="pt-5 col-12 text-left">
        <h4 class="text-left mb-3">書籍簡介</h4>
        <pre class="description h6 font-weight-normal">{{
          product.description
        }}</pre>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      product: "productDetails",
      errorMsg: "productDetailsErrorMsg",
    }),
  },
  created() {
    console.log("details created");
    console.log(this.$route.params.id);
    this.$store.dispatch("fetchProductDetails", this.$route.params.id);
  },
};
</script>

<style scoped>
.buttons {
  position: absolute;
  bottom: 0;
  right: 0;
}

.description {
  white-space: pre-wrap;
}
</style>