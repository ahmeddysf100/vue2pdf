<template>
  <div class="app ">
    <h1>VUE TO PDF</h1>
    <router-view />

    </div>
</template>

<script setup>
import { RouterView } from "vue-router";

</script>

<style >

html, body {
  height: 100%; /* Ensure the body and html take the full viewport height */
  margin: 0; /* Remove default margin */
  display: flex;
  justify-content: center; /* Center horizontally */
  /* Remove align-items: center to allow vertical scrolling */
  background-color: #F3F3F3;
  background-image: linear-gradient(0deg, transparent 24%, var(--color) 25%, var(--color) 26%, transparent 27%, transparent 74%, var(--color) 75%, var(--color) 76%, transparent 77%, transparent),
      linear-gradient(90deg, transparent 24%, var(--color) 25%, var(--color) 26%, transparent 27%, transparent 74%, var(--color) 75%, var(--color) 76%, transparent 77%, transparent);
  background-size: 55px 55px;
}

.app {
  display: flex;
  flex-direction: column;
  justify-content: flex-start; /* Align items to the top */
  align-items: center;
  width: 1000px;
  margin: 10px;
  padding: 10px; /* Added 'px' unit */
  font-size: 16px;
  font-family: sans-serif;
  color: #333;
  
 
}


</style>
