<template>
  <div class="form">
    <label for="categoryTitle">Title</label>
    <textarea
      v-model="categoryName"
      type="text"
      id="categoryTitle"
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
      <input @click="updateCategory()" type="submit" value="Save" />
      <input @click="deleteCategory()" type="submit" value="Delete" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'category',
  props: ['category'],
  methods: {
    deleteCategory() {
      this.$store.dispatch('deleteCategory', this.category.id);
      this.$store.dispatch('fetchCategories');
    },
    updateCategory() {
      if (this.categoryName === '' || this.categoryDescription === '') {
        alert('Morate uneti sva polja!')
        return
      }
      this.$store.dispatch('updateCategory', {
        name: this.categoryName,
        description: this.categoryDescription,
        categoryId: this.category.id,
      });
    },
  },
  data() {
    return {
      categoryName: this.category.name,
      categoryDescription: this.category.description,
    };
  },
};
</script>

<style scoped>
.form {
  width: 500px;
  padding: 0px 15px;
  background-color: #246c;
  background-image: linear-gradient(to bottom, transparent, #0009);
  height: 340px;
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
