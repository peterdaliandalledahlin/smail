<template>
    <!--FORM PERSONAL SETTINGS-->
    <fieldset class="fieldset mb-3">
        <legend>Personliga inställningar</legend>
        <div class="container">
            <form class="form cf mb-3">
                <section class="plan cf">
                    <input class="language" v-model="currentLanguage" type="radio" name="language" id="sv" value="sv"><label class="free-label four" for="sv">Svenska</label>
                    <input class="language" v-model="currentLanguage" type="radio" name="language" id="ar" value="ar"><label class="between-label four" for="ar">Arabiska</label>
                    <input class="language" v-model="currentLanguage" type="radio" name="language" id="en" value="en"><label class="between-label four" for="en">Engelska</label>
                    <input class="language" v-model="currentLanguage" type="radio" name="language" id="so" value="so"><label class="basic-label four" for="so">Somaliska</label>
                </section> 
            </form>
        </div>
        <div class="container">
            <form class="form cf mb-3">
                <section class="plan cf">
                    <input v-model="myGlobalVariable" type="radio" name="icon-switch" id="smiley" value="smiley"><label class="free-label four" for="smiley">Smiley</label>
                    <input v-model="myGlobalVariable" type="radio" name="icon-switch" id="number" value="number"><label class="basic-label four" for="number">Siffror</label>
                </section> 
            </form>
        </div>
        <div class="field">
            <label class="switch is-rounded">
                <input v-model="helpText" type="checkbox">
                <span class="check"></span>
                <span class="control-label">Visa hjälptext</span>
            </label>
        </div>
        <div class="field">
            <label class="switch is-rounded">
                <input v-model="audioButton" type="checkbox">
                <span class="check"></span>
                <span class="control-label">Visa ljuduppspelning</span>
            </label>
        </div>
    </fieldset>

    <!--HEADLINE ADD ESTIMATE-->
    <div class="card">
        <div class="card-content has-text-centered">
            <div class="content">
                <p class="title is-size-4">Lägg till en ny skattning för {{client.email}}.</p> 
            </div>
        </div>
    </div>

    <!--ESTIMATE FORM CARD-->
  <div class="card mb-4" v-for="question in formDefinition.estimations" :key="question.propertyName">
            <div class="card-content has-text-centered">
                <p class="title is-size-5">{{localize(question.title)}}</p>
                <p class="subtitle is-size-6">{{localize(question.subtitle)}}</p>
                <div class="columns">
                    <div class="column" v-for="option in question.options" :key="option.value">
                        <hr class="m-0" />
                        <label :for="`${option.value}${question.propertyName}`" class="radio">
                            <input @change="validateForm" :id="`${option.value}${question.propertyName}`" v-model="estimate[question.propertyName]" :value="option.value" type="radio" :name="question.propertyName" />
                            <div>
                                <div>{{$filters.gradeIcon(option.value)}}</div>
                                <small v-show="helpText">{{localize(option.option)}}</small>
                                <button v-show="audioButton" class="button is-small is-fullwidth" @click="toggleAudio(option.option)">
                                    <figure class="image is-25x25">
                                        <img src="../assets/tal.png">
                                    </figure>
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

    <!--CANCEL AND ADD ESTIMATE BUTTON-->
    <button class="button" @click="router.back()">Avbryt</button>
    <button class="button ml-3" @click="addEstimate" :disabled="!formValidated">Lägg till skattning</button>
    
    <!--SHOW NOTIFICATION WHEN SAVE SUCCESS-->
    <Notification v-if="notification">
        <button class="delete"></button>
        Skattning sparad!
    </Notification>
</template>

<script setup>
//IMPORTS
import { ref, inject, onMounted } from 'vue'
import { collection, addDoc, doc, getDoc } from 'firebase/firestore'
import { db } from '../js/firebase'
import { useStoreAuth } from '../stores/storeAuth'
import { useRoute, useRouter } from 'vue-router'
import {Howl, Howler} from 'howler'
import Notification from '../components/Notification.vue'

//GET LOGGED IN USER FROM AUTH STORE
const storeAuth = useStoreAuth()

//HANDLE PARAMS & REDIRECTS
const router = useRouter()
const route = useRoute()

//INITIALLIZE HELPTEXT AND AUDIOBUTTON
const helpText = ref(true)
const audioButton = ref(false)

//INITIALIZE AND HIDE NOTIFICATION
let notification = ref(false )

//INJECT DATA FROM MAINJS
const formDefinition = inject('formDefinition')
const localize = inject('localize')
const currentLanguage = inject('currentLanguage')
const myGlobalVariable = inject('myGlobalVariable')

//INITIALIZE ESTIMATE OBJECT & SAVE TO DATABASE
const estimate = ref({})
let client = ref({})

//GET CLIENT EMAIL FROM DB, INFO IN HEADLINE
const getClient = async () => {
    const docSnap = await getDoc(doc(db, 'users', storeAuth.user.id, 'clients', route.params.id))
    if (docSnap.exists()) {  
      client.value = docSnap.data()
    } else {
      console.log("No such document!")
    }
}

//SAVE ESTIMATE TO DB
const addEstimate = async () => {
 
    let currentDate = new Date().getTime()

    estimate.value.createdAt = currentDate.toString()
    estimate.value.clientId = route.params.id
    console.log(estimate.value)

    const docRef = await addDoc(collection(db, 'users', storeAuth.user.id, 'clients', route.params.id, 'estimates'), estimate.value)
    console.log("Document written with ID: ", docRef.id);

    notification.value = true
    setTimeout(() => {
    notification.value = false
    router.back()
   }, 5000)

}

//TOGGLE AUDIO ICON & PLAY SOUND
const toggleAudio = (id) => {
    console.log(id)
    let sound = new Howl({
        src: [ `${currentLanguage.value}/${id}.mp3`]
    })
    sound.play()
}

//DISABLE SAVE ESTIMATE BUTTON & ENABLE IT WHEN ALL ESTIMATES ARE CHOOSEN
const formValidated = ref(false)

const validateForm = () => {
    formValidated.value = true
    formDefinition.estimations.forEach((question) => {
        
        if(estimate.value[question.propertyName] === undefined) {
            formValidated.value = false
        }
 
    })
}

//RUN GETCLIENT() ONMOUNT
onMounted(() => {
    getClient()
})
</script>

<style scoped>
*, *::before, *::after {
    box-sizing: border-box;
}
@media screen and (max-width: 768px) {

	.radio.ml-5 {
	    margin-left: 0 !important;
	}
    .mr-3 {
        margin-right: 0 !important;
    }
     .card-content {
        padding: .5rem !important;
     }


}
label > div {
    padding: .2rem .5rem;
    
}
label > div > div {
    font-size: 2rem;
    /* height: 2.8rem; */
}
input:not(.language)[type='radio'] {
    display: none;
}
input[type='radio']:not(:checked)+div {
    filter: grayscale(100%);
    border: 2px solid transparent;
}
input[type='radio']:checked+div {
    border: 2px solid #43165c;
    -webkit-box-shadow: 4px 5px 6px -4px #000000; 
    box-shadow: 4px 5px 6px -4px #000000;
}
.switch input[type=checkbox]:checked+.check {
    background: #43165c;
}
.fieldset{
   background-color: #fff;
    border-radius: 6px;
    box-shadow: 0 0.5em 1em -0.125em rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.02);
    color: #4a4a4a;
    display: block;
    padding: 1.25rem;
   border: 1px solid #ccc
}
.fieldset  > legend{
    color: #363636;
    display: block;
    font-size: 1rem;
    font-weight: 700;
    background-color: #fff;
    padding: 0 5px;
	width: max-content;
	border: 0 none;
    border-radius: 3px;
}


.free-label, .between-label, .basic-label {
    user-select: none;
} 

/* CONTAINERS */

.container {

    width: 100%;
    margin: 0 auto;

}
section {
    display: flex;
}
.four { width: 10%; max-width: 10%;}
/* CLEARFIX */

.cf:before,
.cf:after {
    content: " ";
    display: table;
}

.cf:after {
    clear: both;
}

.cf {
    *zoom: 1;
}

/* FORM */

.form .plan input, .form .payment-plan input, .form .payment-type input{
  display: none;
}

.form label{
  position: relative;
  color: #fff;
  background-color: #aaa;
  font-size: 1rem;
  text-align: center;
  height: 30px;
  display: block;
  cursor: pointer;
  border: 3px solid transparent;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
.free-label{
    border-radius: 10px 0px 0px 10px;
}
.between-label {
    border-radius: 0px;
}
.basic-label {
    border-radius: 0px 10px 10px 0px;
}

.form .plan input:checked + label, .form .payment-plan input:checked + label, .form .payment-type input:checked + label{
  /* border: 1px solid #333; */
  /* background-color: #2fcc71; */
  background-color: #43165c;
}
.button.ml-3 {
    background-color: #43165c;
    color: azure;
}
</style>