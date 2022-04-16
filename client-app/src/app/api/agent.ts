import { User, UserFormValues } from './../models/user';
import { store } from './../stores/store';
import { note, noteFormValues } from 'app/models/note';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { history } from 'index';
import { toast } from 'react-toastify';

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    })
}

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.request.use(config => {
    const token = store.commonStore.token;
    if (token) config.headers!.Authorization = 'Bearer ' + token;
    return config;
})
axios.interceptors.response.use(async response => {
    
    if (process.env.NODE_ENV === 'development')
        await sleep(200)
    return response

}, (error: AxiosError) => {
    const { data, status, config} = error.response!;

    switch (status) {
        case 400:
            if (typeof data === 'string') {
                toast.error(data);
            }
            if (config.method === 'get' && data.errors.hasOwnProperty('id')) {
                history.push('/not-found');
            }
            if (data.errors) {
                const modalStateErrors = [];
                for (const key in data.errors)
                    if (data.errors[key])
                        modalStateErrors.push(data.errors[key])
                throw modalStateErrors.flat();
            }
            break;
        case 401:
            toast.error('unautorized');
            history.push('/Login')
            break;
        case 404:
            history.push('/not-found')
            break;
        case 500:
            store.commonStore.setServerError(data);
            history.push('/server-error');
            break;
    }
    return Promise.reject(error);
})
const responseBody = <T>(response: AxiosResponse<T>) => response.data;
const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    delete: <T>(url: string) => axios.delete<T>(url).then(responseBody),
}
const Notes = {
    list: () => requests.get<note[]>('/notes'),
    details: (id: string) => requests.get<note>(`/notes/${id}`),
    create: (note: noteFormValues) => requests.post<void>(`/notes/`, note),
    update: (note: noteFormValues) => requests.put<void>(`/notes/${note.id}`, note),
    delete: (id: string) => requests.delete<void>(`/notes/${id}`),
}
const Account = {
    current: () => requests.get<User>(`/account`),
    login: (user: UserFormValues) => requests.post<User>(`/account/login`, user),
    register: (user: UserFormValues) => requests.post<User>(`/account/register`, user),
}

const agent = {
    Notes,
    Account,
    
}
export default agent;