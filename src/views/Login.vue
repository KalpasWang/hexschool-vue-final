<template>
  <div class="py-5">
    <form class="form-signin" @submit.prevent="login">
      <h1 class="font-caveat mb-5">
        <img src="@/assets/logo-light.svg" alt="Logo" width="57" height="57" />
        Breadfirst
      </h1>
      <h2 class="h3 mb-3 fw-normal">登入帳號</h2>
      <label>
        <span class="visually-hidden">Email address</span>
        <input
          type="email"
          v-model="user.username"
          class="form-control"
          placeholder="Email"
          required
          autofocus
        />
      </label>
      <label>
        <span class="visually-hidden">Password</span>
        <input
          type="password"
          v-model="user.password"
          class="form-control"
          placeholder="密碼"
          required
        />
      </label>
      <button class="w-100 btn btn-lg btn-primary" type="submit">登入</button>
      <p class="mt-5 mb-3 text-muted">Breadfirst &copy; 2017–2021</p>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Login",
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    ...mapActions(["startLoading", "endLoading"]),
    async login() {
      const path = `${this.$apiPath}/admin/signin`;
      try {
        this.startLoading();
        const res = await this.$http.post(path, this.user);
        console.log(res.data);
        if (res.data.success) {
          const token = res.data.token;
          const expired = res.data.expired;
          console.log(token, expired);
          document.cookie = `hexToken=${token};expires=${new Date(expired)};`;
          this.endLoading();
          this.$notify({
            group: "alert",
            title: res.data.message,
            type: "success",
          });
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
};
</script>

<style scoped>
.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>