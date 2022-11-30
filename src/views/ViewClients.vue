<template>
  <!--ADD CLIENT FORM-->
  <form @submit.prevent="addClient">
    <div class="card mb-3">
        <header class="card-header">
            <p class="card-header-title">
            Lägg till klient
            </p>
            <button class="card-header-icon" aria-label="more options">
            <span class="icon">
                <i class="fas fa-solid fa-user-plus" aria-hidden="true"></i>
            </span>
            </button>
        </header>
        <div class="card-content">
            <div class="field">
                <label class="label">Förnamn</label>
                <div class="control">
                    <input v-focus v-model="firstName" class="input" type="text" required />
                </div>
            </div>

            <div class="field">
                <label class="label">Födelseår</label>
                <div class="control">
                    <input v-model="birthYear" class="input" type="number" required />
                </div>
            </div>

            <div class="field">
                <label class="label">E-post</label>
                <div class="control">
                    <input v-model="email" class="input" type="email" required />
                </div>
            </div>

            <div class="field">
                <label class="label">Anteckning</label>
                <div class="control">
                    <textarea v-model="annotation" class="textarea"></textarea>
                </div>
            </div>

        </div>
        <button type="submit" class="button is-success mb-3 ml-3">Lägg till klient</button>
    </div>
  </form>

        <!-- <div v-if="notification" class="notification is-success is-light">
          <button class="delete"></button>
          Client added successfully.
        </div> -->

  <!--NOTIFICATION WHEN SUCCESSFULLY ADDED TO DB-->
  <Notification v-if="notification">
    <button class="delete"></button>
    Client added successfully.
  </Notification>

  <!--SEARCH CLIENT INPUT-->
  <div class="card mb-3">
      <header class="card-header">
          <p class="card-header-title">
          Sök klient
          </p>
          <button class="card-header-icon" aria-label="more options">
          <span class="icon">
              <i class="fas fa-solid fa-magnifying-glass" aria-hidden="true"></i>
          </span>
          </button>
      </header>
      <div class="card-content">
          <div class="field">
            <input class="input" type="text" v-model="search" placeholder="Sök klient.."/>
          </div>
      </div>
  </div>

  <!--LOADING-->
  <progress v-if="!storeNotes.clientsLoaded" class="progress is-large is-success" max="100" />
  
  <template
    v-else
  >
  <!--CLIENT LIST-->
  <Client
    v-for="client in filteredList"
    :key="client.id"
    :client="client"
  />

  <!--FOUND NO CLIENTS-->
  <div
    v-if="!storeNotes.clients.length"
    class="is-size-4 has-text-centered has-text-grey-light is-family-monospace py-6"
  >
    Inga klienter tillagda ännu...
  </div>
  </template>
    
</template>
  
<script setup>
//IMPORTS
import { ref, computed } from 'vue'
import Client from '../components/clients/Client.vue'   
import { useStoreNotes } from '../stores/storeNotes'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../js/firebase'
import { useStoreAuth } from '../stores/storeAuth'
import Notification from '../components/Notification.vue'

//SEARCH INPUT
let search = ref('')

//FILTER CLIENT LIST WHEN SEARCHING
let filteredList = computed(() => {
  
  return storeNotes.clients.filter(post => {
    return post.firstName.toLowerCase().includes(search.value.toLowerCase())
  })

})
  
//STORE VARIABLES
const storeNotes = useStoreNotes()
const storeAuth = useStoreAuth()

//ADD NEW CLIENT
const firstName = ref('')
const birthYear = ref('')
const email = ref('')
const annotation = ref('')

//HIDE NOTIFICATION
let notification = ref(false)

//ADD NEW CLIENT
const addClient = async ()  => {
 
 let currentDate = new Date().getTime(),
 createdAt = currentDate.toString()

 await addDoc(collection(db, 'users', storeAuth.user.id, 'clients'), {
   firstName: firstName.value,
   birthYear: birthYear.value,
   email: email.value,
   annotation: annotation.value,
   createdAt
 })
   firstName.value = ''
   birthYear.value = ''
   email.value = ''
   annotation.value = ''
   notification.value = true
   setTimeout(() => {
    notification.value = false
   }, 5000)
}
  
</script>
  
<style scoped>
.card-footer-item {
  justify-content: flex-start !important;
}
</style>