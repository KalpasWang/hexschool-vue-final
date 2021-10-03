<template>
  <div class="my-5 row justify-content-center">
    <form class="col-md-8" @submit.prevent="payOrder()">
      <table v-if="order.products" class="table">
        <thead>
          <th>品名</th>
          <th>數量</th>
          <th>單價</th>
        </thead>
        <tbody>
          <tr v-for="item in order.products" :key="item.id">
            <td>{{ item.product.title }}</td>
            <td>{{ item.qty }}/{{ item.product.unit || "個" }}</td>
            <td>{{ item.final_total }}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="2" class="text-end">總計</td>
            <td>{{ order.total }}</td>
          </tr>
        </tfoot>
      </table>

      <table v-if="order.user" class="table table-bordered table-primary mt-5">
        <tbody>
          <tr>
            <th width="100">Email</th>
            <td>{{ order.user.email }}</td>
          </tr>
          <tr>
            <th>姓名</th>
            <td>{{ order.user.name }}</td>
          </tr>
          <tr>
            <th>收件人電話</th>
            <td>{{ order.user.tel }}</td>
          </tr>
          <tr>
            <th>收件人地址</th>
            <td>{{ order.user.address }}</td>
          </tr>
          <tr>
            <th>付款狀態</th>
            <td>
              <span v-if="!order.is_paid">尚未付款</span>
              <span v-else class="text-success">付款完成</span>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="text-end" v-if="order.is_paid === false">
        <button class="btn btn-danger">確認付款去</button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "CheckoutSimulation",
  data() {
    return {
      orderId: "",
    };
  },
  computed: {
    ...mapGetters({
      order: "customerOrder",
      cartMsg: "cartMsg",
      cartMsgType: "cartMsgType",
    }),
  },
  methods: {
    async getOrder() {
      await this.$store.dispatch("getCustomerOrder", this.orderId);
      if (this.cartMsgType === "error") {
        this.$notify({
          group: "alert",
          title: this.cartMsg,
          type: this.cartMsgType,
        });
      }
    },
    async payOrder() {
      await this.$store.dispatch("payCustomerOrder", this.orderId);
      if (this.cartMsgType === "success") {
        this.getOrder();
      } else {
        this.$notify({
          group: "alert",
          title: this.cartMsg,
          type: this.cartMsgType,
        });
      }
    },
  },
  created() {
    this.orderId = this.$route.params.orderId;
    this.getOrder();
  },
};
</script>