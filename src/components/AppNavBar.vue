<script lang="ts" setup>
  import { useAuthStore } from '@/plugins/vuex/auth-store';
  import { useOrderStore } from '@/plugins/vuex/order-store';

  const authStore = useAuthStore();
  const orderStore = useOrderStore();

  async function logout () {
    authStore.dispatch('logout');
  }
</script>

<template>
  <v-app-bar class="px-10">
    <template #prepend>
      <v-btn :active="false" prepend-icon="mdi-home" stacked to="/">
        App
      </v-btn>
    </template>

    <template v-if="!authStore.state.isAuthenticated">
      <v-btn
        prepend-icon="mdi-account"
        text="Entrar"
        to="/account/login"
      />
    </template>

    <template v-else>
      <v-btn
        stacked
        text="Carrinho"
        :to="orderStore.state.orderId ? `/orders/${orderStore.state.orderId}/finish` : undefined"
      >
        <v-badge v-model="orderStore.getters.showBadge" color="error" :content="orderStore.state.totalItems">
          <v-icon>mdi-cart</v-icon>
        </v-badge>
      </v-btn>

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
