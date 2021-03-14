<template>
  <div>
    <table class="table shadow-sm bg-white mt-4">
      <thead>
        <tr>
          <th>購買時間</th>
          <th>Email</th>
          <th>購買款項</th>
          <th>應付金額</th>
          <th>是否付款</th>
        </tr>
      </thead>
      <tbody v-if="orders.length">
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
          <td class="text-right">{{ item.total | currency }}</td>
          <td>
            <strong v-if="item.is_paid" class="text-success">已付款</strong>
            <span v-else class="text-muted">尚未起用</span>
          </td>
        </tr>
      </tbody>
    </table>

    <Pagination
      v-if="totalPages > 1"
      class="mt-5"
      :pages="totalPages"
      :current="currentPage"
      :hasPrev="hasPrev"
      :hasNext="hasNext"
      @getPage="getOrders"
    />
  </div>
</template>

<script>
import Pagination from "@/components/Pagination";
import { SETLOADING } from "@/store/modules/mutation-types";

export default {
  data() {
    return {
      orders: [],
      totalPages: 1,
      currentPage: 1,
      hasPrev: false,
      hasNext: false,
    };
  },
  components: {
    Pagination,
  },
  methods: {
    getOrders(page = 1) {
      const path = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_API_PARAMS}/admin/orders?page=${page}`;
      this.$store.commit(SETLOADING, true);
      this.$http
        .get(path)
        .then((res) => {
          console.log(path, res.data);
          if (res.data.success) {
            this.orders = res.data.orders;
            if (res.data.pagination) {
              this.totalPages = res.data.pagination.total_pages;
              this.currentPage = res.data.pagination.current_page;
              this.hasPrev = res.data.pagination.has_pre;
              this.hasNext = res.data.pagination.has_next;
            }
          } else {
            this.$notify({
              group: "alert",
              title: "取得訂單列表失敗",
              type: "error",
            });
          }
        })
        .catch(() => {
          this.$notify({
            group: "alert",
            title: "無法取得訂單列表",
            type: "error",
          });
        })
        .finally(() => {
          this.$store.commit(SETLOADING, false);
        });
    },
  },
  computed: {
    sortedOrders() {
      return this.orders.slice(0).sort((a, b) => {
        const aIsPaid = a.is_paid ? 1 : 0;
        const bIsPaid = b.is_paid ? 1 : 0;
        return bIsPaid - aIsPaid;
      });
    },
  },
  created() {
    this.getOrders();
  },
};
</script>