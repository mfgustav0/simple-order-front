/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { useAuthStore } from '@/plugins/vuex'
import { createRouter, createWebHistory } from 'vue-router/auto'
import { routes } from 'vue-router/auto-routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (!localStorage.getItem('vuetify:dynamic-reload')) {
      console.log('Reloading page to fix dynamic import error')
      localStorage.setItem('vuetify:dynamic-reload', 'true')
      location.assign(to.fullPath)
    } else {
      console.error('Dynamic import error, reloading page did not fix it', err)
    }
  } else {
    console.error(err)
  }
})

router.beforeEach(async to => {
  const authStore = useAuthStore();

  await authStore.dispatch('init');

  if(to.fullPath.includes('account/login') && authStore.state.isAuthenticated) {
    return { path: '/', force: true };
  }

  if (!authStore.state.isAuthenticated && !to.fullPath.includes('account/login')) {
    if(to.fullPath.includes('account/me') || to.fullPath.includes('orders')) {
      console.log('redirect')
      return { path: '/account/login', force: true };
    }
  }

  return true;
})

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})

export default router
