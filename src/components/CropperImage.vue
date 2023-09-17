<template>
  <div class="row">
    <div class="col-6 flex justify-center" style="position: relative">
      <Cropper
        v-if="circle"
        ref="cropper"
        class="cropper full-width"
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
      <div class="button-wrapper">
        <button class="button" type="button" @click="file.click()">
          <input
            type="file"
            ref="file"
            @change="uploadImage($event)"
            accept="image/*"
            hidden
          />
          <i class="fa-solid fa-image text-secondary"></i>
        </button>
        <!-- <button class="button" @click="cropImage()">Crop image</button> -->
      </div>
    </div>
    <div class="col-6 q-px-md">
      <div class="title"></div>
      <div class="flex justify-center">
        <Preview
          :class="circle ? 'preview-cicle' : 'preview-normal'"
          v-if="image.src"
          :image="result.image"
          :coordinates="result.coordinates"
        />
        <div :class="circle ? 'circle-previuw' : 'preview-normal'" v-else></div>
      </div>
      <div class="q-px-md">
        <slot name="form"></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onUnmounted, ref, watch } from 'vue';
import { Cropper, CircleStencil, Preview } from 'vue-advanced-cropper';
// import BaseInput from 'src/components/BaseInput.vue';
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
.preview-cicle {
  background-color: #00141e;
  outline: 2px solid #5c00be;
  outline-offset: 4px;
  width: 150px;
  height: 150px;
  border-radius: 50%;
}

.preview-normal {
  background-color: #00141e;
  outline: 2px solid #5c00be;
  outline-offset: 4px;
  width: 150px;
  height: 150px;
}

.circle-previuw {
  background-color: #00141e;
  outline: 2px solid #5c00be;
  outline-offset: 4px;
  width: 150px;
  height: 150px;
  border-radius: 50%;
}

.cropper {
  height: 300px;
  width: 300px;
  background: #00141e;
}

.button-wrapper {
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: -10px;
  right: -10px;
}

.button {
  color: white;

  width: 50px;
  height: 50px;
  border-radius: 50%;
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
