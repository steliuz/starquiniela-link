<template>
  <q-dialog
    :model-value="modelValue"
    persistent
    @update:model-value="closeDialog"
  >
    <q-card style="width: 100%; max-width: 700px" class="q-pa-md">
      <q-card-section>
        <div class="flex justify-center q-pa-sm">
          <q-img
            width="280px"
            height="280px"
            :src="qrCodeUrl"
            alt="QR Code"
            v-if="qrCodeUrl"
          />
        </div>
        <p class="text-h6 text-white q-my-sm text-center">{{ secret }}</p>
        <div>
          <p
            class="text-center text-h4 q-my-sm"
            :class="$q.dark.isActive ? 'text-white' : 'text-primary'"
          >
            Introduce el código de tu 2FA
          </p>
          <div class="flex justify-center q-pa-sm">
            <v-otp-input
              ref="otpInput"
              input-classes="otp-input"
              :conditionalClass="['one', 'two', 'three', 'four']"
              separator=""
              inputType="letter-numeric"
              :num-inputs="6"
              v-model:value="bindValue"
              :should-auto-focus="true"
              :should-focus-order="true"
              @on-complete="handleOnComplete"
            />
          </div>
          <div class="flex q-gutter-y-md q-mt-md">
            <q-btn
              class="full-width"
              flat
              label="Cerrar"
              :color="$q.dark.isActive ? 'white' : 'red-5'"
              @click="closeDialog"
              v-close-popup
            />

            <q-btn
              class="full-width"
              label="Enviar"
              color="secondary"
              @click="submitCode"
            />
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import VOtpInput from 'vue3-otp-input';

const props = defineProps<{
  modelValue: boolean;
  qrCodeUrl: string | null;
  secret: string;
}>();

const emit = defineEmits<{
  (e: 'update:model-value', value: boolean): void;
  (e: 'onComplete', value: string): void;
  (e: 'submit2faCodeHandler', value: string): void;
}>();
const bindValue = ref<string>('');
const qrCodeUrl = ref(props.qrCodeUrl);
const secret = ref(props.secret);
const otpInput = ref<InstanceType<typeof VOtpInput> | null>(null);

const handleOnComplete = (value: string) => {
  emit('onComplete', value);
};
const submitCode = () => {
  emit('submit2faCodeHandler', bindValue.value);
};

const closeDialog = () => {
  emit('update:model-value', false);
};

watch(
  () => props.qrCodeUrl,
  (newValue) => {
    qrCodeUrl.value = newValue;
  }
);
watch(
  () => props.secret,
  (newValue) => {
    secret.value = newValue;
  }
);
</script>

<style scoped>
.q-img {
  width: 300px;
  height: 300px;
}
</style>
