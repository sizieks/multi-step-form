<template>
  <!-- card :bordered="false" is broken, use style="border: 0" instead -->
  <a-card class="border-0" size="small" :bodyStyle="{ padding: 0 }">
    <a-card-meta
      class="mb-24"
      title="Personal info"
      description="Please provide your name, email address, and phone number."
    >
    </a-card-meta>
    <a-row>
      <a-col :span="24">
        <a-form
          layout="vertical"
          :hideRequiredMark="true"
          :rules="rules"
          :model="form"
          @validate="updateForm"
        >
          <a-form-item label="Name" name="name">
            <a-input
              allowClear
              size="large"
              v-model:value="form.name"
              placeholder="e.g. John Doe"
            />
          </a-form-item>
          <a-form-item label="Email Address" name="email">
            <a-input
              allowClear
              size="large"
              v-model:value="form.email"
              placeholder="e.g. jd@lorem.ipsum"
            />
          </a-form-item>
          <a-form-item label="Phone Number" name="phone">
            <a-input
              allowClear
              size="large"
              v-model:value="form.phone"
              placeholder="e.g. + 1 234 567 890"
            />
          </a-form-item>
        </a-form>
      </a-col>
    </a-row>
  </a-card>
</template>

<script setup lang="ts" generic="T extends keyof IFormState">
import { reactive } from 'vue';
import { IFormState } from '../types';
import type { Rule } from 'ant-design-vue/es/form';

const form = reactive<IFormState>({
  name: '',
  email: '',
  phone: '',
});

const rules: Record<string, Rule[]> = {
  name: [
    {
      required: form.name ? true : false,
      type: 'string',
      pattern: /^[^0-9][a-zA-Z- ]{2,}$/i,
      transform(value) {
        return value.trim();
      },
      message: 'Invalid name',
      trigger: 'change',
    },
  ],
  email: [
    {
      required: form.name ? true : false,
      type: 'email',
      transform(value) {
        return value.trim();
      },
      message: 'Invalid email',
      trigger: 'change',
    },
  ],
  phone: [
    {
      required: form.name ? true : false,
      type: 'string',
      pattern: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
      transform(value) {
        return value.trim();
      },
      message: 'Invalid phone number',
      trigger: 'change',
    },
  ],
};

const emit = defineEmits<{
  'update:form': [key: T, value: IFormState[T]];
}>();

const updateForm = (name: T, status: boolean) => {
  emit('update:form', name, status ? form[name] : '');
};
</script>

<style scoped>
.border-0 {
  border: 0;
}

.mb-24 {
  margin-bottom: 24px;
}
</style>
