<template>
  <a-config-provider
    :theme="{
      token: {
        colorPrimary: '#483eff',
        colorError: '#f9818e',
        colorLink: '#483eff',
        fontFamily: 'Ubuntu',
        fontSize: 16,
      },
      components: {
        Steps: {
          colorFillContent: '#ffffff',
          colorSplit: '#ffffff',
          colorPrimary: '#ffaf7e',
          colorText: '#ffffff',
          colorTextDescription: '#ffffff',
          colorTextLabel: '#483eff',
          controlItemBgActive: '#ffffff',
        },
        Card: {
          fontSizeLG: 32,
          fontWeightStrong: 700,
        },
      },
    }"
  >
    <MultiStepForm />
  </a-config-provider>
</template>

<script setup lang="ts">
import MultiStepForm from './components/MultiStepForm.vue';
</script>

<style scoped></style>
