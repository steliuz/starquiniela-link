export interface loginAuth {
  email: string;
  password: string;
  remember: boolean;
  two_factor_code?: string
}
