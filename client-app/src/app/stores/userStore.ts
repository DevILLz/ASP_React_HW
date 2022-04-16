import { store } from './store';
import agent from 'app/api/agent';
import { makeAutoObservable, runInAction } from 'mobx';
import { User, UserFormValues } from '../models/user';
import { history } from 'index';


export default class UserStore {
    user: User | null = null;

    constructor() {
        makeAutoObservable(this);
    }
    get isLoggedIn() {
        return !!this.user;
    }

    login = async (creds: UserFormValues) => {
        try { 
            const user = await agent.Account.login(creds);
            store.commonStore.setToken(user.token);
            runInAction(() =>{this.user = user;});
            history.push('/notes');
            store.modalStore.closeModal();
        }
        catch (err) {
            throw err;
        }
    }
    logout =() => {
        store.commonStore.setToken(null);
        window.localStorage.removeItem('jwt');
        this.user = null;
        history.push('/');
    }

    getUser = async () => {
        try {
            const user = await agent.Account.current();
            runInAction(() => this.user = user);
        } catch (error) {
            console.log(error);
        }
    }
    register = async (creds: UserFormValues) => {
        try { 
            const user = await agent.Account.register(creds);
            store.commonStore.setToken(user.token);
            runInAction(() =>{this.user = user;});
            history.push('/notes');
            store.modalStore.closeModal();
        }
        catch (err) {
            throw err;
        }
    }
}