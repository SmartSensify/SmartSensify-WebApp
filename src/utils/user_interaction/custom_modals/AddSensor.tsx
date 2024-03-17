import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Form, Col } from 'react-bootstrap';
import Group from '../../../interfaces/Group';
import { showAlert } from '../alertController';
import { createNewSensor } from '../../api';
import Sensor from '../../../interfaces/Sensor';

interface ChildProps {
    fetchDataCallback: () => void;
    groupId: string;
}

const NewSensorButton: React.FC<ChildProps> = ({ fetchDataCallback, groupId }) => {
    const isDarkTheme = document.getElementById('page-dashboard')?.dataset.bsTheme === 'dark';
    const [validated, setValidated] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [name, setName] = useState('');
    const [isPublic, setIsPublic] = useState(false);

    const handleButtonClick = () => {
        setValidated(false);
        setShowModal(true);
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsPublic(e.target.checked);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleSave = () => {
        addNewSensor();
        handleCloseModal();
    };

    const addNewSensor = () => {
        const group: Sensor = {
            _id: 'generatedId',
            name,
            isPublic,
            secretKey: 'generatedId',
            isActive: false,
            types: [],
            alerts: [],
            settings: [],
            lastLogs: [],
            errors: [],
            batteryStatus: [],
            currentOptions: {
                apiUri: '',
                apiVersion: '',
                sensorId: '',
                secretKey: '',
                dataSendingFrequency: 0,
                isSendSensorData: false,
                serverAlwaysLive: false
            },
            newOptions: {
                apiUri: '',
                apiVersion: '',
                sensorId: '',
                secretKey: '',
                dataSendingFrequency: 0,
                isSendSensorData: false,
                serverAlwaysLive: false
            }
        };

        createNewSensor(group, groupId, fetchDataCallback);
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
                Add new sensor
            </Button>
            <Modal show={showModal} data-bs-theme={isDarkTheme ? 'dark' : 'white'} className='text-body'>
                <Modal.Header>
                    <Modal.Title>
                        Add new sensor
                    </Modal.Title>
                </Modal.Header>
                <Form noValidate validated={validated} onSubmit={handleSubmitForm}>
                    <Modal.Body>
                        {/* MODAL BODY */}

                        {/* <label>Name:</label>
                        <input type="text" onChange={(e) => setName(e.target.value)} />
                        <br />
                        <label>isPublic:</label>
                        <input type="checkbox" checked={isPublic} onChange={handleCheckboxChange} /> */}

                        <Form.Group as={Col} md="12" controlId="validationNewGroupName" className='mb-3'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Name of a new sensor" required onChange={(e) => setName(e.target.value)} />
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid name.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} md="12" controlId="validationNewGroupDescription" className='mb-3'>
                            <Form.Label>Is public</Form.Label>
                            <Form.Check
                                type="checkbox"
                                // label="public"
                                onChange={handleCheckboxChange}
                            />
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

export default NewSensorButton;
