<template>
  <!-- card :bordered="false" is broken, use style="border: 0" instead -->
  <a-card class="h-full border-0" size="small" :bodyStyle="bodyStyle">
    <a-row class="mb-12">
      <a-col>
        <img src="/src/assets/images/icon-thank-you.svg" alt="thank-you" />
      </a-col>
    </a-row>
    <a-row class="mb-12">
      <a-col class="text-32 font-bold">Thank you!</a-col>
    </a-row>
    <a-row class="mb-12">
      <a-col class="text-center">
        Thanks for confirming your subscription! We hope you have fun using our
        platform. If you ever need support, please feel free to email us at
        support@lorem.com.
      </a-col>
    </a-row>
  </a-card>
</template>

<script setup lang="ts">
const bodyStyle = {
  padding: 0,
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
};
</script>

<style scoped>
.h-full.border-0 {
  border: 0;
  height: 100%;
}

.mb-12:not(:last-child) {
  margin-bottom: 12px;
}

.text-32.font-bold {
  font-size: 32px;
  font-weight: 700;
}

.text-center {
  text-align: center;
}
</style>
