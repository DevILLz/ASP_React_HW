import { ServerError } from "app/models/ServerError";
import { makeAutoObservable, reaction } from "mobx";

export default class CommonStore {
    error: ServerError | null = null;
    token: string | null = window.localStorage.getItem('jwt');
    appLoaded = false;
    constructor() {
        makeAutoObservable(this);

        reaction(
            () => this.token,
            token => {
                if (token)
                    window.localStorage.setItem('jwt', token);
                else
                    window.localStorage.removeItem('jwt');
            }
        )
    }
    setServerError = (err: ServerError) => {
        this.error = err;
    }

    setToken = (token: string | null) => {
        this.token = token;
    }

    setAppLoaded = () => {
        this.appLoaded = true;
    }
}