export interface Users {
    full_name: string;
    first_name: string;
    last_name: string;
    national_id: string;
    phone: string;
    email: string;
    is_active: boolean;
    fee_rate: number;
    commissions: {
        marketing_percent: string;
        wage_percent: string;
    };
}
