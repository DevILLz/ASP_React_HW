import MyTextArea from 'app/common/form/MyTextArea';
import MyTextInput from 'app/common/form/MyTextInput';
import LoadingComponent from 'app/layout/LoadingComponents';
import { noteFormValues} from 'app/models/note';
import { useStore } from 'app/stores/store';
import { Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Button, Form, Header, Segment } from 'semantic-ui-react'
import { v4 as uuid } from 'uuid';
import * as Yup from 'yup';

export default observer(function Note() {
    const history = useHistory();
    const { noteStore } = useStore();
    const { createnote, updatenote, loadnote, loadingInitial } = noteStore;
    const { id } = useParams<{ id: string }>();
    const [note, setNote] = useState<noteFormValues>(new noteFormValues());

    const validationSchema = Yup.object({
        firstName: Yup.string().required('The firstName is required'),
        secondName: Yup.string().required('The note description is required'),
        phoneNumber: Yup.string().required('PhoneNumber is required').nullable(),
        address: Yup.string().required(),
    })

    useEffect(() => {
        console.log(id);
        if (id) loadnote(id).then((note) => setNote(new noteFormValues(note)))
    }, [id, loadnote])

    function handleFromSubmit(note: noteFormValues){
        console.log(note);
        note.creationDate = new Date();
        if (!note.id) {
            note.id = uuid();
            createnote(note).then(() => history.push(`/notes/${note.id}`));
        }
        else
            updatenote(note).then(() => history.push(`/notes/${note.id}`));
    }

    if (loadingInitial) return <LoadingComponent content="Loading note..." />
    return (
        <Segment clearing>
            <Header content="note details" sub color="teal"/>
            <Formik 
            validationSchema={validationSchema}
             enableReinitialize 
             initialValues={note} 
             onSubmit={values => handleFromSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form onSubmit={handleSubmit} autoComplete="off">
                        <MyTextInput placeholder="Fist Name" name="firstName" />
                        <MyTextInput placeholder="Second Name" name="secondName" />
                        <MyTextInput placeholder="Third Name" name="thridName" />
                        <MyTextInput placeholder="Phone Number" name="phoneNumber" />

                        <Header content="additionally" sub color="teal"/>
                        <MyTextArea rows={3} placeholder="Description" name="description" />
                        <MyTextInput placeholder="Address" name="address" />
{/* добавить */}
                        <Button 
                        disabled={isSubmitting || !dirty || !isValid}
                        loading={isSubmitting} floated="right" positive type="submit" content="Submit" />
                        <Button floated="right" negative type="button" content="Cancel" as={Link} to={`/notes/${note.id}`} />
                    </Form>
                )}
            </Formik>
        </Segment>
    )
})