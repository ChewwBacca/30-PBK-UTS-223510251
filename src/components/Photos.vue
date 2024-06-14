<template>
  <div class="container">
    <div class="konten">
      <h2>Photos in Album {{ albumId }}</h2>
      <div v-if="photos.length > 0">
        <ul class="photos">
          <li v-for="photo in photos" :key="photo.id" @click="viewPhoto(photo.url)">
            <img :src="photo.thumbnailUrl" :alt="photo.title" />
          </li>
        </ul>
      </div>
      <div v-else>
        <p>Loading...</p>
      </div>
    </div>
  </div>
</template>

<script>
import { useMainStore } from '../store/index.js';
import { onMounted, ref } from 'vue';

export default {
  props: ['albumId'],
  setup(props) {
    const store = useMainStore();
    const photos = ref([]);

    onMounted(async () => {
      const response = await fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${props.albumId}`);
      const data = await response.json();
      photos.value = data;
      store.setPhotos(data);
    });

    const viewPhoto = (url) => {
      window.open(url, '_blank');
    };

    return {
      photos,
      viewPhoto,
    };
  },
};
</script>

<style>
.konten {
  margin-top: 20px;
}
.photos {
  display: flex;
  flex-wrap: wrap;
  justify-content: center; /* Center the photos horizontally */
  gap: 10px; /* Space between the photos */
  list-style: none;
  padding: 0;
}
.photos li {
  cursor: pointer;
}
.photos img {
  width: 150px;
  height: 150px;
  object-fit: cover;
  border: 2px solid #ccc;
  border-radius: 10px;
  transition: transform 0.3s;
}
.photos img:hover {
  transform: scale(1.05);
}
</style>
