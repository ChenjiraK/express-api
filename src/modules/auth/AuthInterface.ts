export interface IUserParams {
  username: string;
  password: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  phone_number: string | null;
  birth_date: string | Date | null;
}
export interface IProfileParams {
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  birth_date?: string | Date | null;
}
