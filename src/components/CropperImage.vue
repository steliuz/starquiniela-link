<template>
  <div>
    <div class="flex">
      <Cropper
        v-if="circle"
        ref="cropper"
        class="cropper"
        @change="change"
        :src="image.src"
        :debounce="false"
        defaultBoundaries="fit"
        :stencil-component="CircleStencil"
      />
      <Cropper
        v-else
        model-value="modelValue"
        ref="cropper"
        class="cropper"
        @change="change"
        :src="image.src"
        :debounce="false"
        defaultBoundaries="fit"
      />
      <Preview
        v-if="image.src"
        :width="120"
        :height="120"
        :image="result.image"
        :coordinates="result.coordinates"
      />
    </div>
    <div class="button-wrapper">
      <button class="button" type="button" @click="file.click()">
        <input
          type="file"
          ref="file"
          @change="uploadImage($event)"
          accept="image/*"
          hidden
        />
        Upload image
      </button>
      <!-- <button class="button" @click="cropImage()">Crop image</button> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { onUnmounted, ref, watch } from 'vue';
import { Cropper, CircleStencil, Preview } from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css';

const props = defineProps(['circle', 'img']);
const emit = defineEmits(['onCropper']);
const image = ref(props.img);
const result = ref({
  coordinates: null,
  image: null,
});
const cropper = ref();
const file = ref();
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const uploadImage = (event: any) => {
  /// Reference to the DOM input element
  const { files } = event.target;
  // Ensure that you have a file before attempting to read it
  if (files && files[0]) {
    // 1. Revoke the object URL, to allow the garbage collector to destroy the uploaded before file
    if (image.value.src) {
      URL.revokeObjectURL(image.value.src);
    }
    // 2. Create the blob link to the file to optimize performance:
    const blob = URL.createObjectURL(files[0]);

    // 3. Update the image. The type will be derived from the extension and it can lead to an incorrect result:
    image.value.src = blob;
    image.value.type = files[0].type;
  }
};
onUnmounted(() => {
  if (image.value.src) {
    URL.revokeObjectURL(image.value.src);
  }
});
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const change = ({ coordinates, canvas, image }: any) => {
  if (canvas) {
    let dataImage = canvas.toDataURL(image.type);
    emit('onCropper', dataImage);
  }

  result.value = {
    coordinates: coordinates,
    image: image,
  };
};

watch(
  () => props.img,
  (newVal) => {
    image.value = newVal;
  }
);
</script>

<style>
.cropper {
  height: 300px;
  width: 300px;
  background: #ddd;
}

.button-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 17px;
}

.button {
  color: white;
  font-size: 16px;
  padding: 10px 20px;
  width: 100%;
  background: #151515;
  cursor: pointer;
  transition: background 0.5s;
  border: none;
  &:not(:last-of-type) {
    margin-right: 10px;
  }
  &:hover {
    background: #2f2f2f;
  }
  input {
    display: none;
  }
}
</style>
