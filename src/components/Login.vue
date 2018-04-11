<template lang="pug" >
  .column.is-half
    form(@submit="onSubmit")
      .field
        label.label Username
        input.input(v-model="email" type="email" placeholder="Email" )
      .field
        label.label Password
        input.input(v-model="password" type="password" placeholder="Password")
      input.button(type="Submit")
</template>

<script>
import { getAccessToken } from "../services/index";
export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    onSubmit(ev) {
      ev.preventDefault();
      this.login();
    },
    async login() {
      try {
        const data = await getAccessToken(this.email, this.password);
        console.log(data);
        this.$store.commit("setAccessToken", {
          userId: data.userId,
          token: data.id
        });
        this.$router.push("/");
      } catch (e) {
        alert(e);
      }
    }
  },
  beforeCreate() {
    if (this.$store.token) {
      this.$router.push("/");
    }
  }
};
</script>

<style>

</style>
