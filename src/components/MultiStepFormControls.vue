<template>
  <a-row justify="space-between">
    <a-col>
      <a-button
        class="btn"
        v-show="step !== 0"
        size="large"
        @click="$emit('backward')"
      >
        Backward
      </a-button>
    </a-col>
    <a-col>
      <a-button
        class="btn"
        type="primary"
        v-if="step !== 3"
        :disabled="disabled"
        size="large"
        @click="$emit('forward')"
      >
        Forward
      </a-button>
      <a-button
        class="btn"
        v-else="step === 3"
        type="primary"
        size="large"
        @click="$emit('confirm')"
      >
        Confirm
      </a-button>
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
defineProps<{
  step: number;
  disabled: boolean;
}>();
</script>

<style scoped>
.btn {
  width: 110px;
}
</style>
