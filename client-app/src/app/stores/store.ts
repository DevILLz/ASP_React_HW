import {createContext, useContext} from 'react'
import UserStore from './userStore';
import noteStore from "./noteStore";
import CommonStore from './commonStore';
import ModalStore from './modalStore';

interface Store {
    noteStore: noteStore;
    commonStore: CommonStore;
    userStore: UserStore;
    modalStore: ModalStore;

}

export const store: Store ={
    noteStore: new noteStore(),
    commonStore: new CommonStore(),
    userStore: new UserStore(),
    modalStore: new ModalStore(),
}

export const StoreContext = createContext(store);
export function useStore() {
    return useContext(StoreContext);
}