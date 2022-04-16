import LoadingComponent from "app/layout/LoadingComponents";
import { useStore } from "app/stores/store";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import ProfileContent from "./ProfileContent";
import ProfileHeader from "./ProfileHeader";


export default observer(function ProfilePage() {
    const {userName} = useParams<{userName: string}>();
    const {profileStore} = useStore();
    const {loadingProfile, loadProfile, profile, setActiveTab} = profileStore;
    useEffect(() => {
        loadProfile(userName);
        return () => setActiveTab(0);
    }, [loadProfile, setActiveTab, userName])

    if (loadingProfile) return <LoadingComponent content="loading profile..."/>
    return (
        <Grid>
            <Grid.Column width={16}>
            {profile &&
                    <>
                        <ProfileHeader profile={profile} />
                        <ProfileContent profile={profile} />
                    </>}
            </Grid.Column>
        </Grid>
    )
})