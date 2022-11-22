<template>

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
                        <input v-focus v-model="firstName" class="input" type="text" />
                    </div>
                </div>

                <div class="field">
                    <label class="label">Födelseår</label>
                    <div class="control">
                        <input v-model="birthYear" class="input" type="number" />
                    </div>
                </div>

                <div class="field">
                    <label class="label">E-post</label>
                    <div class="control">
                        <input v-model="email" class="input" type="email" />
                    </div>
                </div>

                <div class="field">
                    <label class="label">Anteckning</label>
                    <div class="control">
                        <textarea v-model="annotation" class="textarea"></textarea>
                    </div>
                </div>

            </div>
            <button @click="addClient" class="button is-success mb-3 ml-3">Lägg till klient</button>
        </div>
  
        <progress v-if="!storeNotes.clientsLoaded" class="progress is-large is-success" max="100" />
  
        <template
          v-else
        >
        <Client
          v-for="client in storeNotes.clients"
          :key="client.id"
          :client="client"
        />

  
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
    import { ref } from 'vue'
    import Client from '../components/clients/Client.vue'
   
    import { useStoreNotes } from '../stores/storeNotes'
    import { collection, addDoc } from 'firebase/firestore'
import { db } from '../js/firebase'
import { useStoreAuth } from '../stores/storeAuth'


  
  //STORE
    const storeNotes = useStoreNotes()
    const storeAuth = useStoreAuth()

    const firstName = ref('')
const birthYear = ref('')
const email = ref('')
const annotation = ref('')

const addClient = async ()  => {
 
 let currentDate = new Date().getTime(),
 date = currentDate.toString()
 

 await addDoc(collection(db, 'users', storeAuth.user.id, 'clients'), {
   firstName: firstName.value,
   birthYear: birthYear.value,
   email: email.value,
   annotation: annotation.value,
   date
 })
   firstName.value = ''
   birthYear.value = ''
   email.value = ''
   annotation.value = ''

}
  
  </script>
  
<style scoped>
.card-footer-item {
  justify-content: flex-start !important;
}
</style>