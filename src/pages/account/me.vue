<script lang="ts" setup>
  import type { UserGateway } from '@/gateway/user.gateway';
  import { inject, onMounted, ref } from 'vue';

  const userGateway = inject('userGateway') as UserGateway;

  const user = ref<unknown>({})

  onMounted(async () => {
    user.value = await userGateway.me();
  })
</script>

<template>
  <div>
    {{ user }}
  </div>
</template>
