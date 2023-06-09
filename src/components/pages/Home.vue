<template>
    <div>
      <Header/>
      <div class="search-box">
      <label for="srch" >Search: </label>
      <input v-model="filterTextMovies" type="text" class="input-search" id="srch" placeholder="Search.....">
      </div>
      <hr class="line"/>
      <div class="category_titles">Categories</div>
       <section class="entities" >
      <CategoryCard 
      v-for="category in categories"
      :key="category.id"
      :category="category"/>
      </section>
      <hr class="line"/>
      <div class="category_titles">{{current_category?.name || 'All Articles'}}</div>
      <section class="entities" >
      <ArticleCard 
      v-for="article in articles"
      :key="article.id"
      :article="article"/>
      </section>
      <div class="pagination">
        <button
          :disabled="currentPage === 1"
          @click="currentPage--"
        >
          Previous
        </button>
        <span>Page {{ currentPage }}</span>
        <button
          :disabled="currentPage === totalPages"
          @click="currentPage++"
        >
          Next
        </button>
      </div>
      <hr class="line"/>
      <div class="category_titles">Most Viewed</div>
      <section class="entities" >
      <ArticleCard 
      v-for="article in most_viewed"
      :key="article.id"
      :article="article"/>
      </section>
      <div class="pagination">
        <button
          :disabled="mostViewPage === 1"
          @click="mostViewPage--"
        >
          Previous
        </button>
        <span>Page {{ mostViewPage }}</span>
        <button
          :disabled="mostViewPage === totalPages"
          @click="mostViewPage++"
        >
          Next
        </button>
      </div>
      <Footer class="footer"/>
    </div>
</template>

<script>
import Header from '../utils/Header.vue';
import Footer from '../utils/Footer.vue'
import ArticleCard from '../cards/ArticleCard.vue';
import CategoryCard from '../cards/CategoryCard.vue';
import { mapState } from 'vuex'

export default {
     name: 'Home',
     components: {
      Header,
      Footer,
      ArticleCard,
      CategoryCard,
     },
     mounted(){
      this.$store.dispatch('fetchArticles')
      this.$store.dispatch('fetchCategories')
      this.$store.dispatch('fetchArticlesByPageMostView',this.mostViewPage);
      this.$store.dispatch('fetchArticlesByPage', this.currentPage)
      this.$store.commit('SET_CURR_CATEGORY', undefined)
      this.$store.commit('SET_TAGGED_ARTICLES', [])
     },
     computed: {
       ...mapState(['articles']),
       ...mapState(['categories']),
       ...mapState(['current_category']),
       ...mapState(['most_viewed']),
       ...mapState(['totalPages']),
     },
     watch: {
        filterTextMovies(){
          this.$store.dispatch('fetchByText', this.filterTextMovies)
        },
        currentPage(){
          this.$store.dispatch('fetchArticlesByPage', this.currentPage)
        },
        mostViewPage(){
          this.$store.dispatch('fetchArticlesByPageMostView', this.mostViewPage)
        }
     },
     data () {
      return { 
        filterTextMovies: '',
        currentPage: 1,
        mostViewPage: 1,
      }
     }
  } 
</script>

<style scoped>
 .search-box{
  display: flex;
  justify-content: space-evenly;
  width: fit-content;
  height: fit-content;
  padding: 15px 150px;
}

.line {
  color: rgb(255, 127, 127);
}
.category_titles {
  text-align: center;
  font-size: 35px;
}
 .entities {
     padding: 15px 30px;
     display: flex;
     flex-wrap: wrap;
     justify-content: space-evenly;
 }
  .home h2 {
    color: rgb(255, 127, 127);
  }
</style>
