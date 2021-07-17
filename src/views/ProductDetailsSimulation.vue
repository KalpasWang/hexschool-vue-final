<template>
  <div class="container p-4">
    <div v-if="errorMsg.length > 0">{{ errorMsg }}</div>
    <div
      v-else
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
          <div class="text-left">
            <p class="h6" v-if="!product.origin_price">
              {{ product.price | currency }}
            </p>
            <p v-else>
              <del class="text-muted font-weight-light">
                {{ product.origin_price | currency }}
              </del>
              <span class="h6 ml-1">
                {{ product.price | currency }}
              </span>
            </p>
          </div>
          <div class="text-right">
            <label for="amount" class="mr-3 mb-0 align-middle">
              數量：
              <select v-model="qty">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option>8</option>
                <option>9</option>
              </select>
            </label>
            <button
              class="btn btn-primary rounded-pill"
              @click="addToCart(product.id, qty)"
            >
              加入購物車
            </button>
          </div>
        </div>
      </div>
      <div v-if="product.description" class="pt-5 col-12 text-left">
        <h4 class="text-left mb-3">商品簡介</h4>
        <pre class="description h6 font-weight-normal">
          {{ product.description }}
        </pre>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      qty: 1,
    };
  },
  computed: {
    ...mapGetters([
      "productDetails",
      "productDetailsErrorMsg",
      "cartMsg",
      "cartMsgType",
    ]),
  },
  methods: {
    async addToCart(id, qty) {
      await this.$store.dispatch("postProductToCart", { id, qty });
    },
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
.cart {
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