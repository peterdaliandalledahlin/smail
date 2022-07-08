import { createRouter, createWebHashHistory } from 'vue-router'
import { useStoreAuth } from '../stores/storeAuth'
import ViewNotes from '@/views/ViewNotes.vue'
import ViewEditNote from '@/views/ViewEditNote.vue'
import ViewStats from '@/views/ViewStats.vue'
import ViewAuth from '@/views/ViewAuth.vue'
import ViewChart from '@/views/ViewChart.vue'

const routes = [
    {
        path: '/',
        name: 'notes',
        component: ViewNotes
    },
    {
        path: '/edit-note/:id',
        name: 'edit-note',
        component: ViewEditNote
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