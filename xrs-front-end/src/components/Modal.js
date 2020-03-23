import React,{useState} from 'react';
import {MainModal,ModalContent,ModalHeader,ModalFooter,ModalBody,ModalClose,MainModalClose} from '../assets/styles/Modal'
const Modal = (props) => {
    const [toggle,setToggle]=useState(true);
    const handleChange = () => setToggle(!toggle)
    const modal =  <MainModal>
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
    const modalclose =  <MainModalClose>
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
                    
                    </MainModalClose>
        if (toggle) {
            return modal
        }
        else
        {
            return modalclose
        }

}

export default Modal;