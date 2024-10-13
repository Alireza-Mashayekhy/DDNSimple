import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FundSummary {
    id: number;
    name: string;
    num_funds: number;
    total_share_count: number;
    total_value: number;
}
interface Shareholders {
    id: number;
    name: string;
    share_holder_histories: string;
}

interface FeeState {
    summery: FundSummary[];
    tree: TreeNode[];
    shareholders: Shareholders[];
}

const initialState: FeeState = {
    summery: [],
    shareholders: [],
    tree: [],
};

interface TreeNode {
    key: string;
    data: any;
    children?: TreeNode[];
}

const InvestmentDataSlice = createSlice({
    name: 'investmentData',
    initialState,
    reducers: {
        setSummery: (state, action: PayloadAction<FundSummary[]>) => {
            state.summery = action.payload;
        },
        setShareholders: (state, action: PayloadAction<Shareholders[]>) => {
            state.shareholders = action.payload;
        },
        setTree: (state, action: PayloadAction<TreeNode[]>) => {
            state.tree = action.payload;
        },
    },
});

export const { setSummery, setShareholders, setTree } =
    InvestmentDataSlice.actions;
export default InvestmentDataSlice.reducer;
