<template>

    <div class="card mb-3">
        <header class="card-header">
            <p class="card-header-title">
            Klientuppgifter
            </p>
            <button class="card-header-icon" aria-label="more options">
            <span class="icon">
                <i class="fas fa-solid fa-user" aria-hidden="true"></i>
            </span>
            </button>
        </header>
        <div class="card-content">
            <div class="content">
                <table class="table">
                    <tbody>
                        <tr>
                            <th>ID</th><td>{{ route.params.id }}</td>
                        </tr>
                        <tr>
                            <th>Förnamn</th><td>{{ client.firstName }}</td>
                        </tr>
                        <tr>
                            <th>Födelsår</th><td>{{ client.birthYear }}</td>
                        </tr>
                        <tr>
                            <th>E-post</th><td>{{ client.email }}</td>
                        </tr>
                        <tr>
                            <th>Anteckning</th><td>{{ client.annotation }}</td>
                        </tr>
                    </tbody>
                </table>   
            </div>
        </div>
        <footer class="card-footer">
            <a @click="goBack" href="#" class="card-footer-item">Avbryt</a>
            <router-link :to="`/edit-client/${route.params.id}`" href="#" class="card-footer-item">Uppdatera klient</router-link>
            <a @click="deleteClient" href="#" class="card-footer-item">Radera klient</a>
            <router-link :to="`/add-estimate/${route.params.id}`" href="#" class="card-footer-item">Lägg till Skattning</router-link>
        </footer>
    </div>
    
    
    <div class="card">
        <header class="card-header">
            <p class="card-header-title">
                Sammanställning skattningar
            </p>
            <button class="card-header-icon" aria-label="more options">
                <span class="icon">
                    <i class="fas fa-angle-down" aria-hidden="true"></i>
                </span>
            </button>
        </header>
        <div class="card-content">
            <div class="content">
                <canvas id="myChart" width="100%" height="300"></canvas>
            </div>
        </div>
    </div>

    <div class="card" v-for="estimate in estimates" :key="estimate.id">
        <header class="card-header">
            <p class="card-header-title">
            {{estimate.date}}
            </p>
            <button class="card-header-icon" aria-label="more options">
            <span class="icon">
                <i class="fas fa-regular fa-chart-line" aria-hidden="true"></i>
            </span>
            </button>
        </header>
        <div class="card-content">
            <div class="content">
                <table class="table">
                    <tbody>
                        <tr>
                            <th>Skattning gjord</th><td>{{ dateFormatted }}</td>
                        </tr>
                        <tr>
                            <td>Tror du att du kan klara av att arbeta?</td><td>{{ estimate.beliefInWork }}</td>
                        </tr>
                        <tr>
                            <td>Tror du att dina kompetenser är till nytta på en arbetsplats?</td><td>{{ estimate.laborMarket }}</td>
                        </tr>
                        <tr>
                            <td>Vet du vad du ska göra för att förbättra dina möjligheter att nå ett arbete?</td><td>{{ estimate.purposeFulness }}</td>
                        </tr>
                        <tr>
                            <td>Hur bra är du på att samarbeta med andra?</td><td>{{ estimate.abilityToWorkTogether }}</td>
                        </tr>
                        <tr>
                            <td>Har du tid i vardagen at fokusera på att få ett arbete/praktik eller utbildning?</td><td>{{ estimate.handlingOfEverydayLife }}</td>
                        </tr>
                        <tr>
                            <td>Hur bedömer du att ditt allmänna hälsotillstånd är i förhållande till att arbeta?</td><td>{{ estimate.stateOfHealth }}</td>
                        </tr>
                        <tr>
                            <th>Hur söker du ett arbete?</th>
                        </tr>
                        <tr>
                            <td>Genom annonser i tidningar, tidskrifter och liknande</td><td><span class="tag" :class="estimate.adverts === true ? 'is-success' : 'is-danger'">{{ estimate.adverts }}</span></td>
                        </tr>
                        <tr>
                            <td>Genom jobbportaler via internet</td><td><span class="tag" :class="estimate.jobportal === true ? 'is-success' : 'is-danger'">{{ estimate.jobportal }}</span></td>
                        </tr>
                        <tr>
                            <td>Har kontaktat en arbetsgivare på eget initiativ <small>(ex. ringt, skickat in en spontanansökan eller besökt deras arbetsplats)</small></td><td><span class="tag" :class="estimate.employer === true ? 'is-success' : 'is-danger'">{{ estimate.employer }}</span></td>
                        </tr>
                        <tr>
                            <td>Har frågat min familj, vänner och bekanta om de känner någon som kan hjälpa mig att hitta ett arbete</td><td><span class="tag" :class="estimate.family === true ? 'is-success' : 'is-danger'">{{ estimate.family }}</span></td>
                        </tr>
                        <tr>
                            <td>Har gjort min praktik uppmärksam på att jag gärna vill ha en anställning efter att praktiken är över</td><td><span class="tag" :class="estimate.internship === true ? 'is-success' : 'is-danger'">{{ estimate.internship }}</span></td>
                        </tr>
                        <tr>
                            <td>Bemanningsföretag, rekryteringsbyrå</td><td><span class="tag" :class="estimate.staffingcompanies === true ? 'is-success' : 'is-danger'">{{ estimate.staffingcompanies }}</span></td>
                        </tr>
                        <tr>
                            <td>Social medier, Facebook och LinkedIn t.ex.</td><td><span class="tag" :class="estimate.socialmedia === true ? 'is-success' : 'is-danger'">{{ estimate.socialmedia }}</span></td>
                        </tr>
                        <tr>
                            <td>Jag letar inte efter arbete <small>(eftersom jag är sjuk eller av andra skäl)</small></td><td><span class="tag" :class="estimate.notlookingforwork === true ? 'is-success' : 'is-danger'">{{ estimate.notlookingforwork}}</span></td>
                        </tr>
                        <tr>
                            <td>Annat sätt;</td><td><span class="tag is-light">{{ estimate.otherways }}</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <footer class="card-footer">
            <a href="#" class="card-footer-item">Avbryt</a>
            <router-link :to="`/client/${route.params.id}/estimate/${estimate.id}`" href="#" class="card-footer-item">Edit Estimate</router-link>
        </footer>
    </div>
 
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import { doc, getDoc, getDocs, collection, deleteDoc } from 'firebase/firestore'
import { db } from '../js/firebase'
import { useStoreAuth } from '../stores/storeAuth'
import { useRoute, useRouter } from 'vue-router'
import Chart from 'chart.js/auto'
import { useDateFormat } from '@vueuse/core'
const storeAuth = useStoreAuth() 
const route = useRoute()
const router = useRouter()
let client = ref({})
let estimates = ref([])
const myChart = ref()

const goBack = () => {
    router.back()
}

const deleteClient = async () => {
    await deleteDoc(doc(db, 'users', storeAuth.user.id, 'clients', route.params.id))
    router.push('/')
}

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

const getEstimates = async () => {
    const querySnapshot = await getDocs(collection(db, 'users', storeAuth.user.id, 'clients', route.params.id, 'estimates'))
    querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, ' => ', doc.data())
        let estimate = {
            id: doc.id,
            date: doc.data().date,
            abilityToWorkTogether: doc.data().abilityToWorkTogether,
            beliefInWork: doc.data().beliefInWork,
            handlingOfEverydayLife: doc.data().handlingOfEverydayLife,
            laborMarket: doc.data().laborMarket,
            purposeFulness: doc.data().purposeFulness,
            stateOfHealth: doc.data().stateOfHealth,
            adverts: doc.data().adverts,
            employer: doc.data().employer,
            family: doc.data().family,
            internship: doc.data().internship,
            jobportal: doc.data().jobbportal,
            laborMarket: doc.data().laborMarket,
            notlookingforwork: doc.data().notlookingforwork,
            otherways: doc.data().otherways,
            socialmedia: doc.data().socialmedia,
            staffingcompanies: doc.data().staffingcompanies
            }
            estimates.value.push(estimate)
    })
    console.log(estimates.value)
}

const dateFormatted = computed(() => {
        let date = new Date(parseInt(estimates.value.date))
        const formattedDate = useDateFormat(date, 'YYYY-MM-DD HH:mm:ss')
        return formattedDate.value
    })
 
// const getEstimate = async () => {

//     const docSnap = await getDoc(docRefEstimate)
//     if (docSnap.exists()) {
//     console.log("Document data:", docSnap.data())
//     } else {
//     // doc.data() will be undefined in this case
//     console.log("No such document!")
//     }
// }

onMounted( async () => {
    getClient()
    //getEstimate()
    await getEstimates()
    const datasets = []
    function getRandomColor() {
            var letters = '0123456789ABCDEF'.split('');
            var color = '#';
            for (var i = 0; i < 6; i++ ) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
                }

    estimates.value.forEach((estimate) => {
        //console.log(estimate.abilityToWorkTogether)
        let obj = {
            label: estimate.date,
            backgroundColor: 'rgba(179,181,198,0.2)',
            borderColor: getRandomColor(),
            pointBackgroundColor: 'rgba(179,181,198,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(179,181,198,1)',
            data: [estimate.abilityToWorkTogether, estimate.beliefInWork, estimate.handlingOfEverydayLife, estimate.laborMarket, estimate.purposeFulness, estimate.stateOfHealth]
        }
        datasets.push(obj)
    })
    
    console.log(datasets)
    const ctx = document.getElementById('myChart');
    const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Individens tro på att få ett arbete','Kunskap om arbetsmarknaden','Målmedvetenhet','Samarbetsförmåga','Hantering av vardagen','Hälsotillstånd'],
        datasets: datasets
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: `Skattningar gällande ${client.value.email}`
            }
        },
        scales: {
          y: {
            min: 0,
            max: 5,
            ticks: {
              stepSize: 1,
            }
          }
        }
    }
})

})


</script>

<style scoped>
.card-footer-item {
    justify-content: center;
}
</style>