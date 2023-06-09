<template>
  <div class="whole">
    <Header />
    <hr class="line" />
    <div>
      <div class="createForm">
        <label for="categoryName">Name</label>
        <textarea
          v-model="categoryName"
          type="text"
          id="categoryName"
          name="firstname"
          placeholder="Title..."
        />
        <label for="categoryDescription">Description</label>
        <textarea
          v-model="categoryDescription"
          class="txtArea"
          type="text"
          id="categoryDescription"
          name="lastname"
          placeholder="Text..."
        ></textarea>
        <div class="formBtns">
          <input @click="createCategory()" type="submit" value="Create" />
        </div>
        <hr class="line" />
      </div>
    </div>
    <div>
      <section class="articles">
        <CategoryForm
          v-for="category in categories"
          :key="category.id"
          :category="category"
        />
      </section>
    </div>
    <Footer class="foot" />
  </div>
</template>

<script>
import Header from '../../utils/Header.vue';
import Footer from '../../utils/Footer.vue';
import CategoryForm from '../../forms/CategoryForm.vue';
import { mapState } from 'vuex';
export default {
  name: 'Categories',
  components: {
    Header,
    Footer,
    CategoryForm,
  },
  methods: {
    createCategory() {
      if (this.categoryName === '' || this.categoryDescription === '') {
        alert('Morate uneti sva polja!')
        return
      }
      this.$store.dispatch('createCategory', {
        name: this.categoryName,
        description: this.categoryDescription,
      });
      this.categoryName = '';
      this.categoryDescription = '';
    },
  },
  mounted() {
    this.$store.dispatch('fetchCategories');
  },
  computed: {
    ...mapState(['categories']),
  },
  data() {
    return {
      categoryName: '',
      categoryDescription: '',
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
