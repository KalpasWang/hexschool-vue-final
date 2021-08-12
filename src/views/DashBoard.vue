<template>
  <div class="dashboard min-h100" @click="$store.dispatch('closeDropdown')">
    <NavBar />
    <div class="container-fluid min-h100">
      <div class="row">
        <SideBar />
        <main
          role="main"
          class="col-md-9 bg-light ml-sm-auto flex-grow-1 col-lg-10 px-md-4"
        >
          <router-view class="min-h100"></router-view>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar";
import SideBar from "@/components/SideBar";
// @ is an alias to /src
export default {
  name: "DashBoard",
  components: {
    SideBar,
    NavBar,
  },
  methods: {
    signout() {
      const path = `${process.env.VUE_APP_API_PATH}/logout`;
      const vm = this;
      this.$http.post(path).then((res) => {
        console.log(res.data);
        if (res.data.success) {
          vm.$router.push({ name: "Home" });
        }
      });
    },
  },

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


<style>
.min-h100 {
  min-height: calc(100vh - 48px);
}
</style>