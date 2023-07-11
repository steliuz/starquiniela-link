export interface user {
  prefix: string;
  email: string;
  name: string;
  password: string;
  confirm_password: string;
  phone: string | null;
  role_id: number | null;
  subscribe_id: number | null;
  referral_id: string;
}
