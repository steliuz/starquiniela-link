<template>
  <q-table
    class="font-table full-width"
    tableHeaderClass="bg-primary text-white"
    separator="cell"
    flat
    bordered
    dense
    :title="title"
    :rows="data"
    :columns="columns"
    row-key="id"
    ref="table"
    binary-state-sort
    rowsPerPageLabel="Registros por página"
    v-model:pagination="paginations"
    @request="onRequest"
    :loading="loading"
    :filter="filter"
  >
    <template v-slot:loading>
      <div class="full-width row flex-center text-primary q-gutter-sm">
        <q-inner-loading showing color="primary" />
      </div>
    </template>
    <template v-slot:top-right>
      <div class="column">
        <q-input
          class=""
          borderless
          dense
          v-model="filter"
          filled
          placeholder="Filtrar por código..."
          debounce="1000"
        >
          <template v-slot:append>
            <q-icon
              v-if="filter != ''"
              class="cursor-pointer q-px-none"
              name="clear"
              @click="resetFilter"
              size="xs"
            />
            <q-btn v-else color="primary" round size="xs">
              <q-icon class="cursor-pointer" name="search" />
            </q-btn>
          </template>
        </q-input>
      </div>
    </template>
    <template #body-cell-opt="props">
      <slot name="opt" :props="props"></slot>
    </template>
  </q-table>
</template>
<script setup lang="ts">
import { QTable } from 'quasar';
import { ref, watch, onMounted } from 'vue';

const props = defineProps(['columns', 'respData', 'title', 'loading']);
const emit = defineEmits(['paginateData', 'editData']);
const paginations = ref({
  page: 1,
  rowsPerPage: 20,
  countPage: 1,
  rowsNumber: 1,
  sortBy: '',
  descending: false,
  search: '',
});
const filter = ref('');

const data = ref(props.respData?.data);

const resetFilter = () => {
  filter.value = '';
};

const table = ref();
const handlerPaginate = (value: object) => {
  emit('paginateData', value);
};
const onRequest: QTable['onRequest'] = ({ pagination }) => {
  if (pagination.sortBy) {
    if (
      paginations.value.sortBy == pagination.sortBy &&
      paginations.value.page == 1 &&
      pagination.page == paginations.value.page
    )
      paginations.value.descending = !paginations.value.descending;
    else if (pagination.page == 1) paginations.value.descending = true;

    paginations.value.sortBy = pagination.sortBy;
  }
  paginations.value.countPage = pagination.countPage;
  paginations.value.rowsNumber = pagination.rowsNumber;
  paginations.value.rowsPerPage = pagination.rowsPerPage;
  paginations.value.page = pagination.page;
  paginations.value.search = filter.value;

  handlerPaginate(paginations.value);
};

watch(
  () => props.respData,
  (newVal) => {
    data.value = newVal.data;
    paginations.value.page = newVal.current_page;
    paginations.value.countPage = newVal.last_page;
    paginations.value.rowsNumber = newVal.total;
    paginations.value.rowsPerPage = newVal.per_page;
  }
);
onMounted(() => {
  // get initial data from server (1st page)
  table.value.requestServerInteraction();
});
</script>
