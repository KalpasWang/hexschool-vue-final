<template>
  <div class="row">
    <div class="col-md-4 col-sm-6 mb-4" v-for="item in products" :key="item.id">
      <div class="card rounded-0">
        <div
          class="card-image"
          :style="{ backgroundImage: `url(${item.image})` }"
        ></div>
        <div class="card-body">
          <span
            class="badge badge-secondary font-weight-light p-1 float-right"
            >{{ item.category }}</span
          >
          <h6 class="card-title text-left">
            <a href="#" class="text-dark">{{ item.title }}</a>
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
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "ProductsList",
  data() {
    return {
      loading: false,
      selectedItemId: "",
    };
  },

  computed: {
    ...mapGetters(["products", "pagination", "productsErrotMsg"]),
  },

  methods: {},

  created() {
    this.$store.dispatch("fetchProducts");
  },
};
</script>

<style scoped>
.card {
  border-right: 0;
  border-left: 0;
  border-top: 0;
  border-bottom: 1px solid rgba(62, 101, 119, 0.18);
}
.card:hover {
  box-shadow: 0 0 29px rgb(0 0 0 / 20%);
}

.card-image {
  padding-bottom: 142%;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}
</style>