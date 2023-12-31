<template>
  <a-card>
    <a-row :wrap="false">
      <a-col flex="none" class="h-35.5 sidebar mr-24">
        <a-row>
          <a-col class="pt-3 pl-3 font-medium">
            <multi-step-form-sidebar :steps="steps" :current="step" />
          </a-col>
        </a-row>
      </a-col>
      <a-col flex="auto">
        <a-row class="h-full">
          <a-col class="flex flex-col justify-between" :span="24">
            <multi-step-form-info
              v-show="step === 0"
              @update:form="handleForm"
            />
            <multi-step-form-plan
              v-show="step === 1"
              :billing="form.billing"
              :plan="form.plan"
              :plans="plans"
              @update:billing="handleForm"
              @update:plan="handleForm"
            />
            <multi-step-form-addons
              v-show="step === 2"
              :addons="addons"
              :billing="form.billing"
              @update:addons="handleForm"
            />
            <multi-step-form-summary
              v-show="step === 3"
              :addons="selectedAddons"
              :billing="form.billing"
              :plan="selectedPlan"
              :total="response.currency + form.total"
              @change:plan="step = 1"
            />
            <multi-step-form-confirm v-show="step === 4" />
            <multi-step-form-controls
              v-show="step !== 4"
              :step="step"
              :disabled="isDisabled"
              @backward="step--"
              @forward="step++"
              @confirm="confirm"
            />
          </a-col>
        </a-row>
      </a-col>
    </a-row>
  </a-card>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watchEffect } from 'vue';
import { IAddon, IForm, IPlan, IResponse, IStep } from '../types';
import MultiStepFormAddons from './MultiStepFormAddons.vue';
import MultiStepFormConfirm from './MultiStepFormConfirm.vue';
import MultiStepFormControls from './MultiStepFormControls.vue';
import MultiStepFormInfo from './MultiStepFormInfo.vue';
import MultiStepFormPlan from './MultiStepFormPlan.vue';
import MultiStepFormSidebar from './MultiStepFormSidebar.vue';
import MultiStepFormSummary from './MultiStepFormSummary.vue';

const makeRequest = async (): Promise<IResponse> => {
  const { response } = await import('../response');
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(response);
    }, 500);
  });
};

const response = await makeRequest();

const step = ref<number>(0);

const steps: IStep[] = [
  { title: 'Step 1', description: 'Info' },
  { title: 'Step 2', description: 'Plan' },
  { title: 'Step 3', description: 'Add-ons' },
  { title: 'Step 4', description: 'Summary' },
];

const addons: IAddon[] = response.addons.map((addon) => ({
  ...addon,
  price: {
    monthly: {
      decorated: `+${response.currency}${addon.price.monthly}`,
      plain: addon.price.monthly,
    },
    yearly: {
      decorated: `+${response.currency}${addon.price.yearly}`,
      plain: addon.price.yearly,
    },
  },
}));

const plans: IPlan[] = response.plans.map((plan) => ({
  ...plan,
  price: {
    monthly: {
      decorated: `${response.currency}${plan.price.monthly}`,
      plain: plan.price.monthly,
    },
    yearly: {
      decorated: `${response.currency}${plan.price.yearly}`,
      plain: plan.price.yearly,
    },
  },
}));

const form = reactive<IForm>({
  addons: [],
  billing: response.billing,
  currency: response.currency,
  email: '',
  name: '',
  phone: '',
  plan: plans[0].id,
  total: 0,
});

const isDisabled = computed(() => {
  return !Boolean(form.name && form.email && form.phone);
});

const confirm = () => {
  console.log(JSON.stringify(form));
  step.value = 4;

  setTimeout(() => {
    step.value = 0;
  }, 3500);
};

const handleForm = <T extends keyof IForm>(key: T, value: IForm[T]): void => {
  form[key] = value;
};

const hashTableAddons = addons.reduce((hashTable, addon) => {
  return { ...hashTable, [addon.id]: addon };
}, {} as Record<IAddon['id'], IAddon>);

const hashTablePlans = plans.reduce((hashTable, plan) => {
  return { ...hashTable, [plan.id]: plan };
}, {} as Record<IPlan['id'], IPlan>);

const selectedAddons = computed(() =>
  [...form.addons].sort().map((addon) => hashTableAddons[addon])
);

const selectedPlan = computed(() => hashTablePlans[form.plan]);

watchEffect(() => {
  form.total = form.addons.reduce((acc, addon) => {
    return (acc += hashTableAddons[addon].price[form.billing].plain);
  }, hashTablePlans[form.plan].price[form.billing].plain);
});
</script>

<style scoped>
.h-35\.5 {
  height: 35.5rem;
}

.sidebar {
  width: 274px;
  margin-right: 24px;
  background-image: url(../assets/images/bg-sidebar-desktop.svg);
}

.pt-3.pl-3 {
  padding-top: 3rem;
  padding-left: 3rem;
}

.font-medium {
  font-weight: 500;
}

.h-full {
  height: 100%;
}

.flex.flex-col.justify-between {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
