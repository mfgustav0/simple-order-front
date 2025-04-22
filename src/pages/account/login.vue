<script lang="ts" setup>
  import type { AuthGateway } from '@/gateway/auth.gateway';
  import { useAuthStore } from '@/plugins/vuex';
  import { inject, ref } from 'vue';
  import { useRouter } from 'vue-router';

  const authGateway = inject('authGateway') as AuthGateway;
  const store = useAuthStore();
  const router = useRouter();

  const form = ref<{
    email: string,
    password: string,
    loading: boolean,
    error: string | null,
  }>({
    email: '',
    password: '',
    loading: false,
    error: null,
  });

  const rules = {
    email: [
      (value: string | null) => {
        if(!value) {
          return 'Campo de e-mail não pode ser vazio';
        }

        const isValidEmail = value.match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
        if (isValidEmail) return true

        return 'Campo de e-mail não possui o formato válido'
      },
    ],
    password: [
      (value: string | null) => {
        if(!value) {
          return 'Campo de senha não pode ser vazio';
        }

        return true;
      },
    ],
  };

  async function submit (event: Promise<{ valid: boolean }>) {
    if(form.value.loading) {
      return;
    }

    const results = await event
    if(!results.valid) {
      return;
    }

    form.value.error = null;
    try {
      const outputLogin = await authGateway.login({
        email: form.value.email,
        password: form.value.password,
      });

      store.dispatch('registerToken', {
        token: outputLogin.access_token,
      });

      await router.push('/');
    } catch(error) {
      form.value.error = (error as Error).message
    }
  }
</script>

<template>
  <v-sheet
    border="lg opacity-12"
    class="text-body-2 mx-auto"
    max-width="550"
    rounded
  >
    <v-card class="mx-auto px-6 py-8">
      <template v-if="form.error">
        <v-alert
          :text="form.error"
          title="Erro ao realizar o Login"
          type="error"
        />
      </template>

      <v-card-item>
        <v-card-title>Já sou cliente</v-card-title>
      </v-card-item>

      <v-form validate-on="submit lazy" @submit.prevent="submit">
        <v-text-field
          v-model="form.email"
          label="E-mail"
          :rules="rules.email"
          type="email"
          variant="outlined"
        />

        <v-text-field
          v-model="form.password"
          label="Senha"
          :rules="rules.password"
          type="password"
          variant="outlined"
        />

        <v-divider class="mx-4 mb-1" />

        <v-btn
          block
          class="mt-2"
          color="indigo-darken-3"
          :loading="form.loading"
          text="Logar"
          type="submit"
          variant="flat"
        />

        <v-divider class="ma-4" />

        <v-btn
          block
          class="mt-2"
          color="indigo-darken-3"
          :loading="form.loading"
          text="Criar uma conta"
          to="/account/signup"
          type="submit"
          variant="outlined"
        />
      </v-form>
    </v-card>
  </v-sheet>
</template>
