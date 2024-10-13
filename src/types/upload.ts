export interface Upload {
    ticker: string;
    history_status: { trade_date: string; has_ddn_history: boolean }[];
}
