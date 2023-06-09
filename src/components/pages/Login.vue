<template>
  <div>
    <Header/>
    <div class="register">
      <img class="logo" src="../../assets/logo.png" />
      <h1>Login</h1>
    </div>
    <div class="register">
      <input v-model="email" type="" placeholder="Email" />
      <input v-model="password" type="password" placeholder="Password" />
      <button class="pakao" v-on:click="handleSubmit">Login</button>
      <router-link class="routerlink" to="/signup">Don't have an account? Sign Up</router-link>
      <router-link class="guest" to="/">Continue as guest</router-link>
    </div>
  </div>
</template>

<script>
import Header from '../utils/Header.vue';

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  components: {
    Header,
  },
  methods: {
    async handleSubmit() {
      this.$store.dispatch('loginUser', { email: this.email, password: this.password, router: this.$router});
    },
  },
};
</script>

<style>

.logo {
  width: 250px;
  padding: 20px;
}

.register {
  width: 300px;
  padding: 0px 20px;
  margin: auto;
  justify-content: center;
}


.register input {
  width: 300px;
  height: 40px;
  padding-left: 20px;
  display: block;
  margin: auto;
  margin-bottom: 20px;
  border: 1px solid red;
}

.register .routerlink {
  width: 300px;
  height: 40px;
  display: block;
  margin: auto;
  margin-top: 20px;
  margin-bottom: 20px;
}

.register .pakao {
  width: 320px;
  height: 40px;
  border: 1px solid ;
  margin: auto;
  margin-top: 20px;
  margin-bottom: 20px;
  background-color: rgb(255, 127, 127);
  color: white;
  cursor: pointer;
}

.register .guest{
  margin: auto;
  margin-top: 20px;
  margin-bottom: 20px;
  color: red;
}
</style>
