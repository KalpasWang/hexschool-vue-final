<template>
  <div>
    <div>Home page</div>
    <router-link :to="{ name: 'Login' }" class="btn btn-primary">
      Login
    </router-link>
    <router-link :to="{ name: 'Products' }" class="btn btn-secondary">
      DashBoard
    </router-link>
  </div>
</template>


<script>
export default {
  name: "Home",
  created() {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    // console.log("my token", token);
    this.$http.defaults.headers.common.Authorization = `${token}`;
  },
};
</script>
