const roleCache = {};

const getRol = (value) => {
  if (roleCache[value]) {
    return roleCache[value];
  }
  let condition;
  let data = {
    2: () => {
      condition = {
        name: 'Revendedor',
        bg: 'secondary',
        icon: 'fa-solid fa-coins',
      };
    },
    3: () => {
      condition = {
        name: 'Organizador',
        bg: 'primary',
        icon: 'fa-solid fa-user-tie',
      };
    },
    4: () => {
      condition = {
        name: 'Jugador',
        bg: 'negative',
        icon: 'fa-solid fa-user',
      };
    },
    default: () => {
      condition = {
        name: 'Admin',
        bg: 'orange-8',
        icon: 'fa-solid fa-star',
      };
    },
  };

  (data[value] || data['default'])();
  return condition;
};
export { getRol };
