import { create } from 'zustand'

interface IUser {
    id: number;
    name: string;
    avatar: string;
}

interface IUserStore {
    user: IUser;
    actions: {
        login: (payload: IUser) => void;
        logout: () => void;
    }
}

let _user = {
    id: 0,
    name: "",
    avatar: "",
}

const storeUser = (id: number) => {
    sessionStorage.setItem("user_id", `${id}`)
}

export const useUserStore = create<IUserStore>((set) => ({
    user: _user,
    actions: {
        login: (payload) => {
            set(() => ({ user: payload }))
            storeUser(payload.id);
        },
        logout: () => {
            set(() => ({
                user: {
                    id: 0,
                    name: "",
                    avatar: "",
                }
            }))

            storeUser(0);
        },
    }
}))

export const useUser = () => useUserStore(state => state.user);
export const useAuth = () => useUserStore(state => ({
    loggedIn: state.user.id > 0,
    user: state.user,
    actions: state.actions
}));