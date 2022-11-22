<template>
    <canvas id="myChart" width="400" height="400"></canvas>
</template>
<script setup>
import { useDateFormat } from '@vueuse/core'
import { collection, query, where, onSnapshot } from "firebase/firestore"
    import { db } from '../js/firebase'
    import { useStoreAuth } from '../stores/storeAuth'
    import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  PointElement,
  RadialLinearScale,
  LineElement
} from 'chart.js'

//FIRESTORE QUERY
let notesCollectionRef
let notesCollectionQuery
let getNotesSnapshot = null
const storeAuth = useStoreAuth() 
notesCollectionRef = collection(db, 'users', storeAuth.user.id, 'notes')
notesCollectionQuery = query(notesCollectionRef, where('email', '==', "roger.moore@enkoping.se"))
let notes = []

const getNotes = async () => {
      //this.notesLoaded = false
      getNotesSnapshot = await onSnapshot(notesCollectionQuery, (querySnapshot) => {
          //let notes = []
          querySnapshot.forEach((doc) => {
            let note = {
              id: doc.id,
              date: doc.data().date,
              firstName: doc.data().firstName,
              lastName: doc.data().lastName,
              email: doc.data().email,
              annotation: doc.data().annotation,
              beliefInWork: doc.data().beliefInWork,
              laborMarket: doc.data().laborMarket,
              purposeFulness: doc.data().purposeFulness,
              abilityToWorkTogether: doc.data().abilityToWorkTogether,
              handlingOfEverydayLife: doc.data().handlingOfEverydayLife,
              stateOfHealth: doc.data().stateOfHealth,
              adverts: doc.data().adverts,
              jobportal: doc.data().jobportal,
              employer: doc.data().employer,
              family: doc.data().family,
              internship: doc.data().internship,
              staffingcompanies: doc.data().staffingcompanies,
              socialmedia: doc.data().socialmedia,
              notlookingforwork: doc.data().notlookingforwork,
              otherways: doc.data().otherways,
            }
            notes.push(note)
        })
      }, error => {
        console.log(error.message)
      })
    }

    const ctx = document.getElementById('myChart');
const myChart = new ChartJS(ctx, {
    type: 'bar',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
})
</script>