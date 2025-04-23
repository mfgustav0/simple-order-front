<script lang="ts" setup>
  import { useAuthStore } from '@/plugins/vuex';

  const store = useAuthStore();

  async function logout () {
    store.dispatch('logout')
  }
</script>

<template>
  <v-app-bar class="px-10">
    <template #prepend>
      <v-btn :active="false" prepend-icon="mdi-home" stacked to="/">
        App
      </v-btn>
    </template>

    <template v-if="!store.state.isAuthenticated">
      <v-btn
        prepend-icon="mdi-account"
        text="Entrar"
        to="/account/login"
      />
    </template>
    <template v-else>
      <v-btn
        prepend-icon="mdi-account"
        text="Me"
        to="/account/me"
      />
      <v-btn
        prepend-icon="mdi-exit-to-app"
        text="Sair"
        @click.prevent="logout"
      />
    </template>
  </v-app-bar>
</template>
