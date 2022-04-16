import LoadingComponent from 'app/layout/LoadingComponents';
import { useStore } from 'app/stores/store';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Grid } from 'semantic-ui-react'
import NoteDetailedHeader from './NoteDetaliedHeader'
import NoteDetailedInfo from './NoteDetailedInfo'

export default observer(function NoteDetails() {
  const { noteStore } = useStore();
  const { selectedNote: note, loadnote, loadingInitial, clearSelectedNote} = noteStore;
  const {id} = useParams<{id: string}>();

useEffect(() => { 
  if (id) loadnote(id);
  return () => clearSelectedNote();
}, [id, loadnote, clearSelectedNote])
  if (loadingInitial || !note) return <LoadingComponent/>;
  return (
    <Grid>
      <Grid.Column width={10}>
         <NoteDetailedHeader note={note}/>
         <NoteDetailedInfo note={note}/>
      </Grid.Column>
      <Grid.Column width={6}>
      
      </Grid.Column>
    </Grid>
  )
})