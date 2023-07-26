<template>
  <!-- card :bordered="false" is broken, use style="border: 0" instead -->
  <a-card class="border-0" size="small" :bodyStyle="{ padding: 0 }">
    <a-card-meta
      class="mb-24"
      title="Finishing up"
      description="Double-check everything looks OK before confirming."
    />
    <a-row>
      <a-col :span="24">
        <!-- нужно как-то сослаться на locale и убрать padding -->
        <a-list
          :locale="{ emptyText: '' }"
          :data-source="addons"
          :bordered="true"
          :split="true"
        >
          <template #header>
            <a-row align="space-between">
              <a-col class="font-medium">
                {{ plan.label }}
                ({{ period }})
              </a-col>
              <a-col class="font-medium">
                {{ plan.price[billing].decorated }}
              </a-col>
            </a-row>
            <a-row>
              <a-col>
                <a-button
                  class="border-0 h-auto padding-0"
                  type="link"
                  @click="$emit('change:plan')"
                >
                  <span class="underline">Change</span>
                </a-button>
              </a-col>
            </a-row>
          </template>
          <template #renderItem="{ item: addon }">
            <a-list-item>
              <a-list-item-meta :description="addon.label" />
              <template #extra>
                {{ addon.price[billing].decorated }}
              </template>
            </a-list-item>
          </template>
          <template #footer>
            <a-row align="space-between">
              <a-col>Total (per {{ billing.slice(0, -2) }})</a-col>
              <a-col class="indigo font-medium">{{ total }}</a-col>
            </a-row>
          </template>
        </a-list>
      </a-col>
    </a-row>
  </a-card>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { IAddon, IPlan } from '../types';

const props = defineProps<{
  addons: IAddon[];
  billing: string;
  plan: IPlan;
  total: string;
}>();

const period = computed(() => {
  return props.billing.charAt(0).toUpperCase() + props.billing.slice(1);
});
</script>

<style scoped>
.border-0 {
  border: 0;
}

.mb-24 {
  margin-bottom: 24px;
}

.font-medium {
  font-weight: 500;
}

.h-auto.padding-0 {
  height: auto;
  padding: 0;
}

.underline {
  text-decoration: underline;
}

.indigo {
  color: #483eff;
}
</style>
