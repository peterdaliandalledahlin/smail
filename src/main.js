import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from '@/router'

const pinia = createPinia()

pinia.use(({ store }) => {
    store.router = markRaw(router)
})

const app = createApp(App)

app.config.globalProperties.estimates = [
    {
        title: 'Individens tro på att få ett arbete',
        subtitle: 'Tror du att du kan klara av att arbeta?',
        propertyName: 'beliefInWork',
        options: [
            {value: 1, description: 'Jag tror inte att jag kan klara av att arbeta'},
            {value: 2, description: 'Jag är väldigt osäker på om jag kan klara av att arbeta'},
            {value: 3, description: 'Jag är osäker på om jag kan klara av att arbeta'},
            {value: 4, description: 'Jag är någorlunda säker på att jag kan klara av att arbeta'},
            {value: 5, description: 'Jag är helt säker på att jag kan klara av att arbeta'},
        ]
    },
    {
        title: 'Kunskap om arbetsmarknaden',
        subtitle: 'Tror du att dina kompetenser är till nytta på en arbetsplats?',
        propertyName: 'laborMarket',
        options: [
            {value: 1, description: 'Jag tror inte att jag har någon kunskap att erbjuda en arbetsplats'},
            {value: 2, description: 'Jag tvivlar starkt på att jag har någon kunskap att erbjuda en arbetsplats'},
            {value: 3, description: 'Det varierar. Ibland blir jag osäker på om jag har något att erbjuda eller inte'},
            {value: 4, description: 'Jag är för det mesta säker på att jag har något att erbjuda en arbetsplats'},
            {value: 5, description: 'Jag är säker på att jag har massor att erbjuda en arbetsplats'},
        ]    
    },
    {
        title: 'Målmedvetenhet',
        subtitle: 'Vet du vad du ska göra för att förbättra dina möjligheter att nå ett arbete?',
        propertyName: 'purposeFulness',
        options: [
            {value: 1, description: 'Jag vet inte hur jag ska göra för att nå ett arbete'},
            {value: 2, description: 'Jag vet till viss del vad jag ska för att förbättra mina möljigheter att nå ett arbete'},
            {value: 3, description: 'Jag vet ganska väl vad jag ska göra för att förbättra mina möjligheter att nå ett arbete'},
            {value: 4, description: 'Jag vet till stor del vad jag ska göra för att förbättra mina möjligheter att nå ett arbete'},
            {value: 5, description: 'Jag vet precis vad jag ska göra för att nå  ett arbete'},
        ]    
    },
    {
        title: 'Samarbetsförmåga',
        subtitle: 'Hur bra är du på att arbeta med andra?',
        propertyName: 'abilityToWorkTogether',
        options: [
            {value: 1, description: 'Jag tycker det är väldigt svårt att samarbeta med andra'},
            {value: 2, description: 'Jag har ofta svårt att samarbeta med andra'},
            {value: 3, description: 'Det varierar. Ibland är det lätt och ibland är det svårt att samarbeta med andra'},
            {value: 4, description: 'Jag tycker oftast att det är lätt att samarbeta med andra'},
            {value: 5, description: 'Jag tycker att det är väldigt lätt att samarbeta med andra'},
        ]    
    },
    {
        title: 'Hanteringen av vardagen',
        subtitle: 'Har du tid i vardagen att fokusera på att få ett arbete/praktik eller utbildning?',
        propertyName: 'handlingOfEverydayLife',
        options: [
            {value: 1, description: 'Jag har nästan aldrig tid att fokusera på det'},
            {value: 2, description: 'Jag har oftast inte tid att fokusera på det'},
            {value: 3, description: 'Det varierar. Ibland har jag tid och ibland har jag inte tid'},
            {value: 4, description: 'Jag har mestadels tid att fokusera på det'},
            {value: 5, description: 'Jag har definitivt tid att fokusera på det'},
        ]    
    },
    {
        title: 'Hälsotillstånd',
        subtitle: 'Hur bedömer du att ditt allmänna hälsotillstånd är i förhållande till att arbeta?',
        propertyName: 'stateOfHealth',
        options: [
            {value: 1, description: 'Mitt hälsotillstånd hindrar mig helt från att arbeta eller studera'},
            {value: 2, description: 'Mitt hälsotillstånd sätter enorma begränsningar för att jag ska kunna arbeta eller studera. Jag kanske kan arbeta max ett par timmar'},
            {value: 3, description: 'Det varierar. Ibland är det svårt. Jag kanske kan ta ett deltidsarbete med rätt typ av hjälp och stöd'},
            {value: 4, description: 'Mitt hälsotillstånd hindrar mig inte från att arbeta, men kan ibland sätta begränsningar'},
            {value: 5, description: 'Mitt hälsotillstånd hindar mig inte från att arbeta'},
        ]    
    },
]

app.config.globalProperties.multipleChoiceOptions = [
    {
        propertyName: 'adverts',
        description: 'Genom annonser i tidningar, tidskrifter och liknande',
        type: 'checkbox',
        class: 'checkbox'
    },
    {
        propertyName: 'jobportal',
        description: 'Genom jobbportaler via internet',
        type: 'checkbox',
        class: 'checkbox'
    },
    {
        propertyName: 'employer',
        description: 'Har kontaktat en arbetsgivare på eget initiativ (ex. ringt, skickat in en spontanansökan eller besökt deras arbetsplats)',
        type: 'checkbox',
        class: 'checkbox'
    },
    {
        propertyName: 'family',
        description: 'Har frågat min familj, vänner och bekanta om de känner någon som kan hjälpa mig att hitta ett arbete',
        type: 'checkbox',
        class: 'checkbox'
    },
    {
        propertyName: 'internship',
        description: 'Har gjort min praktik uppmärksam på att jag gärna vill ha en anställning efter att praktiken är över',
        type: 'checkbox',
        class: 'checkbox'
    },
    {
        propertyName: 'staffingcompanies',
        description: 'Bemanningsföretag, rekryteringsbyrå',
        type: 'checkbox',
        class: 'checkbox'
    },
    {
        propertyName: 'socialmedia',
        description: 'Social medier, Facebook och LinkedIn t.ex.',
        type: 'checkbox',
        class: 'checkbox'
    },
    {
        propertyName: 'notlookingforwork',
        description: 'Jag letar inte efter arbete (eftersom jag är sjuk eller av andra skäl)',
        type: 'checkbox',
        class: 'checkbox'
    },
    {
        propertyName: 'otherways',
        description: '',
        type: 'text',
        class: 'input is-success'
    },
]

app.config.globalProperties.$filters = {
    smiley(value) {
        switch (value) {
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
               return 'No smiley...'
            break;
        }
    }
  }

  app.use(pinia).use(router).mount('#app')