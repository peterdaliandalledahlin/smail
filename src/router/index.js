import { createRouter, createWebHashHistory } from 'vue-router'
import { useStoreAuth } from '../stores/storeAuth'
//import ViewNotes from '@/views/ViewNotes.vue'
//import ViewEditNote from '@/views/ViewEditNote.vue'
//import ViewEditClient from '@/views/ViewEditClient.vue'
import ViewAuth from '@/views/ViewAuth.vue'
import ViewChart from '@/views/ViewChart.vue'
import ViewClients from '@/views/ViewClients.vue'
import ViewClient from '@/views/ViewClient.vue'
import EditClient from '@/views/EditClient.vue'
import AddEstimate from '@/views/AddEstimate.vue'
import EditEstimate from '@/views/EditEstimate.vue'
import DevelopmentPlan from '@/views/DevelopmentPlan.vue'
import Individual from '@/views/Individual.vue'
import Knowledge from '@/views/Knowledge.vue'
import Purposefulness from '@/views/Purposefulness.vue'
import Cooperation from '@/views/Cooperation.vue'
import Everydaylife from '@/views/Everydaylife.vue'
import Stateofhealth from '@/views/Stateofhealth.vue'

const routes = [
    {
        path: '/',
        name: 'clients',
        component: ViewClients
    },
    // {
    //     path: '/edit-note/:id',
    //     name: 'edit-note',
    //     component: ViewEditNote
    // },
    // {
    //     path: '/client/:id',
    //     name: 'view-client',
    //     component: ViewEditClient
    // },
    {
        path: '/client/:id',
        name: 'view-client',
        component: ViewClient
    },
    {
        path: '/edit-client/:id',
        name: 'edit-client',
        component: EditClient
    },
    {
        path: '/add-estimate/:id',
        name: 'add-estimate',
        component: AddEstimate
    },
    {
        path: '/development-plan/:id',
        name: 'development-plan',
        component: DevelopmentPlan
    },
    {
        path: '/client/:client_id/estimate/:estimate_id',
        name: 'edit-estimate',
        component: EditEstimate
    },
    {
        path: '/individual',
        name: 'individual',
        component: Individual
    },
    {
        path: '/knowledge',
        name: 'knowledge',
        component: Knowledge
    },
    {
        path: '/purposefulness',
        name: 'purposefulness',
        component: Purposefulness
    },
    {
        path: '/cooperation',
        name: 'cooperation',
        component: Cooperation
    },
    {
        path: '/everydaylife',
        name: 'everydaylife',
        component: Everydaylife
    },
    {
        path: '/stateofhealth',
        name: 'stateofhealth',
        component: Stateofhealth
    },
    {
        path: '/auth',
        name: 'auth',
        component: ViewAuth
    },
    {
        path: '/chart',
        name: 'cart',
        component: ViewChart
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

router.beforeEach(async (to, from) => {
    const storeAuth = useStoreAuth()
    if (!storeAuth.user.id && to.name !== 'auth') {
        return { name: 'auth'}
    }
    if (storeAuth.user.id && to.name === 'auth') {
        return false
    }
  })

export default router