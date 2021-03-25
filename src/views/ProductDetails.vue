<template>
  <div class="container p-4">
    <div
      v-cloak
      v-show="product.id === $route.params.id"
      class="row p-3 shadow-sm bg-white"
    >
      <div class="col-md-3">
        <img :src="product.image" class="w-100" alt="product image" />
      </div>
      <div class="col-md-9">
        <div class="book-group position-relative">
          <h2 class="text-left">{{ product.title }}</h2>
          <p class="text-left">{{ product.category }}</p>
          <div class="buttons">
            <router-link
              v-if="product.id"
              :to="{
                name: 'Preview',
                params: { id: product.id, title: product.title },
              }"
              class="btn btn-info rounded-pill mr-2"
            >
              免費試閱
            </router-link>
            <button
              v-if="product.origin_price && product.price"
              class="btn btn-primary rounded-pill"
            >
              購物去：<del class="text-light">{{
                product.origin_price | currency
              }}</del>
              <span class="h5">
                {{ product.price | currency }}
              </span>
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
      <div v-if="product.description" class="pt-5 col-12 text-left">
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
.book-group {
  min-height: 100px;
}
.buttons {
  position: absolute;
  right: 0;
  bottom: 0;
}

.description {
  white-space: pre-wrap;
  line-height: 1.5;
}

[v-cloak] {
  display: none;
}
</style>