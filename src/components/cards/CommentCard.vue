<template>
  <div>
    <div class="card">
      <div class="face face1">
        <div class="content">
          <span class="stars"></span>
          <p class="java">{{ comment.text }}</p>
        </div>
      </div>
      <div class="face face2">
        <h2>{{ comment.author }}</h2>
        <h2>{{ this.formatTimestamp(this.comment.created_at) }}</h2>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { formatDate } from '../scripts/current.js';

export default {
  name: 'comment',
  props: ['comment'],
  methods: {
    formatTimestamp(timestamp) {
      return formatDate(timestamp);
    }
  },
  computed: {
    ...mapState(['current_article']),
  }
};
</script>

<style scoped>
.card {
  position: relative;
  width: 300px;
  height: 400px;
  margin: 0 auto;
  background: #000;
  border-radius: 15px;
  box-shadow: 0 15px 60px rgba(0, 0, 0, 0.5);
}

button {
  width: 150px;
  height: 60x;
  text-align: center;
  font-size: 16px;
}

.face {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.face1 {
  box-sizing: border-box;
  padding: 20px;
}

h2 {
  margin: 0;
  padding: 0;
}

.java {
  background-color: #880808;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.face2 {
  transition: 0.5s;
}

h2 {
  margin: 0;
  padding: 0;
  font-size: 10em;
  color: #fff;
  transition: 0.5s;
  text-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  z-index: 10;
}

.card:hover .face.face2 {
  height: 60px;
}

h2 {
  font-size: 15px;
}

.card:nth-child(1) .face.face2 {
  background-image: url('https://cdn.wallpapersafari.com/94/76/PHsOXh.jpg');
  background-size: 100%;
  border-radius: 15px;
  border-radius: 15px;
}

.card:nth-child(n) .face.face2 {
  background-image: url('https://cdn.wallpapersafari.com/94/76/PHsOXh.jpg');
  background-size: 100%;
  border-radius: 15px;
}

.card:nth-child(3) .face.face2 {
  background-image: url('https://cdn.wallpapersafari.com/94/76/PHsOXh.jpg');
  background-size: 100%;
  border-radius: 15px;
}
</style>
