<script lang="ts" setup>
  import Carrousel from '@/components/Carrousel.vue';
  import ProductItemCard from '@/components/ProductItemCard.vue';
  import { type Product } from '@/entities/product.ts';
  import { type ProductGateway } from '@/gateway/product.gateway';
  import { inject, onMounted, ref } from 'vue';

  const productGateway = inject('productGateway') as ProductGateway;

  const items = ref<Product[]>([]);
  const loading = ref<boolean>(false)

  onMounted(async () => {
    loading.value = true;

    const productsData: Product[] = await productGateway.getList();
    items.value = productsData;

    loading.value = false;
  });
</script>

<template>
  <v-row dense>
    <Carrousel />

    <template v-if="loading">
      <v-col cols="12" md="6">
        <v-skeleton-loader
          boilerplate
          class="my-6"
          :loading="loading"
          type="card"
        />
      </v-col>
      <v-col cols="12" md="6">
        <v-skeleton-loader
          boilerplate
          class="my-6"
          :loading="loading"
          type="card"
        />
      </v-col>
    </template>

    <template v-if="!loading">
      <v-col v-for="product of items" :key="product.id" cols="12" md="6">
        <ProductItemCard :height="250" :product="product" />
      </v-col>
    </template>
  </v-row>
</template>
