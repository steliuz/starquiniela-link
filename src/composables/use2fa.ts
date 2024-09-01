import { ref } from 'vue';
import { dataLogin } from 'src/interfaces/DataLogin';
import { postData } from 'src/services/communServices';
import { useAuthStore } from 'src/stores/auth';
import { storeToRefs } from 'pinia';
import { toDataURL } from 'qrcode';
import { handleMessages } from 'src/services/notifys';



export function use2fa() {
    const { userAuth } = useAuthStore();
    const { auth } = storeToRefs(useAuthStore());

    const active2fa = ref<boolean>(auth.value.enabled_2fa == 1 ? true : false);
    const dialog2fa = ref<boolean>(false);
    const qrCodeUrl = ref<string | null>(null);
    const secret = ref<string>('');
    const noActive = ref<boolean>(auth.value.enabled_2fa == 1 ? true : false);

    const handleOnComplete = (value: string) => {
        console.log('OTP completed: ', value);
    };

    const closeDialog = () => {
        dialog2fa.value = false;
        active2fa.value = auth.value.enabled_2fa == 1 ? true : false;
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const checkLogin = async (data: any, code: string) => {
        console.log('code: ', code);
        console.log('data: ', data);
        // try {
        //     const response = await postData('/disable-2fa', {
        //         two_factor_code: bindValueRef
        //     }, false);
        //     const authData = localStorage.getItem('auth');

        //     if (authData) {
        //         // eslint-disable-next-line @typescript-eslint/no-explicit-any
        //         const user_data: any = JSON.parse(authData)
        //         const auth: dataLogin = { user_data: user_data.auth }
        //         auth.user_data.enabled_2fa = 0;
        //         userAuth(auth);
        //         localStorage.setItem('auth', JSON.stringify(auth.user_data));
        //     }
        //     return response;
        // } catch (err) {
        //     console.error('Error enviando el código 2FA', err);
        //     throw err;
        // }
    };


    const getCode = async () => {
        try {
            const resp = await postData('/generate-2fa-token');
            return resp.secret;
        } catch (err) {
            console.error('Error obteniendo el código:', err);
            throw err;
        }
    };

    const showDialog = () => {
        dialog2fa.value = true;
    }

    const handle2fa = async () => {
        dialog2fa.value = true;
        if (!noActive.value) {
            try {
                secret.value = await getCode();
                const serviceName = '2fa-StarQuiniela';
                const userName = 'StarQuiniela';
                qrCodeUrl.value = await toDataURL(
                    `otpauth://totp/${encodeURIComponent(userName)}?secret=${secret.value
                    }&issuer=${encodeURIComponent(serviceName)}`
                );
            } catch (err) {
                console.error('Error generando el código QR', err);
            }
        }
    };

    const submit2faCode = async (bindValueRef: string) => {
        try {
            const response = await postData('/generate-2fa-token', {
                two_factor_code: bindValueRef
            }, false);
            const authData = localStorage.getItem('auth');

            if (authData) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const user_data: any = JSON.parse(authData)
                const auth: dataLogin = { user_data: user_data.auth }
                auth.user_data.enabled_2fa = 1;
                userAuth(auth);
                localStorage.setItem('auth', JSON.stringify(auth.user_data));
            }
            return response;
        } catch (err) {
            console.error('Error enviando el código 2FA', err);
            throw err;
        }
    };

    const disable2fa = async (bindValueRef: string) => {
        try {
            const response = await postData('/disable-2fa', {
                two_factor_code: bindValueRef
            }, false);
            const authData = localStorage.getItem('auth');

            if (authData) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const user_data: any = JSON.parse(authData)
                const auth: dataLogin = { user_data: user_data.auth }
                auth.user_data.enabled_2fa = 0;
                userAuth(auth);
                localStorage.setItem('auth', JSON.stringify(auth.user_data));
            }
            return response;
        } catch (err) {
            console.error('Error enviando el código 2FA', err);
            throw err;
        }
    };

    const disableCode = async (value: string | '') => {
        const resp = await disable2fa(value);
        if (resp.message == '2FA deshabilitado correctamente') {
            dialog2fa.value = false;
            noActive.value = auth.value.enabled_2fa == 1 ? true : false;
            handleMessages({
                color: 'positive',
                icon: 'check',
                message: 'Código 2FA deshabilitado',
            });
        } else {
            handleMessages({
                color: 'negative',
                icon: 'cancel',
                message: 'Error verificando el código 2FA',
            });
        }
    };

    const activeCode = async (value: string | '') => {
        const response = await submit2faCode(value);
        if (response.message == '2FA habilitado correctamente') {
            dialog2fa.value = false;
            noActive.value = auth.value.enabled_2fa == 1 ? true : false;
            handleMessages({
                color: 'positive',
                icon: 'check',
                message: 'Código 2FA verificado con éxito',
            });
        } else {
            handleMessages({
                color: 'negative',
                icon: 'cancel',
                message: 'Error verificando el código 2FA',
            });
        }
    };

    return {
        active2fa,
        dialog2fa,
        secret,
        qrCodeUrl,
        auth,
        closeDialog,
        disableCode,
        activeCode,
        disable2fa,
        handle2fa,
        handleOnComplete,
        getCode,
        submit2faCode,
        checkLogin,
        showDialog
    };
}
