<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-info" id="nav">
      <button class="btn btn-light" @click="selectedMenu = 'todos'">Todos</button>
      <button class="btn btn-light" @click="selectedMenu = 'posts'">Posts</button>
    </nav>

    <Todos v-if="selectedMenu === 'todos'" />
    <Posts v-if="selectedMenu === 'posts'" />
  </div>
</template>

<script>
import Todos from './components/Todos.vue';
import Posts from './components/Posts.vue';

export default {
  components: {
    Todos,
    Posts,
  },
  data() {
    return {
      selectedMenu: 'todos',
    };
  },
};
</script>

<style>
#nav {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}
#nav button {
  margin: 0 10px;
}
</style>
