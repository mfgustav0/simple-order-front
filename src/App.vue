<script lang="ts" setup>
  import { computed, watch } from 'vue';
  import { useAuthStore } from './plugins/vuex';
  import { useRouter } from 'vue-router';

  const router = useRouter();
  const authStore = useAuthStore();

  authStore.dispatch('init');

  const token = computed(() => authStore.state.token);

  watch(
    token,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async (newValue, _) => {
      if(newValue == null) {
        await router.push('/');
      }
    }
  )
</script>

<template>
  <v-app>
    <v-layout>
      <AppNavBar />

      <v-main class="ma-15">
        <v-container fluid>
          <router-view />
        </v-container>
      </v-main>

      <AppFooter />
    </v-layout>
  </v-app>
</template>
