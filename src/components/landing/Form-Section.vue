<template>
  <section class="padding-container">
    <div class="row">
      <div class="col-12 col-md">
        <div class="text-h4 text-primary text-bold q-pt-md q-ml-md">
          Contáctanos
        </div>
        <div class="q-pa-lg q-mt-md">
          <div class="text-subtitle1 q-pb-md text-dark">
            <span class="material-icons text-yellow q-mb-sm q-mr-sm">
              star
            </span>
            Solicite una cuenta de Organizador ó Rezeller
          </div>
          <div class="text-subtitle1 q-pb-md text-dark">
            <span class="material-icons text-yellow q-mb-sm q-mr-sm">star</span>
            Puede indicarnos cualquier inconveniente con la herramienta
          </div>
          <div class="text-subtitle1 q-pb-md text-dark">
            <span class="material-icons text-yellow q-mb-sm q-mr-sm">star</span>
            Solicite más Coins
          </div>
        </div>
        <div
          class="text-start text-dark text-bold text-subtitle1 q-pt-md q-pl-lg q-ml-sm text-capitalize"
        >
          Puede contactarnos por este medío o atraves de
          <a
            href="https://api.whatsapp.com/send?phone=+528184624203&text=Saludos,%20quisiera%20obtener%20m%C3%A1s%20informaci%C3%B3n%20de%20como%20ser%20un%20organizador%20"
          >
            Whatsapp</a
          >
        </div>
      </div>
      <div class="col-12 col-md">
        <div class="q-pa-md">
          <q-form @submit="onSubmit" class="q-gutter-md">
            <q-input
              :dark="false"
              filled
              type="text"
              v-model="contact.name"
              placeholder="Nombre"
            >
              <template v-slot:append>
                <q-icon name="person" />
              </template>
            </q-input>

            <q-input
              :dark="false"
              filled
              type="email"
              v-model="contact.email"
              placeholder="Correo Electronico"
            >
              <template v-slot:append>
                <q-icon name="email" />
              </template>
            </q-input>
            <q-input
              :dark="false"
              placeholder="Mensaje"
              v-model="contact.message"
              filled
              type="textarea"
            />

            <div class="flex justify-end">
              <q-btn
                label="Enviar"
                type="submit"
                color="secondary"
                style="width: 120px"
              />
            </div>
          </q-form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useContact } from 'src/composables/useContact';

const { postContact, contact } = useContact();

const onSubmit = async () => {
  await postContact();
};
</script>

<style lang="scss" scoped></style>
