<template>
  <q-btn-dropdown unelevated flat icon="share" color="secondary">
    <q-list class="bg-header-dark q-pa-xs">
      <q-item clickable v-close-popup>
        <q-item-section>
          <q-item-label @click="clipboard">
            <q-btn
              color="secondary"
              label="Link para compartir"
              @click="clipboard"
            />
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-separator spaced inset dark />
      <q-item>
        <q-item-section>
          <q-item-label>
            <p class="q-mb-sm text-white text-center">Escanera código QR</p>
            <div v-html="decodedSVG"></div>
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-item clickable @click="downloadImg" v-close-popup>
        <q-item-section>
          <q-item-label>
            <q-btn
              class="full-width"
              size="sm"
              color="primary"
              label="Descargar QR"
            />
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-btn-dropdown>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { vue_url } from 'src/boot/axios';
import { copyToClipboard } from 'quasar';
import { handleMessages } from 'src/services/notifys';

const props = defineProps(['code', 'imgBase64', 'download']);
let decodedSVG = ref('');

const clipboard = () => {
  let url = `${vue_url}/rooms/${props.code}`;
  copyToClipboard(url)
    .then(() => {
      handleMessages({
        message: 'Link de compartir, copiado',
        color: 'secondary',
        icon: 'check',
        position: 'center',
      });
    })
    .catch(() => {
      handleMessages({
        message: 'Hubo un problema al intentar copiarlo',
        color: 'red-7',
        icon: 'closed',
        position: 'center',
      });
    });
};

watch(
  () => props.imgBase64,
  () => {
    codificar();
  }
);

const codificar = () => {
  decodedSVG.value = atob(props.imgBase64);
};

const downloadImg = () => {
  const url = window.URL.createObjectURL(new Blob([props.download]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'qrcode.png');
  document.body.appendChild(link);
  link.click();
  handleMessages({
    message: 'Compartelo con tus amigos',
    color: 'secondary',
    icon: 'check',
  });
};
</script>

<style lang="scss" scoped>
:deep(.q-btn-dropdown__arrow) {
  display: none !important;
}
</style>
