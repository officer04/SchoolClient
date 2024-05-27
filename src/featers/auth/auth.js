import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authAxios, instance } from '../index';
import { jwtDecode } from 'jwt-decode';

export const createUser = createAsyncThunk('users/createUser', async (payload, thunkAPI) => {
  try {
    const response = await authAxios.post(`/auth/registration`, payload);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const loginUser = createAsyncThunk('users/loginUser', async (payload, thunkAPI) => {
  try {
    const response = await authAxios.post(`/auth/login`, payload);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const changeUser = createAsyncThunk('auth/changeUser', async (payload, thunkAPI) => {
  try {
    const response = await instance.patch(`/auth/change`, payload);
    console.log(response);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const resetPassword = createAsyncThunk('auth/resetPassword', async (payload, thunkAPI) => {
  try {
    const response = await authAxios.post(
      `/auth/reset-password/${payload.requestId}`,
      payload.body,
    );
    console.log(response);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const resetPasswordRequest = createAsyncThunk(
  'auth/resetPasswordRequest',
  async (payload, thunkAPI) => {
    try {
      const response = await authAxios.post(`/auth/reset-password-request`, payload);
      console.log(response);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const getAllUsers = createAsyncThunk('users/getAllUsers', async (_, thunkAPI) => {
  try {
    const response = await instance.get(`/auth/users`);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const deteteUserById = createAsyncThunk('users/deteteUserById', async (userId, thunkAPI) => {
  try {
    console.log(userId)
    const response = await instance.delete(`/auth/users/${userId}`);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

const getDefaultUser = () => {
  const token = localStorage.getItem('token');

  if (!token) {
    return {};
  }
  const user = jwtDecode(token);
  if (new Date() > new Date(user.exp * 1000)) {
    localStorage.removeItem('token');
    return {};
  }
  return user;
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: getDefaultUser(),
    isLoading: null,
    isAuth: !!localStorage.getItem('token'),
    role: null,
    isModalAccount: false,
    users: [],
    isLoading: true
  },
  reducers: {
    addUser: (state, { payload }) => {
      state.user = payload;
    },
    addIsloading: (state, { payload }) => {
      state.isLoading = payload;
    },
    addAuth: (state, { payload }) => {
      state.isAuth = payload;
    },
    getRole: (state, { payload }) => {
      state.role = payload;
    },
    toggleModal: (state, { payload }) => {
      state.isModalAccount = payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(createUser.fulfilled, (state, action) => {
      state.isAuth = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isAuth = true;
    });
    builder.addCase(getAllUsers.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.users = action.payload
    });
  },
});

export const { addUser, addIsloading, addAuth, toggleModal, addIsNewUser, getRole } =
  authSlice.actions;

export default authSlice.reducer;
