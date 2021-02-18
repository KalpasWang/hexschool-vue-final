<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
    <button type="button" class="btn btn-primary">Primary</button>
    <button type="button" class="btn btn-secondary">Secondary</button>
    <button type="button" class="btn btn-success">Success</button>
    <button type="button" class="btn btn-danger">Danger</button>
    <button type="button" class="btn btn-warning">Warning</button>
    <button type="button" class="btn btn-info">Info</button>
    <button type="button" class="btn btn-light">Light</button>
    <button type="button" class="btn btn-dark">Dark</button>
    <a href="#" class="btn btn-primary">12345</a>
  </div>
</template>

<script>
export default {
  name: "App",
  created() {
    const apiPath = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_API_PARAMS}/products`;
    console.log(process.env.VUE_APP_TITLE);
    console.log(apiPath);
    this.$http.get(apiPath).then((response) => {
      console.log(response.data);
    });
  },
  mounted() {
    // console.log(process.env.VUE_APP_API_PATH);
  },
};
</script>

<style lang="scss">
@import "./assets/scss/all";

// #app {
//   font-family: Avenir, Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   text-align: center;
//   color: #2c3e50;
// }

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
