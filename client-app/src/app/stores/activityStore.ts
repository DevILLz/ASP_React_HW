import { Profile } from 'app/models/profile';
import agent from 'app/api/agent';
import { Activity, ActivityFormValues } from 'app/models/activity'
import { format } from 'date-fns';
import { makeAutoObservable, runInAction } from 'mobx'
import { store } from './store';

export default class ActivityStore {
    activities = new Map<string, Activity>();
    selectedActivity: Activity | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false
    constructor() {
        makeAutoObservable(this)
    }

    get activitiesByDate() {
        return Array.from(this.activities.values()).sort((a, b) =>
            a.date!.getTime() - b.date!.getTime());
    }
    get groupedActivitiesByDate() {
        return Object.entries(this.activitiesByDate.reduce((activities, activity) => {
            const date = format(activity.date!, 'dd MMM yyyy');
            activities[date] = activities[date] ? [...activities[date], activity] : [activity];
            return activities;
        }, {} as {[key : string]: Activity[]}))
    }
    loadActivities = async () => {
        this.setLoadingInitial(true);
        const activities = await agent.Activities.list();
        try {
            // Не пихать async\await внутрь
            activities.forEach(x => this.setActivity(x))
            this.setLoadingInitial(false);
        }
        catch (e) {
            console.log(e);
            this.setLoadingInitial(false);
        }
    }
    loadActivity = async (id: string) => {
        let activity = this.getActivity(id);
        if (activity) {
            this.selectedActivity = activity;
            return activity;
        }
        else {
            this.loadingInitial = true;
            try {
                activity = await agent.Activities.details(id)
                this.setActivity(activity);
                runInAction(() => { this.selectedActivity = activity; })
                this.setLoadingInitial(false);
                return activity;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }

        }
    }
    private setActivity(activity: Activity) {
        
        const user = store.userStore.user;
        
        if (user) {
            activity.isGoing = activity.attendees!.some(
                a => a.userName === user.userName
            );
            activity.isHost = activity.hostUserName === user.userName;
            activity.host = activity.attendees?.find(a => a.userName === activity.hostUserName);
        }
        activity.date = new Date(activity.date!)
        this.activities.set(activity.id, activity)
    }
    private getActivity = (id: string) => {
        return this.activities.get(id);
    }
    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }
    createActivity = async (activity: ActivityFormValues) => {
        const user = store.userStore.user;
        const attendee = new Profile(user!);
        try {
            await agent.Activities.create(activity);
            const newActivity = new Activity(activity);
            newActivity.hostUserName = user!.userName;
            newActivity.attendees = [attendee];
            this.setActivity(newActivity);
            runInAction(() => {
                this.selectedActivity = newActivity;
            });

        } catch (error) {
            console.log(error);
        }
    }
    updateActivity = async (activity: ActivityFormValues) => {
        try {
            await agent.Activities.update(activity);
            runInAction(() => {
                if (activity.id){
                    let updatedActivity = {...this.getActivity(activity.id), ...activity}
                    this.activities.set(activity.id, updatedActivity as Activity);
                    this.selectedActivity = updatedActivity as Activity;
                }
            });
        } catch (error) {
            console.log(error);
        }
    }
    deleteActivity = async (id: string) => {
        this.loading = true;
        try {
            await agent.Activities.delete(id);
            runInAction(() => {
                this.activities.delete(id);
                this.loading = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            });
        }
    }
    updateAttendance = async () => {
        const user = store.userStore.user;
        this.loading = true;
        try {
            await agent.Activities.attend(this.selectedActivity!.id);
            runInAction(() => {
                if (this.selectedActivity?.isGoing){
                    this.selectedActivity.attendees = this.selectedActivity.attendees?.filter(
                        a => a.userName !== user?.userName
                    );
                    this.selectedActivity.isGoing = false;
                }
                else {
                    const attendee = new Profile(user!);
                    this.selectedActivity?.attendees?.push(attendee);
                    this.selectedActivity!.isGoing = true;
                }
                this.activities.set(this.selectedActivity!.id, this.selectedActivity!)
                this.loading = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => { this.loading = false; });
        }
    }
    cancelActivityToggle = async () => {
        this.loading = true;
        try {
            await agent.Activities.attend(this.selectedActivity!.id);
            runInAction(() => {
                this.selectedActivity!.IsCandelled = !this.selectedActivity?.IsCandelled;
                this.activities.set(this.selectedActivity!.id, this.selectedActivity!);           
            });
        } catch (error) {
            console.log(error);            
        } finally {
            runInAction(() => { this.loading = false; });
        }
    }
    clearSelectedActivity = () => {
        this.selectedActivity = undefined;
    }
    updateAttendeeFollowing = (userName: string) => {
        this.activities.forEach(a => {
            a.attendees.forEach(attendee => {
                if (attendee.userName === userName){
                    attendee.following ? attendee.followersCount-- : attendee.followersCount++;
                    attendee.following = !attendee.following;
                }
            })
        })
    }
}