export interface IUserParams {
    username: string,
    password: string,
    first_name: string | null,
    last_name: string | null,
    email: string | null,
    phone_number: string | null,
    birth_date: string | Date | null,
}