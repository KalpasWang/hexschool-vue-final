<template>
  <div class="container">
    <h2>產品列表</h2>
    <div class="row mt-4">
      <div v-if="allProductsMsg" class="h2 text-center text-danger mt-4">
        {{ allProductsMsg }}
      </div>
      <div
        class="col-md-4 col-sm-6 mb-4"
        v-else
        v-for="item in allProducts"
        :key="item.id"
      >
        <div class="card shadow-sm">
          <router-link
            class="card-img-top card-height bg-cover"
            :style="{ backgroundImage: `url(${item.image})` }"
            :to="{
              name: 'ProductDetailsSimulation',
              params: { id: item.id },
            }"
          >
          </router-link>
          <div class="card-body">
            <span class="badge bg-success fw-light p-1 float-end">
              {{ item.category }}
            </span>
            <h6 class="card-title">
              <router-link
                :to="{
                  name: 'ProductDetailsSimulation',
                  params: { id: item.id },
                }"
                class="h5 text-decoration-none text-dark"
              >
                {{ item.title }}
              </router-link>
            </h6>
            <p class="card-text">{{ item.content }}</p>
            <div
              class="d-flex justify-content-between align-content-center mt-5"
            >
              <div class="h-100">
                <div class="fs-5 align-middle" v-if="!item.origin_price">
                  {{ item.price | currency }}
                </div>
                <div v-else>
                  <del class="text-muted fs-7 fw-light">
                    {{ item.origin_price | currency }}
                  </del>
                  <span class="fs-5 align-middle ms-1">
                    {{ item.price | currency }}
                  </span>
                </div>
              </div>
              <button
                type="button"
                class="btn btn-primary btn-sm rounded-pill px-3 ml-auto"
                @click="addToCart(item.id)"
              >
                加入購物車
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "ProductsSimulation",
  data() {
    return {};
  },

  computed: {
    ...mapGetters(["allProducts", "allProductsMsg", "cartMsg", "cartMsgType"]),
  },

  methods: {
    async getProducts() {
      await this.$store.dispatch("fetchAllProducts");
      if (this.allProductsMsg) {
        this.$notify({
          group: "alert",
          title: this.allProductsMsg,
          type: "error",
        });
      }
    },
    async addToCart(id) {
      await this.$store.dispatch("postProductToCart", { id, qty: 1 });
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
    this.getProducts();
  },
};
</script>

<style scoped>
.card-height {
  height: 15rem;
}
</style>