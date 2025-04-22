<script lang="ts" setup>
  import { type Product } from '@/entities/product.ts';

  defineProps<{
    product: Product,
    height: number
  }>()
</script>

<template>
  <v-card class="mx-auto my-6" :to="`/product/${product.id}`">
    <v-img cover :height="height" :src="product.image" />

    <v-card-item>
      <v-card-title>{{ product.name }}</v-card-title>
    </v-card-item>

    <v-card-actions>
      <v-btn
        append-icon="mdi-chevron-right"
        block
        text="Visualizar Produto"
        :to="`/product/${product.id}`"
        variant="tonal"
      />
    </v-card-actions>
  </v-card>
</template>
