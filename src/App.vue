<script lang="ts" setup>
  import { computed, inject, watch } from 'vue';
  import { useAuthStore } from './plugins/vuex/auth-store';
  import { useRouter } from 'vue-router';
  import type { OrderGateway } from '@/gateway/order.gateway';
  import { CreateOrder } from './use-cases/create-order';
  import { useOrderStore } from '@/plugins/vuex/order-store';

  const router = useRouter();
  const authStore = useAuthStore();
  const orderStore = useOrderStore();
  const orderGateway = inject('orderGateway') as OrderGateway;

  authStore.dispatch('init');
  orderStore.dispatch('init', orderGateway.withToken(authStore.state.token));

  const token = computed(() => authStore.state.token);

  watch(
    token,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async (newValue, _) => {
      if(newValue == null) {
        await router.push('/');
        return;
      }

      const createOrder = new CreateOrder(orderGateway.withToken(newValue));
      await createOrder.execute();

      orderStore.dispatch('load', orderGateway);
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
