import { useStore } from "app/stores/store";
import { observer } from "mobx-react-lite";
import { Modal } from "semantic-ui-react";


export default observer(function ModalContainer() {
    const {modalStore} = useStore();
    return (
        <Modal open={modalStore.modal.open} onClose={modalStore.closeModal} size='mini'>
            <Modal.Content content={modalStore.modal.body}/>
        </Modal>
    )
})