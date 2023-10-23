<template>
  <a-steps direction="vertical" :current="current">
    <a-step
      v-for="step in steps"
      :key="step.title"
      :title="step.title"
      :description="step.description"
    />
  </a-steps>
</template>

<script setup lang="ts">
import { IStep } from '../types';

defineProps<{
  current: number;
  steps: IStep[];
}>();
</script>

<style scoped></style>
