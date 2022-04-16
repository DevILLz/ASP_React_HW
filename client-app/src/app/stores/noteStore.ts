import agent from 'app/api/agent';
import { note, noteFormValues } from 'app/models/note'
import { makeAutoObservable, runInAction } from 'mobx'
import { store } from './store';

export default class noteStore {
    notes = new Map<string, note>();
    selectedNote: note | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false
    constructor() {
        makeAutoObservable(this)
    }

    get notesByDate() {
        return Array.from(this.notes.values()).sort((a, b) =>
            a.creationDate!.getTime() - b.creationDate!.getTime());
    }
    get groupednotesByCreator() {
        return Object.entries(this.notesByDate.reduce((notes, note) => {
            const creator = note.creator;
            notes[creator] = notes[creator] ? [...notes[creator], note] : [note];
            return notes;
        }, {} as {[key : string]: note[]}))
    }
    loadnotes = async () => {
        this.setLoadingInitial(true);
        const notes = await agent.Notes.list();
        try {
            // Не пихать async\await внутрь
            notes.forEach(x => this.setnote(x))
            this.setLoadingInitial(false);
        }
        catch (e) {
            console.log(e);
            this.setLoadingInitial(false);
        }
    }
    loadnote = async (id: string) => {
        let note = this.getnote(id);
        if (note) {
            this.selectedNote = note;
            return note;
        }
        else {
            this.loadingInitial = true;
            try {
                note = await agent.Notes.details(id)
                this.setnote(note);
                runInAction(() => { this.selectedNote = note; })
                this.setLoadingInitial(false);
                return note;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }

        }
    }
    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }
    createnote = async (newNote: noteFormValues) => {
        const user = store.userStore.user;
        try {
            await agent.Notes.create(newNote);
            const createdNote = new note(newNote);
            createdNote.creator = user!.userName;

            this.setnote(createdNote);
            runInAction(() => {
                this.selectedNote = createdNote;
            });

        } catch (error) {
            console.log(error);
        }
    }
    updatenote = async (note: noteFormValues) => {
        try {
            await agent.Notes.update(note);
            runInAction(() => {
                if (note.id){
                    let updatednote = {...this.getnote(note.id), ...note}
                    this.notes.set(note.id, updatednote as note);
                    this.selectedNote = updatednote as note;
                }
            });
        } catch (error) {
            console.log(error);
        }
    }
    deletenote = async (id: string) => {
        this.loading = true;
        try {
            await agent.Notes.delete(id);
            runInAction(() => {
                this.notes.delete(id);
                this.loading = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            });
        }
    }
    
    
    clearSelectedNote = () => {
        this.selectedNote = undefined;
    }
    private setnote(note: note) {
        note.creationDate = new Date(note.creationDate!)
        this.notes.set(note.id, note)
    }
    private getnote = (id: string) => {
        return this.notes.get(id);
    }
}