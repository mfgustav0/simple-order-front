<script lang="ts" setup>
  import type { Order } from '@/entities/order';

  defineProps<{
    order: Order,
  }>()
</script>

<template>
  <v-card :title="`Pedido #${order.id}`">
    <v-card-item>
      {{ order }}
    </v-card-item>
  </v-card>
</template>
