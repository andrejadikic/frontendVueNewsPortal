<template>
  <div class="form">
    <label for="userEmail">Email</label>
    <textarea
      v-model="userEmail"
      type="text"
      id="userEmail"
      name="firstname"
      placeholder="Title..."
    />

    <label for="userName">Name</label>
    <textarea
      v-model="userName"
      class="txtArea"
      type="text"
      id="userName"
      name="lastname"
      placeholder="Text..."
    ></textarea>
    <label for="userSurname">Surname</label>
    <textarea
      v-model="userSurname"
      type="text"
      id="userSurname"
      name="lastname"
      placeholder="Author..."
    />
    <div v-if="this.user.type !== `admin`" class="userType">
      <label for="userType">Type</label>
      <select :id="`${this.user.id}_type`">
        <option value="content_creator">Content Creator</option>
        <option value="admin">Administrator</option>
      </select>
      <label for="userActive">Active</label>
      <select :id="`${this.user.id}_activity`">
        <option value="true">Active</option>
        <option value="false">Inactive</option>
      </select>
    </div>
    <div class="formBtns">
      <input @click="updateUser()" type="submit" value="Save" />
      <input
        v-if="this.user.type !== `admin`"
        @click="deleteUser()"
        type="submit"
        value="Delete"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'user',
  props: ['user'],
  methods: {
    deleteUser() {
      this.$store.dispatch('deleteUser', this.user.id);
    },
    updateUser() {
      const active = this.user.type === `admin` ?
        true:
        document.getElementById(`${this.user.id}_activity`).value === 'true';

      const type = this.user.type === `admin` ?
        'admin':
        document.getElementById(`${this.user.id}_type`).value;
      this.$store.dispatch('updateUser', {
        email: this.userEmail,
        name: this.userName,
        surname: this.userSurname,
        type,
        active,
        userId: this.user.id,
      });
      this.$store.dispatch('fetchUsers');
    },
  },
  mounted() {
    document.getElementById(`${this.user.id}_activity`).value = this.user.active
      ? 'true'
      : 'false';
    document.getElementById(`${this.user.id}_type`).value = this.user.type;
  },
  data() {
    return {
      userEmail: this.user.email,
      userName: this.user.name,
      userSurname: this.user.surname,
      userType: this.user.type,
      userActive: this.user.userActive,
    };
  },
};
</script>

<style></style>
