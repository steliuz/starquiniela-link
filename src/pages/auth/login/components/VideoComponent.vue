<script setup lang="ts">
import { ref } from 'vue';

import videoBackground from 'src/assets/videos/bg-video.mp4';

const videoSrc = ref(videoBackground);
</script>
<template>
  <div>
    <video autoplay muted loop>
      <source :src="videoSrc" type="video/mp4" />
      Tu navegador no admite la reproducción de videos.
    </video>
  </div>
</template>

<style scoped>
video {
  object-fit: cover;
  width: 100%;
  height: 100vh;
}
</style>
