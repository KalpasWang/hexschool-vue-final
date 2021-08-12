<template>
  <div class="container">
    <h2>產品列表</h2>
    <div class="row mt-4">
      <div v-if="allProductsErrorMsg">{{ allProductsErrotMsg }}</div>
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
    ...mapGetters(["allProducts", "allProductsErrorMsg"]),
  },

  methods: {
    getProducts() {
      this.$store.dispatch("fetchAllProducts");
    },
    addToCart(id) {
      this.$store.dispatch("postProductToCart", { id, qty: 1 });
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
/* .card {
  border-right: 0;
  border-left: 0;
  border-top: 0;
  border-bottom: 1px solid rgba(62, 101, 119, 0.18);
  transition: all 0.25s linear;
  overflow: hidden;
}
.card:hover {
  box-shadow: 0 0 2rem rgba(0, 0, 0, 0.3) !important;
  border-bottom: 0;
}

.card-imageContainer {
  padding-bottom: 100%;
  position: relative;
  overflow: hidden;
}

.card-image {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  transition: all 0.25s ease-in-out;
}

.card-imageOverlay {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  transition: all 0.25s ease-in-out;
}

.card-imageContainer:hover .card-image {
  transform: scale(1.1);
}

.card-imageContainer:hover .card-imageOverlay {
  background-color: rgba(0, 0, 0, 0.6);
} */
</style>