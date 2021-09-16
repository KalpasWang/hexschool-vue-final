<template>
  <div class="py-2">
    <CouponModal ref="couponModal" @save="updateCoupons" />
    <h1
      class="display-4 d-flex justify-content-between align-items-center mb-4"
    >
      所有優惠券
      <button class="btn btn-primary" @click="openModal({})">
        建立新的優惠券
      </button>
    </h1>
    <div class="table-responsive">
      <table class="table table-hover border border-secondary">
        <thead class="bg-secondary">
          <tr>
            <th>名稱</th>
            <th>折扣百分比</th>
            <th>到期日</th>
            <th>是否啟用</th>
            <th>編輯</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, key) in coupons" :key="key">
            <td>{{ item.title }}</td>
            <td>{{ item.percent }}%</td>
            <td>{{ item.due_date | date }}</td>
            <td>
              <span v-if="item.is_enabled === 1" class="text-secondary">
                <i class="far fa-circle"></i>
              </span>
              <span v-else class="text-secondary">
                <i class="fas fa-times"></i>
              </span>
            </td>
            <td>
              <button
                class="btn btn-outline-primary btn-sm me-1"
                @click="openModal(item)"
              >
                編輯
              </button>
              <button
                class="btn btn-outline-danger btn-sm"
                @click="deleteCoupons(item)"
              >
                刪除
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <Pagination
      v-if="couponsPagination.totalPages > 1"
      class="mt-5"
      :pages="couponsPagination.totalPages"
      :current="couponsPagination.currentPage"
      :hasPrev="couponsPagination.hasPrev"
      :hasNext="couponsPagination.hasNext"
      @getPage="couponsPagination.getCoupons"
    />
  </div>
</template>

<script>
import CouponModal from "@/components/CouponModal";
import Pagination from "@/components/Pagination";
import { mapGetters } from "vuex";

export default {
  name: "CouponsList",
  data() {
    return {
      title: "",
    };
  },
  computed: {
    ...mapGetters([
      "coupons",
      "couponsMsg",
      "couponsMsgType",
      "couponsPagination",
    ]),
  },
  components: {
    CouponModal,
    Pagination,
  },
  methods: {
    openModal(item) {
      this.$refs.couponModal.show(item);
    },

    hideModal() {
      this.$refs.couponModal.hide();
    },

    async getCoupons(page = 1) {
      await this.$store.dispatch("getCoupons", page);
      if (this.couponsMsg) {
        this.$notify({
          group: "alert",
          title: "取得優惠券列表失敗",
          text: this.couponsMsg,
          type: this.couponsMsgType,
        });
      }
    },

    async updateCoupons(item) {
      await this.$store.dispatch("updateCoupons", item);
      this.title = this.couponsMsgType === "success" ? "上傳成功" : "上傳失敗";
      this.$notify({
        group: "alert",
        title: this.title,
        text: this.couponsMsg,
        type: this.couponsMsgType,
      });
      if (this.couponsMsgType === "success") {
        this.hideModal();
        this.getCoupons(this.couponsPagination.currentPage);
      }
    },

    async deleteCoupons(item) {
      await this.$store.dispatch("deleteCoupons", item);
      this.title = this.couponsMsgType === "success" ? "刪除成功" : "刪除失敗";
      this.$notify({
        group: "alert",
        title: this.title,
        text: this.couponsMsg,
        type: this.couponsMsgType,
      });
      if (this.couponsMsgType === "success") {
        this.getCoupons(this.couponsPagination.currentPage);
      }
    },
  },

  created() {
    this.getCoupons();
  },
};
</script>