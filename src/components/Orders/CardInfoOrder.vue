<script lang="ts" setup>
  import type { Order } from '@/entities/order';

  defineProps<{
    order: Order,
  }>()
</script>

<template>
  <v-card :title="`Pedido #${order.id}`">
    <v-card-item>
      <OrderItemList
        :delete-action="false"
        :items="order.items"
      />
    </v-card-item>
  </v-card>
</template>
