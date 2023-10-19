<template>
  <q-option-group
    :color="$q.dark.isActive ? 'secondary' : 'primary'"
    :dark="$q.dark.isActive"
    :options="optionsData"
    v-bind="$attrs"
    :model-value="modelValue"
    @update:model-value="(val) => emit('update:modelValue', val)"
  >
    <slot name="opt" :opt="opt"></slot>
  </q-option-group>
</template>
<script setup>
defineProps({
  optionsData: {
    type: Array,
  },
  modelValue: {
    type: [String, Number, null, Array, Object],
  },
});
const emit = defineEmits(['update:modelValue']);
</script>
