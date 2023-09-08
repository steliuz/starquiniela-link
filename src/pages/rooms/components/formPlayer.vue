<template>
  <q-dialog>
    <q-card>
      <q-card-section>
        <q-form>
          <div class="row">
            <div class="col-6 q-pa-xs">
              <!-- <p class="label-input">
          Nombre
        </p> -->
              <q-input dense filled type="text" placeholder="Nombre" />
            </div>
            <div class="col-6 q-pa-xs">
              <!-- <p class="label-input">
          Teléfono
        </p> -->
              <q-input dense filled type="text" placeholder="Teléfono" />
            </div>
          </div>
          <div class="row">
            <div class="col-12 q-pa-xs">
              <!-- <p class="label-input">
          Correo <span class="text-caption">(opcional)</span>
        </p> -->
              <q-input dense filled type="text" placeholder="Correo (opcional)" />
            </div>

          </div>
          <div>
            <q-btn label="Submit" type="submit" color="primary" />
            <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
          </div>
        </q-form>
      </q-card-section>

    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">

</script>

<style scoped></style>