<template>
    <div class="edit-note">
        <AddEditNote :note="noteContent" bgColor="link" label="Edit Note" ref="addEditNoteRef" >
          <template #default>
            <button class="button is-link is-light mr-2" @click="$router.back()">Cancel</button>
            <button @click="handleSaveClicked" class="button is-link has-background-link" :disabled="!noteContent">Save note</button>
          </template>
      </AddEditNote>
    </div>
</template>

<script setup>
//IMPORTS
import { reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AddEditNote from '../components/Notes/AddEditNote.vue'
import { useStoreNotes } from '../stores/storeNotes'

//ROUTER
const route = useRoute()
const router = useRouter()

//STORE
const storeNotes = useStoreNotes()

//NOTE
let note = storeNotes.getNoteContent(route.params.id)
const noteContent = reactive(note)
console.log(note)

//SAVED CLICKED
const handleSaveClicked = () => {
    storeNotes.updateNote(route.params.id, noteContent)
    router.push('/')
}

</script>
