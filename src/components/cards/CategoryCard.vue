<template>
  <div @click="categorySelect()" class="card">
    <img src="https://i.imgur.com/oYiTqum.jpg" class="card__image" alt="" />
    <div class="card__overlay">
      <div class="card__header">
        <svg class="card__arc" xmlns="http://www.w3.org/2000/svg"><path /></svg>
        <img
          class="card__thumb"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbGKHBSmCEENu5SLpfUN0feMQnaWmwjHjAYw&usqp=CAU"
          alt=""
        />
        <div class="card__header-text">
          <h3 class="card__title">{{ category.name }}</h3>
        </div>
      </div>
      <p class="card__description">{{ category.description }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'category',
  props: ['category'],
  methods: {
    async categorySelect() {
      this.$store.dispatch('setCategory', this.category);
      this.$store.dispatch('fetchArticles', this.category.id);
    },
  },
};
</script>

<style>
:root {
  --surface-color: #b42312;
  --curve: 40;
}

* {
  box-sizing: border-box;
}

body {
  font-family: 'Noto Sans JP', sans-serif;
  background-color: #fef8f8;
}

.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin: 4rem 5vw;
  padding: 0;
  list-style-type: none;
}

.card {
  position: relative;
  display: block;
  width: 300px;
  height: 350px;
  border-radius: calc(var(--curve) * 1px);
  overflow: hidden;
  text-decoration: none;
}

.card__image {
  width: 100%;
  height: auto;
}

.card__overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
  border-radius: calc(var(--curve) * 1px);
  background-color: var(--surface-color);
  transform: translateY(100%);
  transition: 0.2s ease-in-out;
}

.card:hover .card__overlay {
  transform: translateY(0);
}

.card__header {
  position: relative;
  display: flex;
  align-items: center;
  gap: 2em;
  padding: 2em;
  border-radius: calc(var(--curve) * 1px) 0 0 0;
  background-color: var(--surface-color);
  transform: translateY(-100%);
  transition: 0.2s ease-in-out;
}

.card__arc {
  width: 80px;
  height: 80px;
  position: absolute;
  bottom: 100%;
  right: 0;
  z-index: 1;
}

.card__arc path {
  fill: var(--surface-color);
  d: path('M 40 80 c 22 0 40 -22 40 -40 v 40 Z');
}

.card:hover .card__header {
  transform: translateY(0);
}

.card__thumb {
  flex-shrink: 0;
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.card__title {
  font-size: 1em;
  margin: 0 0 0.3em;
  color: #6a515e;
}

.card__tagline {
  display: block;
  margin: 1em 0;
  font-family: 'MockFlowFont';
  font-size: 0.8em;
  color: #d7bdca;
}

.card__status {
  font-size: 0.8em;
  color: #d7bdca;
}

.card__description {
  padding: 0 2em 2em;
  margin: 0;
  color: #d7bdca;
  font-family: 'MockFlowFont';
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}
</style>
