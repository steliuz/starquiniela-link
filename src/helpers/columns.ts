/* eslint-disable @typescript-eslint/no-explicit-any */
// import { QTableProps } from 'quasar';

interface Row {
  id: number;
  name: string;
  user?: Relation;
  type: string;
  email: string;
  phone: string;
  status: [string, boolean];
  quantity: [number];
  role?: Relation;
  price: number;
}

interface Relation {
  name?: string;
}

interface Custom {
  name: string;
  required?: boolean;
  align?: string;
  label: string;
  sortable?: boolean;
  field?: string | any;
}

const idColumn = {
  name: 'id',
  required: true,
  label: 'ID',
  style: 'width: 50px',
  align: 'left',
  field: (row: Row) => row.id,
  sortable: true,
};

const nameColumn = {
  name: 'name',
  required: true,
  label: 'Nombre',
  style: 'width: 50px',
  align: 'left',
  field: (row: Row) => row.name,
  sortable: true,
};
const userColumn = {
  name: 'user',
  required: true,
  label: 'Usuario',
  style: 'width: 50px',
  align: 'left',
  field: (row: Row) => row.user?.name,
  sortable: false,
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const typeColumn = (options: any) => {
  return {
    name: 'type',
    required: true,
    label: 'Tipo',
    style: 'width: 50px',
    align: 'left',
    field: (row: Row) => row.type,
    sortable: true,
    ...options,
  };
};
const priceColumn = {
  name: 'price',
  required: true,
  label: 'Precio',
  style: 'width: 50px',
  align: 'left',
  field: (row: Row) => row.price,
  sortable: true,
};

const emailColumn = {
  name: 'email',
  required: true,
  label: 'Email',
  style: 'width: 50px',
  align: 'left',
  field: (row: Row) => row.email,
  sortable: true,
};

const phoneColumn = {
  name: 'phone',
  required: true,
  label: 'Teléfono',
  style: 'width: 150px',
  align: 'left',
  field: (row: Row) => row.phone,
  sortable: false,
};

const statusColumn = {
  name: 'status',
  required: true,
  label: 'Estatus',
  style: 'width: 50px',
  align: 'left',
  field: (row: Row) => row.status,
  sortable: true,
};
const statusToogleColumn = {
  name: 'statusToogle',
  required: true,
  label: 'Estado',
  style: 'width: 50px',
  align: 'center',
  field: (row: Row) => row.status,
  sortable: true,
};

const quantityColumn = {
  name: 'quantity',
  required: true,
  label: 'Cantidad',
  style: 'width: 50px',
  align: 'left',
  field: (row: Row) => row.quantity,
  sortable: true,
};

const roleColumn = {
  name: 'role',
  required: true,
  label: 'Rol',
  style: 'width: 50px',
  align: 'left',
  field: (row: Row) => row.role?.name,
  sortable: false,
};

const optColumn = {
  name: 'opt',
  required: true,
  align: 'center',
  label: 'Opciones',
  field: 'opt',
  sortable: false,
};

const customColumn = (custom: Custom, options?: any) => {
  return {
    name: custom.name ?? 'custom',
    required: custom.required ?? false,
    align: custom.align ?? 'left',
    label: custom.label ?? 'custom',
    sortable: custom.sortable ?? false,
    field: custom.field ?? 'custom',
    style: 'width: 50px',
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
  quantityColumn,
  roleColumn,
  customColumn,
  userColumn,
  typeColumn,
  priceColumn,
  statusToogleColumn,
};
