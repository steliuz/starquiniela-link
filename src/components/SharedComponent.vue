<template>
  <div class="text-center q-mx-sm">
    <q-btn color="secondary" label="Link para compartir" @click="clipboard" />
    <q-separator spaced inset :dark="$q.dark.isActive" />
    <p
      class="q-mb-sm text-center"
      :class="$q.dark.isActive ? 'text-white' : 'text-dark'"
    >
      Escanera código QR
    </p>
    <div v-html="decodedSVG"></div>
    <div>
      <q-btn
        class="full-width q-mt-sm"
        size="sm"
        color="primary"
        label="Descargar QR"
        @click="downloadImg"
      />
    </div>
    <div>
      <q-btn
        class="full-width q-mt-sm"
        color="secondary"
        label="Grupo WhatsApp"
        @click="wsGroup"
        v-if="hasWsGroup"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { vue_url } from 'src/boot/axios';
import { copyToClipboard } from 'quasar';
import { handleMessages } from 'src/services/notifys';
import { useImage } from 'src/composables/useImage';

const { getImage } = useImage();

const props = defineProps(['code', 'imgBase64', 'download', 'hasWsGroup']);
const emit = defineEmits(['wsGroup']);
let decodedSVG = ref('');
const hasWsGroup = ref(props.hasWsGroup);
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

watch(
  () => props.hasWsGroup,
  (newVal) => {
    console.log('true');
    hasWsGroup.value = newVal;
  }
);

const wsGroup = () => {
  emit('wsGroup');
};

const codificar = () => {
  decodedSVG.value = atob(props.imgBase64);
};

const downloadImg = async () => {
  let base64code = await getImage(props.download);
  const link = document.createElement('a');
  link.href = /* url */ `${base64code}`;
  link.setAttribute('download', 'qrcode.svg');
  link.setAttribute('target', '_blank');
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
