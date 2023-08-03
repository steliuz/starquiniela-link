<template>
  <q-dialog esc-to-cancel>
    <q-card>
      <q-card-section class="row items-center">
        <div class="flex flex-center full-width q-mb-md">
          <q-icon name="delete" size="10rem" color="negative" />
        </div>
        <p class="q-ml-sm text-h6 text-center full-width">{{ props.title }}</p>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Cancelar" color="grey-13" v-close-popup />
        <q-btn
          label="Eliminar"
          color="negative"
          v-close-popup
          @click="emits('emitConfirm', props.id)"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
const props = defineProps(['id', 'title']);
const emits = defineEmits(['emitConfirm', 'closeModal']);
</script>

<style lang="scss" scoped>
.icon-trash {
  width: 120px;
}
</style>
