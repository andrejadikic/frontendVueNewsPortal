<template>
  <div v-on:click="singlePage()" class="entity">
    <div
      class="entity-image"
      :style="{
        background:
          'url(https://cdn.pixabay.com/photo/2015/02/15/09/33/news-636978_960_720.jpg)',
        'background-size': '100%',
        'grid-area': 'image',
        'border-top-left-radius': '15px',
        'border-top-right-radius': '15px',
        'background-repeat': 'no-repeat',
      }"
    ></div>
    <div class="entity-text">
      <h2>{{ article.title }}</h2>
      <h3>{{ article.text | shortText }}</h3>
    </div>
    <div class="entity-stats">
      <div class="stat">
        <div class="value">{{ article.viewCount }}</div>
        <div class="type">Views</div>
      </div>
      <h3>{{ this.formatTimestamp() }}</h3>
    </div>
    <div v-if="article.showCategory">{{ getCategory() }}</div>
    
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { findCategory, formatDate } from '../scripts/current.js';

export default {
  name: 'article',
  props: ['article'],
  methods: {
    singlePage() {
      this.$store.dispatch('increaseView', this.article.id);
      this.$store.commit('SET_TAGGED_ARTICLES', []);
      this.$router.push(`/article/${this.article.id}`);
      window.scrollTo(0, 0);
    },
    getCategory() {
      const category = findCategory(this.categories, this.article.categoryId);
      return category?.name || 'category';
    },
    formatTimestamp() {
      return formatDate(this.article.created_At);
    },
  },
  computed: {
    ...mapState(['categories']),
  },
  filters: {
    shortText(value) {
      if (value.length < 30) {
        return value;
      }
      return value.slice(0, 30) + '...'
    }
  },
};
</script>

<style>
.entity {
  display: grid;
  grid-template-columns: 300px;
  grid-template-rows: 280px 160px 80px;
  grid-template-areas: 'image' 'text' 'stats';
  transition: 0.5s ease;
  cursor: pointer;

  font-family: roboto;
  border-radius: 18px;
  background: white;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 9);
  text-align: center;
}

.entity-text {
  grid-area: text;
  margin: 25px;
}

.entity-stats {
  grid-area: stats;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  background: rgb(255, 7, 110);
}

.entity-stats .stat {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 10px;
  color: white;
}

.entity-stats .type {
  font-size: 11px;
  font-weight: 300;
  text-transform: uppercase;
}

.entity-stats .value {
  font-size: 22px;
  font-weight: 500;
}

.entity-stats .border {
  border-left: 1px solid rgb(172, 26, 87);
  border-right: 1px solid rgb(172, 26, 87);
}

.entity:hover {
  transform: scale(1.2);
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.6);
}
</style>
