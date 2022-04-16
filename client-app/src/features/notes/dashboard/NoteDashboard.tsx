import { Grid } from 'semantic-ui-react';
import NoteList from './NoteList';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useStore } from 'app/stores/store';
import LoadingComponent from 'app/layout/LoadingComponents';

export default observer(function NoteDashboard() {
    const {noteStore} = useStore();
    const {loadnotes, notes} = noteStore;
    useEffect(() => { 
        if (notes.size <= 1) loadnotes();
     }, [loadnotes, notes])
  
    if (noteStore.loadingInitial) return <LoadingComponent content="Loading app" />
    return (
        <Grid>
            <Grid.Column width="10">
                <NoteList/>
            </Grid.Column>
            <Grid.Column width="6">
                
            </Grid.Column>
        </Grid>
    )
})