import { useStore } from 'app/stores/store';
import { observer } from 'mobx-react-lite';
import { Header, Item, Segment } from 'semantic-ui-react';
import ActivityListItem from './ActivityListItem'

export default observer(function ActivityList() {
    const { activityStore } = useStore();
    const { groupedActivitiesByDate: activities } = activityStore;


    return (
        <div>
            {activities.map(([group, activities]) => (
                <Segment key={group}>
                    <Item.Group divided>
                        <Header content={group} color="teal"/>
                        {activities.map(activity => (
                            <ActivityListItem key={activity.id} activity={activity} />
                        ))}
                    </Item.Group>
                </Segment>
            ))}
        </div>
    )
})
