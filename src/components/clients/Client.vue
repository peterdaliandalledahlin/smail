<template>
    <!--CLIENT LIST-->
    <div class="card mb-3">
        <header class="card-header">
            <p class="card-header-title">
            Klient
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
                              <th>Förnamn</th><td>{{ props.client.firstName }}</td>
                          </tr>
                          <tr>
                              <th>E-post</th><td>{{ props.client.email }}</td>
                          </tr>
                      </tbody>
                  </table> 
            </div>
        </div>
        <footer class="card-footer">
            <router-link :to="`/client/${props.client.id}`" href="#" class="card-footer-item"> <span>&nbsp;Visa klient&nbsp;</span></router-link>
        </footer>
    </div>

</template>
  
<script setup>
//IMPORTS
import { computed, reactive } from 'vue'
      //import ModalDeleteClient from '../../components/clients/ModalDeleteClient.vue'
import { useDateFormat } from '@vueuse/core'
  
//PROPS
const props = defineProps({
    client: {
        type: Object,
        required: true
    }
})
  
//MODALS
const modals = reactive({
    deleteClient: false
})
  
//DATE FORMATTED
const dateFormatted = computed(() => {
    let date = new Date(parseInt(props.client.date))
    const formattedDate = useDateFormat(date, 'YYYY-MM-DD HH:mm:ss')
    return formattedDate.value
})
  
</script>

<style scoped>
.card-footer-item[data-v-b49f0a3c] {
    justify-content: flex-start !important;
}
span {
    background-color: #43165c;
    color: azure;
    padding: 3px;
    font-size: small;
}
</style>