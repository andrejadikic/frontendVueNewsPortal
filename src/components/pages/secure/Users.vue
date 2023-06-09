<template>
  <div class="whole">
    <Header />
    <hr class="line" />
    <div>
      <div class="createForm">
        <label for="userEmail">Email</label>
        <textarea
          v-model="userEmail"
          type="text"
          id="userEmail"
          name="firstname"
          placeholder="Email..."
        />
        <label for="userName">Name</label>
        <textarea
          v-model="userName"
          class="txtArea"
          type="text"
          id="userName"
          name="lastname"
          placeholder="Name..."
        ></textarea>
        <label for="surname">Surname</label>
        <textarea
          v-model="userSurname"
          type="text"
          id="surname"
          name="lastname"
          placeholder="Surname..."
        />
        <div class="passes">
          <label for="Password">Password</label>
          <input
            v-model="userPassword"
            class="pass"
            type="password"
            id="userPassword"
            name="lastname"
            placeholder="Password..."
          />
          <label for="confirmPassword">Confirm Password</label>
          <input
            v-model="confirmPassword"
            class="pass"
            type="password"
            id="confirmPassword"
            name="lastname"
            placeholder="Confirm Password..."
          />
        </div>
        <div class="userType">
          <label for="userType">Type</label>
          <select :id="`type`">
            <option value="content_creator">Content Creator</option>
            <option value="admin">Administrator</option>
          </select>
          <label for="userActive">Active</label>
          <select :id="`activity`">
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
        </div>
        <div class="formBtns">
          <input @click="createUser()" type="submit" value="Create" />
        </div>
        <hr class="line" />
      </div>
    </div>
    <div>
      <section class="articles">
        <UserForm v-for="user in users" :key="user.id" :user="user" />
      </section>
    </div>
    <Footer class="foot" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Header from '../../utils/Header.vue';
import Footer from '../../utils/Footer.vue';
import UserForm from '../../forms/UserForm.vue';

export default {
  name: 'Users',
  components: {
    Header,
    Footer,
    UserForm,
  },
  methods: {
    createUser() {
      const active = document.getElementById('activity').value === 'true';
      console.log(active);
      const type = document.getElementById('type').value;
      if (this.userPassword !== this.confirmPassword) {
        alert('Passwords do not match');
      } else {
        this.$store.dispatch('createUser', {
          email: this.userEmail,
          name: this.userName,
          surname: this.userSurname,
          password: this.userPassword,
          active,
          type,
        });
        this.userEmail = '';
        this.userName = '';
        this.userSurname = '';
        this.userPassword = '';
        this.confirmPassword = '';
      }
    },
  },
  mounted() {
    this.$store.dispatch('fetchUsers');
  },
  computed: {
    ...mapState(['users']),
  },
  data() {
    return {
      userEmail: '',
      userName: '',
      userSurname: '',
      userPassword: '',
      confirmPassword: '',
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
  height: 680px;
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

.passes {
  display: flex;
  flex-direction: column;
}
</style>
