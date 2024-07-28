import Modal from "./Modal";
import SubmitButton from "./Button";

interface ConfirmModalProps {
    //eslint-disable-next-line
    onConfirm?: any;
    //eslint-disable-next-line
    onCancel?: any;
    //eslint-disable-next-line
    title?: string;
    message?: string;
}


export default function ConfirmModal({ onConfirm, onCancel, title, message }: ConfirmModalProps) {
    return (
        <Modal title={title} closeFunction={onCancel} buttons={
            <div className="flex gap-4">
                <SubmitButton onPress={onCancel}>Cancelar</SubmitButton>
                <SubmitButton onPress={onConfirm}>Confirmar</SubmitButton>
            </div>
        }>
            <p>{message}</p>
        </Modal>
    );
}