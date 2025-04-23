<script lang="ts" setup>
  import { type Product } from '@/entities/product.ts';
  import { type ProductGateway } from '@/gateway/product.gateway';
  import { useAuthStore } from '@/plugins/vuex/auth-store';
  import { useOrderStore } from '@/plugins/vuex/order-store';
  import { useRoute } from 'vue-router'
  import { inject, onBeforeMount, ref } from 'vue';
  import type { OrderGateway } from '@/gateway/order.gateway';
import { CreateOrder } from '@/use-cases/create-order';

  const authStore = useAuthStore();
  const orderStore = useOrderStore();

  const productId: string = useRoute().params.id as string;
  const productGateway = inject('productGateway') as ProductGateway;
  const orderGateway = inject('orderGateway') as OrderGateway;
  const product = ref<Product>({} as Product);
  const error = ref<string|null>(null);
  const loading = ref<boolean>(false);
  const updatingOrder = ref<boolean>(false);

  onBeforeMount(async () => {
    loading.value = true;
    product.value = await productGateway.getProductById(productId);
    loading.value = false;
  });

  async function addItem (productId: string): Promise<void> {
    if(!authStore.state.isAuthenticated) {
      return;
    }

    if(!orderStore.state.orderId) {
      const createOrder = new CreateOrder(orderGateway.withToken(authStore.state.token));
      await createOrder.execute();

      orderStore.dispatch('load', orderGateway);
    }

    try {
      updatingOrder.value = true;
      error.value = '';

      await orderGateway.addItem({
        orderId: orderStore.state.orderId as string,
        productId,
        quantity: 1,
      });

      orderStore.dispatch('load', orderGateway);
    } catch(exception) {
      error.value = (exception as Error).message
    } finally {
      updatingOrder.value = false;
    }
  }
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
            :src="product.image"
          />
        </v-carousel>
      </v-skeleton-loader>
    </v-col>
    <v-col cols="12" md="6">
      <v-container>
        <template v-if="error">
          <v-alert
            :text="error"
            title="Erro ao finalizar o Pedido"
            type="error"
          />
        </template>

        <h2>{{ product.name }}</h2>

        <v-divider
          class="mt-2"
          :thickness="2"
        />

        <h3 class="my-2">Descrição</h3>

        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque malesuada vestibulum viverra. Donec eu egestas ipsum. Aliquam erat volutpat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nec venenatis sapien. Sed eget dapibus eros. Aliquam at tincidunt ipsum. Cras quam erat, sollicitudin non facilisis id, rutrum id est. Cras vulputate ultricies massa sed cursus. Pellentesque turpis turpis, mollis eu aliquam at, consequat eget turpis. Morbi et mattis tellus. Duis ullamcorper a erat vel dictum. Sed vitae tortor ex. Donec pulvinar lectus nec turpis tempor vulputate. Nulla facilisi. In venenatis ex nisl, at lacinia purus pharetra in.</p>

        <template v-if="authStore.state.isAuthenticated">
          <v-divider
            class="mt-2"
            :thickness="2"
          />

          <v-btn
            block
            class="mt-2"
            color="indigo-darken-3"
            :loading="updatingOrder"
            text="Adicionar Produto"
            type="button"
            variant="outlined"
            @click="addItem(product.id)"
          />
        </template>
      </v-container>
    </v-col>
  </v-row>
</template>
