<template>
  <h1>edit client</h1>
    <div class="card">
            <div class="card-content">
                <div class="field">
                    <label class="label">Förnamn</label>
                    <div class="control">
                        <input v-model="client.firstName" class="input" type="text" />
                    </div>
                </div>

                <div class="field">
                    <label class="label">Födelseår</label>
                    <div class="control">
                        <input v-model="client.birthYear" class="input" type="number" />
                    </div>
                </div>

                <div class="field">
                    <label class="label">E-post</label>
                    <div class="control">
                        <input v-model="client.email" class="input" type="email" />
                    </div>
                </div>

                <div class="field">
                    <label class="label">Anteckning</label>
                    <div class="control">
                        <textarea v-model="client.annotation" class="textarea"></textarea>
                    </div>
                </div>

            </div>
            <button @click="router.back()" class="button">Avbryt</button>
            <button @click="updateClient" class="button is-success">Uppdatera klient</button>
    </div>
</template>

<script setup>
//IMPORTS
import { onMounted, ref } from "vue"
import { doc, getDoc, setDoc } from "firebase/firestore"
import { db } from '../js/firebase'
import { useStoreAuth } from '../stores/storeAuth'
import { useRoute, useRouter } from 'vue-router'

//GET USER FROM AUTH
const storeAuth = useStoreAuth()

//GET ID FROM PARAMS AND REDIRECT
const route = useRoute()
const router = useRouter()

//INITIALIZE CLIENT AND UPDATE CLIENT
let client = ref({})

const getClient = async () => {
    const docSnap = await getDoc(doc(db, 'users', storeAuth.user.id, 'clients', route.params.id))
    if (docSnap.exists()) {  
      console.log("Document data:", docSnap.data())
      client.value = docSnap.data()
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!")
    }
}

const updateClient = async () => {

    let currentDate = new Date().getTime(),
    updatedAt = currentDate.toString()

    await setDoc(doc(db, 'users', storeAuth.user.id, 'clients', route.params.id), {
        firstName: client.value.firstName,
        birthYear: client.value.birthYear,
        email: client.value.email,
        annotation: client.value.annotation,
        updatedAt
    })
    router.back()
}

//FETCH CLIENT ONMOUNT
onMounted(async () => {
    await getClient()
})
</script>
