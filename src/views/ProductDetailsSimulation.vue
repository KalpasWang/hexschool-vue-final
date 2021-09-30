<template>
  <div class="container p-4">
    <div v-if="productDetailsErrorMsg">{{ productDetailsErrorMsg }}</div>
    <div
      v-else
      v-cloak
      v-show="productDetails.id === $route.params.id"
      class="row p-3 shadow-sm bg-white"
    >
      <div class="col-md-3">
        <img :src="productDetails.image" class="w-100" alt="product image" />
      </div>
      <div class="col-md-9">
        <div class="product-group position-relative">
          <h2 class="text-start">{{ productDetails.title }}</h2>
          <p class="text-start">
            <span class="badge bg-secondary">{{
              productDetails.category
            }}</span>
          </p>
          <div class="text-start">
            <p class="h6" v-if="!productDetails.origin_price">
              {{ productDetails.price | currency }}
            </p>
            <p v-else>
              <del class="text-muted fw-light">
                {{ productDetails.origin_price | currency }}
              </del>
              <span class="h6 ms-1">
                {{ productDetails.price | currency }}
              </span>
            </p>
          </div>
          <div class="text-end">
            <label for="amount" class="me-3 mb-0 align-middle">
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
              @click="addToCart(productDetails.id, qty)"
            >
              加入購物車
            </button>
          </div>
        </div>
      </div>
      <div v-if="productDetails.description" class="pt-5 col-12 text-start">
        <h4 class="text-start mb-3">商品簡介</h4>
        <pre class="description h6 fw-normal">
          {{ productDetails.description }}
        </pre>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  name: "ProductDetailsSimulation",
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
      if (this.cartMsg) {
        this.$notify({
          group: "alert",
          title: this.cartMsg,
          type: this.cartMsgType,
        });
      }
      if (this.cartMsgType === "success") {
        this.$store.dispatch("getCart");
      }
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
.product-group {
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