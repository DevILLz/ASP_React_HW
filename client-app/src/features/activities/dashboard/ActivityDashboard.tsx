import { Grid } from 'semantic-ui-react';
import ActivityList from './ActivityList';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useStore } from 'app/stores/store';
import LoadingComponent from 'app/layout/LoadingComponents';
import ActivityFilter from './ActivityFilter';

export default observer(function ActivityDashboard() {
    const {activityStore} = useStore();
    const {loadActivities, activities} = activityStore;
    useEffect(() => { 
        if (activities.size <= 1) loadActivities();
     }, [loadActivities, activities])
  
    if (activityStore.loadingInitial) return <LoadingComponent content="Loading app" />
    return (
        <Grid>
            <Grid.Column width="10">
                <ActivityList/>
            </Grid.Column>
            <Grid.Column width="6">
                <ActivityFilter/>
            </Grid.Column>
        </Grid>
    )
})