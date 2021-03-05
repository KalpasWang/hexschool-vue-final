<template>
  <nav
    id="sidebarMenu"
    class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
  >
    <div class="sidebar-sticky pt-3">
      <h6
        class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted"
      >
        <span>商品管理</span>
        <span
          class="d-flex align-items-center text-muted"
          aria-label="administer"
        >
          <activity-icon size="1.5x"></activity-icon>
        </span>
      </h6>
      <ul class="nav flex-column text-left ml-3">
        <li class="nav-item">
          <router-link :to="{ name: 'Products' }" class="nav-link">
            <book-icon size="1.5x"></book-icon>
            產品列表
          </router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{ name: 'Orders' }" class="nav-link">
            <list-icon size="1.5x"></list-icon>
            訂單列表
          </router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{ name: 'Coupons' }" class="nav-link">
            <trending-down-icon size="1.5x"></trending-down-icon>
            優惠券
          </router-link>
        </li>
      </ul>

      <h6
        class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted"
      >
        <span>模擬功能</span>
        <span
          class="d-flex align-items-center text-muted"
          aria-label="simulation"
        >
          <plus-circle-icon size="1.5x"></plus-circle-icon>
        </span>
      </h6>
      <ul class="nav flex-column text-left ml-3 mb-2">
        <li class="nav-item">
          <router-link :to="{ name: 'SimulateOrdering' }" class="nav-link">
            <life-buoy-icon size="1.5x"></life-buoy-icon>
            模擬商品訂購
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