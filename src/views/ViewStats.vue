<template>
  <div class="stats">
    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th>Statistik</th>
          <th>Antal</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Hur många skattningar?</td>
          <td>3</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
/*
  imports
*/
  import { ref } from 'vue'
  import { useStoreNotes } from '@/stores/storeNotes'
  import { vAutofocus } from '@/directives/vAutofocus'
  import { useWatchCharacters } from '@/use/useWatchCharacters'
/*
  store
*/
  const storeNotes = useStoreNotes()
/*
  love noteballs
*/
  const loveNoteballs = ref('')
  useWatchCharacters(loveNoteballs, 50)
</script>