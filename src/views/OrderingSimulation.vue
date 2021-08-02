<template>
  <div class="container">
    <ul class="nav justify-content-start mt-5 p-3">
      <li class="nav-item dropdown">
        <button
          v-if="cart.carts"
          class="btn btn-success py-1 rounded-pill flex-center"
          @click.stop="toggleDropdown()"
        >
          <shopping-cart-icon size="4x" class="icon-lg"></shopping-cart-icon>
          <span class="align-middle text-white mb-0 font-mono">
            ({{ cart.carts.length }})
          </span>
        </button>
        <div
          v-if="cart.carts && cart.carts.length"
          class="dropdown-menu shadow-sm"
          :class="{ show: isDropdownShow }"
          @click.stop=""
        >
          <table class="table table-hover mb-0">
            <tr v-for="item in cart.carts" :key="item.id" class="text-nowrap">
              <td>
                <trash-2-icon
                  size="5x"
                  class="icon-lg text-danger cursor-pointer"
                  @click.stop="deleteItemInCart(item)"
                ></trash-2-icon>
              </td>
              <td>{{ item.product.title }}</td>
              <td>{{ item.qty }}/{{ item.product.unit || "個" }}</td>
              <td>{{ item.final_total }}</td>
            </tr>
          </table>
          <div>
            <router-link
              :to="{ name: 'OrdersSimulation' }"
              class="btn btn-primary btn-block rounded-0"
            >
              結帳
            </router-link>
          </div>
        </div>
      </li>
    </ul>
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
    ...mapActions([
      "startLoading",
      "endLoading",
      "showDropdown",
      "closeDropdown",
    ]),
    toggleDropdown() {
      this.isDropdownShow ? this.closeDropdown() : this.showDropdown();
    },
    deleteItemInCart(item) {
      this.startLoading();
      this.$store.dispatch("deleteProductInCart", item.id).finally(() => {
        this.$store.dispatch("getCart");
        this.endLoading();
      });
    },
  },
  mounted() {
    this.closeDropdown();
    this.$store.dispatch("getCart");
  },
};
</script>

<style lang="scss">
</style>