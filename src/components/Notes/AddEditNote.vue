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
        
                <div class="field">
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
                </div>

                <button class="button is-small is-link has-background-success" @click="helpText = !helpText" v-text="helpText ? 'Stäng av hjälptext' : 'Sätt på hjälptxt'"></button>

        </fieldset>
        

                <div class="card mb-4" v-for="question in storeNotes.estimatesDefault" :key="question.propertyName">
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
                        <div class="rows" v-for="option in multipleChoiceOptions" :key="option.propertyName">
                            <div class="row my-2">
                                <label :for="option.propertyName" :class="option.type">  
                                    <input :class="option.class" :id="option.propertyName" v-model="note[option.propertyName]" :type="option.type" :placeholder="option.type == 'text' ? 'Annat sätt? - ange det här!' : null " />
                                    {{option.description}}
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

    const language = ref([])

    // watch(language, (count, prevCount) => {
    // console.log(count,prevCount)
    // })

    const formValidated = ref(false)

    const validateForm = () => {
        // for (const [key, value] of Object.entries(storeNotes.estimatesDefault)) {
        //     console.log(`${key} ${value}`)
        // }
        formValidated.value = true
        storeNotes.estimatesDefault.forEach((question) => {
            if(props.note[question.propertyName] === null) {
                formValidated.value = false
                //console.log(question.propertyName + 'was null')
            }
        })
        //console.log(formValidated.value)
    }


    const helpText = ref(true)

    const myGlobalVariable = inject('myGlobalVariable')


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
</style>