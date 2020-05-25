import React, { useState } from 'react';
import { MainModal, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalClose, MainModalClose } from '../assets/styles/Modal'
const Modal = (props) => {
    console.log(props.toggle)
    const [toggle, setToggle] = useState(props.toggle);
    const handleChange = () => setToggle(!toggle)
    const modal = <MainModal>
        <ModalContent>
            <ModalHeader>
                <ModalClose onClick={handleChange}>&times;</ModalClose>
                <h2>{props.titlemodal}</h2>
            </ModalHeader>
            <ModalBody>
                <p>{props.modalcontent}</p>
                {props.children}
            </ModalBody>
            <ModalFooter>
                <button>Cancel</button>
                <button>Submit</button>
            </ModalFooter>
        </ModalContent>

    </MainModal>
    if (toggle) {
        return modal
    }
    else return <h1></h1>

}

export default Modal;