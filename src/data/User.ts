export interface IUser {
    id: number;
    name: string;
    dob: string;
    gender: number;
    email: string;
    phone: string;
    role: number;
    status: number;
    create_at: string;
    update_at: string;
    logged_in: string;
}

export interface IUserFull extends IUser {
    password: string;
}