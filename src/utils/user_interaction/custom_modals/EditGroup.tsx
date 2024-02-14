import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';
import Group from '../../../interfaces/Group';
import { showAlert } from '../alertController';
import { createNewGroup, editExistingGroup } from '../../api';

interface ChildProps {
    group: Group;
    fetchDataCallback: () => void;
  }
  
  const EditGroup: React.FC<ChildProps> = ({ group, fetchDataCallback }) => {
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

    useEffect(() => {
        setName(group.name);
        setDescription(group.description);
    }, []);

    const addNewGroup = () => {
        // TODO: Rewrite this, add form checking
        const newGroup = group;
        group.name = name;
        group.description = description;

        editExistingGroup(group, fetchDataCallback);
    };

    return (
        <div>
            <Button variant="primary" onClick={handleButtonClick}>
                Edit this group
            </Button>
            <Modal show={showModal} data-bs-theme={isDarkTheme ? 'dark' : 'white'} className='text-body'>
                <Modal.Header>
                    <Modal.Title>
                        Edit group
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* MODAL BODY */}

                    <label>Name:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    <br />
                    <label>Description:</label>
                    <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />

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

export default EditGroup;
