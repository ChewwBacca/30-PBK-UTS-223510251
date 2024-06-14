<template>
    <div class="container">
      <div class="konten">
        <h2>Album List</h2>
        <ul>
          <li v-for="album in albums" :key="album.id">
            <router-link :to="`/albums/${album.id}`">{{ album.title }}</router-link>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  import { useMainStore } from '../store/index.js';
  import { onMounted } from 'vue';
  
  export default {
    setup() {
      const store = useMainStore();
  
      onMounted(async () => {
        if (store.albums.length === 0) {
          const response = await fetch('https://jsonplaceholder.typicode.com/albums');
          const data = await response.json();
          store.setAlbums(data);
        }
      });
  
      return {
        albums: store.albums,
      };
    },
  };
  </script>
  
  <style>
  .konten {
    margin-top: 20px;
  }
  </style>
  