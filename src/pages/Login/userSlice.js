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

        // localStorage.setItem(StorageKeys.user, JSON.stringify(data));

        return data;
    } catch (error) {
        console.log(error);
        return error.message;
    }
});

const userSlice = createSlice({
    name: 'user',
    initialState: {
        //khởi tạo giá trị mặc định cho redux
        current: {},
        settings: {},
    },
    reducers: {
        logout(state) {
            //clear local storage
            // state.current = {};
            localStorage.removeItem('persist:root');
            localStorage.removeItem(StorageKeys.access);
        },
    },
    extraReducers: {
        [login.fulfilled]: (state, action) => {
            state.current = action.payload;
        },
        [login.rejected]: (state, action) => {
            state.current = {};
            localStorage.removeItem('persist:root');
            localStorage.removeItem(StorageKeys.access);
        },
    },
});

const { actions, reducer } = userSlice;
export const { logout } = actions;
export default reducer;
