import { Profile } from './profile';
export interface Activity {
    id: string;
    title: string;
    date: Date | null;
    description: string;
    category: string;
    city: string;
    venue: string;
    hostUserName?: string;
    IsCandelled: boolean;
    isGoing: boolean;
    isHost: boolean;
    host?: Profile;
    attendees: Profile[];
}

export class Activity implements Activity {
    constructor(init?: ActivityFormValues){
        Object.assign(this, init)
    }
}

export class ActivityFormValues{
    id?: string = undefined;
    date: Date | null = null;
    title: string = '';
    description: string = '';
    category: string = '';
    city: string = '';
    venue: string = '';
    constructor (activity?: Activity){
        if (activity){
            this.id = activity.id;
            this.date = activity.date;
            this.title = activity.title;
            this.category = activity.category;
            this.description = activity.description;
            this.city = activity.city;
            this.venue = activity.venue;
        }
    }
}
