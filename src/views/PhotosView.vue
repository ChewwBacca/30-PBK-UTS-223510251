<template>
    <Photos :albumId="$route.params.id" />
  </template>
  
  <script>
  import Photos from '../components/Photos.vue';
  
  export default {
    components: {
      Photos,
    },
  };
  </script>
  