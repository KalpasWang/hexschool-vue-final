<template>
  <nav
    id="sidebarMenu"
    class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
  >
    <div class="sidebar-sticky pt-3">
      <h6
        class="
          sidebar-heading
          d-flex
          justify-content-between
          align-items-center
          px-3
          mt-4
          mb-1
          text-muted
        "
      >
        <span>商品管理</span>
        <span
          class="d-flex align-items-center text-muted"
          aria-label="administer"
        >
          <activity-icon size="1.5x"></activity-icon>
        </span>
      </h6>
      <ul class="nav flex-column ms-3">
        <li class="nav-item">
          <router-link
            :to="{ name: 'ProductsList' }"
            class="nav-link text-start"
          >
            <book-icon size="1.5x"></book-icon>
            產品列表
          </router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{ name: 'OrdersList' }" class="nav-link text-start">
            <list-icon size="1.5x"></list-icon>
            訂單列表
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            :to="{ name: 'CouponsList' }"
            class="nav-link text-start"
          >
            <trending-down-icon size="1.5x"></trending-down-icon>
            優惠券列表
          </router-link>
        </li>
      </ul>

      <h6
        class="
          sidebar-heading
          d-flex
          justify-content-between
          align-items-center
          px-3
          mt-4
          mb-1
          text-muted
        "
      >
        <span>模擬功能</span>
        <span
          class="d-flex align-items-center text-muted"
          aria-label="simulation"
        >
          <plus-circle-icon size="1.5x"></plus-circle-icon>
        </span>
      </h6>
      <ul class="nav flex-column ms-3 mb-2">
        <li class="nav-item">
          <router-link
            :to="{ name: 'SimulateOrdering' }"
            class="nav-link text-start"
          >
            <life-buoy-icon size="1.5x"></life-buoy-icon>
            商品訂購
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import {
  BookIcon,
  LifeBuoyIcon,
  ActivityIcon,
  PlusCircleIcon,
  ListIcon,
  TrendingDownIcon,
} from "vue-feather-icons";

export default {
  name: "SideBar",
  components: {
    BookIcon,
    LifeBuoyIcon,
    ActivityIcon,
    PlusCircleIcon,
    ListIcon,
    TrendingDownIcon,
  },
};
</script>

<style lang="scss" scoped>
.sidebar {
  z-index: 100; /* Behind the navbar */
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, 0.1);
}

svg {
  vertical-align: bottom;
}
</style>