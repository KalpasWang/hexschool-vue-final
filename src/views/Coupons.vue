<template>
  <div>
    <CouponModal ref="couponModal" @save="updateCoupon" />
    <div class="text-right my-4">
      <button class="btn btn-primary" @click="openModal({})">
        建立新的優惠券
      </button>
    </div>
    <div class="table-responsive">
      <table class="table">
        <thead>
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
                class="btn btn-outline-primary btn-sm mr-1"
                @click="openModal(item)"
              >
                編輯
              </button>
              <button
                class="btn btn-outline-danger btn-sm"
                @click="deleteCoupon(item)"
              >
                刪除
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <Pagination
      v-if="totalPages > 1"
      class="mt-5"
      :pages="totalPages"
      :current="currentPage"
      :hasPrev="hasPrev"
      :hasNext="hasNext"
      @getPage="getProducts"
    />
  </div>
</template>

<script>
import CouponModal from "@/components/CouponModal";
import Pagination from "@/components/Pagination";
import { SETLOADING } from "@/store/modules/mutation-types";

export default {
  props: {
    config: Object,
  },
  data() {
    return {
      coupons: [],
      totalPages: 1,
      currentPage: 1,
      hasPrev: false,
      hasNext: false,
    };
  },
  components: {
    CouponModal,
    Pagination,
  },
  methods: {
    openModal(item) {
      this.$refs.couponModal.show(item);
    },

    getCoupons(page = 1) {
      // const vm = this;
      // const url = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_API_PARAMS}/admin/coupons`;
      // this.$http.get(url, vm.tempProduct).then((response) => {
      //   vm.coupons = response.data.coupons;
      //   console.log(response);
      // });
      this.$store.commit(SETLOADING, true);
      const path = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_API_PARAMS}/admin/coupons?page=${page}`;
      this.$http
        .get(path)
        .then((res) => {
          console.log(path, res.data);
          if (res.data.success) {
            this.coupons = res.data.coupons;
            if (res.data.pagination) {
              this.totalPages = res.data.pagination.total_pages;
              this.currentPage = res.data.pagination.current_page;
              this.hasPrev = res.data.pagination.has_pre;
              this.hasNext = res.data.pagination.has_next;
            }
          } else {
            this.$notify({
              group: "alert",
              title: "取得優惠券列表失敗",
              type: "error",
            });
          }
        })
        .catch(() => {
          this.$notify({
            group: "alert",
            title: "無法取得優惠券列表",
            type: "error",
          });
        })
        .finally(() => {
          this.$store.commit(SETLOADING, false);
        });
    },

    updateCoupon(item) {
      //   const vm = this;
      //   if (vm.isNew) {
      //     const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon`;
      //     this.$http.post(url, { data: vm.tempCoupon }).then((response) => {
      //       console.log(response, vm.tempCoupon);
      //       // $("#couponModal").modal("hide");
      //       this.getCoupons();
      //     });
      //   } else {
      //     const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon/${vm.tempCoupon.id}`;
      //     vm.due_date = new Date(vm.tempCoupon.due_date * 1000);
      //     this.$http.put(url, { data: vm.tempCoupon }).then((response) => {
      //       console.log(response);
      //       // $("#couponModal").modal("hide");
      //       this.getCoupons();
      //     });
      //   }
      // },
      this.$store.commit(SETLOADING, true);
      let path = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_API_PARAMS}/admin/coupon`;
      let method = "post";
      const isNew = item.id ? false : true;
      const vm = this;
      if (!isNew) {
        path = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_API_PARAMS}/admin/coupon/${item.id}`;
        method = "put";
      }
      this.$http[method](path, { data: item })
        .then((res) => {
          console.log(res.data);
          if (res.data.success) {
            vm.getCoupons();
            this.$notify({
              group: "alert",
              title: "上傳成功",
              text: res.data.message,
              type: "success",
            });
          } else {
            this.$notify({
              group: "alert",
              title: "上傳失敗",
              text: res.data.message,
              type: "error",
            });
          }
        })
        .catch((err) => {
          this.$notify({
            group: "alert",
            title: "上傳失敗",
            text: err.message,
            type: "error",
          });
        })
        .finally(() => {
          vm.$refs.couponModal.hide();
          vm.$store.commit(SETLOADING, false);
        });
    },
  },

  created() {
    this.getCoupons();
  },
};
</script>