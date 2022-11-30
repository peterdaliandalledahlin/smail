<template>
  <NavBar />
  <div class="container is-max-desktop px-2 py-4">
    <router-view />
  </div>
</template>

<script setup>
//IMPORTS
import { onMounted } from 'vue'
import NavBar from '@/components/layout/NavBar.vue'
import { useStoreAuth } from './stores/storeAuth'

//GET USER FROM AUTHSTORE
  const storeAuth = useStoreAuth()

//INITIALIZE USER FROM AUTH
onMounted(() => {
  storeAuth.init()
})
  
</script>

<style>
@import 'bulma/css/bulma.min.css';
@import "bulma-switch-control/css/main.min.css";
</style>