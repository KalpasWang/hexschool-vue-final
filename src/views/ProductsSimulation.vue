<template>
  <div class="container">
    <div class="row mt-4">
      <div v-if="allProductsErrorMsg.length > 0">{{ allProductsErrotMsg }}</div>
      <div
        class="col-md-4 col-sm-6 mb-4"
        v-else
        v-for="item in allProducts"
        :key="item.id"
      >
        <div class="card shadow-sm rounded-0">
          <div class="card-imageContainer">
            <div
              class="card-image"
              :style="{ backgroundImage: `url(${item.image})` }"
            >
              <router-link
                class="card-imageOverlay"
                :to="{
                  name: 'ProductDetailsSimulation',
                  params: { id: item.id },
                }"
              ></router-link>
            </div>
          </div>
          <div class="card-body">
            <span class="badge badge-success font-weight-light p-1 float-right">
              {{ item.category }}
            </span>
            <h6 class="card-title text-left">
              <router-link
                :to="{
                  name: 'ProductDetailsSimulation',
                  params: { id: item.id },
                }"
                class="text-dark"
              >
                {{ item.title }}
              </router-link>
            </h6>
            <p class="card-text">{{ item.content }}</p>
            <div class="d-flex mt-5">
              <div class="d-flex align-items-center">
                <div class="font-bold" v-if="!item.price">
                  {{ item.origin_price | currency }}
                </div>
                <del class="text-muted d-block" v-if="item.price">
                  {{ item.origin_price | currency }}
                </del>
                <div class="font-bold ml-1 mb-0" v-if="item.price">
                  {{ item.price | currency }}
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
      this.$store.dispatch("postProductToCart", id);
    },
  },

  created() {
    this.getProducts();
  },
};
</script>

<style scoped>
.card {
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
}
</style>