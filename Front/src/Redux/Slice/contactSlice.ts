import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Data = {
    id: number;
    aboutText: string;
    phone: string;
    whatsapp: string;
    email: string;
    photos: string[];
    videos: string[];
    socialLinks: string[];
};


const initialState: Data = {
    id: 0,
    aboutText: '',
    phone: '',
    whatsapp: '',
    email: '',
    photos: [],
    videos: [],
    socialLinks: [],
}

const dataSlice = createSlice({
    name: 'Data',
    initialState,
    reducers: {
        setData: (state, action: PayloadAction<Data>) => {
            return action.payload
        },
        resetData: (state) => {
            state = initialState
        }
    }
});

export const { setData, resetData } = dataSlice.actions;
export default dataSlice.reducer;