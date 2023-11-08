<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import { ref } from 'vue';
import { Ref } from 'vue';
import { useAuthStore } from 'src/stores/auth';
import CardMatchsLev from './CardMatchsLev.vue';
import CardMatchsNormal from './CardMatchsNormal.vue';

const { auth } = useAuthStore();

const showInputsResult: Ref<null | number> = ref(null);
defineProps(['dataMatch', 'player', 'type']);
const emit = defineEmits([
  'emitSave',
  'emitDelete',
  'emitStatus',
  'resetMatch',
]);

const emitSave = (match: Math) => {
  emit('emitSave', match);
  showInputsResult.value = null;
};
const emitDelete = (id: number) => {
  emit('emitDelete', id);
};
const emitStatus = (value: Math) => {
  emit('emitStatus', value);
};

const resetMatch = (id: number) => {
  emit('resetMatch', id);
};
// const showPredict = (value: any) => {
//   console.log('value: ', value);
// };
</script>

<template>
  <div v-if="type != 3">
    <CardMatchsNormal
      :dataMatch="dataMatch"
      :player="player"
      :type="type"
      @saveResult="emitSave"
      @sendStatus="emitStatus"
      @sendDeleted="emitDelete"
      @sendResetMatch="resetMatch"
    />
  </div>
  <div v-else>
    <card-matchs-lev
      :dataMatch="dataMatch"
      :player="player"
      :type="type"
      @saveResult="emitSave"
      @sendStatus="emitStatus"
      @sendDeleted="emitDelete"
      @sendResetMatch="resetMatch"
    />
  </div>
</template>
