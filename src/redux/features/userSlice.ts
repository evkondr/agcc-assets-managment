/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { User, users } from '../../db';

interface usersState {
  users: User[]
  currentUser: User | undefined,
  foundUsers: User[] | []
}

const initialState: usersState = {
  users,
  foundUsers: [],
  currentUser: undefined,
};
export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    getAllUsers: (state) => state,
    findUserBySurname: (state, action: PayloadAction<string>) => {
      state.foundUsers = state.users.filter((user) => user.surname === action.payload);
    },
    getUsersByLocation: (state, action: PayloadAction<string>) => {
      state.foundUsers = state.users.filter((user) => user.city === action.payload);
    },
    addNewUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
    },
    getUserById: (state, action: PayloadAction<string>) => {
      state.currentUser = state.users.find((user) => user.id === action.payload);
    },
    updateCurrentUser: (state, action: PayloadAction<{id:string, userData: User}>) => {
      const { id, userData } = action.payload;
      const newUsersState = state.users.map((user) => {
        if (user.id === action.payload.id) {
          user = { id, ...userData };
          return user;
        }
        return user;
      });
      state.users = newUsersState;
    },
    clearCurrentUser: (state) => {
      state.currentUser = undefined;
    },
  },
});

export const {
  getAllUsers,
  findUserBySurname,
  getUsersByLocation, addNewUser, getUserById, clearCurrentUser, updateCurrentUser,
} = usersSlice.actions;

export default usersSlice.reducer;
