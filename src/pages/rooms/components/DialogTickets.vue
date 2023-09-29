<template>
  <q-dialog>
    <q-card
      square
      class="bg-header-dark relative-position bg-new-dark"
      style="width: 80%; max-width: 600px"
    >
      <q-card-section>
        <div class="row">
          <div class="col-6">
            <div class="flex column justify-center">
              <div class="flex flex-center q-my-md">
                <q-avatar
                  class="bg-header-dark"
                  size="100px"
                  font-size="52px"
                  color="primary"
                  text-color="white"
                  icon="person"
                />
              </div>

              <p class="q-mb-sm">
                <span class="text-caption">Jugador :</span>
                &nbsp; {{ infoPlayer?.name }}
              </p>
              <p class="q-mb-sm">
                <span class="text-caption">Correo :</span>
                &nbsp; {{ infoPlayer?.email }}
              </p>
              <p class="q-mb-sm">
                <span class="text-caption">Teléfono :</span>
                &nbsp; {{ infoPlayer?.phone || 'No tiene número registrado' }}
              </p>
            </div>
          </div>
          <div class="col-6">
            <q-list dark bordered>
              <template v-for="item in infoPlayer.bets" :key="item">
                <q-item v-ripple>
                  <q-item-section class="text-h6">
                    {{ `${item.ticket_factura}` }}
                  </q-item-section>
                  <q-separator spaced inset vertical dark />
                  <q-item-section avatar>
                    <q-toggle
                      v-model="item.paid"
                      color="secondary"
                      :true-value="1"
                      :false-value="0"
                      @update:model-value="emit('onPaid', item)"
                    />
                  </q-item-section>
                  <q-separator spaced inset vertical dark />

                  <q-item-section>
                    <q-btn
                      padding="2px 10px"
                      flat
                      color="red-5"
                      icon="picture_as_pdf"
                      @click="showPDF(item.id)"
                    />
                  </q-item-section>
                </q-item>
                <q-separator dark />
              </template>
            </q-list>
          </div>
        </div>
      </q-card-section>
      <div class="q-py-md q-px-md">
        <q-btn
          outline
          class="q-mx-xs full-width"
          label="Cerrar"
          color="negative"
          type="reset"
          v-close-popup
        />
      </div>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

defineProps(['infoPlayer']);
const emit = defineEmits(['onPaid']);

const routes = useRouter();
const showPDF = (id: number) => {
  let route = routes.resolve(`/ticket/${id}/pdf`);
  window.open(route.href, '_blank');
};
</script>

<style scoped></style>
