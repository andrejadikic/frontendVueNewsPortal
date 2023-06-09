<!-- eslint-disable no-mixed-spaces-and-tabs -->
<template>
  <header>
    <div class="pek" v-if="this.user !== undefined">
      User: {{ user?.email }}
    </div>
    <nav class="links">
      <a v-on:click="changeRoute('/')" id="home_header">Home</a>
      <router-link
        v-if="user !== undefined"
        :to="{ name: 'Articles' }"
        tag="a" :class="{active: this.$router.currentRoute.name === 'Articles'}"
        id="article_header"
      >
        Articles
      </router-link>
      <router-link
        v-if="user !== undefined"
        :to="{ name: 'Categories' }"
        id="article_header"
      >
        Categories
      </router-link>
      <a
        v-if="this.user?.type === 'admin'"
        v-on:click="changeRoute('/users')"
        id="article_header"
        >Users</a
      >
      <a
        v-if="this.user === undefined"
        v-on:click="changeRoute('/login')"
        id="login_header"
        >Login</a
      >
      <a v-if="this.user !== undefined" v-on:click="logout()" id="logout_header"
        >Logout</a
      >
      <span class="line"></span>
    </nav>
  </header>
</template>

<script>
import { RouterLink } from 'vue-router';
import { mapState } from 'vuex';

export default {
  name: 'Header',
  methods: {
    changeRoute(path) {
      this.$router.push(path);
    },
    logout() {
      this.$store.commit('SET_USER', undefined);
      this.$router.push('/');
    },
  },
  computed: {
    ...mapState(['user']),
  },
};
</script>

<style>
.pek {
  width: 100%;
  text-align: center;
  margin: 0;
  background-color: #246c;
  background-image: linear-gradient(to bottom, transparent, #0009);
}

code {
  background: #fff1;
  font-family: 'Inconsolata', monospace;
  justify-content: space-evenly;
}

#footer {
  background-color: #246c;
  background-image: linear-gradient(to bottom, transparent, #0009);
  border-top: 1px solid #fff3;
  box-shadow: inset 0 1px 0 #fff3, 0 0 32px #000;
  overflow: hidden;
  padding: 8px;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9001;
}
#footer a {
  color: #85c6f6;
  padding: 1em 0;
  text-decoration: none;
}
#footer ul {
  display: flex;
  list-style: none;
  justify-content: center;
  font-size: 2em;
  font-weight: 300;
}
#footer ul li {
  padding: 0 0.5em;
}

.links {
  background-color: #123;
  background-image: linear-gradient(to bottom, #0003, transparent);
  border-bottom: 1px solid #0003;
  box-shadow: 0 0 32px #0003;
  margin: 0;
  font-size: 25px;
  font-weight: 300;
  justify-content: space-evenly;
  display: flex;
}
.links > a {
  color: #9ab;
  padding: 0.75em;
  text-align: center;
  text-decoration: none;
  transition: all 0.5s;
}
.links > a:hover {
  background: #ffffff06;
  color: rgb(172, 26, 87);
}
.links > .line {
  background: rgb(172, 26, 87);
  height: 1px;
  pointer-events: none;
}

/* The Magic */
#header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
}
.links {
  display: flex;
  grid-template-columns: repeat(var(--items), 1fr);
  position: relative;
}
.links > .line {
  opacity: 0;
  transition: all 0.5s;
  position: absolute;
  bottom: 0;
  left: var(--left, calc(100% / var(--items) * (var(--index) - 1)));
  width: var(--width, calc(100% / var(--items)));
  --index: 0;
}
.links > a:hover ~ .line {
  opacity: 1;
}

.links > a:nth-of-type(1):hover ~ .line {
  --index: 1;
}
.links > a:nth-of-type(2):hover ~ .line {
  --index: 2;
}
.links > a:nth-of-type(3):hover ~ .line {
  --index: 3;
}
.links > a:nth-of-type(4):hover ~ .line {
  --index: 4;
}
.links > a:nth-of-type(5):hover ~ .line {
  --index: 5;
}
.links > a:nth-of-type(6):hover ~ .line {
  --index: 6;
}
.links > a:nth-of-type(7):hover ~ .line {
  --index: 7;
}
.links > a:nth-of-type(8):hover ~ .line {
  --index: 8;
}
.links > a:nth-of-type(9):hover ~ .line {
  --index: 9;
}
.links > a:nth-of-type(10):hover ~ .line {
  --index: 10;
}
.links > a:last-of-type:hover ~ .line {
  --index: var(--items);
}
</style>
