<template>
  <div class="auth">
      <div class="tabs is-centered">
        <ul>
          <li :class="{ 'is-active' : !register }"><a @click.prevent="register = false">Logga in</a></li>
          <li :class="{ 'is-active' : register }"><a @click.prevent="register = true">Registrera</a></li>
      </ul>
    </div>
    <div class="card auth-form">
      <div class="card-content">
        <div class="title has-text-centered">
          {{ formTitle }}
        </div>
        <form @submit.prevent="onSubmit">
          <div class="field">
            <label class="label">Email</label>
            <div class="control">
              <input v-model="credentials.email" class="input" type="email" placeholder="ex. namn.namn@gmail.com">
            </div>
          </div>
          <div class="field">
            <label class="label">Password</label>
            <div class="control">
              <input v-model="credentials.password" class="input" type="password" placeholder="Ange ett lösenord">
            </div>
          </div>
          <div class="field is-grouped is-grouped-right">
            <p class="control">
              <button class="button">
                {{ formTitle }}
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
//IMPORTS
  import { computed, reactive, ref } from 'vue'
  import { useStoreAuth } from '../stores/storeAuth'

//STORE
  const storeAuth = useStoreAuth()

//LOGIN & REGISTER
  const register = ref(false)

//FORM TITLE
  const formTitle = computed(() => {
    return register.value ? 'Registrera' : 'Logga in'
  })

//SUBMIT
  const onSubmit = () => {
    if (!credentials.email || !credentials.password) {
      alert('Please enter an email and password')
    }else {
      if (register.value) {
        storeAuth.registerUser(credentials)
        credentials.email = ''
        credentials.password = ''
      } else {
        storeAuth.loginUser(credentials)
      }
    }
  }

//CREDENTIALS
  const credentials = reactive({
    email: '',
    password: ''
  })

</script>

<style scoped>
button {
  background-color: #43165c;
  color: azure;
}
.auth-form {
  max-width: 400px;
  margin: 0 auto;
}
</style>