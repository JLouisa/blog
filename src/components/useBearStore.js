import { create } from "zustand";

const useBearStore = create((set) => ({
  isLoggedIn: false,
  setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
  isAdmin: false,
  setIsAdmin: (isAdmin) => set({ isAdmin }),
  isSuspended: false,
  setIsSuspended: (isSuspended) => set({ isSuspended }),
  userID: null,
  setUserID: (userID) => set({ userID }),
}));

export default useBearStore;
