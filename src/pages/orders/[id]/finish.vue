<script lang="ts" setup>
  import { useAuthStore } from '@/plugins/vuex/auth-store';
  import { useOrderStore } from '@/plugins/vuex/order-store';
  import { useRoute, useRouter } from 'vue-router'
  import { inject, onMounted, ref } from 'vue';
  import type { OrderGateway } from '@/gateway/order.gateway';
  import { type Order, translateStatus } from '@/entities/order';

  const authStore = useAuthStore();
  const orderStore = useOrderStore();
  const router = useRouter();

  const orderId: string = useRoute().params.id as string;

  const orderGateway = inject('orderGateway') as OrderGateway;
  const order = ref<Order>({} as Order);
  const error = ref<string|null>(null);
  const loading = ref<boolean>(false);

  onMounted(async () => {
    if(!authStore.state.isAuthenticated) {
      await router.push('/');
      return;
    }

    await loadOrderDetails();

    if(order.value.status == 'finished') {
      await router.push('/');
      return;
    }
  });

  async function loadOrderDetails () {
    error.value = '';

    loading.value = true;
    order.value = await orderGateway.getById(orderId);
    loading.value = false;
  }

  async function deleteItem (itemId: string) {
    try {
      await orderGateway.removeItem({
        orderId: order.value.id,
        itemId,
      });
    } finally {
      await loadOrderDetails();

      orderStore.dispatch('load', orderGateway);
    }
  }

  async function finish () {
    try {
      error.value = '';

      await orderGateway.finish({
        orderId: order.value.id,
      });

      await orderStore.dispatch('load', orderGateway);

      await router.push(`/orders/${order.value.id}/congratulations`);
    } catch(exception) {
      error.value = (exception as Error).message
    }
  }
</script>

<template>
  <v-container>
    <template v-if="loading">
      <v-skeleton-loader
        type="card"
      />
    </template>

    <template v-if="!loading">
      <v-card>
        <v-card-title>Pedido #{{ order.id }} - {{ translateStatus(order.status) }}</v-card-title>

        <template v-if="error">
          <v-alert
            :text="error"
            title="Erro ao finalizar o Pedido"
            type="error"
          />
        </template>

        <v-card-text>
          <OrderItemList
            :delete-action="true"
            :items="order.items"
            @delete="deleteItem"
          />
        </v-card-text>

        <v-card-title>Total: R$ {{ order.total }}</v-card-title>

        <v-card-actions>
          <template v-if="order != null && order.items?.length > 0">
            <v-btn
              block
              class="mt-2"
              color="indigo-darken-3"
              text="Finalizar Pedido"
              type="button"
              variant="outlined"
              @click="finish()"
            />
          </template>
        </v-card-actions>
      </v-card>
    </template>
  </v-container>
</template>
