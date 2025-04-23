<script lang="ts" setup>
  import type { Order } from '@/entities/order';

  defineProps<{
    order: Order,
  }>()
</script>

<template>
  <v-card :title="`Pedido #${order.id}`">
    <v-card-item>
      <v-list lines="two">
        <v-list-subheader>Itens</v-list-subheader>

        <template
          v-for="item in order.items"
          :key="item.id"
        >
          <v-list-item :title="item.name">
            <template #append>
              <v-row align="center" align-content="center" class="ga-5">
                <span class="me-1 text-subtitle-1">Qtd: {{ item.quantity }}</span>

                <span class="me-1 text-subtitle-1">R$ {{ item.price }}</span>
              </v-row>
            </template>
          </v-list-item>

          <v-divider class="mx-4 mb-1" />
        </template>
      </v-list>
    </v-card-item>
  </v-card>
</template>
