import { observer } from 'mobx-react-lite';
import {Segment, Label} from 'semantic-ui-react'
import {note} from "../../../app/models/note";

interface Props {
    note: note
}

export default observer(function NoteDetailedHeader({ note }: Props) {
    return (
        <Segment.Group>
            <Segment basic attached='top' style={{ padding: '0' }}>
                {note.isImportant &&
                    <Label style={{ position: 'absolute', zIndex: 1000, left: -14 }}
                        ribbon color='red' content="Important" />
                }

            </Segment>
           
        </Segment.Group>
    )
})