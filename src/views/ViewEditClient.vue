<template>
    <div class="edit-client">
        <AddEditClient :client="clientContent" bgColor="link" label="Edit Client" ref="addEditClientRef">
          <template #default>
            <button class="button is-link is-light mr-2" @click="$router.back()">Cancel</button>
            <button @click="handleSavedClient" class="button is-link has-background-link" :disabled="!clientContent">Uppdatera klient</button>
          </template>
      </AddEditClient>
    </div>
</template>

<script setup>
//IMPORTS
import { reactive, inject } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AddEditClient from '../components/clients/AddEditClient.vue'
import { useStoreNotes } from '../stores/storeNotes'

const formDefinition = inject('formDefinition')
const localize = inject('localize')

//ROUTER
const route = useRoute()
const router = useRouter()

//STORE
const storeNotes = useStoreNotes()


//CLIENT
let client = storeNotes.getClientContent(route.params.id)
const clientContent = reactive(client)
console.log(client)

//SAVED CLICKED
const handleSavedClient = () => {
    storeNotes.updateClient(route.params.id, clientContent)
    router.push('/')
}
</script>
