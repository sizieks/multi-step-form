<template>
  <!-- card :bordered="false" is broken, use style="border: 0" instead -->
  <a-card class="border-0" size="small" :bodyStyle="{ padding: 0 }">
    <a-card-meta
      class="mb-24"
      title="Select your plan"
      description="You have the option of monthly or yearly billing."
    />
    <a-row>
      <a-col :span="24">
        <a-radio-group
          class="block"
          v-model:value="value"
          @change="$emit('update:plan', 'plan', value)"
        >
          <a-row justify="space-between" :gutter="24">
            <a-col v-for="plan in plans" :key="plan.id" :span="8">
              <label :for="`plan-${plan.id}`">
                <a-card
                  :class="{ active: value === plan.id }"
                  size="small"
                  :bodyStyle="{ cursor: 'pointer' }"
                >
                  <a-radio-button
                    class="fixed opacity-0 pointer-events-none"
                    :id="`plan-${plan.id}`"
                    :value="plan.id"
                  />
                  <a-row>
                    <a-col class="mb-24">
                      <img :src="plan.icon" :alt="plan.label" />
                    </a-col>
                  </a-row>
                  <a-row>
                    <a-col class="font-medium">
                      {{ plan.label }}
                    </a-col>
                  </a-row>
                  <a-row>
                    <a-col class="gray">
                      {{ getPrice(billing, currency, plan) }}
                    </a-col>
                  </a-row>
                  <a-row>
                    <a-col :class="{ invisible: billing === 'monthly' }">
                      2 months free
                    </a-col>
                  </a-row>
                </a-card>
              </label>
            </a-col>
          </a-row>
        </a-radio-group>
        <a-row
          class="pt-24"
          type="flex"
          align="middle"
          justify="center"
          :gutter="24"
        >
          <a-col :class="{ gray: billing === 'yearly' }">Monthly</a-col>
          <a-col>
            <a-switch
              v-model:checked="checked"
              unCheckedValue="monthly"
              checkedValue="yearly"
              @change="$emit('update:billing', 'billing', checked)"
            />
          </a-col>
          <a-col :class="{ gray: billing === 'monthly' }">Yearly</a-col>
        </a-row>
      </a-col>
    </a-row>
  </a-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { IPlan } from '../types';

const props = defineProps<{
  billing: string;
  currency: string;
  plan: number;
  plans: IPlan[];
}>();

const value = ref<number>(props.plan);
const checked = ref<string>(props.billing);

// из-за того, что не смог побороть ts, вынужден повторятся в трёх компонентах
// и прокидывать избыточное количество свойств, хотя и здесь можно было
// выкрутиться, вынесев код в composables
const getPrice = (billing: string, currency: string, obj: IPlan) => {
  const price = billing === 'monthly' ? obj.price.monthly : obj.price.yearly;
  return currency + price;
};
</script>

<style scoped>
.border-0 {
  border: 0;
}

.mb-24 {
  margin-bottom: 24px;
}

.block {
  display: block;
}

.active {
  border: 1px solid #483eff;
}

.fixed.opacity-0.pointer-events-none {
  position: fixed;
  opacity: 0;
  pointer-events: none;
}

.font-medium {
  font-weight: 500;
}

.gray {
  color: #00000073;
}

.invisible {
  visibility: hidden;
}

.pt-24 {
  padding-top: 24px;
}
</style>
