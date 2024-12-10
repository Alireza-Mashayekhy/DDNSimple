export interface Authentication {
    accessToken: string | null;
    refreshToken: string | null;
    expiry: number;
    userData: {
        national_id: string;
        first_name: string;
        last_name: string;
        phone: string;
        email: string;
        image: string;
        role: string;
    };
}
