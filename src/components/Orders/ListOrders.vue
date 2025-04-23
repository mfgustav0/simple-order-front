<script lang="ts" setup>
  import { type Order, translateStatus } from '@/entities/order';
  import { ref } from 'vue';

  defineProps<{
    orders: Order[],
  }>()

  const modalVisualize = ref<boolean>(false);
  const orderVisualized = ref<Order | null>(null);

  function openModal (order: Order): void {
    orderVisualized.value = order;
    modalVisualize.value = true;
  }

  function formatDate (dateString: string | Date): string {
    const date = new Date(dateString);

    return date.toLocaleDateString();
  }
</script>

<template>
  <div>
    <v-list lines="two">
      <v-list-subheader>Pedidos</v-list-subheader>

      <template
        v-for="order in orders"
        :key="order.id"
      >
        <v-list-item :title="`Pedido #${order.id}`">
          <v-list-item-subtitle>
            {{ translateStatus(order.status) }} - {{ formatDate(order.date) }}
          </v-list-item-subtitle>

          <template #append>
            <v-btn
              color="grey-lighten-1"
              icon="mdi-information"
              variant="text"
              @click="openModal(order)"
            />
          </template>
        </v-list-item>

        <v-divider inset />
      </template>
    </v-list>

    <v-dialog v-model="modalVisualize" width="full">
      <CardInfoOrder :order="orderVisualized" />
    </v-dialog>
  </div>
</template>
