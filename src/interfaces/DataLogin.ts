export interface dataLogin {
  access_token: string;
  expires_at: string;
  token_type: string;
  userRole: string;
  user_data: dataUser;
}
export interface dataUser {
  contact_email: string;
  created_at: string;
  credits: number;
  email: string;
  email_verified_at: string;
  id: number;
  name: string;
  phone: string;
  prefix: string;
  referral_id: number;
  role_id: number;
  status?: number;
  subscribe_id: number;
  update_at: string;
  emailUser?: string;
}
