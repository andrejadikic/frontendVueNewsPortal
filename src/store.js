import Vuex from 'vuex';
import axios from 'axios';
import Vue from 'vue';
import {
  ARTICLES,
  CATEGORIES,
  COMMENTS,
  LOGIN,
  USERS,
} from './api/routes.js';
import createPersistedState from 'vuex-persistedstate';
import jwt from 'jsonwebtoken';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    articles: [],
    categories: [],
    comments: [],
    most_viewed: [],
    current_tags: [],
    tagged_articles: [],
    read_more: [],
    users: [],
    user: undefined,
    current_category: undefined,
    current_article: undefined,
    totalPages: 1
  },
  actions: {
    async fetchArticlesByPage({ commit }, page) {
      try {
        const url = page
        ? `${process.env.VUE_APP_API_URL}${ARTICLES}/byPage/${page}`
        : `${process.env.VUE_APP_API_URL}${ARTICLES}`;
        const response = await axios({
          url,
          method: 'get',
        });
        commit('SET_ARTICLES', response.data);
      } catch (error) {
        console.error(error);
      }
    },
    async fetchArticlesByPageMostView({ commit }, page) {
      try {
        const response = await axios({
          url: `${process.env.VUE_APP_API_URL}${ARTICLES}/most-read/byPage/${page}`,
          method: 'get',
        });
        commit('SET_MOST_VIEWED', response.data);
      } catch (error) {
        console.error(error);
      }
    },
    async fetchArticles({ commit }, categoryId) {
      const url = categoryId
        ? `${process.env.VUE_APP_API_URL}${ARTICLES}/byCategory/${categoryId}`
        : `${process.env.VUE_APP_API_URL}${ARTICLES}`;
      const response = await axios({
        url,
        method: 'get',
      });
      commit('SET_ARTICLES', response.data);
      commit('SET_TOTAL_PAGES', response.data)
    },
    async fetchMostViewed({ commit }) {
      const response = await axios({
        url: `${process.env.VUE_APP_API_URL}${ARTICLES}/most-read`,
        method: 'get',
      });
      commit('SET_MOST_VIEWED', response.data);
    },
    async fetchByText({ commit, state }, text) {
      const response = await axios({
        url: `${process.env.VUE_APP_API_URL}${ARTICLES}/search/${text}`,
        method: 'get',
        params: {
          ...(state.current_category !== undefined && {
            categoryId: state.current_category.id,
          }),
        },
      });
      commit('SET_ARTICLES', response.data);
    },
    async fetchByTag({ commit }, tag) {
      const response = await axios({
        method: 'get',
        url: `${process.env.VUE_APP_API_URL}${ARTICLES}/byTag/${tag}`,
      });
      commit('SET_TAGGED_ARTICLES', response.data);
    },
    async fetchByTags({ commit, state }) {
      const response = await axios({
        method: 'post',
        url: `${process.env.VUE_APP_API_URL}${ARTICLES}/byTag/${state.current_article.id}`,
        data: state.current_tags,
        params: {
          exclude: state.current_article.id,
        },
      });
      commit('SET_READ_MORE', response.data);
    },
    async fetchCategories({ commit }) {
      const response = await axios({
        method: 'get',
        url: `${process.env.VUE_APP_API_URL}${CATEGORIES}`,
      });
      commit('SET_CATEGORIES', response.data);
    },
    async fetchComments({ commit }, articleId) {
      const response = await axios({
        method: 'get',
        url: `${process.env.VUE_APP_API_URL}${COMMENTS}/byArticle/${articleId}`,
      });
      commit('SET_COMMENTS', response.data);
    },
    setCategory({ commit }, category) {
      commit('SET_CURR_CATEGORY', category);
    },
    setArticle({ commit }, article) {
      commit('SET_CURR_ARTICLE', article);
    },
    async loginUser({ commit }, { email, password, router }) {
      let response;
      try {
        response = await axios({
          url: `${process.env.VUE_APP_API_URL}${LOGIN}`,
          method: 'post',
          data: {
            email,
            password,
          },
        });
      } catch (error) {
        alert(error.response.data[0].message || error.response.data);
        return;
      }
      const userData = JSON.parse(jwt.decode(response.data.split(' ')[1]).sub);
      localStorage.setItem('token', response.data);
      commit('SET_USER', userData);
      router.push('/');
    },
    async leaveComment({ commit, state }, text) {
      try {
        const response = await axios({
          url: `${process.env.VUE_APP_API_URL}${COMMENTS}`,
          method: 'post',
          data: {
            text,
            articleId: state.current_article.id,
          },
          headers: {
            authorization: localStorage.getItem('token'),
          },
        });
        const newResponse = await axios({
          method: 'get',
          url: `${process.env.VUE_APP_API_URL}${COMMENTS}/byArticle/${state.current_article.id}`,
        });
        commit('SET_COMMENTS', newResponse.data);
      } catch (error) {
        alert(error.newResponse.data);
      }
    },
    async increaseView({ commit }, articleId) {
      const response = await axios({
        url: `${process.env.VUE_APP_API_URL}${ARTICLES}/view/${articleId}`,
        method: 'get',
      });
      commit('SET_CURR_ARTICLE', response.data);
    },
    async updateArticle(
      { commit },
      { articleId, title, text, author, tags, categoryId }
    ) {
      try {
        const response = await axios({
          url: `${process.env.VUE_APP_API_URL}${ARTICLES}/${articleId}`,
          method: 'patch',
          data: {
            title,
            text,
            author,
            tags,
            categoryId,
          },
          headers: {
            authorization: localStorage.getItem('token'),
          },
        });
        commit('SET_ARTICLES', response.data);
      } catch (error) {
        console.log(error);
        alert(error.response?.data[0].message || error.response.data);
      }
    },
    async deleteArticle({ commit }, articleId) {
      const response = await axios({
        method: 'delete',
        url: `${process.env.VUE_APP_API_URL}${ARTICLES}/${articleId}`,
        headers: {
          authorization: localStorage.getItem('token'),
        },
      });
      if (response.status === 200) {
        commit('SET_ARTICLES', response.data);
        alert('Successfully deleted');
      }
    },
    async createArticle({ commit }, { title, text, author, categoryId, tags }) {
      let response;
      try {
        response = await axios({
          method: 'post',
          url: `${process.env.VUE_APP_API_URL}${ARTICLES}`,
          data: {
            title,
            text,
            author,
            categoryId,
            tags,
          },
          headers: {
            authorization: localStorage.getItem('token'),
          },
        });
        if (response.status === 200) {
          commit('SET_ARTICLES', response.data);
          alert('Successfully added');
        }
      } catch (error) {
        alert(error.response?.data[0].message || error.response.data);
      }
    },
    async createCategory({ commit }, { name, description }) {
      let response;
      try {
        response = await axios({
          url: `${process.env.VUE_APP_API_URL}${CATEGORIES}`,
          method: 'post',
          data: {
            name,
            description,
          },
          headers: {
            authorization: localStorage.getItem('token'),
          },
        });
        if (response.status === 200) {
          commit('SET_CATEGORIES', response.data);
          alert('Successfully added');
        }
      } catch (error) {
        alert(error.response?.data[0].message || error.response.data);
      }
    },
    async updateCategory({ commit }, { name, description, categoryId }) {
      let response;
      try {
        response = await axios({
          url: `${process.env.VUE_APP_API_URL}${CATEGORIES}/${categoryId}`,
          method: 'patch',
          data: {
            name,
            description,
          },
          headers: {
            authorization: localStorage.getItem('token'),
          },
        });
        if (response.status === 200) {
          commit('SET_CATEGORIES', response.data);
          alert('Successfully updated');
        }
      } catch (error) {
        alert(error.response?.data[0].message || error.response.data);
      }
    },
    async deleteCategory({ commit }, categoryId) {
      let response;
      try {
        response = await axios({
          url: `${process.env.VUE_APP_API_URL}${CATEGORIES}/${categoryId}`,
          method: 'delete',
          headers: {
            authorization: localStorage.getItem('token'),
          },
        });
        if (response.status === 200) {
          commit('SET_CATEGORIES', response.data);
          alert('Successfully deleted');
        }
      } catch (error) {
        alert(error.response?.data[0].message || error.response.data);
      }
    },
    async fetchUsers({ commit }) {
      let response;
      try {
        response = await axios({
          url: `${process.env.VUE_APP_API_URL}${USERS}`,
          method: 'get',
          headers: {
            authorization: localStorage.getItem('token'),
          },
        });
        if (response.status === 200) {
          commit('SET_USERS', response.data);
        }
      } catch (error) {
        alert(error.response?.data[0].message || error.response.data);
      }
    },
    async deleteUser({ commit }, userId) {
      let response;
      try {
        response = await axios({
          url: `${process.env.VUE_APP_API_URL}${USERS}/${userId}`,
          method: 'delete',
          headers: {
            authorization: localStorage.getItem('token'),
          },
        });
        if (response.status === 200) {
          commit('SET_USERS', response.data);
          alert('Successfully deleted');
        }
      } catch (error) {
        alert(error.response?.data[0].message || error.response.data);
      }
    },
    async createUser(
      { commit },
      { email, name, surname, type, active, password }
    ) {
      let response;
      try {
        response = await axios({
          url: `${process.env.VUE_APP_API_URL}${USERS}`,
          method: 'post',
          data: {
            email,
            name,
            surname,
            type,
            active,
            password,
          },
          headers: {
            authorization: localStorage.getItem('token'),
          },
        });
        if (response.status === 200) {
          commit('SET_USERS', response.data);
          alert('Successfully created');
        }
      } catch (error) {
        alert(error.response?.data[0].message || error.response.data);
      }
    },
    async updateUser(
      { commit },
      { email, name, surname, type, active, userId }
    ) {
      let response;
      try {
        response = await axios({
          url: `${process.env.VUE_APP_API_URL}${USERS}/${userId}`,
          method: 'patch',
          data: {
            email,
            name,
            surname,
            type,
            active,
          },
          headers: {
            authorization: localStorage.getItem('token'),
          },
        });
        if (response.status === 200) {
          commit('SET_USERS', response.data);
          alert('Successfully updated');
        }
      } catch (error) {
        alert(error.response?.data[0].message || error.response.data);
      }
    }
  },
  mutations: {
    SET_ARTICLES(state, articles) {
      state.articles = articles;
    },
    SET_TOTAL_PAGES(state, articles){
      state.totalPages = Math.ceil(articles.length / 10);
    },
    SET_USERS(state, users) {
      state.users = users;
    },
    SET_CATEGORIES(state, categories) {
      state.categories = categories;
    },
    SET_COMMENTS(state, comments) {
      state.comments = comments;
    },
    SET_MOST_VIEWED(state, most_viewed) {
      state.most_viewed = most_viewed;
    },
    SET_CURR_CATEGORY(state, category) {
      state.current_category = category;
    },
    SET_CURR_ARTICLE(state, article) {
      state.current_article = article;
      state.current_tags = article.tags.split(';').filter((tag) => tag);
    },
    SET_USER(state, user) {
      state.user = user;
    },
    SET_TAGGED_ARTICLES(state, articles) {
      for (let article of articles) article.showCategory = true;
      state.tagged_articles = articles;
    },
    SET_READ_MORE(state, read_more) {
      state.read_more = read_more;
    }
  },
  plugins: [createPersistedState()],
});
