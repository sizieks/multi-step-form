<template>
  <a-config-provider :theme="theme">
    <MultiStepForm />
  </a-config-provider>
</template>

<script setup lang="ts">
import { theme } from './theme';
import MultiStepForm from './components/MultiStepForm.vue';
</script>

<style scoped></style>
