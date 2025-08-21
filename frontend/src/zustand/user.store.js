import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useUserStore = create(
  persist(
    (set) => ({
      user: {
        _id: null,
        fullname: '',
        username: '',
        gender: '',
        profilepic: '',  // lowercase, consistent everywhere
        details: ''
      },
      setUser: (userData) =>
        set({
          user: {
            _id: userData._id || null,
            fullname: userData.fullname || '',
            username: userData.username || '',
            gender: userData.gender || '',
            profilepic: userData.profilepic || userData.profilePic || '', // normalize keys
            details: userData.details || '',
          },
        }),
      clearUser: () =>
        set({
          user: {
            _id: null,
            fullname: '',
            username: '',
            gender: '',
            profilepic: '',
            details: ''
          },
        }),
    }),
    {
      name: 'user-storage',
      partialize: (state) => ({
        user: {
          fullname: state.user.fullname,
          username: state.user.username,
          gender: state.user.gender,
          profilepic: state.user.profilepic, // lowercase to match store
          details: state.user.details,
        },
      }),
    }
  )
);
