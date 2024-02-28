import React, { FormEvent, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';
import Group from '../../../interfaces/Group';
import { showAlert } from '../alertController';
import { createNewGroup } from '../../api';

interface ChildProps {
    fetchDataCallback: () => void;
}

const NewGroupButton: React.FC<ChildProps> = ({ fetchDataCallback }) => {
    const [showModal, setShowModal] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const isDarkTheme = document.getElementById('page-dashboard')?.dataset.bsTheme === 'dark';

    const handleButtonClick = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleSave = () => {
        addNewGroup();
        handleCloseModal();
    };

    const addNewGroup = () => {
        const group: Group = {
            _id: 'generatedId',
            name,
            description,
            users: [],
            sensors: [],
        };

        createNewGroup(group, fetchDataCallback);
    };

    return (
        <div>
            <Button variant="secondary" onClick={handleButtonClick}>
                Add new group
            </Button>
            <Modal show={showModal} data-bs-theme={isDarkTheme ? 'dark' : 'white'} className='text-body'>
                <Modal.Header>
                    <Modal.Title>
                        Add new group
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* MODAL BODY */}

                    <label>Name:</label>
                    <input type="text" onChange={(e) => setName(e.target.value)} />
                    <br />
                    <label>Description:</label>
                    <input type="text" onChange={(e) => setDescription(e.target.value)} />

                    {/* MODAL BODY */}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default NewGroupButton;
