export interface note {
    id: string;
    firstName: string;
    secondName: string;
    thridName?: string;
    phoneNumber: string;
    address?: string;
    description?: string;
    isImportant: boolean;
    creator: string;
    creationDate: Date | null;

}

export class note implements note {
    constructor(init?: noteFormValues){
        Object.assign(this, init)
    }
}

export class noteFormValues{
    id?: string = undefined;
    firstName: string = '';
    secondName: string = '';
    thridName?: string = '';
    phoneNumber: string = '';
    address?: string = ''
    description?: string = '';
    isImportant: boolean = false;
    creationDate: Date | null = null;
    constructor (note?: note){
        if (note){
            this.id = note.id;
            this.firstName = note.firstName;
            this.secondName = note.secondName;
            this.thridName = note.thridName;
            this.phoneNumber = note.phoneNumber;
            this.address = note.address;
            this.description = note.description;
            this.isImportant = note.isImportant;
            this.creationDate = note.creationDate;
        }
    }
}
