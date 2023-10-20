<template>
  <a-config-provider :theme="theme">
    <Suspense>
      <MultiStepForm />
      <!--
        <template #fallback>
          may have to redesign the structure and separate
          out a layout component >_< but too lazy for now...
        </template>
      -->
    </Suspense>
  </a-config-provider>
</template>

<script setup lang="ts">
import { theme } from './theme';
import MultiStepForm from './components/MultiStepForm.vue';
</script>

<style scoped></style>
