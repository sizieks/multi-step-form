<template>
  <a-card>
    <a-row :wrap="false">
      <a-col flex="none" class="h-35.5 sidebar mr-24">
        <a-row>
          <a-col class="pt-3 pl-3 font-medium">
            <MultiStepFormSidebar :steps="steps" :current="step" />
          </a-col>
        </a-row>
      </a-col>
      <a-col flex="auto">
        <a-row class="h-full">
          <a-col class="flex flex-col justify-between" :span="24">
            <MultiStepFormInfo v-show="step === 0" @update:form="handleForm" />
            <MultiStepFormPlan
              v-show="step === 1"
              :billing="form.billing"
              :currency="currency"
              :plan="form.plan"
              :plans="plans"
              @update:billing="handleForm"
              @update:plan="handleForm"
            />
            <MultiStepFormAddons
              v-show="step === 2"
              :addons="addons"
              :billing="form.billing"
              :currency="currency"
              @update:addons="handleForm"
            />
            <MultiStepFormSummary
              v-show="step === 3"
              :addons="selectedAddons"
              :billing="form.billing"
              :currency="currency"
              :plan="selectedPlan"
              :total="form.total"
              @change:plan="step = 1"
            />
            <MultiStepFormConfirm v-show="step === 4" />
            <MultiStepFormControls
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
import { IAddon, IForm, IPlan, IStep } from '../types';
import { response } from '../response';
import MultiStepFormAddons from './MultiStepFormAddons.vue';
import MultiStepFormConfirm from './MultiStepFormConfirm.vue';
import MultiStepFormControls from './MultiStepFormControls.vue';
import MultiStepFormInfo from './MultiStepFormInfo.vue';
import MultiStepFormPlan from './MultiStepFormPlan.vue';
import MultiStepFormSidebar from './MultiStepFormSidebar.vue';
import MultiStepFormSummary from './MultiStepFormSummary.vue';

const { addons, billing, currency, plans } = response;
const step = ref<number>(0);
const steps: IStep[] = [
  { title: 'Step 1', description: 'Info' },
  { title: 'Step 2', description: 'Plan' },
  { title: 'Step 3', description: 'Add-ons' },
  { title: 'Step 4', description: 'Summary' },
];

const form = reactive<IForm>({
  addons: [],
  billing: billing,
  currency: currency,
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

/*
you dumb fuck, what's wrong with you, ts?
дальнейшее обращение вида genericHashTablePlans[form.plan].price ts воспринимает
в штыки (нужно, например, для calculateTotal)
const genericHashTablePlans = computed(() => {
  return plans.reduce((hashTable, plan) => {
    return {
      ...hashTable,
      [plan.id]: {
        ...plan,
        price:
          form.billing === 'monthly'
            ? `$${plan.price.monthly}/mo`
            : `$${plan.price.yearly}/yr`,
      },
    };
  }, {} as Record<IPlan['id'], IPlan<string>>);
});

const genericHashTableAddons = computed(() => {
  return addons.reduce((hashTable, addon) => {
    return {
      ...hashTable,
      [addon.id]: {
        ...addon,
        price:
          form.billing === 'monthly'
            ? `$${addon.price.monthly}/mo`
            : `$${addon.price.yearly}/yr`,
      },
    };
  }, {} as Record<IAddon['id'], IAddon<string>>);
});
*/

const hashTablePlans = plans.reduce((hashTable, plan) => {
  return { ...hashTable, [plan.id]: plan };
}, {} as Record<IPlan['id'], IPlan>);

const hashTableAddons = addons.reduce((hashTable, addon) => {
  return { ...hashTable, [addon.id]: addon };
}, {} as Record<IAddon['id'], IAddon>);

const selectedAddons = computed(() => {
  return form.addons.reduce((acc, addon) => {
    return [...acc, hashTableAddons[addon]];
  }, [] as IAddon[]);
});

const selectedPlan = computed(() => hashTablePlans[form.plan]);

watchEffect(() => {
  // рабочая бредятина, одурачившая ts :D, переписать!
  const period = form.billing === 'yearly' ? 'yearly' : 'monthly';

  form.total = form.addons.reduce((acc, addon) => {
    return (acc += hashTableAddons[addon].price[period]);
  }, hashTablePlans[form.plan].price[period]);
});

/*
const calculateTotal = computed((): number => {
  const total = form.addons.reduce((acc, addon) => {
    return (acc += hashTableAddons[addon].price);
  }, hashTablePlans[form.plan].price);

  return form.billing === 'yearly' ? total * multiplier : total;
});

const calculateTotal = (): number => {
  const total = form.addons.reduce((acc, addon) => {
    return (acc += hashTableAddons[addon].price);
  }, hashTablePlans[form.plan].price);

  return form.billing === 'yearly' ? total * multiplier : total;
};

const normalizedAddons = computed(() => {
  return addons
    .filter((addon) => form.addons.includes(addon.id))
    .map((addon) => ({
      ...addon,
      price: `+${
        currency + (form.billing === 'monthly' ? addon.price : addon.price * 10)
      }`,
    }));
});

const normalizedAddonsWithHash = computed(() => {
  return selectedAddons.value.map((addon) => {
    return {
      ...addon,
      price: `${
        currency +
        (form.billing === 'yearly' ? addon.price * multiplier : addon.price)
      }`,
    };
  });
});

const addonsWithGetter = addons.map((addon) => {
  return {
    ...addon,
    get price() {
      return `+${
        currency + (form.billing === 'monthly' ? addon.price : addon.price * 10)
      }`;
    },
  };
});
*/
</script>

<style scoped>
.h-35\.5 {
  height: 35.5rem;
}

.sidebar {
  /* height: 568px; */
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
