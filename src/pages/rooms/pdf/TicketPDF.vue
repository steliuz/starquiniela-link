<template>
  <section>
    <q-pdfviewer :type="type" :src="src" style="height: calc(95vh - 3px)" />

    <!-- <object :src="src" type="application/pdf" width="100%" height="600px" /> -->
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
  // type.value = 'pdfjs';
  await getTicketPdf(
    id,
    {
      type: type.value,
    },
    type.value == 'pdfjs' ? { responseType: 'blob' } : null
  ).then((res) => {
    if (type.value == 'pdfjs') {
      const blob = new Blob([res], { type: res.type });
      // const url = window.URL.createObjectURL(blob);
      let url = (
        window.URL ||
        window.webkitURL ||
        window ||
        {}
      ).createObjectURL(blob);
      // workaround for mobile playback, where it didn't work on chrome/android.
      // fetch blob at url using xhr, and use url generated from that blob.
      // see issue: https://code.google.com/p/chromium/issues/detail?id=227476
      // thanks, gbrlg
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url, true);
      xhr.responseType = 'blob';
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status == 200) {
          // now url is ready
          var url = (
            window.URL ||
            window.webkitURL ||
            window ||
            {}
          ).createObjectURL(xhr.response);
          console.log('🚀 ~ file: TicketPDF.vue:51 ~ ).then ~ url:', url);

          // let url = location.href;
          // if (location.href[location.href.length - 1] !== '/') {
          //   url += '/';
          // }
          // url += '../' + source;

          src.value = url;
        }
      };
      xhr.send();

      // var reader = new FileReader();
      // reader.readAsDataURL(blob);
      // reader.onloadend = function () {
      //   var base64data = reader.result;
      //   src.value = 'data:application/pdf;base64,' + base64data;
      // };
    } else {
      src.value = `${res.link}`;
    }
  });
};
getPdfHtml();
</script>
