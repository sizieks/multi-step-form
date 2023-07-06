<template>
  <!-- card :bordered="false" is broken, use style="border: 0" instead -->
  <a-card class="border-0" :bodyStyle="{ padding: 0 }">
    <a-card-meta
      class="mb-24"
      title="Pick add-ons"
      description="Add-ons help enhance your gaming experience."
    />
    <a-row>
      <a-col :span="24">
        <a-checkbox-group
          class="block"
          v-model:value="value"
          @change="$emit('update:addons', 'addons', value)"
        >
          <a-space class="flex" direction="vertical">
            <a-row v-for="addon in addons" :key="addon.id">
              <a-col :span="24">
                <label :for="`addon-${addon.id}`">
                  <a-card size="small" :bodyStyle="{ cursor: 'pointer' }">
                    <a-row align="middle">
                      <a-col>
                        <a-checkbox
                          class="mr-12"
                          :id="`addon-${addon.id}`"
                          :value="addon.id"
                        />
                      </a-col>
                      <a-col>
                        <a-row>
                          <a-col>
                            {{ addon.label }}
                          </a-col>
                        </a-row>
                        <a-row>
                          <a-col class="gray">
                            {{ addon.description }}
                          </a-col>
                        </a-row>
                      </a-col>
                      <a-col class="ml-auto indigo">
                        +{{ getPrice(billing, currency, addon) }}
                      </a-col>
                    </a-row>
                  </a-card>
                </label>
              </a-col>
            </a-row>
          </a-space>
        </a-checkbox-group>
      </a-col>
    </a-row>
  </a-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { IAddon } from '../types';

defineProps<{
  addons: IAddon[];
  billing: string;
  currency: string;
}>();

const value = ref<number[]>([]);

// из-за того, что не смог побороть ts, вынужден повторятся в трёх компонентах
// и прокидывать избыточное количество свойств, хотя и здесь можно было
// выкрутиться, вынесев код в composables
const getPrice = (billing: string, currency: string, obj: IAddon) => {
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

.flex {
  display: flex;
}

.mr-12 {
  margin-right: 12px;
}

.gray {
  color: #00000073;
}

.ml-auto {
  margin-left: auto;
}

.indigo {
  color: #483eff;
}
</style>
