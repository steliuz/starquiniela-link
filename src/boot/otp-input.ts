import { boot } from 'quasar/wrappers';
import { App } from 'vue';
import VOtpInput from 'vue3-otp-input';

export default boot(({ app }: { app: App }) => {
    app.component('v-otp-input', VOtpInput);
});