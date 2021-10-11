<template>
  <nav class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
    <a class="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#">{{ title }}</a>
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
import { mapActions } from "vuex";
export default {
  name: "NavBar",
  data() {
    return {
      title: "",
    };
  },

  methods: {
    ...mapActions(["startLoading", "endLoading"]),
    async signout() {
      const path = `${this.$apiPath}/logout`;
      try {
        this.startLoading();
        const res = await this.$http.post(path);
        console.log(res.data);
        if (res.data.success) {
          this.$notify({
            group: "alert",
            title: res.data.message,
            type: "success",
          });
          this.endLoading();
          this.$router.push({ name: "Home" });
        } else {
          throw new Error(res.data.message);
        }
      } catch (error) {
        this.$notify({
          group: "alert",
          title: error.message,
          type: "error",
        });
        this.endLoading();
      }
    },
  },

  created() {
    this.title = this.$title;
  },
};
</script>

<style scoped>
.navbar-brand {
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  font-size: 1rem;
  background-color: rgba(0, 0, 0, 0.25);
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, 0.25);
}

.navbar .navbar-toggler {
  top: 0.25rem;
  right: 1rem;
}

.navbar .form-control {
  padding: 0.75rem 1rem;
  border-width: 0;
  border-radius: 0;
}

.form-control-dark {
  color: #fff;
  background-color: rgba(0, 0, 0, 0.5);
  border-color: rgba(255, 255, 255, 0.1);
}

.form-control-dark:focus {
  border-color: transparent;
  box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.25);
}

.bd-placeholder-img {
  font-size: 1.125rem;
  text-anchor: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

@media (min-width: 768px) {
  .bd-placeholder-img-lg {
    font-size: 3.5rem;
  }
}
</style>