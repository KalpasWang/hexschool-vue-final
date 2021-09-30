<template>
  <div class="container">
    <div class="dropdown mt-4 mb-3">
      <button
        v-if="cart"
        @click.stop="toggleDropdown()"
        class="
          btn btn-success
          py-1
          rounded-pill
          d-flex
          justify-content-center
          align-items-center
        "
      >
        <shopping-cart-icon size="4x" class="icon-lg"></shopping-cart-icon>
        <span class="align-middle font-monospace"> ({{ cart.length }}) </span>
      </button>
      <ul
        v-if="cart.length"
        :class="{ show: isDropdownShow }"
        @click.stop=""
        class="dropdown-menu shadow-sm"
      >
        <li v-for="item in cart" :key="item.id" class="dropdown-item">
          <span class="d-inline-block me-1">
            <trash-2-icon
              size="5x"
              class="icon-lg text-danger cursor-pointer"
              @click.stop="deleteItemInCart(item)"
            ></trash-2-icon>
          </span>
          <span
            class="
              d-inline-block
              title-width title-max
              align-middle
              text-truncate
              px-2
            "
            >{{ item.product.title }}</span
          >
          <span class="px-2"
            >{{ item.qty }}/{{ item.product.unit || "個" }}</span
          >
          <span>{{ item.final_total }}</span>
        </li>
        <li><hr class="dropdown-divider" /></li>
        <li>
          <router-link
            :to="{ name: 'OrdersSimulation' }"
            class="btn btn-primary w-100 rounded-0"
            >結帳</router-link
          >
        </li>
      </ul>
    </div>
    <router-view />
  </div>
</template>

<script>
import { ShoppingCartIcon, Trash2Icon } from "vue-feather-icons";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "OrderingSimulation",
  components: {
    ShoppingCartIcon,
    Trash2Icon,
  },
  computed: {
    ...mapGetters(["cart", "cartMsg", "cartMsgType", "isDropdownShow"]),
  },
  methods: {
    ...mapActions(["showDropdown", "closeDropdown"]),
    toggleDropdown() {
      this.isDropdownShow ? this.closeDropdown() : this.showDropdown();
    },
    async getCart() {
      await this.$store.dispatch("getCart");
      if (this.cartMsg) {
        this.$notify({
          group: "alert",
          title: this.cartMsg,
          type: this.cartMsgType,
        });
      }
    },
    async deleteItemInCart(item) {
      await this.$store.dispatch("deleteProductInCart", item.id);
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
  mounted() {
    this.closeDropdown();
    this.getCart();
  },
};
</script>

<style scoped>
.title-width {
  width: 150px;
}

.title-max {
  max-width: 150px;
}
</style>