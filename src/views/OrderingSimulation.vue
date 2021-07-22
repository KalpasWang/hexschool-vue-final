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
          <div
            v-for="item in cart.carts"
            class="dropdown-item flex-between-center py-2"
            :key="item.id"
          >
            <trash-2-icon
              size="5x"
              class="icon-lg text-danger cursor-pointer"
              @click.stop="deleteItemInCart(item)"
            ></trash-2-icon>
            <span>{{ item.product.title }}</span>
            <span>{{ item.final_total }}</span>
          </div>
          <div class="dopdown-divder"></div>
          <div class="mt-2">
            <button class="btn btn-primary btn-block rounded-0">結帳</button>
          </div>
        </div>
      </li>
    </ul>
    <router-view />
  </div>
</template>

<script>
import { ShoppingCartIcon, Trash2Icon } from "vue-feather-icons";
import { mapGetters } from "vuex";
import { SET_LOADING } from "@/store/modules/mutation-types";

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
    toggleDropdown() {
      this.isDropdownShow
        ? this.$store.dispatch("closeDropdown")
        : this.$store.dispatch("showDropdown");
    },
    deleteItemInCart(item) {
      let path = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_API_PARAMS}/cart/${item.id}`;
      this.$store.commit(SET_LOADING, true);
      this.$http
        .delete(path)
        .then((res) => {
          console.log(res.data);
          if (res.data.success) {
            this.$store.dispatch("getCart");
            this.$notify({
              group: "alert",
              title: "刪除成功",
              text: res.data.message,
              type: "success",
            });
          } else {
            this.$notify({
              group: "alert",
              title: "刪除失敗",
              text: res.data.message,
              type: "error",
            });
          }
        })
        .catch((err) => {
          this.$notify({
            group: "alert",
            title: "刪除失敗",
            text: err.message,
            type: "error",
          });
        })
        .finally(() => {
          this.$store.commit(SET_LOADING, false);
        });
    },
  },
  created() {
    this.$store.dispatch("closeDropdown");
    this.$store.dispatch("getCart");
  },
};
</script>

<style lang="scss">
</style>