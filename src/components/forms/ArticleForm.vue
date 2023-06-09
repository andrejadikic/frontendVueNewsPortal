<template>
  <div class="form">
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
    <select :id="`${this.article.id}_categorySelect`" name="category">
      <option
        v-for="category in categories"
        :value="category.id"
        :key="category.id"
      >
        {{ category.name }}
      </option>
    </select>
    <label for="tags">Tags</label>
    <textarea
      v-model="articleTags"
      type="text"
      id="tags"
      name="tags"
      placeholder="Tags..."
    />

    <div class="formBtns">
      <input @click="updateArticle()" type="submit" value="Save" />
      <input @click="deleteArticle()" type="submit" value="Delete" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'article',
  props: ['article'],
  methods: {
    deleteArticle() {
      this.$store.dispatch('deleteArticle', this.article.id);
      this.$store.dispatch('fetchArticles');
    },
    updateArticle() {
      const select = document.getElementById(
        `${this.article.id}_categorySelect`
      );
      const categoryId = select.options[select.selectedIndex].value;
      this.$store.dispatch('updateArticle', {
        articleId: this.article.id,
        title: this.articleTitle,
        text: this.articleText,
        author: this.articleAuthor,
        tags: this.articleTags,
        categoryId: categoryId
      });
    },
  },
  computed: {
    ...mapState(['categories']),
  },
  mounted() {
    document.getElementById(`${this.article.id}_categorySelect`).value =
      this.article.categoryId;
  },
  data() {
    return {
      articleTitle: this.article.title,
      articleText: this.article.text,
      articleAuthor: this.article.author,
      articleTags: this.article.tags
    };
  },
};
</script>

<style scoped>
.form {
  margin: 5px;
  width: 500px;
  padding: 0px 15px;
  background-color: #246c;
  background-image: linear-gradient(to bottom, transparent, #0009);
  justify-content: space-evenly;
  margin: 15px;
  height: 640px;
}

.formBtns {
  margin-top: 20px;
  justify-content: space-evenly;
  display: flex;
}

.txtArea {
  height: fit-content;
  text-align: justify;
  font-size: large;
}

input {
  padding: 10px 30px;
  height: fit-content;
  text-align: justify;
}
</style>
