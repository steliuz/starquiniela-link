import { computed } from 'vue';

export const role = computed(() => {
  let name = 'Admin';
  if (auth.role_id == 2) name = 'Reseller';
  if (auth.role_id == 3) name = 'Organizador';
  return name;
});
