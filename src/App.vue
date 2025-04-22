<template>
  <v-app>
    <v-layout>
      <AppNavBar />

      <v-main class="ma-15">
        <v-container fluid>
          <router-view />
        </v-container>
      </v-main>

      <AppFooter />
    </v-layout>
  </v-app>
</template>

<script lang="ts" setup>

</script>
