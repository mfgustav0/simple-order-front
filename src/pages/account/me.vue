<script lang="ts" setup>
  import ListOrders from '@/components/Orders/ListOrders.vue';
  import type { Order } from '@/entities/order';
  import type { OrderGateway } from '@/gateway/order.gateway';
  import { useAuthStore } from '@/plugins/vuex/auth-store';
  import { inject, onMounted, ref } from 'vue';

  const orderGateway = inject('orderGateway') as OrderGateway;
  const authStore = useAuthStore();

  const orders = ref<Order[]>([])

  onMounted(async () => {
    orders.value = await orderGateway.withToken(authStore.state.token).getAll();
  });
</script>

<template>
  <v-card class="mx-auto">
    <ListOrders :orders="orders" />
  </v-card>
</template>
