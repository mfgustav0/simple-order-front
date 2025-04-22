<script lang="ts"></script>

<template>
  <v-app-bar class="px-10">
    <template #prepend>
      <v-btn :active="false" prepend-icon="mdi-home" stacked to="/">
        App
      </v-btn>
    </template>

    <v-btn
      prepend-icon="mdi-account"
      text="Entrar"
      to="/account/login"
    />
  </v-app-bar>
</template>
