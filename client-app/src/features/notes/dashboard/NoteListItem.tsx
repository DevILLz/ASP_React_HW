import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { Item, Segment,  Label } from 'semantic-ui-react';
import { note } from '../../../app/models/note';

interface Props {
    note: note;
}

export default observer(function NoteListItem({ note }: Props) {
    return (
        <Segment.Group >
            <Segment>
                {note.isImportant &&
                <Label attached='top' color='red' content='Important' style={{textAlign: 'center'}}/>
                }
                <Item id="itemHeader">
                        <Item.Content >
                            <Item.Header content={note.phoneNumber} key={note.id} as={Link} to={`/notes/${note.id}`} />
                            <Item.Extra content={`${note.firstName} ${note.secondName} ${note.thridName}`}/>
                        </Item.Content>
                    </Item>
            </Segment>
        </Segment.Group>
    )
})
