import { useStore } from 'app/stores/store';
import { format } from 'date-fns';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { Segment, Grid, Icon, Button } from 'semantic-ui-react'
import { note } from "../../../app/models/note";
import { history } from 'index';

interface Props {
    note: note
}
export default observer(function NoteDetailedInfo({ note }: Props) {
    const { userStore, noteStore: { deletenote, loading } } = useStore();
    async function handleDeleteNote() {
        await deletenote(note.id);
        history.push('/notes')
    }
    return (
        <Segment.Group>
            <Segment attached>
                <Grid>
                    <Grid.Column width={1}>
                        <Icon size='large' color='teal' name='phone' />
                    </Grid.Column>
                    <Grid.Column width={15}>
                    <span> {note.phoneNumber} </span>
                    </Grid.Column> 
                </Grid>
            </Segment>
            <Segment attached>
                <Grid>
                    <Grid.Column width={1}>
                        <Icon size='large' color='teal' name='male' />
                    </Grid.Column>
                    <Grid.Column width={15}>
                    <span> {`${note.firstName} ${note.secondName} ${note.thridName}`} </span>
                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment attached>
                <Grid>
                    <Grid.Column width={1}>
                        <Icon size='large' color='teal' name='map marker alternate' />
                    </Grid.Column>
                    <Grid.Column width={15}>
                    <span> {note.address} </span>
                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment attached>
                <Grid verticalAlign='middle'>
                    <Grid.Column width={1}>
                        <Icon name='calendar' size='large' color='teal' />
                    </Grid.Column>
                    <Grid.Column width={15}>
                        <span> Creation date: {format(note.creationDate!, 'dd MMM yyyy h:mm aa')} </span>
                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment attached>
                <Grid verticalAlign='middle'>
                    <Grid.Column width={1}>
                        <Icon name='info' size='large' color='teal' />
                    </Grid.Column>
                    <Grid.Column width={11}>
                         <span> {note.description} </span>
                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment clearing attached='bottom'>
                {note.creator === userStore.user?.userName ? 
                (<>
                    <Button
                        as={Link} to={`/manage/${note.id}`} color='orange' floated='right' content="Manage Event" />
                    <Button onClick={handleDeleteNote} loading={loading} content="Delete"/>
                </>) :<div></div>}
            </Segment>
        </Segment.Group>
    )
})