import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';
import Group from '../../../interfaces/Group';
import { showAlert } from '../alertController';
import { createNewSensor } from '../../api';
import Sensor from '../../../interfaces/Sensor';

interface ChildProps {
    callback: () => void;
    header: string;
    message: string;
    buttonText: string;
    type: string;
}

const AcceptModal: React.FC<ChildProps> = ({ buttonText, type, header, message, callback }) => {
    const [showModal, setShowModal] = useState(false);
    const isDarkTheme = document.getElementById('page-dashboard')?.dataset.bsTheme === 'dark';

    const handleButtonClick = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleAccept = () => {
        callback();
        handleCloseModal();
    };
    
    return (
        <div>
            <Button variant={type} onClick={handleButtonClick}>
                {buttonText}
            </Button>
            <Modal show={showModal} data-bs-theme={isDarkTheme ? 'dark' : 'white'} className='text-body'>
                <Modal.Header>
                    <Modal.Title>
                        {header}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {message}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleAccept}>
                        Accept
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default AcceptModal;
