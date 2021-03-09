<template>
  <nav class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
    <a class="navbar-brand col-md-3 col-lg-2 mr-0 px-3" href="#">{{ title }}</a>
    <button
      class="navbar-toggler position-absolute d-md-none collapsed"
      type="button"
      data-toggle="collapse"
      data-target="#sidebarMenu"
      aria-controls="sidebarMenu"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <input
      class="form-control form-control-dark w-100"
      type="text"
      placeholder="Search"
      aria-label="Search"
    />
    <ul class="navbar-nav flex-row justify-content-center">
      <li class="nav-item text-nowrap mx-3">
        <router-link :to="{ name: 'Home' }" class="nav-link">
          回首頁
        </router-link>
      </li>
      <li class="nav-item text-nowrap mx-3">
        <a href="#" @click.prevent="signout" class="nav-link">登出</a>
      </li>
    </ul>
  </nav>
</template>


<script>
export default {
  name: "NavBar",
  data() {
    return {
      title: process.env.VUE_APP_TITLE,
    };
  },

  methods: {
    signout() {
      const path = `${process.env.VUE_APP_API_PATH}/logout`;
      this.$http
        .post(path)
        .then((res) => {
          console.log(res.data);
          if (res.data.success) {
            this.$router.push({ name: "Home" });
            this.$notify({
              group: "alert",
              title: res.data.message,
              type: "success",
            });
          } else {
            this.$notify({
              group: "alert",
              title: "登出失敗",
              text: res.data.message,
              type: "error",
            });
          }
        })
        .catch((err) => {
          this.$notify({
            group: "alert",
            title: "登出失敗",
            text: err.message,
            type: "error",
          });
        });
    },
  },
};
</script>