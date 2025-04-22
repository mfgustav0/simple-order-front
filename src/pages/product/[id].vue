<script lang="ts" setup>
  import { type Product } from '@/entities/product.ts';
  import { type ProductGateway } from '@/gateway/product.gateway';
  import { useRoute } from 'vue-router'
  import { inject, onBeforeMount, ref } from 'vue';

  const productId: string = useRoute().params.id as string;

  const productGateway = inject('productGateway') as ProductGateway;

  const productData = ref<Product>({} as Product);

  const loading = ref<boolean>(false)

  onBeforeMount(async () => {
    loading.value = true;
    productData.value = await productGateway.getProductById(productId);
    loading.value = false;
  });
</script>

<template>
  <v-row dense>
    <v-col cols="12" md="6">
      <v-skeleton-loader
        :loading="loading"
        type="card"
      >
        <v-carousel>
          <v-carousel-item
            cover
            :src="productData.image"
          />
        </v-carousel>
      </v-skeleton-loader>
    </v-col>
    <v-col cols="12" md="6">
      <v-container>
        <h2>{{ productData.name }}</h2>

        <v-divider
          class="mt-2"
          :thickness="2"
        />

        <h3 class="my-2">Descrição</h3>

        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque malesuada vestibulum viverra. Donec eu egestas ipsum. Aliquam erat volutpat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nec venenatis sapien. Sed eget dapibus eros. Aliquam at tincidunt ipsum. Cras quam erat, sollicitudin non facilisis id, rutrum id est. Cras vulputate ultricies massa sed cursus. Pellentesque turpis turpis, mollis eu aliquam at, consequat eget turpis. Morbi et mattis tellus. Duis ullamcorper a erat vel dictum. Sed vitae tortor ex. Donec pulvinar lectus nec turpis tempor vulputate. Nulla facilisi. In venenatis ex nisl, at lacinia purus pharetra in.</p>
      </v-container>
    </v-col>
  </v-row>
</template>
