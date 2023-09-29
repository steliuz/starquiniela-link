import { Notify } from 'quasar';

export const handleMessages = ({ message, color, icon, position = 'bottom' }) => {
  Notify.create({
    message: `${message}`,
    html: true,
    textColor: 'white',
    icon: icon,
    color: color,
    position: position,
    progress: true,
    timeout: 3000,
  });
};
