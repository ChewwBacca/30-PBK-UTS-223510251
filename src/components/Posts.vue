<template>
    <div class="container">
      <div class="konten">
        <h2>Postingan User</h2>
        <select v-model="selectedUser">
          <option value="" selected>Pilih Username</option>
          <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
        </select>
        <div v-if="selectedUser !== ''">
          <div v-if="posts.length > 0">
            <h3>{{ selectedUsername }}</h3>
            <ul>
              <li v-for="post in posts" :key="post.id">{{ post.title }}</li>
            </ul>
          </div>
          <div v-else>
            <p>Loading...</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        selectedUser: '',
        users: [],
        posts: [],
      };
    },
    computed: {
      selectedUsername() {
        const user = this.users.find((user) => user.id == this.selectedUser);
        return user ? user.name : '';
      },
    },
    watch: {
      selectedUser(newVal) {
        if (newVal !== '') {
          this.fetchPosts();
        }
      },
    },
    methods: {
      async fetchUsers() {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        this.users = await response.json();
      },
      async fetchPosts() {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${this.selectedUser}`);
        this.posts = await response.json();
      },
    },
    created() {
      this.fetchUsers();
    },
  };
  </script>
  
  <style>
  .konten {
    margin-top: 20px;
  }
  </style>
  