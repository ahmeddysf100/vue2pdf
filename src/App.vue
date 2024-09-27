<template>
  <div class="app">
    <h1>VUE TO PDF</h1>
    <router-view />
  </div>
</template>

<script setup>
import { RouterView } from "vue-router";
</script>

<style>
html,
body {
  height: 100%; 
  margin: 0; 
  display: flex;
  justify-content: center; 

  --color: #e1e1e1;
  background-color: #f3f3f3;
  background-image: linear-gradient(
      0deg,
      transparent 24%,
      var(--color) 25%,
      var(--color) 26%,
      transparent 27%,
      transparent 74%,
      var(--color) 75%,
      var(--color) 76%,
      transparent 77%,
      transparent
    ),
    linear-gradient(
      90deg,
      transparent 24%,
      var(--color) 25%,
      var(--color) 26%,
      transparent 27%,
      transparent 74%,
      var(--color) 75%,
      var(--color) 76%,
      transparent 77%,
      transparent
    );
  background-size: 55px 55px;
}

.modal-open {
  overflow: hidden !important;
}


.app {
  display: flex;
  flex-direction: column;
  justify-content: flex-start; 
  align-items: center;
  width: 1000px;
  margin: 10px;
  padding: 10px; 
  font-size: 16px;
  font-family: sans-serif;
  color: #333;
}
@media (max-width: 600px) {
  .app {
    width: 500px;
  }
}
@media (max-width: 400px) {
  .app {
    width: 300px;
  }
}
</style>
