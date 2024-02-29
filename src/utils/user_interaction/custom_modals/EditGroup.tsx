import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Form, Col } from 'react-bootstrap';
import Group from '../../../interfaces/Group';
import { showAlert } from '../alertController';
import { createNewGroup, editExistingGroup } from '../../api';

interface ChildProps {
    group: Group;
    fetchDataCallback: () => void;
}

const EditGroup: React.FC<ChildProps> = ({ group, fetchDataCallback }) => {
    const isDarkTheme = document.getElementById('page-dashboard')?.dataset.bsTheme === 'dark';
    const [validated, setValidated] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const handleButtonClick = () => {
        setValidated(false);
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

    const handleSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;

        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            handleSave();
        }
        setValidated(true);
    };

    return (
        <div>
            <Button variant="secondary" onClick={handleButtonClick}>
                Edit this group
            </Button>
            <Modal show={showModal} data-bs-theme={isDarkTheme ? 'dark' : 'white'} className='text-body'>
                <Modal.Header>
                    <Modal.Title>
                        Edit group
                    </Modal.Title>
                </Modal.Header>
                <Form noValidate validated={validated} onSubmit={handleSubmitForm}>
                    <Modal.Body>
                        {/* MODAL BODY */}

                        <Form.Group as={Col} md="12" controlId="validationNewGroupName" className='mb-3'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control value={group.name} type="text" placeholder="Name of a new group" required onChange={(e) => setName(e.target.value)} />
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid name.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} md="12" controlId="validationNewGroupDescription" className='mb-3'>
                            <Form.Label>Description</Form.Label>
                            <Form.Control value={group.description} type="text" placeholder="Description of a new group" required onChange={(e) => setDescription(e.target.value)} />
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid description.
                            </Form.Control.Feedback>
                        </Form.Group>

                        {/* MODAL BODY */}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseModal}>
                            Close
                        </Button>
                        <Button type="submit">
                            Save
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    );
};

export default EditGroup;
