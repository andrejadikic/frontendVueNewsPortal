<template>
  <div class="whole">
    <Header />
    <hr class="line" />
    <div>
      <div class="createForm">
        <label for="articleTitle">Title</label>
        <textarea
          v-model="articleTitle"
          type="text"
          id="articleTitle"
          name="firstname"
          placeholder="Title..."
        />
        <label for="articleTxt">Text</label>
        <textarea
          v-model="articleText"
          class="txtArea"
          type="text"
          id="articleTxt"
          name="lastname"
          placeholder="Text..."
        ></textarea>
        <label for="author">Author</label>
        <textarea
          v-model="articleAuthor"
          type="text"
          id="author"
          name="lastname"
          placeholder="Author..."
        />
        <label for="country">Category</label>
        <select :id="`categorySelect`" name="category">
          <option
            v-for="category in categories"
            :value="category.id"
            :key="category.id"
          >
            {{ category.name }}
          </option>
        </select>
        <label for="articleTags">Tags</label>
        <textarea
          v-model="articleTags"
          class="txtArea"
          type="text"
          id="articleTags"
          name="lastname"
          placeholder="Tags input like tag1;tag2;..."
        ></textarea>
        <div class="formBtns">
          <input @click="createArticle()" type="submit" value="Create" />
        </div>
        <hr class="line" />
      </div>
    </div>
    <div>
      <section class="articles">
        <ArticleForm
          v-for="article in articles"
          :key="article.id"
          :article="article"
        />
      </section>
    </div>
    <Footer class="foot" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Header from '../../utils/Header.vue';
import Footer from '../../utils/Footer.vue';
import ArticleForm from '../../forms/ArticleForm.vue';

export default {
  name: 'Articles',
  components: {
    Header,
    ArticleForm,
    Footer,
  },
  methods: {
    createArticle() {
      const select = document.getElementById(`categorySelect`);
      const categoryId = select.options[select.selectedIndex].value;
      if (this.articleTitle === '' || this.articleText === '' || this.articleTags === '') {
        alert('Morate uneti sva polja!')
        return
      }
      this.$store.dispatch('createArticle', {
        title: this.articleTitle,
        text: this.articleText,
        author: this.articleAuthor,
        categoryId: categoryId,
        tags: this.articleTags,
      });
      this.articleTitle = '';
      this.articleText = '';
      this.articleAuthor = '';
      this.articleTags = '';
    },
  },
  mounted() {
    this.$store.dispatch('fetchArticles');
  },
  computed: {
    ...mapState(['articles']),
    ...mapState(['categories']),
  },
  data() {
    return {
      articleTitle: '',
      articleText: '',
      articleAuthor: '',
      articleTags: '',
    };
  },
};
</script>

<style>
.whole {
  background-color: black;
}
.articles {
  padding: 15px 50px;
  display: flex;
  justify-content: space-evenly;
  width: fit-content;
  flex-wrap: wrap;
  flex-direction: row;
}
.form {
  width: 500px;
  padding: 0px 15px;
  background-color: #246c;
  background-image: linear-gradient(to bottom, transparent, #0009);
  height: 500px;
  justify-content: space-evenly;
  margin: 15px;
}

.formBtns {
  margin-top: 20px;
  justify-content: space-evenly;
  display: flex;
}

.txtArea {
  height: fit-content;
  text-align: justify;
}

input {
  padding: 10px 30px;
  height: fit-content;
  text-align: justify;
}
</style>
