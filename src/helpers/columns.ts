import { QTableProps } from 'quasar';

interface Row {
  id: number;
  name: string;
  user: string;
  type: string;
  email: string;
  phone: string;
  status: [string, boolean];
  quantity: [number];
  role: Role;
}

interface Role {
  name: string;
}

interface Custom {
  name: string;
  required: boolean;
  align: string;
  label: string;
  sortable: boolean;
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
  field: (row: Row) => row.user,
  sortable: true,
};
const typeColumn = {
  name: 'type',
  required: true,
  label: 'Tipo',
  style: 'width: 50px',
  align: 'left',
  field: (row: Row) => row.type,
  sortable: true,
};
const priceColumn = {
  name: 'price',
  required: true,
  label: 'Precio',
  style: 'width: 50px',
  align: 'left',
  field: (row: Row) => row.type,
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
  style: 'width: 50px',
  align: 'left',
  field: (row: Row) => row.phone,
  sortable: false,
};

const statusColumn = {
  name: 'status',
  required: true,
  label: 'Estado',
  style: 'width: 50px',
  align: 'left',
  field: (row: Row) => row.status,
  sortable: true,
};

const qunatityColumn = {
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

const customColumn = (custom: Custom, options: QTableProps['columns']) => {
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
  roleColumn,
  customColumn,
  userColumn,
  typeColumn,
  priceColumn
};
