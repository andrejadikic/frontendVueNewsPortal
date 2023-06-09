<template>
  <div>
    <Header />
    <div class="main">
      <div class="pek">
        <div
          class="image"
          :style="{
            background:
              'url(https://media.istockphoto.com/photos/breaking-news-concept-picture-id951045968)',
            'background-repeat': 'no-repeat',
            'background-size': '100%',
          }"
        ></div>
        <h1 class="title">{{ current_article.title }}</h1>
        <h3 class="title">by</h3>
        <h2 class="title">{{ current_article.author }}</h2>
        <hr class="line" />
      </div>
      <div class="description">{{ current_article.text }}</div>
      <hr class="line" />
      <div class="information">
        <h2>Release Date: {{ this.formatTimestamp() }}</h2>
        <h2>ViewCount: {{ current_article.viewCount }}</h2>
      </div>
      <div class="likes">
        <h1 class="title">Tags :</h1>
        <hr class="line" />
        <section class="tags">
          <TagCard v-for="tag in current_tags" :key="tag" :tag="tag" />
        </section>
        <hr class="line" />
        <div class="tag_filter" v-if="tagged_articles.length !== 0">
          <h1 class="title">Results...</h1>
          <section class="reviews">
            <ArticleCard
              v-for="article in tagged_articles"
              :key="article.id"
              :article="article"
            />
          </section>
        </div>
        <hr class="line" />
        <h1 class="title">Read more ...</h1>
        <section class="reviews">
          <ArticleCard
            v-for="article in read_more"
            :key="article.id"
            :article="article"
          />
        </section>

        <div class="reviewForm">
          <div class="row">
            <div class="col-25">
              <label for="subject">Comment: </label>
            </div>
            <div class="col-75">
              <textarea
                id="subject"
                name="subject"
                placeholder="Write something.."
                style="height: 200px"
              ></textarea>
            </div>
            <div class="row">
              <input
                type="submit"
                value="Submit"
                v-on:click="commentOnArticle()"
              />
              <div></div>
            </div>
          </div>
        </div>
      </div>
      <hr class="line" />
      <h1 class="title">Comments :</h1>
      <section class="reviews" v-if="this.comments.length > 0">
        <CommentCard
          @eventname="updateComments"
          style="padding: 15px 15px"
          v-for="comment in comments"
          :key="comment.id"
          :comment="comment"
        />
      </section>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from '../utils/Header.vue';
import Footer from '../utils/Footer.vue';
import CommentCard from '../cards/CommentCard.vue';
import { mapState } from 'vuex';
import { formatDate } from '../scripts/current.js';
import TagCard from '../cards/TagCard.vue';
import ArticleCard from '../cards/ArticleCard.vue';

export default {
  name: 'Article',
  components: {
    Header,
    Footer,
    CommentCard,
    TagCard,
    ArticleCard,
  },
  methods: {
    formatTimestamp() {
      return formatDate(this.current_article.created_At);
    },
    commentOnArticle() {
      this.$store.dispatch(
        'leaveComment',
        document.getElementById('subject').value
      );
      this.$store.dispatch('fetchComments', this.current_article.id);
    },
    updateComments() {
      this.$store.dispatch('fetchComments', this.current_article.id);
    }
  },
  mounted() {
    this.$store.commit('SET_TAGGED_ARTICLES', []);
    this.$store.dispatch('fetchComments', this.current_article.id);
    this.$store.dispatch('fetchByTags');
  },
  computed: {
    ...mapState(['current_article']),
    ...mapState(['comments']),
    ...mapState(['categories']),
    ...mapState(['user']),
    ...mapState(['current_tags']),
    ...mapState(['read_more']),
    ...mapState(['tagged_articles']),
  }
};
</script>

<style>
.buttonContainer {
  padding: 15px 15px;
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 10px;
}

.reviews {
  padding: 15px 50px;
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
}

.tags {
  padding: 15px 30px;
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
}

.likes {
  padding: 15px 30px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}

.title {
  color: rgb(255, 7, 110);
  font-weight: 300;
  font-style: oblique;
  text-align: center;
  font: bold;
}

.line {
  width: 100%;
  text-align: left;
  padding: 0px 10px;
  margin-left: 0;
  color: rgb(200, 7, 110);
}

.main {
  overflow: hidden;
}

.description {
  font-weight: 300;
  padding: 15px;
  margin: 15px;
  font-size: 22px;
  text-align: left;
}

.pek {
  display: grid;
  overflow-x: hidden;
  overflow-y: hidden;
}

.image {
  padding: 10px 10px;
  width: 100%;
  height: 600px;
}

.information {
  display: grid;
  border-style: dotted;
  justify-content: space-evenly;
  text-align: center;
  font-weight: 200;
}

button {
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 30px;
  width: 140px;
}

input[type='text'],
select,
textarea,
input[type='t'] {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  resize: vertical;
}

/* Style the label to display next to the inputs */
label {
  padding: 12px 12px 12px 0;
  display: inline-block;
  color: rgb(200, 7, 110);
  font-size: 30px;
}

/* Style the submit button */
input[type='submit'] {
  background-color: rgb(255, 7, 110);
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  font-size: 20px;
  cursor: pointer;
  float: right;
}

/* Style the container */
.reviewForm {
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
}

/* Floating column for labels: 25% width */
.col-25 {
  float: left;
  width: 25%;
  margin-top: 6px;
}

/* Floating column for inputs: 75% width */
.col-75 {
  float: left;
  width: 75%;
  margin-top: 6px;
}

/* Clear floats after the columns */
.row:after {
  content: '';
  display: table;
  clear: both;
}

/* Responsive layout - when the screen is less than 600px wide, make the two columns stack on top of each other instead of next to each other */
@media screen and (max-width: 600px) {
  .col-25,
  .col-75,
  input[type='submit'] {
    width: 100%;
    margin-top: 0;
  }
}
</style>
