<template>
  <p class="label-input" v-if="label">
    {{ label }}
    <slot name="span"></slot>
  </p>
  <q-input dense filled dark v-bind="$attrs" :model-value="modelValue"
    @update:model-value="(val) => emit('update:modelValue', val)">
    <template v-slot:before>
      <slot name="before"></slot>
    </template>

    <template v-slot:after>
      <slot name="after"></slot>
    </template>

    <template v-slot:append>
      <slot name="append"></slot>
    </template>
  </q-input>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    default: '',
  },
  modelValue: {
    type: [String, Number, null],
    default: '',
  },
});
const emit = defineEmits(['update:modelValue']);
</script>
