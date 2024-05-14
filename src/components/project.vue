<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-info" id="nav">
      <button class="btn btn-light" @click="selectedMenu = 'todos'">Todos</button>
      <button class="btn btn-light" @click="selectedMenu = 'posts'">Posts</button>
    </nav>

    <div v-if="selectedMenu === 'todos'" class="container">
      <div class="konten">
        <h1>✦ LIST BELANJA ✦</h1>
        <form @submit.prevent="addTodo">
          <input class="input" v-model="newTodo">
          <button>Tambah</button>
        </form>
        <ul>
          <li v-for="todo in filteredTodos" :key="todo.id">
            <div class="list">
              <input type="checkbox" v-model="todo.done">
              <span :class="{ done: todo.done }">{{ todo.text }}</span>
              <div class="button-group">
                <button @click="editMode(todo)">Edit</button>
                <button @click="removeTodo(todo)">Hapus</button>
              </div>
            </div>
            <div v-if="todo.editing">
              <input class="input" v-model="todo.newText">
              <button @click="saveEdit(todo)">Simpan</button>
            </div>
          </li>
        </ul>
        <button @click="hideCompleted = !hideCompleted">
          {{ hideCompleted ? 'Tampilkan' : 'Sembunyikan' }}
        </button>
      </div>
    </div>

    <div v-if="selectedMenu === 'posts'" class="container">
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
  </div>
</template>

<script>
let id = 0

export default {
  data() {
    return {
      newTodo: '',
      hideCompleted: false,
      selectedMenu: 'todos',
      selectedUser: '',
      todos: [
        { id: id++, text: 'Sereal', done: true, editing: false, newText: '' },
        { id: id++, text: 'Beras', done: true, editing: false, newText: '' },
      ],
      users: [],
      posts: [],
    }
  },
  computed: {
    filteredTodos() {
      return this.hideCompleted
        ? this.todos.filter((t) => !t.done)
        : this.todos
    },
    selectedUsername() {
      const user = this.users.find(user => user.id == this.selectedUser);
      return user ? user.name : '';
    }
  },
  watch: {
    selectedUser(newVal) {
      if (newVal !== '') {
        this.fetchPosts();
      }
    }
  },
  methods: {
    addTodo() {
      this.todos.push({ id: id++, text: this.newTodo, done: false, editing: false, newText: '' });
      this.newTodo = '';
    },
    removeTodo(todo) {
      this.todos = this.todos.filter((t) => t !== todo);
    },
    editMode(todo) {
      todo.editing = true;
      todo.newText = todo.text;
    },
    saveEdit(todo) {
      todo.text = todo.newText;
      todo.editing = false;
    },
    async fetchUsers() {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      this.users = await response.json();
    },
    async fetchPosts() {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${this.selectedUser}`);
      this.posts = await response.json();
    }
  },
  created() {
    this.fetchUsers();
  }
}
</script>

<style>
.done {
  text-decoration: line-through;
}
button {
  border: 2px solid black;
  color: black;
  background-color: gray;
  border-radius: 5px;
}
.list {
  display: flex;
  align-items: center;
}
.button-group {
  margin-left: auto; 
}
#nav {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}
#nav button {
  margin: 0 10px; 
}
.konten {
  margin-top: 20px;
}
</style>
