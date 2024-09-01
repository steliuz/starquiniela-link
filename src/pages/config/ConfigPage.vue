<template>
  <section class="q-ma-sm">
    <h3 class="text-bold text-h4 text-center">Configuración</h3>
    <div class="q-mx-md q-mt-xl flex justify-center">
      <div :class="$q.dark.isActive ? 'box-actions' : 'box-actions-light'">
        <div class="flex justify-between items-center q-px-md">
          <p class="text-bold no-margin">Activar / Desactivar el 2FA</p>
          <q-checkbox
            size="md"
            v-model="active2fa"
            @update:model-value="handle2fa"
          />
        </div>
      </div>
    </div>
  </section>
  <Dialog2fa
    v-model="dialog2fa"
    :qrCodeUrl="qrCodeUrl"
    :secret="secret"
    @update:model-value="closeDialog"
    @onComplete="handleOnComplete"
    @submit2faCodeHandler="submit2faCodeHandler"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { use2fa } from 'src/composables/use2fa';
import { handleMessages } from 'src/services/notifys';
import Dialog2fa from 'src/components/Dialog-2fa.vue';

const {
  auth,
  active2fa,
  dialog2fa,
  secret,
  qrCodeUrl,
  handle2fa,
  activeCode,
  disableCode,
  handleOnComplete,
  closeDialog,
} = use2fa();

const noActive = ref<boolean>(auth.value.enabled_2fa == 1 ? true : false);

const submit2faCodeHandler = async (value: string | '') => {
  try {
    if (noActive.value) {
      disableCode(value);
      return;
    }
    activeCode(value);
  } catch (err) {
    handleMessages({
      color: 'negative',
      icon: 'cancel',
      message: 'Error enviando el código 2FA',
    });
  }
};
</script>

<style lang="scss" scoped>
.box-actions {
  width: 700px;
  border: 1px solid #fff;
}
.box-actions-light {
  width: 700px;
  border: 1px solid #222;
}
</style>
