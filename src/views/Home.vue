<template>
  <div>
    <div>Home page</div>
    <router-link :to="{ name: 'Login' }" class="btn btn-primary">
      Login
    </router-link>
    <router-link :to="{ name: 'DashBoard' }" class="btn btn-secondary">
      DashBoard
    </router-link>
  </div>
</template>


<script>
export default {
  name: "Home",
};
</script>