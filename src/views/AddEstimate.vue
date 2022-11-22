<template>
  <h1>add estimate</h1>
  <div class="card mb-4" v-for="question in formDefinition.estimations" :key="question.propertyName">
            <div class="card-content has-text-centered">
                <p class="title is-size-4">{{localize(question.title)}}</p>
                <p class="subtitle is-size-6">{{localize(question.subtitle)}}</p>
                <div class="columns">
                    <div class="column" v-for="option in question.options" :key="option.value">
                        <hr class="m-0" />
                        <label :for="`${option.value}${question.propertyName}`" class="radio">
                            <input @change="validateForm" :id="`${option.value}${question.propertyName}`" v-model="estimate[question.propertyName]" :value="option.value" type="radio" :name="question.propertyName" />
                            <div>
                                <div>{{$filters.gradeIcon(option.value)}}</div>
                                <small v-show="helpText">{{localize(option.option)}}</small>
                                <button v-show="audioButton" class="button is-small is-fullwidth" @click="toggleAudio(option.audio)">
                                    <!-- <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                                        <path fill="currentColor" d="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z" />
                                    </svg> -->
                                    <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                                        <path fill="currentColor" d="M9,5A4,4 0 0,1 13,9A4,4 0 0,1 9,13A4,4 0 0,1 5,9A4,4 0 0,1 9,5M9,15C11.67,15 17,16.34 17,19V21H1V19C1,16.34 6.33,15 9,15M16.76,5.36C18.78,7.56 18.78,10.61 16.76,12.63L15.08,10.94C15.92,9.76 15.92,8.23 15.08,7.05L16.76,5.36M20.07,2C24,6.05 23.97,12.11 20.07,16L18.44,14.37C21.21,11.19 21.21,6.65 18.44,3.63L20.07,2Z" />
                                    </svg>
                                </button>
                            </div>
                        </label>
                        <hr class="m-0" />                           
                    </div>                        
                </div>
            </div>
        </div>

        <div class="card mb-4">
            <div class="card-content">
                <p class="title">Hur söker du ett arbete?</p>
                <p class="subtitle">Kryssa gärna i fler alternativ</p>
                <div class="rows" v-for="option in formDefinition.questions" :key="option.propertyName">
                    <div class="row my-2">
                        <label :for="option.propertyName" :class="option.type">  
                            <input :class="option.class" :id="option.propertyName" v-model="estimate[option.propertyName]" :type="option.type" :placeholder="option.type == 'text' ? 'Annat sätt? - ange det här!' : null " />
                            {{localize(option.question)}}
                        </label>
                    </div>
                </div>   
            </div>
        </div>
        <button class="button" @click="addEstimate">Lägg till skattning</button>
</template>

<script setup>
import { ref, inject, reactive } from 'vue'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../js/firebase'
import { useStoreAuth } from '../stores/storeAuth'
import { useRoute, useRouter } from 'vue-router'
const storeAuth = useStoreAuth() 
const router = useRouter()
const route = useRoute()

const helpText = ref(true)
const audioButton = ref(true)

    const formDefinition = inject('formDefinition')
    const localize = inject('localize')

    const estimate = ref({})

//     const beliefInWork = reactive(null)
//     const laborMarket = reactive(null)
//     const purposeFulness = reactive(null)
//     const abilityToWorkTogether = reactive(null)
//     const handlingOfEverydayLife = reactive(null)
//     const stateOfHealth = reactive(null)
//    const  adverts = reactive(false)
//    const jobportal = reactive(false)
//    const employer = reactive(false)
//    const family = reactive(false)
//    const internship = reactive(false)
//    const staffingcompanies = reactive(false)
//    const socialmedia = reactive(false)
//    const notlookingforwork = reactive(false)
//    const otherways = reactive('')

const addEstimate = async () => {
 
    let currentDate = new Date().getTime(),
    date = currentDate.toString()

    const docRef = await addDoc(collection(db, 'users', storeAuth.user.id, 'clients', route.params.id, 'estimates'), estimate.value
        // beliefInWork: 2,
        // laborMarket: 3,
        // purposeFulness: 4,
        // abilityToWorkTogether: 5,
        // handlingOfEverydayLife: 5,
        // stateOfHealth: 1,
        // adverts: false,
        // jobportal: true,
        // employer: false,
        // family: false,
        // internship: false,
        // staffingcompanies: true,
        // socialmedia: true,
        // notlookingforwork: false,
        // otherways: 'Annat sätt',
        // date
    )
    console.log("Document written with ID: ", docRef.id);
 
//  await addDoc(collection(db, 'users', storeAuth.user.id, 'clients', route.params.id, 'estimates', {
//    beliefInWork: parseInt(beliefInWork),
//    laborMarket: parseInt(laborMarket),
//    purposeFulness: parseInt(purposeFulness),
//    abilityToWorkTogether: parseInt(abilityToWorkTogether),
//    handlingOfEverydayLife: parseInt(handlingOfEverydayLife),
//    stateOfHealth: parseInt(stateOfHealth),
//    adverts: adverts,
//    jobportal: jobportal,
//    employer: employer,
//    family: family,
//    internship: internship,
//    staffingcompanies: staffingcompanies,
//    socialmedia: socialmedia,
//    notlookingforwork: notlookingforwork,
//    otherways: otherways,
//    date
//  }) )

 router.back()
}

</script>

<style>

</style>