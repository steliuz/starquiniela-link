<template>
  <q-table
    class="font-table bg-table text-white full-width"
    tableHeaderClass="bg-primary text-white"
    dark
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
    behavior="menu"
    style="max-width: 800px"
  >
    <template v-slot:header-cell-opt>
      <q-th>
        <q-icon name="settings" size="1.5em" />
      </q-th>
    </template>
    <template v-slot:loading>
      <div class="full-width row flex-center text-primary q-gutter-sm">
        <q-inner-loading showing color="primary" />
      </div>
    </template>
    <template v-if="$slots.customName" v-slot:body-cell-name="props">
      <slot name="customName" :props="props"> </slot>
    </template>
    <template v-slot:top-right>
      <div class="column">
        <q-input
          dark
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
    <template #body-cell-statusToogle="props">
      <td class="text-center" style="width: 150px">
        <q-toggle
          unchecked-icon="clear"
          checked-icon="check"
          color="green"
          :false-value="0"
          :true-value="1"
          v-model="props.row.status"
          @update:model-value="updateStatus(props.row)"
        />
      </td>
    </template>
    <template #body-cell-opt="props">
      <q-td style="width: 10%" :props="props" class="no-wrap text-center">
        <q-btn class="q-pa-sm" color="white" flat icon="more_vert">
          <q-menu class="bg-header-dark">
            <q-list style="min-width: 140px">
              <q-item
                clickable
                v-close-popup
                v-if="!editBtnHidden"
                @click="emit('editData', props.row)"
              >
                <q-item-section>
                  <div class="flex">
                    <i class="q-mr-md fa-solid fa-edit text-secondary"></i>
                    <span>Editar</span>
                  </div>
                </q-item-section>
              </q-item>
              <q-item
                clickable
                v-close-popup
                v-if="!delBtnHidden"
                @click="openDialogConfirm(props.row)"
              >
                <q-item-section>
                  <div class="flex">
                    <i class="q-mr-md fa-solid fa-trash text-red-5"></i>
                    <span>Eliminar</span>
                  </div>
                </q-item-section>
              </q-item>
              <slot name="opt" :props="props"></slot>
            </q-list>
          </q-menu>
        </q-btn>
      </q-td>
    </template>
    <template #body-cell-role="props">
      <q-td style="width: 10%" :props="props" class="no-wrap">
        <div class="q-px-sm">
          <q-badge
            class="q-pa-sm full-width flex justify-center"
            rounded
            :class="`bg-${getRol(props.row.role.id).bg}`"
            text-color="white"
          >
            <i :class="getRol(props.row.role.id).icon" class="q-mr-sm"></i>
            <span class="text-bold">{{ getRol(props.row.role.id).name }}</span>
          </q-badge>
        </div>
      </q-td>
    </template>
  </q-table>
  <DialogConfirm
    v-model="confirmDialog"
    :id="sendId"
    :title="
      '¿Está seguro de que desea eliminar este ' + title?.toLowerCase() + '?'
    "
    @emitConfirm="sendConfirm"
  ></DialogConfirm>
</template>
<script setup lang="ts">
import { QTable, QTableProps } from 'quasar';
import { ref, watch, onMounted, PropType } from 'vue';
import DialogConfirm from './DialogConfirm.vue';
import { getRol } from 'src/helpers/role';

interface ResponseData {
  data: Array<object>;
  current_page: number;
  last_page: number;
  total: number;
  per_page: number;
}
type keyable = {
  [key: string]: string | number;
  // id: number;
};

const props = defineProps({
  columns: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    type: Array as PropType<QTableProps['columns'] | any>,
  },
  respData: {
    type: Object,
  },
  title: {
    type: String,
  },
  loading: {
    type: Boolean,
  },
  editBtnHidden: {
    type: Boolean,
  },
  delBtnHidden: {
    type: Boolean,
  },
});

const emit = defineEmits([
  'paginateData',
  'editData',
  'deleteData',
  'statusData',
]);
let paginations = ref({
  page: 1,
  rowsPerPage: 20,
  countPage: 1,
  rowsNumber: 1,
  sortBy: 'id',
  descending: true,
  search: '',
});
let filter = ref('');
let confirmDialog = ref(false);
let data = ref(props.respData?.data);

const resetFilter = () => {
  filter.value = '';
};
let sendId = ref();
const table = ref();
const handlerPaginate = (value: object) => {
  emit('paginateData', value);
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const onRequest: (any: any) => void = ({ pagination }) => {
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
const sendConfirm = (id: number) => {
  emit('deleteData', id);
};
const openDialogConfirm = (row: keyable) => {
  sendId.value = row.id;
  confirmDialog.value = true;
};

function updateStatus(row: object) {
  emit('statusData', row);
}
watch(
  () => props.respData as ResponseData,
  (newVal: ResponseData) => {
    data.value = newVal.data;
    paginations.value.page = newVal.current_page;
    paginations.value.countPage = newVal.last_page;
    paginations.value.rowsNumber = newVal.total;
    paginations.value.rowsPerPage = newVal.per_page;
  }
);
onMounted(() => {
  // get initial data from server (1st page)
  // table.value.requestServerInteraction();
  handlerPaginate(paginations.value);
});
</script>
