<template>
  <div class="home">
    <a href="#" class="btn btn-primary" @click.prevent="signout">Sign Out</a>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: "Home",
  methods: {
    signout() {
      const path = `${process.env.VUE_APP_API_PATH}/logout`;
      const vm = this;
      this.$http.post(path).then((response) => {
        console.log(response.data);
        if (response.data.success) {
          vm.$router.push({ name: "Login" });
        }
      });
    },
  },
};
</script>
