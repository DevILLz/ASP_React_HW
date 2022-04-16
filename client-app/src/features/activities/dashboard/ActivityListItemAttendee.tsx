import { Profile } from 'app/models/profile';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { Image, List, Popup } from 'semantic-ui-react';
import ProfileCard from '../../profiles/ProfileCard'

interface Props {
    attendees: Profile[];
}

export default observer(function ActivityListItemAttendee({ attendees }: Props) {

    const styles = {
        borderColor: 'orange',
        borderWidth: 2
    }
    return (
        <List horizontal >
            {attendees.map(attendee => (
                <Popup
                    hoverable
                    key={attendee.userName}
                    trigger={
                        <List.Item as={Link} to={`/profiles/${attendee.userName}`} key={attendee.userName}>
                            <Image style={attendee.following ? styles : null} bordered size='mini' circular src={attendee.image || '/assets/user.png'} />
                        </List.Item>
                    }
                >
                    <Popup.Content>
                        <ProfileCard profile={attendee}/>
                    </Popup.Content>
                </Popup>
            ))}
        </List>
    )
})
