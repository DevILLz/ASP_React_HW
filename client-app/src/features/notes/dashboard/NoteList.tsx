import { useStore } from 'app/stores/store';
import { observer } from 'mobx-react-lite';
import { Header, Item, Segment } from 'semantic-ui-react';
import NoteListItem from './NoteListItem'

export default observer(function NoteList() {
    const { noteStore } = useStore();
    const { groupednotesByCreator: notes } = noteStore;


    return (
        <div>
            {notes.map(([group, notes]) => (
                <Segment key={group}>
                    <Item.Group divided>
                        <Header content={group} color="teal"/>
                        {notes.map(note => (
                            <NoteListItem key={note.id} note={note} />
                        ))}
                    </Item.Group>
                </Segment>
            ))}
        </div>
    )
})
