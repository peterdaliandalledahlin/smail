<template>
    <div class="content p-4 mb-5" :class="`has-background-${ bgColor }-dark`">
        <AddEditClient :client="newClient" ref="addEditClientRef">
          <template #default="scope">
            <button :disabled="!scope.formValidated" @click="addClient" class="button is-link has-background-success" v-text="!scope.formValidated ? 'För att spara måste du skatta dig på alla områden' : 'Lägg till ny skattning'"></button>
        </template>
        </AddEditClient>
        <div class="card">
            <div class="card-content">
                <div class="field">
                    <label class="label">Förnamn</label>
                    <div class="control">
                        <input v-model="client.firstName" class="input" type="text" />
                    </div>
                </div>

                <div class="field">
                    <label class="label">Födelseår</label>
                    <div class="control">
                        <input v-model="client.birthYear" class="input" type="number" />
                    </div>
                </div>

                <div class="field">
                    <label class="label">E-post</label>
                    <div class="control">
                        <input v-model="client.email" class="input" type="email" />
                    </div>
                </div>

                <div class="field">
                    <label class="label">Anteckning</label>
                    <div class="control">
                        <textarea v-model="client.annotation" class="textarea"></textarea>
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
    import { ref, reactive } from "vue"
    import { useStoreNotes } from '../../stores/storeNotes'

    import AddEditClient from './AddEditClient.vue'

    const addEditClientRef = ref(null)
  
  const addClient = () => {

    storeNotes.addClient(newClient)
    
    newClient.firstName = ''
    newClient.birthYear = ''
    newClient.email = ''
    newClient.annotation= ''
  }

  const newClient = reactive({
    firstName: '',
    birthYear: '',
    email: '',
    annotation: '',
})

    
//FORM VALIDATION DISABLE BUTTON WHEN INCOMPLETE
    const validateForm = () => {
        formValidated.value = true
        storeNotes.clients.forEach((client) => {
            if(props.client[client.propertyName] === null) {
                formValidated.value = true
            }
        })
    }
    const formValidated = ref(true)

//STORE
  const storeNotes = useStoreNotes()

//PROPS
    const props = defineProps({
        client: {
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


.free-label, .between-label, .basic-label {
    user-select: none;
} 

/* CONTAINERS */

.container {

    width: 100%;
    margin: 0 auto;

}
section {
    display: flex;
}
.four { width: 10%; max-width: 10%;}
/* CLEARFIX */

.cf:before,
.cf:after {
    content: " ";
    display: table;
}

.cf:after {
    clear: both;
}

.cf {
    *zoom: 1;
}

/* FORM */

.form .plan input, .form .payment-plan input, .form .payment-type input{
  display: none;
}

.form label{
  position: relative;
  color: #fff;
  background-color: #aaa;
  font-size: 1rem;
  text-align: center;
  height: 30px;
  display: block;
  cursor: pointer;
  border: 3px solid transparent;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
.free-label{
    border-radius: 10px 0px 0px 10px;
}
.between-label {
    border-radius: 0px;
}
.basic-label {
    border-radius: 0px 10px 10px 0px;
}

.form .plan input:checked + label, .form .payment-plan input:checked + label, .form .payment-type input:checked + label{
  /* border: 1px solid #333; */
  /* background-color: #2fcc71; */
  background-color: hsl(171, 100%, 41%);
}

/* .form .plan input:checked + label:after, form .payment-plan input:checked + label:after, .form .payment-type input:checked + label:after{
  content: "\2713";
  width: 40px;
  height: 40px;
  line-height: 40px;
  border-radius: 100%;
  border: 2px solid #333;
  background-color: #2fcc71;
  z-index: 999;
  position: absolute;
  top: -10px;
  right: -10px;
} */
</style>