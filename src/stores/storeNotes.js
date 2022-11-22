import { defineStore } from 'pinia'
import { doc, addDoc, collection, onSnapshot, deleteDoc, updateDoc, query, orderBy, where, getDocs } from 'firebase/firestore'
import { db } from '../js/firebase'
import { useStoreAuth } from './storeAuth'

//const notesCollectionRef = collection(db, 'notes')
let notesCollectionRef
let clientsCollectionRef
let clientCollectionRef
let estimatesCollectionRef
let notesCollectionQuery
let notesCollectionQueryData

let getNotesSnapshot = null


export const useStoreNotes = defineStore('storeNotes', {
  state: () => {
    return {
      notes: [],
      clients: [],
      notesLoaded: true,
      clientsLoaded: true,
      answers: [],
      estimatesDefault: [
        {
            title: 'Individens tro på att få ett arbete',
            subtitle: 'Tror du att du kan klara av att arbeta?',
            propertyName: 'beliefInWork',
            options: [
                {value: 1, description: 'Jag tror inte att jag kan klara av att arbeta', audio: '/sv/likeitloud.mp3'},
                {value: 2, description: 'Jag är väldigt osäker på om jag kan klara av att arbeta', audio: '/sv/ringside.mp3'},
                {value: 3, description: 'Jag är osäker på om jag kan klara av att arbeta', audio: '/sv/slippingaway.mp3'},
                {value: 4, description: 'Jag är någorlunda säker på att jag kan klara av att arbeta', audio: '/sv/snowprincess.mp3'},
                {value: 5, description: 'Jag är helt säker på att jag kan klara av att arbeta', audio: '/sv/soulicious.mp3'},
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
      ],
      estimatesSV: [
        {
            title: 'Individens tro på att få ett arbete',
            subtitle: 'Tror du att du kan klara av att arbeta?',
            propertyName: 'beliefInWork',
            options: [
                {value: 1, description: 'Jag tror inte att jag kan klara av att arbeta', audio: '/sv/likeitloud.mp3'},
                {value: 2, description: 'Jag är väldigt osäker på om jag kan klara av att arbeta', audio: '/sv/ringside.mp3'},
                {value: 3, description: 'Jag är osäker på om jag kan klara av att arbeta', audio: '/sv/slippingaway.mp3'},
                {value: 4, description: 'Jag är någorlunda säker på att jag kan klara av att arbeta', audio: '/sv/snowprincess.mp3'},
                {value: 5, description: 'Jag är helt säker på att jag kan klara av att arbeta', audio: '/sv/soulicious.mp3'},
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
      ], 
      estimatesEN: [
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
      ],
      estimatesAR: [
        {
            title: 'إيمان الأفراد بالحصول على وظيفة',
            subtitle: 'هل تعتقد أنه يمكنك إدارة العمل؟',
            propertyName: 'beliefInWork',
            options: [
                {value: 1, description: 'لا أعتقد أنني أستطيع العمل', audio: '/ar/asyouwere.mp3'},
                {value: 2, description: 'أنا غير متأكد مما إذا كان بإمكاني إدارة العمل', audio: '/ar/dyalla.mp3'},
                {value: 3, description: 'لست متأكدًا مما إذا كان بإمكاني العمل', audio: '/ar/goldencage.mp3'},
                {value: 4, description: 'أنا متأكد بشكل معقول من أنني أستطيع العمل', audio: '/ar/guitarhouse.mp3'},
                {value: 5, description: 'أنا متأكد من أنني أستطيع العمل', audio: '/ar/indecision.mp3'},
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
      ],
      estimatesSO: [
        {
            title: 'Shakhsiyaadka waxay aaminsan yihiin inay shaqo helaan',
            subtitle: 'Ma u malaynaysaa inaad shaqayn karto?',
            propertyName: 'beliefInWork',
            options: [
                {value: 1, description: 'Uma malaynayo inaan shaqayn karo'},
                {value: 2, description: 'Aad ayaan u hubin in aan awoodi karo inaan shaqeeyo'},
                {value: 3, description: 'Ma hubo in aan shaqayn karo'},
                {value: 4, description: 'Waxaan si macquul ah u hubaa inaan shaqayn karo'},
                {value: 5, description: 'Waan hubaa inaan shaqayn karo'},
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
      ],
    }
  },
  actions: {
    init() {
      const storeAuth = useStoreAuth() 
      notesCollectionRef = collection(db, 'users', storeAuth.user.id, 'notes')
      estimatesCollectionRef = collection(db, 'users', storeAuth.user.id, 'estimates')
      clientsCollectionRef = collection(db, 'users', storeAuth.user.id, 'clients')
      clientCollectionRef = collection(db, 'users', storeAuth.user.id, 'clients')
      notesCollectionQuery = query(notesCollectionRef, orderBy('date', 'desc'))
      notesCollectionQueryData = query(notesCollectionRef, where('email', '==', 'roger.moore@enkoping.se'))
      //const estimatesRef = db.collection('users').doc(storeAuth.user.id).collection('clients').doc(client.id).collection('estimates')
      this.getNotes()
      this.getClients()
    },
    async getNotes() {
      this.notesLoaded = false
      getNotesSnapshot = onSnapshot(notesCollectionQuery, (querySnapshot) => {
          let notes = []
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
            this.notes = notes
            console.log(this.notes)
            this.notesLoaded = true
      }, error => {
        console.log(error.message)
      })
    },
    async getClients() {
        this.clientsLoaded = false
        getNotesSnapshot = onSnapshot(clientsCollectionRef, (querySnapshot) => {
            let clients = []
            querySnapshot.forEach((doc) => {
              let client = {
                id: doc.id,
                date: doc.data().date,
                firstName: doc.data().firstName,
                birthYear: doc.data().birthYear,
                email: doc.data().email,
                annotation: doc.data().annotation
              }
              clients.push(client)
            })
              this.clients = clients
              console.log(this.clients)
              this.clientsLoaded = true
        }, error => {
          console.log(error.message)
        })
    },
    async getClient(clientId) {
        this.clientsLoaded = false
        getNotesSnapshot = onSnapshot(clientCollectionRef, (querySnapshot) => {
            let client = []
            querySnapshot.forEach((doc) => {
              let client = {
                id: doc.id,
                date: doc.data().date,
                firstName: doc.data().firstName,
                birthYear: doc.data().birthYear,
                email: doc.data().email,
                annotation: doc.data().annotation
              }
              clients.push(client)
            })
              this.client = client
              console.log(this.client)
              this.clientsLoaded = true
        }, error => {
          console.log(error.message)
        })
    },
    // async getUserData() {
    //     this.notesLoaded = false
    //     getNotesSnapshot = onSnapshot(notesCollectionQueryData, (querySnapshot) => {
    //         let answers = []
    //         querySnapshot.forEach((doc) => {
    //           let answer = {
    //             id: doc.id,
    //             date: doc.data().date,
    //             firstName: doc.data().firstName,
    //             lastName: doc.data().lastName,
    //             email: doc.data().email,
    //             annotation: doc.data().annotation,
    //             beliefInWork: doc.data().beliefInWork,
    //             laborMarket: doc.data().laborMarket,
    //             purposeFulness: doc.data().purposeFulness,
    //             abilityToWorkTogether: doc.data().abilityToWorkTogether,
    //             handlingOfEverydayLife: doc.data().handlingOfEverydayLife,
    //             stateOfHealth: doc.data().stateOfHealth,
    //             adverts: doc.data().adverts,
    //             jobportal: doc.data().jobportal,
    //             employer: doc.data().employer,
    //             family: doc.data().family,
    //             internship: doc.data().internship,
    //             staffingcompanies: doc.data().staffingcompanies,
    //             socialmedia: doc.data().socialmedia,
    //             notlookingforwork: doc.data().notlookingforwork,
    //             otherways: doc.data().otherways,
    //           }
    //           answers.push(answer)
    //         })
    //           this.answers = answers
    //           console.log(this.answers)
    //           this.notesLoaded = true
    //     }, error => {
    //       console.log(error.message)
    //     })
    // },
    clearNotes() {
      this.notes = []
      if(getNotesSnapshot) getNotesSnapshot() //unsubscribe from any active listener 
    },
    clearClients() {
        this.clients = []
        if(getClientsSnapshot) getClientsSnapshot() //unsubscribe from any active listener 
    },
    async addClient(newClientContent) {
 
        let currentDate = new Date().getTime(),
        date = currentDate.toString()
        
  
        await addDoc(clientsCollectionRef, {
          firstName: newClientContent.firstName,
          birthYear: newClientContent.birthYear,
          email: newClientContent.email,
          annotation: newClientContent.annotation,
          date
        })
  
    },

    // async addEstimate(newNoteContent) {
    // const storeAuth = useStoreAuth()
    // let currentDate = new Date().getTime(),
    // date = currentDate.toString()
    

    // await addDoc(estimatesCollectionRef, {
    //     id: storeAuth.user.id,
    //     beliefInWork: parseInt(newNoteContent.beliefInWork),
    //     laborMarket: parseInt(newNoteContent.laborMarket),
    //     purposeFulness: parseInt(newNoteContent.purposeFulness),
    //     abilityToWorkTogether: parseInt(newNoteContent.abilityToWorkTogether),
    //     handlingOfEverydayLife: parseInt(newNoteContent.handlingOfEverydayLife),
    //     stateOfHealth: parseInt(newNoteContent.stateOfHealth),
    //     adverts: newNoteContent.adverts,
    //     jobportal: newNoteContent.jobportal,
    //     employer: newNoteContent.employer,
    //     family: newNoteContent.family,
    //     internship: newNoteContent.internship,
    //     staffingcompanies: newNoteContent.staffingcompanies,
    //     socialmedia: newNoteContent.socialmedia,
    //     notlookingforwork: newNoteContent.notlookingforwork,
    //     otherways: newNoteContent.otherways,
    //     date
    // })

    // },  
    
    async addNote(newNoteContent) {
 
      let currentDate = new Date().getTime(),
      date = currentDate.toString()
      

      await addDoc(notesCollectionRef, {
        firstName: newNoteContent.firstName,
        lastName: newNoteContent.lastName,
        email: newNoteContent.email,
        annotation: newNoteContent.annotation,
        beliefInWork: parseInt(newNoteContent.beliefInWork),
        laborMarket: parseInt(newNoteContent.laborMarket),
        purposeFulness: parseInt(newNoteContent.purposeFulness),
        abilityToWorkTogether: parseInt(newNoteContent.abilityToWorkTogether),
        handlingOfEverydayLife: parseInt(newNoteContent.handlingOfEverydayLife),
        stateOfHealth: parseInt(newNoteContent.stateOfHealth),
        adverts: newNoteContent.adverts,
        jobportal: newNoteContent.jobportal,
        employer: newNoteContent.employer,
        family: newNoteContent.family,
        internship: newNoteContent.internship,
        staffingcompanies: newNoteContent.staffingcompanies,
        socialmedia: newNoteContent.socialmedia,
        notlookingforwork: newNoteContent.notlookingforwork,
        otherways: newNoteContent.otherways,
        date
      })

    },
    async deleteNote(idToDelete) {
      await deleteDoc(doc(notesCollectionRef, idToDelete))
    },
    async deleteClient(idToDelete) {
        await deleteDoc(doc(clientsCollectionRef, idToDelete))
    },
    async updateNote(id, content) {
      //console.log(content)
      await updateDoc(doc(notesCollectionRef, id), 
        content
      )
    },
    async updateClient(id, content) {
        //console.log(content)
        await updateDoc(doc(clientsCollectionRef, id), 
          content
        )
      },
    changeLanguageToArabic() {
      this.estimatesDefault = this.estimatesAR
    },
    changeLanguageToEnglish() {
      this.estimatesDefault = this.estimatesEN
    },
    changeLanguageToSwedish() {
      this.estimatesDefault = this.estimatesSV
    },
    changeLanguageToSomalia() {
      this.estimatesDefault = this.estimatesSO
    },
  },
  getters: {
    getNoteContent: (state) => {
      return (id) => {
        return state.notes.filter(note => note.id === id )[0]
      }
    },
    getClientContent: (state) => {
        return (id) => {
          return state.clients.filter(client => client.id === id )[0]
        }
      },
  }
})