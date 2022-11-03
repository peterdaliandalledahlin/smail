<template>
  <div class="notes">

      <!-- <AddEditNote :note="newNote" placeholder="Add a new note" ref="addEditNoteRef"> -->
      <AddEditNote :note="newNote" ref="addEditNoteRef">
        <template #default="scope">
          <button :disabled="!scope.formValidated" @click="addNote" class="button is-link has-background-success" v-text="!scope.formValidated ? 'För att spara måste du skatta dig på alla områden' : 'Lägg till ny skattning'"></button>
      </template>
      </AddEditNote>

      <progress v-if="!storeNotes.notesLoaded" class="progress is-large is-success" max="100" />

      <template
        v-else
      >
      <Note
        v-for="note in storeNotes.notes"
        :key="note.id"
        :note="note"
      />

      <div
        v-if="!storeNotes.notes.length"
        class="is-size-4 has-text-centered has-text-grey-light is-family-monospace py-6"
      >
        No notes here yet...
      </div>
    </template>
  </div>
</template>

<script setup>
//IMPORTS
  import { ref, reactive } from 'vue'
  import Note from '../components/Notes/Note.vue'
  import AddEditNote from '../components/Notes/AddEditNote.vue'
  import { useStoreNotes } from '../stores/storeNotes'
  import { useWatchCharacters } from '../use/useWatchCharacters'

//STORE
  const storeNotes = useStoreNotes()

//NOTES
  const addEditNoteRef = ref(null)

  const addNote = () => {

    storeNotes.addNote(newNote)
  
    newNote.beliefInWork = null
    newNote.laborMarket = null
    newNote.purposeFulness = null
    newNote.abilityToWorkTogether = null
    newNote.handlingOfEverydayLife = null
    newNote.stateOfHealth = null
    newNote.adverts = false
    newNote.jobportal = false
    newNote.employer = false
    newNote.family = false
    newNote.internship = false
    newNote.staffingcompanies = false
    newNote.socialmedia = false
    newNote.notlookingforwork = false
    newNote.otherways = ''
  }

  const newNote = reactive({
    beliefInWork: null,
    laborMarket: null,
    purposeFulness: null,
    abilityToWorkTogether: null,
    handlingOfEverydayLife: null,
    stateOfHealth: null,
    adverts: false,
    jobportal: false,
    employer: false,
    family: false,
    internship: false,
    staffingcompanies: false,
    socialmedia: false,
    notlookingforwork: false,
    otherways: ''
})

//WATCH CHARACTERS
  useWatchCharacters(newNote)

</script>
