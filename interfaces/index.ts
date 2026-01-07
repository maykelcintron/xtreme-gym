export interface AuthFormData {
    email: string;
    password: string;
    username?: string;
}

export interface Users{
    id?: string;
    name: string;
    email: string;
    password: string;
    role: 'ADMIN' | 'USER';
}