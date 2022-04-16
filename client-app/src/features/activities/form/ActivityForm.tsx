import MyDateInput from 'app/common/form/MyDateInput';
import MySelectImput from 'app/common/form/MySelectImput';
import MyTextArea from 'app/common/form/MyTextArea';
import MyTextInput from 'app/common/form/MyTextInput';
import { categoryOptions } from 'app/common/Options/categoryOptions';
import LoadingComponent from 'app/layout/LoadingComponents';
import { ActivityFormValues} from 'app/models/activity';
import { useStore } from 'app/stores/store';
import { Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Button, Form, Header, Segment } from 'semantic-ui-react'
import { v4 as uuid } from 'uuid';
import * as Yup from 'yup';

export default observer(function ActivityForm() {
    const history = useHistory();
    const { activityStore } = useStore();
    const { createActivity, updateActivity, loadActivity, loadingInitial } = activityStore;
    const { id } = useParams<{ id: string }>();
    const [activity, setActivity] = useState<ActivityFormValues>(new ActivityFormValues());

    const validationSchema = Yup.object({
        title: Yup.string().required('The Activity title is required'),
        description: Yup.string().required('The Activity description is required'),
        category: Yup.string().required(),
        date: Yup.string().required('Date is required').nullable(),
        city: Yup.string().required(),
        venue: Yup.string().required(),
    })

    useEffect(() => {
        if (id) loadActivity(id).then((activity) => setActivity(new ActivityFormValues(activity)))
    }, [id, loadActivity])

    function handleFromSubmit(activity: ActivityFormValues){
        if (!activity.id) {
            activity.id = uuid();
            createActivity(activity).then(() => history.push(`/activities/${activity.id}`));
        }
        else
            updateActivity(activity).then(() => history.push(`/activities/${activity.id}`));
    }

    if (loadingInitial) return <LoadingComponent content="Loading activity..." />
    return (
        <Segment clearing>
            <Header content="Activity details" sub color="teal"/>
            <Formik 
            validationSchema={validationSchema}
             enableReinitialize 
             initialValues={activity} 
             onSubmit={values => handleFromSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form onSubmit={handleSubmit} autoComplete="off">
                        <MyTextInput placeholder="Title" name="title" />
                        <MyTextArea rows={3} placeholder="Description" name="description" />
                        <MySelectImput options={categoryOptions} placeholder="Category" name="category" />
                        <MyDateInput
                            placeholderText="Date"
                            name="date"
                            showTimeSelect
                            timeCaption='time'
                            dateFormat='MMM d, yyy h:mm aa'
                        />
                        <Header content="Location details" sub color="teal"/>
                        <MyTextInput placeholder="City" name="city" />
                        <MyTextInput placeholder="Venue" name="venue" />

                        <Button 
                        disabled={isSubmitting || !dirty || !isValid}
                        loading={isSubmitting} floated="right" positive type="submit" content="Submit" />
                        <Button floated="right" negative type="button" content="Cancel" as={Link} to={`/activities/${activity.id}`} />
                    </Form>
                )}
            </Formik>
        </Segment>
    )
})