<template>

  <Header />
  <main class="main">
    <Static />
    <dynamic-template />
  </main>
  <Footer />

</template>
<script setup>
import Header from './components/Static/Header.vue'
import Footer from './components/Static/Footer.vue'
import Static from './components/Static/Static.vue'
import DynamicTemplate from './components/Dynamic/DynamicTemplate.vue'
</script>

<style>

</style>