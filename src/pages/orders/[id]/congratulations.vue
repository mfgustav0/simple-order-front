<script lang="ts" setup>
  import { useAuthStore } from '@/plugins/vuex/auth-store';
  import { useRoute, useRouter } from 'vue-router'
  import { inject, onMounted, ref } from 'vue';
  import { type Order } from '@/entities/order';
  import type { OrderGateway } from '@/gateway/order.gateway';

  const authStore = useAuthStore();
  const router = useRouter();

  const orderId: string = useRoute().params.id as string;

  const orderGateway = inject('orderGateway') as OrderGateway;
  const order = ref<Order>({} as Order);

  onMounted(async () => {
    if(!authStore.state.isAuthenticated) {
      await router.push('/');
      return;
    }

    order.value = await orderGateway.getById(orderId);

    if(order.value.status != 'finished') {
      await router.push('/');
      return;
    }
  });
</script>

<template>
  <v-container>
    <v-card>
      <v-card-title>Pedido #{{ order.id }}</v-card-title>

      <v-card-text>Pedido finalizado com sucesso</v-card-text>

      <v-card-actions>
        <v-btn
          block
          class="mt-2"
          color="indigo-darken-3"
          text="Visualizar Pedidos"
          to="/account/me"
          type="button"
          variant="outlined"
        />
      </v-card-actions>
    </v-card>
  </v-container>
</template>
