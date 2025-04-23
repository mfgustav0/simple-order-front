<script lang="ts" setup>
  import ListOrders from '@/components/Orders/ListOrders.vue';
  import type { Order } from '@/entities/order';
  import type { OrderGateway } from '@/gateway/order.gateway';
  import { useAuthStore } from '@/plugins/vuex';
  import { inject, onMounted, ref } from 'vue';

  const orderGateway = inject('orderGateway') as OrderGateway;
  const store = useAuthStore();

  const orders = ref<Order[]>([])

  onMounted(async () => {
    orders.value = await orderGateway.withToken(store.state.token).getAll();
  });
</script>

<template>
  <div>
    <v-card class="mx-auto">
      <ListOrders :orders="orders" />
    </v-card>
  </div>
</template>
