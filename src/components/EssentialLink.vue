<template>
  <q-item clickable tag="a" :href="link" v-if="roles.includes(auth.role_id)">
    <q-item-section v-if="icon" avatar>
      <q-icon
        :color="$q.dark.isActive ? 'secondary' : 'primary'"
        :name="icon"
      />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
import { useAuthStore } from 'src/stores/auth';
const { auth } = useAuthStore();
export interface EssentialLinkProps {
  title: string;
  caption?: string;
  link?: string;
  icon?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  roles: any;
}
withDefaults(defineProps<EssentialLinkProps>(), {
  caption: '',
  link: '#',
  icon: '',
  roles: {
    default: [],
  },
});
</script>
