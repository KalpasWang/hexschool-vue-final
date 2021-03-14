<template>
  <div class="container">
    <Sorting />
    <div class="row mt-5">
      <div
        class="col-md-4 col-sm-6 mb-4"
        v-for="item in products"
        :key="item.id"
      >
        <div class="card shadow-sm rounded-0">
          <div class="card-imageContainer">
            <router-link
              class="card-image"
              :style="{ backgroundImage: `url(${item.image})` }"
              :to="{ name: 'ProductDetails', params: { id: item.id } }"
            ></router-link>
          </div>
          <div class="card-body">
            <span class="badge badge-success font-weight-light p-1 float-right">
              {{ item.category }}
            </span>
            <h6 class="card-title text-left">
              <router-link
                :to="{ name: 'ProductDetails', params: { id: item.id } }"
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
              >
                <i
                  v-if="item.id === selectedItemId"
                  class="fas fa-spinner fa-spin"
                ></i>
                加入購物車
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Pagination
      v-if="pagination.totalPages > 1"
      class="mt-5"
      :pages="pagination.totalPages"
      :current="pagination.currentPage"
      :hasPrev="pagination.hasPrev"
      :hasNext="pagination.hasNext"
      @getPage="getProducts"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Sorting from "@/components/Sorting";
import Pagination from "@/components/Pagination";

export default {
  data() {
    return {
      loading: false,
      selectedItemId: "",
    };
  },

  computed: {
    ...mapGetters(["products", "pagination", "productsErrotMsg"]),
  },

  components: {
    Sorting,
    Pagination,
  },

  methods: {
    getProducts(page = 1) {
      this.$store.dispatch("fetchProducts", page);
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
  overflow: hidden;
}
.card:hover {
  box-shadow: 0 0 29px rgb(0 0 0 / 20%);
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
  cursor: pointer;
  transition: transform 0.5s linear;
}

.card-image:hover {
  transform: scale(1.1);
}
</style>