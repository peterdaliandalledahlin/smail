<template>
<!--DETAIL CLIENT DATA-->
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
                            <th>Klient skapad</th><td>{{ dateFormatted(client.createdAt) }}</td>
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
        <footer class="card-footer pb-2">
            <a @click="goBack" href="#" class="card-footer-item ml-2">Avbryt</a>
            <router-link :to="`/edit-client/${route.params.id}`" href="#" class="card-footer-item">Uppdatera klient</router-link>
            <a @click="deleteClient" href="#" class="card-footer-item">Radera klient</a>
            <router-link :to="`/add-estimate/${route.params.id}`" href="#" class="card-footer-item">Lägg till Skattning</router-link>
            <router-link :to="`/development-plan/${route.params.id}`" href="#" class="card-footer-item mr-2">Till Utvecklingsplanen</router-link>
        </footer>
    </div>

    <!--LOADING-->
    <progress v-if="!clientsLoaded" class="progress is-large is-success" max="100" />

      <template
        v-else
      >

      <!--CHARTJS ESTIMATES COMPILATION-->
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

      <!-- <button @click="chartType" class="button">Line</button>
      <button @click="chartType" class="button">Radar</button> -->

      <!--ESTIMATES LIST-->
      <div class="card" v-for="estimate in estimates" :key="estimate.id">
        <header class="card-header">
            <p class="card-header-title">
            {{ dateFormatted(estimate.createdAt) }}
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
                            <th>Skattning gjord</th><td>{{ dateFormatted(estimate.createdAt) }}</td>
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
                            <td>Genom annonser i tidningar, tidskrifter och liknande</td><td><span class="tag" :class="estimate.adverts === true ? 'is-success' : 'is-danger'">{{ estimate.adverts === true ? 'Ja' : 'Nej' }}</span></td>
                        </tr>
                        <tr>
                            <td>Genom jobbportaler via internet</td><td><span class="tag" :class="estimate.jobportal === true ? 'is-success' : 'is-danger'">{{ estimate.jobportal === true ? 'Ja' : 'Nej' }}</span></td>
                        </tr>
                        <tr>
                            <td>Har kontaktat en arbetsgivare på eget initiativ <small>(ex. ringt, skickat in en spontanansökan eller besökt deras arbetsplats)</small></td><td><span class="tag" :class="estimate.employer === true ? 'is-success' : 'is-danger'">{{ estimate.employer === true ? 'Ja' : 'Nej' }}</span></td>
                        </tr>
                        <tr>
                            <td>Har frågat min familj, vänner och bekanta om de känner någon som kan hjälpa mig att hitta ett arbete</td><td><span class="tag" :class="estimate.family === true ? 'is-success' : 'is-danger'">{{ estimate.family === true ? 'Ja' : 'Nej' }}</span></td>
                        </tr>
                        <tr>
                            <td>Har gjort min praktik uppmärksam på att jag gärna vill ha en anställning efter att praktiken är över</td><td><span class="tag" :class="estimate.internship === true ? 'is-success' : 'is-danger'">{{ estimate.internship === true ? 'Ja' : 'Nej' }}</span></td>
                        </tr>
                        <tr>
                            <td>Bemanningsföretag, rekryteringsbyrå</td><td><span class="tag" :class="estimate.staffingcompanies === true ? 'is-success' : 'is-danger'">{{ estimate.staffingcompanies === true ? 'Ja' : 'Nej' }}</span></td>
                        </tr>
                        <tr>
                            <td>Social medier, Facebook och LinkedIn t.ex.</td><td><span class="tag" :class="estimate.socialmedia === true ? 'is-success' : 'is-danger'">{{ estimate.socialmedia === true ? 'Ja' : 'Nej' }}</span></td>
                        </tr>
                        <tr>
                            <td>Jag letar inte efter arbete <small>(eftersom jag är sjuk eller av andra skäl)</small></td><td><span class="tag" :class="estimate.notlookingforwork === true ? 'is-success' : 'is-danger'">{{ estimate.notlookingforwork === true ? 'Ja' : 'Nej'}}</span></td>
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

    <!--FOUND NO ESTIMATES-->
    <div
    v-if="!estimates.length"
    class="is-size-4 has-text-centered has-text-grey-light is-family-monospace py-6"
    >
    Det finns inga skattningar att hämta...
    </div>
     </template>
    

    <!-- <div class="tabs">
    <ul v-for="estimate in estimates" :key="estimate.id">
      <li v-bind:class="{ 'is-active': isActive == dateFormatted(estimate.date) }"><a v-on:click="isActive = dateFormatted(estimate.date)">{{dateFormatted(estimate.date)}}</a></li>
    </ul>
    </div>
    <div class="tab-contents" v-for="estimate in estimates" :key="estimate.id">
        <div class="content" v-bind:class="{ 'is-active': isActive == dateFormatted(estimate.date) }">
            <table class="table">
                    <tbody>
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
    </div> -->

    

</template>

<script setup>
//IMPORTS
import { onMounted, ref } from 'vue'
import { doc, getDoc, getDocs, collection, deleteDoc } from 'firebase/firestore'
import { db } from '../js/firebase'
import { useStoreAuth } from '../stores/storeAuth'
import { useRoute, useRouter } from 'vue-router'
import Chart from 'chart.js/auto'
import { useDateFormat } from '@vueuse/core'

//let isActive = ref() //LOOP TABS

let clientsLoaded = ref(true)

//GET USER FROM AUTH
const storeAuth = useStoreAuth()

//GET ID FROM PARAMS AND REDIRECT
const route = useRoute()
const router = useRouter()

//INITIALIZE ARRAYS
let client = ref({})
let estimates = ref([])

//INITIALIZE CHARTJS
const myChart = ref()

//BACK BUTTON
const goBack = () => {
    router.back()
}

//HANDLE CLIENT
const getClient = async () => {
    clientsLoaded = false
    const docSnap = await getDoc(doc(db, 'users', storeAuth.user.id, 'clients', route.params.id))
    if (docSnap.exists()) {  
      client.value = docSnap.data()
      clientsLoaded = true
    } else {
      console.log("No such document!")
    }
}

const deleteClient = async () => {
    await deleteDoc(doc(db, 'users', storeAuth.user.id, 'clients', route.params.id))
    router.push('/')
}

//HANDLE ESTIMATES
const getEstimates = async () => {
    const querySnapshot = await getDocs(collection(db, 'users', storeAuth.user.id, 'clients', route.params.id, 'estimates'))
    querySnapshot.forEach((doc) => {
        //console.log(doc.id, ' => ', doc.data())
        let estimate = {
            id: doc.id,
            createdAt: doc.data().createdAt,
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
            jobportal: doc.data().jobportal,
            laborMarket: doc.data().laborMarket,
            notlookingforwork: doc.data().notlookingforwork,
            otherways: doc.data().otherways,
            socialmedia: doc.data().socialmedia,
            staffingcompanies: doc.data().staffingcompanies
            }
            estimates.value.push(estimate)
    })
    //console.log(estimates.value)
}

//FORMATTING DATE
const dateFormatted = (id) => {
    //console.log(id)
    let date = new Date(parseInt(id))
        //console.log(date)
        //const formattedDate = useDateFormat(date, 'YYYY-MM-DD',  { locales: 'sv-SE' })
        const formattedDate = useDateFormat(date, 'YYYY-MM-DD')
        //console.log(formattedDate.value)
        return formattedDate.value
        //'YYYY-MM-DD HH:mm:ss'
}

//FETCH CLIENT INITIALIZE CHARTJS ONMOUNTED
onMounted( async () => {

    getClient()
    
    await getEstimates()

    const datasets = []
    const labels = []

    function getRandomColor() {
        var letters = '0123456789ABCDEF'.split('')
        var color = '#'
        for (var i = 0; i < 6; i++ ) {
            color += letters[Math.floor(Math.random() * 16)]
        }
        return color
    }

    const getLabelIndex = (x, y, pointLabels) => {
        let index = -1
        for(let i = 0; i < pointLabels.length; i++) {
            const { top, right, bottom ,left } = pointLabels[i]
            if( x >= left && x <= right && y >= top && y <= bottom) {
                index = i
                break
            }
        }
        return index
    }

    estimates.value.forEach((estimate) => {
        let obj = {
            label: dateFormatted(estimate.createdAt),
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

    let lineButtonCoordinates = [{
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    }]

    let radarButtonCoordinates = [{
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    }]

    const lineChartButton = {
        id: 'lineChartButton',
        beforeDraw(chart, arg, options){
            const { ctx, chartArea: {top, bottom, left, right, width, height}} = chart
            ctx.save()
            ctx.font =  '12px Arial'
            const text = 'Linjediagram'
            const textWidth = ctx.measureText(text).width
            //console.log(textWidth)

            ctx.fillStyle = '#43165c'
            ctx.fillRect(right - (textWidth + 11), 3, textWidth + 10, 15)

            ctx.strokeStyle = '#43165c'
            ctx.strokeRect(right - (textWidth + 11), 3, textWidth + 10, 15)

            ctx.fillStyle = '#fff'
            ctx.textAlign = 'left'
            ctx.fillText(text, right - (textWidth + 6), 10)

            lineButtonCoordinates[0].top = 5
            lineButtonCoordinates[0].bottom = 18 
            lineButtonCoordinates[0].left = right - (textWidth + 11)
            lineButtonCoordinates[0].right = right
            ctx.restore()

            //console.log(lineButtonCoordinates)

        }
    }

    const radarChartButton = {
        id: 'radarChartButton',
        beforeDraw(chart, arg, options){
            const { ctx, chartArea: {top, bottom, left, right, width, height}} = chart
            ctx.save()
            ctx.font =  '12px Arial'
            const text = 'Spindeldiagram'
            const textWidth = ctx.measureText(text).width
            //console.log(textWidth)

            ctx.fillStyle = '#43165c'
            ctx.fillRect(right - (textWidth + 100), 3, textWidth + 10, 15)

            ctx.strokeStyle = '#43165c'
            ctx.strokeRect(right - (textWidth + 100), 3, textWidth + 10, 15)

            ctx.fillStyle = '#fff'
            ctx.textAlign = 'left'
            ctx.fillText(text, right - (textWidth + 98), 10)

            radarButtonCoordinates[0].top = 5
            radarButtonCoordinates[0].bottom = 18 
            radarButtonCoordinates[0].left = right - (textWidth + 100)
            radarButtonCoordinates[0].right = right - textWidth
            ctx.restore()

            //console.log(lineButtonCoordinates)

        }
    }

    const config_radar = {
        type: 'radar',
        data: {
            labels: ['Individens tro på att få ett arbete','Kunskap om arbetsmarknaden','Målmedvetenhet','Samarbetsförmåga','Hantering av vardagen','Hälsotillstånd'],
            labelLink: ['individual', 'knowledge', 'purposefulness', 'cooperation','everydaylife','stateofhealth'],
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
                r: {
                    min: 0,
                    max: 5,
                    ticks: {
                        stepSize: 1,
                    }
                }
            },
            onHover: ({ x, y }, activeHover, chart) => {
                //console.log(x, y)
                const { canvas } = chart
                //console.log(chart.scales.r._pointLabelItems)
                let index = getLabelIndex(x, y, chart.scales.r._pointLabelItems)
                //console.log(index)
                if(index === -1) {
                    canvas.style.cursor = 'default'
                } else {
                    canvas.style.cursor = 'pointer'
                }
            },
            onClick: ({ x, y }, activeClick, chart) => {
                let index = getLabelIndex(x, y, chart.scales.r._pointLabelItems)
                if(index === -1) {
                    return
                }
                const selectedLabel = chart.scales.r
                //console.log(chart.scales.r._pointLabels[index])
                router.push(`/${myChart.config.data.labelLink[index]}`)

            }
        },
        plugins: [lineChartButton, radarChartButton]
    }

    const config_line = {
        type: 'line',
        data: {
            labels: ['Individen','Kunskap','Målmedvetenhet','Samarbetsförmåga','Vardagen','Hälsotillstånd'],
            //labels: ['Individens tro på att få ett arbete','Kunskap om arbetsmarknaden','Målmedvetenhet','Samarbetsförmåga','Hantering av vardagen','Hälsotillstånd'],
            labelLink: ['individual', 'knowledge', 'purposefulness', 'cooperation','everydaylife','stateofhealth'],
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
                x: {
                    min: 0,
                    max: 5,
                    ticks: {
                        stepSize: 1,
                    }
                }
            }
        },
        plugins: [lineChartButton, radarChartButton]
    }

    const ctx = document.getElementById('myChart')
    let myChart = new Chart(
        ctx,
        config_radar
    )

    function handleLineButtonClick(ctx, click) {
        const x = click.offsetX
        const y = click.offsetY
        //console.log(x,y)
        const top = lineButtonCoordinates[0].top
        const bottom = lineButtonCoordinates[0].bottom
        const left = lineButtonCoordinates[0].left
        const right = lineButtonCoordinates[0].right

        if(x > left && x < right && y > top && y < bottom){
            myChart.destroy()
            myChart = new Chart(
                ctx,
                config_line
            )
        }
    }

    function handleRadarButtonClick(ctx, click) {
        const x = click.offsetX
        const y = click.offsetY
        //console.log(x,y)
        const top = radarButtonCoordinates[0].top
        const bottom = radarButtonCoordinates[0].bottom
        const left = radarButtonCoordinates[0].left
        const right = radarButtonCoordinates[0].right

        if(x > left && x < right && y > top && y < bottom){
            console.log('button clicked')
            myChart.destroy()
            myChart = new Chart(
                ctx,
                config_radar
            )
        }
    }

    ctx.addEventListener('click', (e) => {
        handleLineButtonClick(ctx, e)
    })

    ctx.addEventListener('click', (e) => {
        handleRadarButtonClick(ctx, e)
    })

    
    //console.log(myChart.scales.r)
    
    function clickableScales(canvas, click){

        //const height = myChart.scales.x.height
        const top = myChart.scales.x.top
        const bottom = myChart.scales.x.bottom
        const left = myChart.scales.x.left
        const right = myChart.scales.x.maxWidth / myChart.scales.x.ticks.length

        //console.log(right)
        let resetCoordinates = canvas.getBoundingClientRect()
        //console.log(click)
        const x = click.clientX - resetCoordinates.left;
        const y = click.clientY - resetCoordinates.top;
        //console.log(x)
        //console.log(y)

        for(let i = 0; i < myChart.scales.x.ticks.length; i++){

            if(x >= left + (right * i) && x <= right + (right * i) && y >= top && y <= bottom){
                router.push(`/${myChart.config.data.labelLink[i]}`)
            }

        }

    }
    
    ctx.addEventListener('click', (e) => {
        clickableScales(ctx, e)
    })
    
})

</script>

<style scoped>
.tab-contents .content {
  display: none;
}
.tab-contents .content.is-active {
    display: block;
}
.card-footer-item {
    background-color: #43165c;
    color: azure;
    justify-content: center;
}
.card-footer-item:hover {
  filter: brightness(1.2)
}
</style>