<template>
  <section>
    <q-pdfviewer :type="type" :src="src" style="height: calc(95vh - 3px)" />
  </section>
</template>
<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { useRoomPlayer } from 'src/composables/useRoomPlayer';

const src = ref('');
const route = useRoute();
const type = ref('html5');
const { getTicketPdf } = useRoomPlayer();

const getPdfHtml = async () => {
  let id = route.params.id;
  type.value = 'html5';
  await getTicketPdf(id).then((resp) => {
    console.log(
      '🚀 ~ file: TicketPDF.vue:19 ~ awaitgetTicketPdf ~ resp:',
      resp
    );
    src.value = `${resp.link}`;
  });
};
getPdfHtml();
</script>
