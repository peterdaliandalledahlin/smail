<template>
  <div class="card mb-4">
        <div class="card-content">
            <div class="content">
                <p>Tror du att du kan klara av att arbeta?</p>
                <p>{{ beliefInWorkFormatted }}</p> 
                <p>Tror du att dina kompetenser är till nytta på en arbetsplats?</p>
                <p>{{ laborMarketFormatted }}</p>
                <p>Vet du vad du ska göra för att förbättra dina möjligheter att nå ett arbete?</p>
                <p>{{ purposeFulnessFormatted }}</p>
                <p>Hur bra är du på att samarbeta med andra?</p>
                <p>{{ abilityToWorkTogetherFormatted }}</p>
                <p>Har du tid i vardagen at fokusera på att få ett arbete/praktik eller utbildning?</p>
                <p>{{ handlingOfEverydayLifeFormatted }}</p>
                <p>Hur bedömer du att ditt allmänna hälsotillstånd är i förhållande till att arbeta?</p>
                <p>{{ stateOfHealthFormatted }}</p>
                <h4>Hur söker du ett arbete?</h4>
                <p class="m-0">Genom annonser i tidningar, tidskrifter och liknande</p>
                <span class="tag" :class="adverts === 'Ja' ? 'is-success' : 'is-danger'">{{ adverts }}</span>
                <p class="mt-3 mb-0">Genom jobbportaler via internet</p>
                <span class="tag" :class="jobportal === 'Ja' ? 'is-success' : 'is-danger'">{{ jobportal }}</span>
                <p class="mt-3 mb-0">Har kontaktat en arbetsgivare på eget initiativ <small>(ex. ringt, skickat in en spontanansökan eller besökt deras arbetsplats)</small></p>
                <span class="tag" :class="employer === 'Ja' ? 'is-success' : 'is-danger'">{{ employer }}</span>
                <p class="mt-3 mb-0">Har frågat min familj, vänner och bekanta om de känner någon som kan hjälpa mig att hitta ett arbete</p>
                <span class="tag" :class="family === 'Ja' ? 'is-success' : 'is-danger'">{{ family }}</span>
                <p class="mt-3 mb-0">Har gjort min praktik uppmärksam på att jag gärna vill ha en anställning efter att praktiken är över</p>
                <span class="tag" :class="internship === 'Ja' ? 'is-success' : 'is-danger'">{{ internship }}</span>
                <p class="mt-3 mb-0">Bemanningsföretag, rekryteringsbyrå</p>
                <span class="tag" :class="staffingcompanies === 'Ja' ? 'is-success' : 'is-danger'">{{ staffingcompanies }}</span>
                <p class="mt-3 mb-0">Social medier, Facebook och LinkedIn t.ex.</p>
                <span class="tag" :class="socialmedia === 'Ja' ? 'is-success' : 'is-danger'">{{ socialmedia }}</span>
                <p class="mt-3 mb-0">Jag letar inte efter arbete <small>(eftersom jag är sjuk eller av andra skäl)</small></p>
                <span class="tag" :class="notlookingforwork === 'Ja' ? 'is-success' : 'is-danger'">{{ notlookingforwork}}</span>
                <p class="mt-3 mb-0">Annat sätt;</p>
                <span class="tag is-light">{{ props.note.otherways }}</span>
                <div class="columns is-mobile has-text-grey-light mt-2">
                    <small class="column">{{ dateFormatted }}</small>
                </div>
            </div>
        </div>
        <ViewChart :note="note" />
        <footer class="card-footer">
            <router-link :to="`/edit-note/${note.id}`" href="#" class="card-footer-item">Edit</router-link>
            <a @click.prevent="modals.deleteNote = true" href="#" class="card-footer-item">Delete</a>
        </footer>
        <ModalDeleteNote v-if="modals.deleteNote" v-model="modals.deleteNote" :noteId="note.id" />
    </div>
</template>

<script setup>
//IMPORTS
    import { computed, reactive } from 'vue'
    import ModalDeleteNote from '@/components/Notes/ModalDeleteNote.vue'
    import { useDateFormat } from '@vueuse/core'
    import Chart from 'chart.js/auto'
    import ViewChart from '../../views/ViewChart.vue'

//PROPS
    const props = defineProps({
        note: {
            type: Object,
            required: true
        }
    })

//MODALS
    const modals = reactive({
        deleteNote: false
    })

//DATE FORMATTED
    const dateFormatted = computed(() => {
        let date = new Date(parseInt(props.note.date))
        const formattedDate = useDateFormat(date, 'YYYY-MM-DD HH:mm:ss')
        return formattedDate.value
    })

//BELIEFE IN WORK FORMATTED

    const beliefInWorkFormatted = computed(() => {
        //☹️

        switch (props.note.beliefInWork) {
            case 1:
                return '😢'
            case 2:
                return '🙁'
            case 3:
                return '😐'
            case 4:
                return '🙂'
            case 5:
                return '😀'
            default:
                'No smiley...'
            break;
        }

        
    })
    const laborMarketFormatted = computed(() => {
        switch (props.note.laborMarket) {
            case 1:
                return '😢'
            case 2:
                return '🙁'
            case 3:
                return '😐'
            case 4:
                return '🙂'
            case 5:
                return '😀'
            default:
                'No smiley...'
            break;
        }
    })
    const purposeFulnessFormatted = computed(() => {
        switch (props.note.purposeFulness) {
            case 1:
                return '😢'
            case 2:
                return '🙁'
            case 3:
                return '😐'
            case 4:
                return '🙂'
            case 5:
                return '😀'
            default:
                'No smiley...'
            break;
        }
    })
    const abilityToWorkTogetherFormatted = computed(() => {
        switch (props.note.abilityToWorkTogether) {
            case 1:
                return '😢'
            case 2:
                return '🙁'
            case 3:
                return '😐'
            case 4:
                return '🙂'
            case 5:
                return '😀'
            default:
                'No smiley...'
            break;
        }
    })
    const handlingOfEverydayLifeFormatted = computed(() => {
        switch (props.note.handlingOfEverydayLife) {
            case 1:
                return '😢'
            case 2:
                return '🙁'
            case 3:
                return '😐'
            case 4:
                return '🙂'
            case 5:
                return '😀'
            default:
                'No smiley...'
            break;
        }
    })
    const stateOfHealthFormatted = computed(() => {
        switch (props.note.stateOfHealth) {
            case 1:
                return '😢'
            case 2:
                return '🙁'
            case 3:
                return '😐'
            case 4:
                return '🙂'
            case 5:
                return '😀'
            default:
                'No smiley...'
            break;
        }
    })

    
     const adverts = props.note.adverts === true ? 'Ja' : 'Nej';
     const jobportal = props.note.jobportal === true ? 'Ja' : 'Nej';
     const employer = props.note.employer === true ? 'Ja' : 'Nej';
     const family = props.note.family === true ? 'Ja' : 'Nej';
     const internship = props.note.internship === true ? 'Ja' : 'Nej';
     const staffingcompanies = props.note.staffingcompanies === true ? 'Ja' : 'Nej';
     const socialmedia = props.note.socialmedia === true ? 'Ja' : 'Nej';
     const notlookingforwork = props.note.notlookingforwork === true ? 'Ja' : 'Nej';

</script>
