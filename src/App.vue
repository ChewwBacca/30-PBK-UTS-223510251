<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light" id="nav">
      <router-link class="btn btn-light" to="/todos">Todos</router-link>
      <router-link class="btn btn-light" to="/posts">Posts</router-link>
      <router-link class="btn btn-light" to="/albums">Albums</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<style>
#nav {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}
#nav .btn {
  margin: 0 10px;
  text-decoration: none;
}
</style>
