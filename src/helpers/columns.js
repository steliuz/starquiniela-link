const idColumn = {
  name: 'id',
  required: true,
  label: 'ID',
  style: 'width: 50px',
  align: 'left',
  field: (row) => row.id,
  sortable: true,
};

const nameColumn = {
  name: 'name',
  required: true,
  label: 'Nombre',
  style: 'width: 50px',
  align: 'left',
  field: (row) => row.name,
  sortable: true,
};

const emailColumn = {
  name: 'email',
  required: true,
  label: 'Email',
  style: 'width: 50px',
  align: 'left',
  field: (row) => row.email,
  sortable: true,
};

const phoneColumn = {
  name: 'phone',
  required: true,
  label: 'Telefono',
  style: 'width: 50px',
  align: 'left',
  field: (row) => row.phone,
  sortable: true,
};

const statusColumn = {
  name: 'status',
  required: true,
  label: 'Estado',
  style: 'width: 50px',
  align: 'left',
  field: (row) => row.status,
  sortable: true,
};

const qunatityColumn = {
  name: 'qunatity',
  required: true,
  label: 'Cantidad',
  style: 'width: 50px',
  align: 'left',
  field: (row) => row.quantity,
  sortable: true,
};

const optColumn = {
  name: 'opt',
  required: true,
  align: 'center',
  label: 'Opciones',
  field: 'opt',
  sortable: false,
};

const customColumn = (custom, options) => {
  return {
    name: custom.name ?? 'custom',
    required: custom.required ?? false,
    align: custom.align ?? 'left',
    label: custom.label ?? 'custom',
    sortable: custom.sortable ?? false,
    ...options,
  };
};

export {
  idColumn,
  nameColumn,
  emailColumn,
  phoneColumn,
  statusColumn,
  optColumn,
  qunatityColumn,
  customColumn,
};
