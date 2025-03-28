import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import {
  fetchUser,
  forgotPassword,
  loginUser,
  logoutUser,
  registerUser,
  resetPassword,
  updateUser
} from '../thunks';

export interface UserState {
  data: TUser | null;
  requestStatus: 'idle' | 'loading' | 'success' | 'failed';
  isAuthChecked: boolean;
  error: string | null;
}

const initialState: UserState = {
  data: null,
  requestStatus: 'idle',
  isAuthChecked: false,
  error: null
};

const handleRequestStatus = (
  state: UserState,
  status: 'idle' | 'loading' | 'success' | 'failed',
  error: unknown = null
) => {
  state.requestStatus = status;
  if (error instanceof Error) {
    state.error = error.message;
  } else if (typeof error === 'string') {
    state.error = error;
  } else {
    state.error = null;
  }
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<TUser>) => {
      state.data = action.payload;
      state.isAuthChecked = true;
    },
    setIsAuthChecked: (state) => {
      state.isAuthChecked = true;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) =>
        handleRequestStatus(state, 'loading')
      )
      .addCase(
        fetchUser.fulfilled,
        (state, action: PayloadAction<{ user: TUser }>) => {
          handleRequestStatus(state, 'success');
          state.data = action.payload.user;
          state.isAuthChecked = true;
        }
      )
      .addCase(fetchUser.rejected, (state, action) => {
        handleRequestStatus(state, 'failed', action.payload);
        state.isAuthChecked = true;
      })

      .addCase(registerUser.pending, (state) =>
        handleRequestStatus(state, 'loading')
      )
      .addCase(
        registerUser.fulfilled,
        (state, action: PayloadAction<{ user: TUser }>) => {
          handleRequestStatus(state, 'success');
          state.data = action.payload.user;
          state.isAuthChecked = true;
        }
      )
      .addCase(registerUser.rejected, (state, action) =>
        handleRequestStatus(state, 'failed', action.payload)
      )

      .addCase(loginUser.pending, (state) =>
        handleRequestStatus(state, 'loading')
      )
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<{ user: TUser }>) => {
          handleRequestStatus(state, 'success');
          state.data = action.payload.user;
          state.isAuthChecked = true;
        }
      )
      .addCase(loginUser.rejected, (state, action) =>
        handleRequestStatus(state, 'failed', action.payload)
      )

      .addCase(logoutUser.pending, (state) =>
        handleRequestStatus(state, 'loading')
      )
      .addCase(logoutUser.fulfilled, (state) => {
        handleRequestStatus(state, 'success');
        state.data = null;
      })
      .addCase(logoutUser.rejected, (state, action) =>
        handleRequestStatus(state, 'failed', action.payload)
      )

      .addCase(updateUser.pending, (state) =>
        handleRequestStatus(state, 'loading')
      )
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<TUser>) => {
        handleRequestStatus(state, 'success');
        state.data = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) =>
        handleRequestStatus(state, 'failed', action.payload)
      )

      .addCase(forgotPassword.pending, (state) =>
        handleRequestStatus(state, 'loading')
      )
      .addCase(forgotPassword.fulfilled, (state) =>
        handleRequestStatus(state, 'success')
      )
      .addCase(forgotPassword.rejected, (state, action) =>
        handleRequestStatus(state, 'failed', action.payload)
      )

      .addCase(resetPassword.pending, (state) =>
        handleRequestStatus(state, 'loading')
      )
      .addCase(resetPassword.fulfilled, (state) =>
        handleRequestStatus(state, 'success')
      )
      .addCase(resetPassword.rejected, (state, action) => {
        handleRequestStatus(state, 'failed', action.payload);
      });
  }
});

export const userActions = {
  ...userSlice.actions,
  fetchUser,
  loginUser,
  registerUser,
  logoutUser,
  updateUser
};

export const userSelectors = {
  selectUser: (state: { user: UserState }) => state.user.data,
  selectUserCheck: (state: { user: UserState }) => state.user.isAuthChecked,
  getUserName: (state: { user: UserState }) => state.user.data?.name,
  getError: (state: { user: UserState }) => state.user.error,
  isAuthenticated: (state: { user: UserState }) => !!state.user.data
};

export default userSlice.reducer;
