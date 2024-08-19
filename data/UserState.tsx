interface UserState {
    email: string | null;
    password: string | null;
    isAuth: boolean;
    user: User | null;
    token: string | null;
}