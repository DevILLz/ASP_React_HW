import { useStore } from 'app/stores/store';
import { format } from 'date-fns';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import {Button, Header, Item, Segment, Image, Label} from 'semantic-ui-react'
import {Activity} from "../../../app/models/activity";

const activityImageStyle = {
    filter: 'brightness(30%)'
};

const activityImageTextStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    width: '100%',
    height: 'auto',
    color: 'white'
};

interface Props {
    activity: Activity
}

export default observer(function ActivityDetailedHeader({ activity }: Props) {
    const { activityStore: { updateAttendance, loading, cancelActivityToggle } } = useStore();
    return (
        <Segment.Group>
            <Segment basic attached='top' style={{ padding: '0' }}>
                {activity.IsCandelled &&
                    <Label style={{ position: 'absolute', zIndex: 1000, left: -14, top: 20 }}
                        ribbon color='red' content="Canceled" />
                }
                <Image src={`/assets/categoryImages/${activity.category}.jpg`} fluid style={activityImageStyle} />
                <Segment style={activityImageTextStyle} basic>
                    <Item.Group>
                        <Item id="basic">
                            <Item.Content>
                                <Header
                                    size='huge'
                                    content={activity.title}
                                    style={{ color: 'white' }}
                                />
                                <p>{format(activity.date!, 'dd MMM yyyy')}</p>
                                <p>
                                    Hosted by <strong><Link to={`/profiles/${activity.host?.userName}`}>{activity.host?.displayName}</Link></strong>
                                </p>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>
            <Segment clearing attached='bottom'>
                {activity.isHost ? (<>
                    <Button disabled={activity.IsCandelled}
                        as={Link} to={`/manage/${activity.id}`} color='orange' floated='right' content="Manage Event" />
                    <Button onClick={cancelActivityToggle} color={activity.IsCandelled ? 'red' : 'green'} 
                    floated='left' content={activity.IsCandelled ? 'Re-Activate' : 'Cancel'}/>


                </>) : activity.isGoing ? (
                    <Button loading={loading} onClick={updateAttendance} content="Cancel attendance" />
                ) : (
                    <Button  disabled={activity.IsCandelled} 
                    loading={loading} onClick={updateAttendance} content="Join Activity" color='teal' />
                )}



            </Segment>
        </Segment.Group>
    )
})