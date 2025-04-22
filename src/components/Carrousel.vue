<script lang="ts" setup>
  import { inject, onBeforeMount, ref } from 'vue';
  import { type Product } from '@/entities/product.ts';
  import { type ProductGateway } from '@/gateway/product.gateway';

  const productGateway = inject('productGateway') as ProductGateway;

  const items = ref<Product[]>();
  const loading = ref<boolean>(false)

  onBeforeMount(async () => {
    loading.value = true;
    items.value = await productGateway.getProductsBanners();
    loading.value = false;
  });
</script>

<template>
  <v-container>
    <v-skeleton-loader
      :loading="loading"
      type="card"
    >
      <v-carousel hide-delimiters show-arrows="hover">
        <v-carousel-item
          v-for="item of items"
          :key="item.id"
          cover
          :src="item.image"
        />
      </v-carousel>
    </v-skeleton-loader>
  </v-container>
</template>
