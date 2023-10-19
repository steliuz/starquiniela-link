<template>
  <p class="label-input" v-if="label">
    {{ label }}
    <slot name="span"></slot>
  </p>
  <q-input
    ref="inputRef"
    dense
    filled
    :dark="$q.dark.isActive"
    autocomplete="new-value"
    readonly
    v-bind="$attrs"
    :model-value="modelValue"
    @update:model-value="(val) => emit('update:modelValue', val)"
  >
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
import { ref, onMounted } from 'vue';
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

const inputRef = ref(null);

onMounted(() => {
  setTimeout(() => {
    if (inputRef.value && inputRef.value.$el) {
      const inputElement = inputRef.value.$el.querySelector('input');
      if (inputElement) {
        inputElement.removeAttribute('readonly');
        const container = inputElement.closest('.q-field');
        if (container) {
          container.classList.remove('q-field--readonly');
        }
      }
    }
  }, 500);
});
</script>

<style lang="scss"></style>
