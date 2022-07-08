import { defineStore } from 'pinia'
import { doc, addDoc, collection, onSnapshot, deleteDoc, updateDoc, query, orderBy } from 'firebase/firestore'
import { db } from '../js/firebase'
import { useStoreAuth } from './storeAuth'

//const notesCollectionRef = collection(db, 'notes')
let notesCollectionRef
let notesCollectionQuery

let getNotesSnapshot = null


export const useStoreNotes = defineStore('storeNotes', {
  state: () => {
    return {
      notes: [],
      notesLoaded: true
    }
  },
  actions: {
    init() {
      const storeAuth = useStoreAuth() 
      notesCollectionRef = collection(db, 'users', storeAuth.user.id, 'notes')
      notesCollectionQuery = query(notesCollectionRef, orderBy('date', 'desc'))
      this.getNotes()
    },
    async getNotes() {
      this.notesLoaded = false
      getNotesSnapshot = onSnapshot(notesCollectionQuery, (querySnapshot) => {
          let notes = []
          querySnapshot.forEach((doc) => {
            let note = {
              id: doc.id,
              date: doc.data().date,
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
            this.notesLoaded = true
            //console.log(this.notes)
      }, error => {
        console.log(error.message)
      })
    },
    clearNotes() {
      this.notes = []
      if(getNotesSnapshot) getNotesSnapshot() //unsubscribe from any active listener 
    },
    async addNote(newNoteContent) {
 
      let currentDate = new Date().getTime(),
      date = currentDate.toString()

      await addDoc(notesCollectionRef, {
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
    async updateNote(id, content) {
      console.log(content)

      await updateDoc(doc(notesCollectionRef, id), 
        content
      )
    }
  },
  getters: {
    getNoteContent: (state) => {
      return (id) => {
        return state.notes.filter(note => note.id === id )[0]
      }
    },
  }
})