<template>
  <div class="container" @click="showDropdown = false">
    <ul class="nav justify-content-start mt-5 p-3">
      <li class="nav-item dropdown">
        <button
          class="btn btn-success py-1 rounded-pill flex-center"
          tabindex="-1"
          aria-disabled="true"
          @click.stop="showDropdown = !showDropdown"
        >
          <shopping-cart-icon size="4x" class="icon-lg"></shopping-cart-icon>
          <span class="align-middle text-white mb-0 font-mono">
            ({{ cart.carts.length }})
          </span>
        </button>
        <div
          v-if="cart.length > 0"
          class="dropdown-menu"
          :class="{ show: showDropdown }"
          aria-labelledby="dropdownMenuButton"
        >
          <div
            v-for="item in cart.carts"
            class="dropdown-item flex-between-center"
            :key="item.id"
          >
            <span>{{ item.title }}</span>
            <span v-if="!item.price">{{ item.origin_price }}</span>
            <span v-else>{{ item.price }}</span>
          </div>
          <div class="dopdown-divder"></div>
          <div class="dropdown-item">
            <button class="btn btn-primary ml-auto mr-3">結帳</button>
          </div>
        </div>
      </li>
    </ul>
    <router-view />
  </div>
</template>

<script>
import { ShoppingCartIcon } from "vue-feather-icons";
import { mapGetters } from "vuex";

export default {
  name: "OrderingSimulation",
  data() {
    return {
      showDropdown: false,
    };
  },
  components: {
    ShoppingCartIcon,
  },
  computed: {
    ...mapGetters(["cart", "cartMsg", "cartMsgType"]),
  },
  created() {
    this.$store.dispatch("getCart");
  },
};
</script>

<style lang="scss">
</style>