<template>
    <div class="content p-4 mb-5" :class="`has-background-${ bgColor }-dark`">
        <fieldset class="fieldset mb-3">
            <legend>Personliga inställningar</legend>
            <div class="field">
                    <div class="control">
                        <label class="radio">
                            <input class="language" id="sv" value="sv" @change="storeNotes.changeLanguageToSwedish" type="radio" name="language" v-model="language">
                            Svenska
                        </label>
                    </div>
                </div>    
                <div class="field">
                    <div class="control">
                        <label class="radio">
                            <input class="language" id="ar" value="ar" @change="storeNotes.changeLanguageToArabic" type="radio" name="language" v-model="language">
                            Arabiska (عربي)
                        </label>
                    </div>
                </div>
                <div class="field">
                    <div class="control">
                        <label class="radio">
                            <input class="language" id="so" value="so" @change="storeNotes.changeLanguageToSomalia" type="radio" name="language" v-model="language">
                            Somaliska (Soomaali)
                        </label>
                    </div>
                </div>

                <div class="container">
                    <form class="form cf mb-3">
                        <section class="plan cf">
                            <input class="language" @change="storeNotes.changeLanguageToSwedish" v-model="language" type="radio" name="language" id="sv" value="sv"><label class="free-label four" for="sv">Svenska</label>
                            <input class="language" @change="storeNotes.changeLanguageToArabic" v-model="language" type="radio" name="language" id="ar" value="ar"><label class="between-label four" for="ar">Arabiska</label>
                            <input class="language" @change="storeNotes.changeLanguageToSomalia" v-model="language" type="radio" name="language" id="so" value="so"><label class="basic-label four" for="so">Somaliska</label>
                        </section> 
                    </form>
                </div>
                
        
                <!-- <div class="field">
                    <div class="control">
                        <label class="radio">
                            <input class="language" id="iconMode_smiley" value="smiley" v-model="myGlobalVariable" type="radio" name="iconMode">
                            Smiley
                        </label>
                    </div>
                </div>
                
                <div class="field">
                    <div class="control">               
                        <label class="radio">
                            <input class="language" id="iconMode_number" value="number" v-model="myGlobalVariable" type="radio" name="iconMode">
                            Siffror
                        </label>
                    </div>
                </div> -->

                <div class="container">
                    <form class="form cf mb-3">
                        <section class="plan cf">
                            <input v-model="myGlobalVariable" type="radio" name="icon-switch" id="smiley" value="smiley"><label class="free-label four" for="smiley">Smiley</label>
                            <input v-model="myGlobalVariable" type="radio" name="icon-switch" id="number" value="number"><label class="basic-label four" for="number">Siffror</label>
                        </section> 
                    </form>
                </div>


                <!-- <div class="field">
                    <div class="control">               
                        <label class="checkbox">
                            <input class="language" id="helpText" @change="helpText = !helpText" type="checkbox" name="helpText">
                            {{helpText ? 'Stäng av hjälptext' : 'Sätt på hjälptxt'}}
                        </label>
                    </div>
                </div> -->
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
                <!-- <div class="field">
                    <div class="control">               
                        <label class="checkbox">
                            <input @change="audioButton = !audioButton" class="language" id="audioButton" type="checkbox" name="audioButton">
                            {{audioButton ? 'Visa ljuduppspelning' : 'Dölj ljuduppspelning'}}
                            <span class="icon is-small">
                                <i :class="!audioButton ? 'fas fa-solid fa-music' : 'fas fa-solid fa-music-slash' "></i>
                            </span>
                        </label>
                    </div>
                </div> -->
                <!-- <button class="button is-small is-link has-background-success mr-3" @click="helpText = !helpText" v-text="helpText ? 'Stäng av hjälptext' : 'Sätt på hjälptxt'"></button> -->
                <!-- <button class="button is-small is-link has-background-success" @click="audioButton = !audioButton" v-text="audioButton ? 'Visa uppspelning' : 'Dölj uppspelning'"></button> -->
        </fieldset>

        <div class="card">
            <div class="card-content">
                <div class="field">
                    <label class="label">Förnamn</label>
                    <div class="control">
                        <input v-model="note.firstName" class="input" type="text" />
                    </div>
                </div>

                <div class="field">
                    <label class="label">Efternamn</label>
                    <div class="control">
                        <input v-model="note.lastName" class="input" type="text" />
                    </div>
                </div>

                <div class="field">
                    <label class="label">E-post</label>
                    <div class="control">
                        <input v-model="note.email" class="input" type="email" />
                    </div>
                </div>

                <div class="field">
                    <label class="label">Anteckning</label>
                    <div class="control">
                        <textarea v-model="note.annotation" class="textarea"></textarea>
                    </div>
                </div>

            </div>
        </div>

        <div class="card mb-4" v-for="question in formDefinition.estimations" :key="question.propertyName">
            <div class="card-content has-text-centered">
                <p class="title is-size-4">{{localize(question.title)}}</p>
                <p class="subtitle is-size-6">{{localize(question.subtitle)}}</p>
                <div class="columns">
                    <div class="column" v-for="option in question.options" :key="option.value">
                        <hr class="m-0" />
                        <label :for="`${option.value}${question.propertyName}`" class="radio">
                            <input @change="validateForm" :id="`${option.value}${question.propertyName}`" v-model="note[question.propertyName]" :value="option.value" type="radio" :name="question.propertyName" />
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
        

        <!-- <div class="card mb-4" v-for="question in storeNotes.estimatesDefault" :key="question.propertyName">
            <div class="card-content has-text-centered">
                <p class="title is-size-4">{{question.title}}</p>
                <p class="subtitle is-size-6">{{question.subtitle}}</p>
                <div class="columns">
                    <div class="column" v-for="option in question.options" :key="option.value">
                        <hr class="m-0" />
                        <label :for="`${option.value}${question.propertyName}`" class="radio">
                            <input @change="validateForm" :id="`${option.value}${question.propertyName}`" v-model="note[question.propertyName]" :value="option.value" type="radio" :name="question.propertyName" />
                            <div>
                                <div>{{$filters.gradeIcon(option.value)}}</div>
                                <small v-show="helpText">{{option.description}}</small>
                                <button v-show="!audioButton" class="button is-small is-fullwidth" @click="toggleAudio(option.audio)">
                                    <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                                        <path fill="currentColor" d="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z" />
                                    </svg>
                                </button>
                            </div>
                        </label>
                        <hr class="m-0" />                           
                    </div>                        
                </div>
            </div>
        </div> -->
        <div class="card mb-4">
            <div class="card-content">
                <p class="title">Hur söker du ett arbete?</p>
                <p class="subtitle">Kryssa gärna i fler alternativ</p>
                <div class="rows" v-for="option in formDefinition.questions" :key="option.propertyName">
                    <div class="row my-2">
                        <label :for="option.propertyName" :class="option.type">  
                            <input :class="option.class" :id="option.propertyName" v-model="note[option.propertyName]" :type="option.type" :placeholder="option.type == 'text' ? 'Annat sätt? - ange det här!' : null " />
                            {{localize(option.question)}}
                        </label>
                    </div>
                </div>   
            </div>
        </div>
            
    </div>

        <div class="field is-grouped is-grouped-right">
            <div class="control">
                <slot :formValidated="formValidated" />
            </div>
        </div>
    
</template>

<script setup>
//IMPORTS
    import { ref, inject } from "vue"
    import { useStoreNotes } from '../../stores/storeNotes'
    import {Howl, Howler} from 'howler'

    const language = ref([])

    
//AUDIO
    const toggleAudio = (id) => {
        var sound = new Howl({
            src: [id]
        })
        sound.play()
    }
    const audioButton = ref(false)
    
//FORM VALIDATION DISABLE BUTTON WHEN INCOMPLETE
    const validateForm = () => {
        formValidated.value = true
        storeNotes.estimatesDefault.forEach((question) => {
            if(props.note[question.propertyName] === null) {
                formValidated.value = false
            }
        })
    }
    const formValidated = ref(false)

//TOGGLE HELPTEXT
    const helpText = ref(true)

//INJECTS VARIABLE FROM MAIN.JS
    const myGlobalVariable = inject('myGlobalVariable')
    const formDefinition = inject('formDefinition')
    const localize = inject('localize')

//STORE
  const storeNotes = useStoreNotes()

//PROPS
    const props = defineProps({
        note: {
            type: Object,
        },
        bgColor: {
            type: String,
            default: 'success'
        },
        label: {
            type: String,
        }
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
    border: 2px solid green;
    -webkit-box-shadow: 4px 5px 6px -4px #000000; 
    box-shadow: 4px 5px 6px -4px #000000;
}
.fieldset{
   background-color: hsl(171, 100%, 96%);
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
    background-color: hsl(171, 100%, 96%);
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
  background-color: hsl(171, 100%, 41%);
}

/* .form .plan input:checked + label:after, form .payment-plan input:checked + label:after, .form .payment-type input:checked + label:after{
  content: "\2713";
  width: 40px;
  height: 40px;
  line-height: 40px;
  border-radius: 100%;
  border: 2px solid #333;
  background-color: #2fcc71;
  z-index: 999;
  position: absolute;
  top: -10px;
  right: -10px;
} */
</style>