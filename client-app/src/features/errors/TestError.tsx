import React, { useState } from 'react';
import {Button, Header, Segment} from "semantic-ui-react";
import axios from 'axios';
import ValidationErrors from './ValidationErrors';

export default function TestErrors() {
    const baseUrl = process.env.REACT_APP_API_URL
    const [errors, setErrors] = useState(null);

    function handleNotFound() {
        axios.get(baseUrl + 'buggy/not-found').catch(err => console.log(err.response));
    }

    function handleBadRequest() {
        axios.get(baseUrl + 'buggy/bad-request').catch(err => console.log(err.response));
    }

    function handleServerError() {
        axios.get(baseUrl + 'buggy/server-error').catch(err => console.log(err.response));
    }

    function handleUnauthorised() {
        axios.get(baseUrl + 'buggy/unauthorised').catch(err => console.log(err.response));
    }

    function handleBadGuid() {
        axios.get(baseUrl + 'activities/notaguid').catch(err => console.log(err.response));
    }

    function handleValidationError() {
        axios.post(baseUrl + 'activities', {}).catch(err => setErrors(err));
    }

    return (
        <>
            <Header as='h1' content='Test Error component' inverted />
            <Segment>
                <Button.Group widths='7'>
                    <Button onClick={handleNotFound} content='Not Found' basic color='grey' />
                    <Button onClick={handleBadRequest} content='Bad Request' basic color='grey' />
                    <Button onClick={handleValidationError} content='Validation Error' basic color='grey' />
                    <Button onClick={handleServerError} content='Server Error' basic color='grey' />
                    <Button onClick={handleUnauthorised} content='Unauthorised' basic color='grey' />
                    <Button onClick={handleBadGuid} content='Bad Guid' basic color='grey'/>
                </Button.Group>
            </Segment>
            {errors && <ValidationErrors errors={errors}/>}
        </>
    )
}
