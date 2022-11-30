import { createRouter, createWebHashHistory } from 'vue-router'
import { useStoreAuth } from '../stores/storeAuth'
//import ViewNotes from '@/views/ViewNotes.vue'
//import ViewEditNote from '@/views/ViewEditNote.vue'
//import ViewEditClient from '@/views/ViewEditClient.vue'
import ViewStats from '@/views/ViewStats.vue'
import ViewAuth from '@/views/ViewAuth.vue'
import ViewChart from '@/views/ViewChart.vue'
import ViewClients from '@/views/ViewClients.vue'
import ViewClient from '@/views/ViewClient.vue'
import EditClient from '@/views/EditClient.vue'
import AddEstimate from '@/views/AddEstimate.vue'
import GoogleCharts from '@/views/GoogleCharts.vue'
import EditEstimate from '@/views/EditEstimate.vue'

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
        path: '/client/:id',
        name: 'view-client',
        component: ViewClient
    },
    {
        path: '/client/:client_id/estimate/:estimate_id',
        name: 'edit-estimate',
        component: EditEstimate
    },
    {
        path: '/google-chart',
        name: 'google-chart',
        component: GoogleCharts
    },
    {
        path: '/stats',
        name: 'stats',
        component: ViewStats
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