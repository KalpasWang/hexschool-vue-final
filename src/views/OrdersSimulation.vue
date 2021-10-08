<template>
  <div>
    <div class="my-5 row justify-content-center">
      <div class="col-md-8">
        <table class="table">
          <thead>
            <th></th>
            <th>品名</th>
            <th>數量</th>
            <th>單價</th>
          </thead>
          <tbody v-if="cart && cart.length">
            <tr v-for="item in cart" :key="item.id">
              <td>
                <trash-2-icon
                  size="5x"
                  role="button"
                  class="icon-lg text-danger"
                  @click.stop="deleteItemInCart(item)"
                ></trash-2-icon>
              </td>
              <td>
                {{ item.product.title }}
                <div class="text-success" v-if="item.coupon">已套用優惠券</div>
              </td>
              <td>{{ item.qty }}/{{ item.product.unit || "個" }}</td>
              <td v-if="item.total === item.final_total">
                {{ item.final_total }}
              </td>
              <td v-else>
                <del>{{ item.total }}</del
                ><br />
                <span>{{ item.final_total | ceil }}</span>
              </td>
            </tr>
          </tbody>
          <tfoot class="fw-bold">
            <tr>
              <td colspan="3" class="text-end">總計</td>
              <td>{{ cartTotal.total }}</td>
            </tr>
            <tr v-if="cartTotal.final_total !== cartTotal.total">
              <td colspan="3" class="text-success text-end">折扣價</td>
              <td class="text-success">{{ cartTotal.final_total | ceil }}</td>
            </tr>
          </tfoot>
        </table>
        <div class="input-group mb-3 input-group-sm">
          <input
            type="text"
            class="form-control"
            v-model="coupon_code"
            placeholder="請輸入優惠碼"
          />
          <div class="input-group-append">
            <button
              class="btn btn-outline-secondary"
              type="button"
              :disabled="!coupon_code"
              @click="addCouponCode()"
            >
              套用優惠碼
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="my-5 row justify-content-center">
      <!-- vee-valdate components -->
      <ValidationObserver class="col-md-6" v-slot="{ handleSubmit, invalid }">
        <form @submit.prevent="handleSubmit(onSubmit)">
          <ValidationProvider
            name="email"
            rules="required|email"
            v-slot="{ errors }"
          >
            <div class="mb-3">
              <input
                v-model="form.user.email"
                :class="{ 'is-invalid': errors[0] }"
                placeholder="請輸入 Email"
                class="form-control"
                type="email"
              />
              <span class="text-danger">{{ errors[0] }}</span>
            </div>
          </ValidationProvider>

          <ValidationProvider
            name="username"
            rules="required"
            v-slot="{ errors }"
          >
            <div class="mb-3">
              <input
                v-model="form.user.name"
                :class="{ 'is-invalid': errors[0] }"
                placeholder="請輸入收件人姓名"
                class="form-control"
                type="text"
              />
              <span class="text-danger">{{ errors[0] }}</span>
            </div>
          </ValidationProvider>

          <ValidationProvider
            name="tel"
            rules="required|numeric"
            v-slot="{ errors }"
          >
            <div class="mb-3">
              <input
                type="tel"
                class="form-control"
                :class="{ 'is-invalid': errors[0] }"
                v-model="form.user.tel"
                placeholder="請輸入電話"
              />
              <span class="text-danger">{{ errors[0] }}</span>
            </div>
          </ValidationProvider>

          <ValidationProvider
            name="address"
            rules="required"
            v-slot="{ errors }"
          >
            <div class="mb-3">
              <input
                type="address"
                class="form-control"
                :class="{ 'is-invalid': errors[0] }"
                v-model="form.user.address"
                placeholder="請輸入地址"
              />
              <span class="text-danger">{{ errors[0] }}</span>
            </div>
          </ValidationProvider>

          <div class="mb-3">
            <textarea
              class="form-control"
              rows="5"
              v-model="form.message"
              placeholder="還想說什麼？"
            ></textarea>
          </div>
          <div class="text-end">
            <button class="btn btn-danger" :disabled="invalid">送出訂單</button>
          </div>
        </form>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";
import { Trash2Icon } from "vue-feather-icons";
import { mapGetters } from "vuex";

export default {
  name: "OrdersSimulation",
  data() {
    return {
      coupon_code: "",
      form: {
        user: {
          name: "",
          email: "",
          tel: "",
          address: "",
        },
        message: "",
      },
    };
  },
  components: {
    ValidationObserver,
    ValidationProvider,
    Trash2Icon,
  },
  computed: {
    ...mapGetters(["cart", "cartTotal", "cartMsg", "cartMsgType"]),
  },
  methods: {
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
    async addCouponCode() {
      await this.$store.dispatch("addCouponCode", this.coupon_code);
      if (this.cartMsg) {
        this.$notify({
          group: "alert",
          title: this.cartMsg,
          type: this.cartMsgType,
        });
      } else {
        this.$store.dispatch("getCart");
      }
    },
    async onSubmit() {
      const orderId = await this.$store.dispatch("createNewOrder", this.form);
      if (this.cartMsgType === "error") {
        this.$notify({
          group: "alert",
          title: this.cartMsg,
          type: this.cartMsgType,
        });
      }
      if (this.cartMsgType === "success") {
        this.$router.push({ name: "CheckoutSimulation", params: { orderId } });
      }
    },
  },
  created() {
    this.$store.dispatch("getCart");
  },
};
</script>

<style lang="">
</style>