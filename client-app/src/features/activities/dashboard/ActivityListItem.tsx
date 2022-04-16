import { format } from 'date-fns';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { Button, Item, Image, Segment, Icon, Label } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';
import ActivityListItemAttendee from './ActivityListItemAttendee';

interface Props {
    activity: Activity;
}

export default observer(function ActivityListItem({ activity }: Props) {
    return (
        <Segment.Group >
            <Segment>
                {activity.IsCandelled &&
                <Label attached='top' color='red' content='Cancelled' style={{textAlign: 'center'}}/>
                }
                <Item.Group>
                    <Item id="itemHeader">
                        <Image src={activity.host?.image || "/assets/user.png"} size="tiny" circular />
                        <Item.Content >
                            <Item.Header content={activity.title} key={activity.id} as={Link} to={`/activities/${activity.id}`} />
                            <Item.Description>
                                Hosted by <Link to={`/profiles/${activity.hostUserName}`}>{activity.host?.displayName}</Link>
                            </Item.Description>
                            {activity.isHost && (
                                <Item.Description>
                                    <Label color="orange" content={`You are hosting this activity`} />
                                </Item.Description>
                            )}
                            {activity.isGoing && !activity.isHost && (
                                <Item.Description>
                                    <Label color="green" content={`You are going to this activity`} />
                                </Item.Description>
                            )}
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <span>
                    <Icon name='clock' /> {format(activity.date!, 'dd MMM yyyy h:mm aa')}
                    <Icon name='marker' /> {activity.venue}
                </span>
            </Segment>
            <Segment secondary>
                <ActivityListItemAttendee attendees={activity.attendees!} />
            </Segment>
            <Segment clearing>
                <span>{activity.description}</span>
                <Button icon='edit' size="mini"
                    floated="right"
                    key={activity.id} as={Link} to={`/activities/${activity.id}`} />
            </Segment>
        </Segment.Group>
    )
})
