import { defineStore } from 'pinia';

export const useMainStore = defineStore('main', {
  state: () => ({
    todos: [
      { id: 1, text: 'Sereal', done: true, editing: false, newText: '' },
      { id: 2, text: 'Beras', done: true, editing: false, newText: '' },
    ],
    posts: [],
    albums: [],
    photos: [],
  }),
  actions: {
    addTodo(todo) {
      this.todos.push(todo);
    },
    setPosts(posts) {
      this.posts = posts;
    },
    setAlbums(albums) {
      this.albums = albums;
    },
    setPhotos(photos) {
      this.photos = photos;
    },
  },
});
