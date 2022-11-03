import { createApp, markRaw, ref } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from '@/router'

const pinia = createPinia()

pinia.use(({ store }) => {
    store.router = markRaw(router)
})

const app = createApp(App)

app.provide('estimatesSWE', [
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
])

app.provide('estimatesGBR', [
    {
        title: 'The individuals belief in getting a job',
        subtitle: 'Do you think that you can manage to work?',
        propertyName: 'beliefInWork',
        options: [
            {value: 1, description: 'I do not think I can work'},
            {value: 2, description: 'I am very unsure if I can manage to work'},
            {value: 3, description: 'I am not sure if I can work'},
            {value: 4, description: 'I am reasonably sure I can work'},
            {value: 5, description: 'I am pretty sure I can work'},
        ]
    },
    {
        title: 'Knowledge of the labor market',
        subtitle: 'Do you think that your skills are useful in a workplace?',
        propertyName: 'laborMarket',
        options: [
            {value: 1, description: 'I do not think I have any knowledge to offer a workplace'},
            {value: 2, description: 'I strongly doubt that I have any knowledge to offer a workplace'},
            {value: 3, description: 'It varies. Sometimes I get unsure if I have something to offer or not'},
            {value: 4, description: 'I am mostly sure I have something to offer a workplace'},
            {value: 5, description: 'I am sure I have a lot to offer to a workplace'},
        ]    
    },
    {
        title: 'Purposefulness',
        subtitle: 'Do you know what to do to improve your chances of getting a job?',
        propertyName: 'purposeFulness',
        options: [
            {value: 1, description: 'I do not know what to do to get a job'},
            {value: 2, description: 'I know to some extent what I need to do to improve my chances of getting a job'},
            {value: 3, description: 'I know pretty well what to do to improve my chances of getting a job'},
            {value: 4, description: 'I largely know what to do to improve my chances of getting a job'},
            {value: 5, description: 'I know exactly what I need to do to get a job'},
        ]    
    },
    {
        title: 'Ability to cooperate',
        subtitle: 'How good are you at working with others?',
        propertyName: 'abilityToWorkTogether',
        options: [
            {value: 1, description: 'I find it very difficult to collaborate with others'},
            {value: 2, description: 'I often find it difficult to collaborate with others'},
            {value: 3, description: 'It varies. Sometimes its easy and sometimes its hard to work with others'},
            {value: 4, description: 'I usually find it easy to collaborate with others'},
            {value: 5, description: 'I find it very easy to collaborate with others'},
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
])

let myGlobalVariable = ref('smiley')
app.provide('myGlobalVariable', myGlobalVariable)

//app.config.globalProperties.iconMode = 'smiley'

app.config.globalProperties = {

    iconMode: 'smiley',

    $filters: {
    
    gradeIcon(value) {
        if(myGlobalVariable.value == 'smiley'){
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
        }else if(myGlobalVariable.value == 'number'){
            switch (value) {
                case 1:
                    return '1️⃣'
                case 2:
                    return '2️⃣'
                case 3:
                    return '3️⃣'
                case 4:
                    return '4️⃣'
                case 5:
                    return '5️⃣'
                default:
                   return 'No smiley...'
                break;
            }
        }
    }
    },
    multipleChoiceOptions: [
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
  }

// app.config.globalProperties.$filters = {
//     smiley(value) {
//         switch (value) {
//             case 1:
//                 return '😢'
//             case 2:
//                 return '🙁'
//             case 3:
//                 return '😐'
//             case 4:
//                 return '🙂'
//             case 5:
//                 return '😀'
//             default:
//                return 'No smiley...'
//             break;
//         }
//     }
//   }

//   app.config.globalProperties.$filter = {
//     numbers(value) {
//         switch (value) {
//             case 1:
//                 return '1️⃣'
//             case 2:
//                 return '2️⃣'
//             case 3:
//                 return '3️⃣'
//             case 4:
//                 return '4️⃣'
//             case 5:
//                 return '5️⃣'
//             default:
//                return 'No smiley...'
//             break;
//         }
//     }
//   }

  app.use(pinia).use(router).mount('#app')