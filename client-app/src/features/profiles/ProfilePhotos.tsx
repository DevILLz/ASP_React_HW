import PhotoUploadWidget from "app/common/imageUpload/PhotoUploadWidget";
import { Photo, Profile } from "app/models/profile";
import { useStore } from "app/stores/store";
import { observer } from "mobx-react-lite";
import { SyntheticEvent, useState } from "react";
import { Button, Card, Grid, Header, Image, Tab } from "semantic-ui-react";

interface Props{
    profile : Profile;
}

export default observer(function ProfilePhotos({profile} : Props) {
    const {profileStore: {isCurrentUser, uploadPhoto, loading, uploading, setMainPhoto, deletePhoto}} = useStore();
    const [addPhotoMode, setAddPhotoMode] = useState(false);
    const [target, setTarget] = useState('');
    function handlePhotoUplad(file: Blob) {
        uploadPhoto(file).then(() => setAddPhotoMode(false));
    }
    function handleSetMainPhoto(photo: Photo, e: SyntheticEvent<HTMLButtonElement>){
        setTarget(e.currentTarget.name);
        setMainPhoto(photo);
    }
    function handleDeletePhoto(photo: Photo, e: SyntheticEvent<HTMLButtonElement>){
        setTarget(e.currentTarget.name);
        deletePhoto(photo);
    }
    return (
        <Tab.Pane>
            <Grid>
                <Grid.Column width={16}>
                    <Header floated='left' icon='image' content='photos' />
                    {isCurrentUser && (
                        <Button
                            floated='right'
                            content={addPhotoMode ? 'Cancel' : 'Add Photo'}
                            onClick={() => setAddPhotoMode(!addPhotoMode)}
                        />
                    )}
                </Grid.Column>
                <Grid.Column width={16}>
                    {addPhotoMode ? (
                        <PhotoUploadWidget uploadPhoto={handlePhotoUplad} loading={uploading} />
                    ) : (
                        <Card.Group>
                            {profile.photos!.map(photo => (
                                <Card key={photo.id}>
                                    <Image src={photo.url} />
                                    {isCurrentUser && (
                                        <Button.Group fluid widths={2}>
                                            <Button
                                                color='green'
                                                content='Main'
                                                name={'main' + photo.id}
                                                disabled={photo.isMain}
                                                loading={target === 'main' + photo.id && loading}
                                                onClick={e => handleSetMainPhoto(photo, e)} />
                                            <Button.Group fluid widths={2}>
                                                <Button
                                                    color='red'
                                                    icon='trash'
                                                    name={photo.id}
                                                    disabled={photo.isMain}
                                                    loading={target === photo.id && loading}
                                                    onClick={e => handleDeletePhoto(photo, e)} />
                                            </Button.Group>
                                        </Button.Group>
                                    )}

                                </Card>
                            ))}
                        </Card.Group>
                    )}
                </Grid.Column>
            </Grid>
        </Tab.Pane>
    )
})