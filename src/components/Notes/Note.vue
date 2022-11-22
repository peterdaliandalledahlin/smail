<template>
  <div class="card mb-4">
        <div class="card-content">
            <div class="content">
                <table class="table">
                    <tbody>
                        <tr>
                            <th>Skattning gjord</th><td>{{ dateFormatted }}</td>
                        </tr>
                        <tr>
                            <th>Förnamn</th><td>{{ props.note.firstName }}</td>
                        </tr>
                        <tr>
                            <th>Efternamn</th><td>{{ props.note.lastName}}</td>
                        </tr>
                        <tr>
                            <th>E-post</th><td>{{ props.note.email }}</td>
                        </tr>
                        <tr>
                            <th>Anteckning</th><td>{{ props.note.annotation }}</td>
                        </tr>
                        <tr>
                            <td>Tror du att du kan klara av att arbeta?</td><td>{{ props.note.beliefInWork }}</td>
                        </tr>
                        <tr>
                            <td>Tror du att dina kompetenser är till nytta på en arbetsplats?</td><td>{{ props.note.laborMarket }}</td>
                        </tr>
                        <tr>
                            <td>Vet du vad du ska göra för att förbättra dina möjligheter att nå ett arbete?</td><td>{{ props.note.purposeFulness }}</td>
                        </tr>
                        <tr>
                            <td>Hur bra är du på att samarbeta med andra?</td><td>{{ props.note.abilityToWorkTogether }}</td>
                        </tr>
                        <tr>
                            <td>Har du tid i vardagen at fokusera på att få ett arbete/praktik eller utbildning?</td><td>{{ props.note.handlingOfEverydayLife }}</td>
                        </tr>
                        <tr>
                            <td>Hur bedömer du att ditt allmänna hälsotillstånd är i förhållande till att arbeta?</td><td>{{ props.note.stateOfHealth }}</td>
                        </tr>
                        <tr>
                            <th>Hur söker du ett arbete?</th>
                        </tr>
                        <tr>
                            <td>Genom annonser i tidningar, tidskrifter och liknande</td><td><span class="tag" :class="adverts === 'Ja' ? 'is-success' : 'is-danger'">{{ adverts }}</span></td>
                        </tr>
                        <tr>
                            <td>Genom jobbportaler via internet</td><td><span class="tag" :class="jobportal === 'Ja' ? 'is-success' : 'is-danger'">{{ jobportal }}</span></td>
                        </tr>
                        <tr>
                            <td>Har kontaktat en arbetsgivare på eget initiativ <small>(ex. ringt, skickat in en spontanansökan eller besökt deras arbetsplats)</small></td><td><span class="tag" :class="employer === 'Ja' ? 'is-success' : 'is-danger'">{{ employer }}</span></td>
                        </tr>
                        <tr>
                            <td>Har frågat min familj, vänner och bekanta om de känner någon som kan hjälpa mig att hitta ett arbete</td><td><span class="tag" :class="family === 'Ja' ? 'is-success' : 'is-danger'">{{ family }}</span></td>
                        </tr>
                        <tr>
                            <td>Har gjort min praktik uppmärksam på att jag gärna vill ha en anställning efter att praktiken är över</td><td><span class="tag" :class="internship === 'Ja' ? 'is-success' : 'is-danger'">{{ internship }}</span></td>
                        </tr>
                        <tr>
                            <td>Bemanningsföretag, rekryteringsbyrå</td><td><span class="tag" :class="staffingcompanies === 'Ja' ? 'is-success' : 'is-danger'">{{ staffingcompanies }}</span></td>
                        </tr>
                        <tr>
                            <td>Social medier, Facebook och LinkedIn t.ex.</td><td><span class="tag" :class="socialmedia === 'Ja' ? 'is-success' : 'is-danger'">{{ socialmedia }}</span></td>
                        </tr>
                        <tr>
                            <td>Jag letar inte efter arbete <small>(eftersom jag är sjuk eller av andra skäl)</small></td><td><span class="tag" :class="notlookingforwork === 'Ja' ? 'is-success' : 'is-danger'">{{ notlookingforwork}}</span></td>
                        </tr>
                        <tr>
                            <td>Annat sätt;</td><td><span class="tag is-light">{{ props.note.otherways }}</span></td>
                        </tr>
                    </tbody>
                </table>


        
                <div class="columns is-mobile has-text-grey-light mt-2">
                    <small class="column">{{ dateFormatted }}</small>
                </div>
            </div>
        </div>
        <!-- <ViewChart :note="note" /> -->
        <!-- <LineChart :note="note" /> -->
        <LineChart />
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
    import LineChart from '../../components/Line.vue'

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

//TRANSLATE NUMBER TO SMILEY
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
