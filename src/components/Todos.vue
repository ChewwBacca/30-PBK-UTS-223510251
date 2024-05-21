<template>
    <div class="container">
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
  </template>
  
  <script>
  let id = 0;
  
  export default {
    data() {
      return {
        newTodo: '',
        hideCompleted: false,
        todos: [
          { id: id++, text: 'Sereal', done: true, editing: false, newText: '' },
          { id: id++, text: 'Beras', done: true, editing: false, newText: '' },
        ],
      };
    },
    computed: {
      filteredTodos() {
        return this.hideCompleted
          ? this.todos.filter((t) => !t.done)
          : this.todos;
      },
    },
    methods: {
      addTodo() {
        this.todos.push({
          id: id++,
          text: this.newTodo,
          done: false,
          editing: false,
          newText: '',
        });
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
    },
  };
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
  .konten {
    margin-top: 20px;
  }
  </style>
  