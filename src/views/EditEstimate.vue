<template>
  <h1>Edit estimate</h1>
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">
          Skattning gjord {{estimate.date }}
        </p>
        <button class="card-header-icon" aria-label="more options">
          <span class="icon">
            <i class="fas fa-solid fa-chart-line" aria-hidden="true"></i>
          </span>
        </button>
      </header>
      <div class="card-content">
        <div class="content">

          <div class="field">
            <label class="label">Tror du att du kan klara av att arbeta?</label>
            <div class="control">
              <input v-model="estimate.beliefInWork" class="input" type="number">
            </div>
          </div>

          <div class="field">
            <label class="label">Tror du att dina kompetenser är till nytta på en arbetsplats?</label>
            <div class="control">
              <input v-model="estimate.laborMarket" class="input" type="number">
            </div>
          </div>

          <div class="field">
            <label class="label">Vet du vad du ska göra för att förbättra dina möjligheter att nå ett arbete?</label>
            <div class="control">
              <input v-model="estimate.purposeFulness" class="input" type="number">
            </div>
          </div>
          <div class="field">
            <label class="label">Hur bra är du på att arbeta med andra?</label>
            <div class="control">
              <input v-model="estimate.abilityToWorkTogether" class="input" type="number">
            </div>
          </div>
          <div class="field">
            <label class="label">Har du tid i vardagen att fokusera på att få ett arbete/praktik eller utbildning?</label>
            <div class="control">
              <input v-model="estimate.handlingOfEverydayLife" class="input" type="number">
            </div>
          </div>
          <div class="field">
            <label class="label">Hur bedömer du att ditt allmänna hälsotillstånd är i förhållande till att arbeta?</label>
            <div class="control">
              <input v-model="estimate.stateOfHealth" class="input" type="number">
            </div>
          </div>

          <div class="field">
            <div class="control">
              <label class="checkbox">
                <input v-model="estimate.adverts" type="checkbox">
                Genom annonser i tidningar, tidskrifter och liknande
              </label>
            </div>
          </div>

          <div class="field">
            <div class="control">
              <label class="checkbox">
                <input v-model="estimate.jobportal" type="checkbox">
                Genom jobbportaler via internet
              </label>
            </div>
          </div>

          <div class="field">
            <div class="control">
              <label class="checkbox">
                <input v-model="estimate.employer" type="checkbox">
                Har kontaktat en arbetsgivare på eget initiativ (ex. ringt, skickat in en spontanansökan eller besökt deras arbetsplats)
              </label>
            </div>
          </div>

          <div class="field">
            <div class="control">
              <label class="checkbox">
                <input v-model="estimate.family" type="checkbox">
                Har frågat min familj, vänner och bekanta om de känner någon som kan hjälpa mig att hitta ett arbete
              </label>
            </div>
          </div>
          <div class="field">
            <div class="control">
              <label class="checkbox">
                <input v-model="estimate.internship" type="checkbox">
                Har gjort min praktik uppmärksam på att jag gärna vill ha en anställning efter att praktiken är över
              </label>
            </div>
          </div>
          <div class="field">
            <div class="control">
              <label class="checkbox">
                <input v-model="estimate.staffingcompanies" type="checkbox">
                Bemanningsföretag, rekryteringsbyrå
              </label>
            </div>
          </div>
          <div class="field">
            <div class="control">
              <label class="checkbox">
                <input v-model="estimate.socialmedia" type="checkbox">
                Social medier, Facebook och LinkedIn t.ex.
              </label>
            </div>
          </div>
          <div class="field">
            <div class="control">
              <label class="checkbox">
                <input v-model="estimate.notlookingforwork" type="checkbox">
                Jag letar inte efter arbete (eftersom jag är sjuk eller av andra skäl)
              </label>
            </div>
          </div>    

          <div class="field">
            <label class="label">Andra sätt</label>
              <div class="control">
                <input v-model="estimate.otherways" class="input" type="text">
              </div>
          </div>


        </div>
      </div>
      <footer class="card-footer">
        <a @click="updateEstimate" href="#" class="card-footer-item">Save</a>
        <a @click="router.back()" href="#" class="card-footer-item">Cancel</a>
        <a @click="deleteEstimate" href="#" class="card-footer-item">Delete</a>
      </footer>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore'
import { useRoute, useRouter } from 'vue-router'
import { db } from '../js/firebase'
import { useStoreAuth } from '../stores/storeAuth'
const storeAuth = useStoreAuth() 
const route = useRoute()
const router = useRouter()
let estimate = ref({})

let test = route.params.client_id
console.log(test)


const getEstimate = async () => {
    const docSnap = await getDoc(doc(db, 'users', storeAuth.user.id, 'clients', route.params.client_id, 'estimates', route.params.estimate_id))
    if (docSnap.exists()) {  
      console.log("Document data:", docSnap.data())
      estimate.value = docSnap.data()
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!")
    }
}


const updateEstimate = async () => {
        //console.log(content)
        await setDoc(doc(db, 'users', storeAuth.user.id, 'clients', route.params.client_id, 'estimates', route.params.estimate_id), estimate.value)
router.back()
}

const deleteEstimate = async () => {
    await deleteDoc(doc(db, 'users', storeAuth.user.id, 'clients', route.params.client_id, 'estimates', route.params.estimate_id))
    router.push('/')
}

onMounted(() => {
  getEstimate()
})
</script>

<style>

</style>