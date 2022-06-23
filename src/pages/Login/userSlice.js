import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userApi from '~/api/Users/useApi';
import StorageKeys from '~/constants/storage-keys';

export const login = createAsyncThunk('/login', async (payload) => {
    try {
        const response = await userApi.login(payload);
        localStorage.setItem(StorageKeys.access, response.data.TOKEN);

        const id = response.data.ID;
        const token = response.data.TOKEN;

        const resUser = await userApi.getUser({ ID: id });
        const user = resUser.data;

        const data = {
            id,
            token,
            user,
        };

        localStorage.setItem(StorageKeys.user, JSON.stringify(data));

        return data;
    } catch (error) {
        console.log(error);
        return error.message;
    }
});

const userSlice = createSlice({
    name: 'user',
    initialState: {
        current: JSON.parse(localStorage.getItem(StorageKeys.user)) || {},
        settings: {},
    },
    reducers: {
        // logout(state) {
        //     //clear local storage
        //     state.current = {};
        //     localStorage.removeItem(StorageKeys.access);
        //     localStorage.removeItem(StorageKeys.refresh);
        //     localStorage.removeItem(StorageKeys.user);
        // },
    },
    extraReducers: {
        [login.fulfilled]: (state, action) => {
            state.current = action.payload;
        },
        [login.rejected]: (state, action) => {
            state.current = {};
            localStorage.removeItem(StorageKeys.access);
            localStorage.removeItem(StorageKeys.refresh);
            localStorage.removeItem(StorageKeys.user);
        },
    },
});

const { actions, reducer } = userSlice;
export const { logout } = actions;
export default reducer;
