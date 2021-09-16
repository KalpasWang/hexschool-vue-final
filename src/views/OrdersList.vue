<template>
  <div>
    <h1 class="display-4 mb-4">訂單列表</h1>
    <div class="table-responsive">
      <table class="table table-hover border border-secondary">
        <thead class="bg-secondary">
          <tr>
            <th>購買時間</th>
            <th>Email</th>
            <th>購買款項</th>
            <th>應付金額</th>
            <th>是否付款</th>
          </tr>
        </thead>
        <tbody v-if="orders && orders.length">
          <tr
            v-for="(item, key) in sortedOrders"
            :key="key"
            :class="{ 'text-secondary': !item.is_paid }"
          >
            <td>{{ item.create_at | date }}</td>
            <td><span v-text="item.user.email" v-if="item.user"></span></td>
            <td>
              <ul class="list-unstyled">
                <li v-for="(product, i) in item.products" :key="i">
                  {{ product.product.title }} 數量：{{ product.qty }}
                  {{ product.product.unit }}
                </li>
              </ul>
            </td>
            <td class="text-end">{{ item.total | currency }}</td>
            <td>
              <strong v-if="item.is_paid" class="text-success">已付款</strong>
              <span v-else class="text-muted">尚未起用</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <Pagination
      v-if="ordersPagination.totalPages > 1"
      class="mt-5"
      :pages="ordersPagination.totalPages"
      :current="ordersPagination.currentPage"
      :hasPrev="ordersPagination.hasPrev"
      :hasNext="ordersPagination.hasNext"
      @getPage="getOrders"
    />
  </div>
</template>

<script>
import Pagination from "@/components/Pagination";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "OrdersList",
  data() {
    return {};
  },
  components: {
    Pagination,
  },
  computed: {
    ...mapGetters(["orders", "ordersPagination", "ordersMsg", "ordersMsgType"]),
    sortedOrders() {
      return this.orders.slice(0).sort((a, b) => {
        const aIsPaid = a.is_paid ? 1 : 0;
        const bIsPaid = b.is_paid ? 1 : 0;
        return bIsPaid - aIsPaid;
      });
    },
  },
  methods: {
    ...mapActions(["startLoading", "endLoading"]),
    async getOrders(page = 1) {
      this.startLoading();
      await this.$store.dispatch("fetchOrders", page);
      this.endLoading();
      if (this.ordersMsg) {
        this.$notify({
          group: "alert",
          title: "取得訂單列表失敗",
          text: this.ordersMsg,
          type: this.ordersMsgType,
        });
      }
    },
  },
  created() {
    this.getOrders();
  },
};
</script>