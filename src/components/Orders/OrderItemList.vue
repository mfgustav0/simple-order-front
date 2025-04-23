<script lang="ts" setup>
  import { type OrderItem } from '@/entities/order';

  defineProps<{
    items: OrderItem[],
    deleteAction: boolean
  }>()

  const emit = defineEmits<{
    (e: 'delete', id: string): void
  }>()
</script>

<template>
  <v-list lines="two">
    <v-list-subheader>Itens</v-list-subheader>

    <template
      v-for="item in items"
      :key="item.id"
    >
      <v-list-item :title="item.name">
        <template #append>
          <v-row align="center" align-content="center" class="ga-5">
            <span class="me-1 text-subtitle-1">Qtd: {{ item.quantity }}</span>

            <span class="me-1 text-subtitle-1">R$ {{ item.price }}</span>

            <template v-if="deleteAction">
              <v-btn
                color="grey-lighten-1"
                icon="mdi-close-circle-outline"
                variant="text"
                @click="emit('delete', item.id)"
              />
            </template>
          </v-row>
        </template>
      </v-list-item>

      <v-divider class="mx-4 mb-1" />
    </template>
  </v-list>
</template>
