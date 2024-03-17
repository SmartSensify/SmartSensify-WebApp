import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Form, Col } from 'react-bootstrap';
import Group from '../../../../interfaces/Group';
import { showAlert } from '../../alertController';
import { createNewSensor } from '../../../api';
import Sensor from '../../../../interfaces/Sensor';

interface ChildProps {
    sensor: Sensor
}

const SensorSettings: React.FC<ChildProps> = (sensor) => {
    const [showModal, setShowModal] = useState(false);
    const isDarkTheme = document.getElementById('page-dashboard')?.dataset.bsTheme === 'dark';
    const [apiUri, setApiUri] = useState('');
    const [apiVersion, setApiVersion] = useState('');
    const [sensorId, setSensorId] = useState('');
    const [secretKey, setSecretKey] = useState('');
    const [dataSendingFrequency, setDataSendingFrequency] = useState('');
    const [sendSensorData, setSetSensorData] = useState(false);
    const [serverAlwaysLive, setServerAlwaysLive] = useState(false);

    const handleSendDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSetSensorData(e.target.checked);
    };

    const handleSendServerAlwaysLive = (e: React.ChangeEvent<HTMLInputElement>) => {
        setServerAlwaysLive(e.target.checked);
    };

    const handleButtonClick = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleAccept = () => {
        handleCloseModal();
    };

    return (
        <div>
            <Button variant="secondary" className='btn btn-secondary col-md-12 mt-4' onClick={handleButtonClick}>
                Sensor settings
            </Button>
            <Modal show={showModal} data-bs-theme={isDarkTheme ? 'dark' : 'white'} className='text-body'>
                <Modal.Header>
                    <Modal.Title>
                        Change sensor settings
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* MODAL BODY */}

                    <Form.Group as={Col} md="12" controlId="validationEditSensorSettings" className='mb-3'>
                        <Form.Label>Api Uri</Form.Label>
                        <Form.Control value="" type="text" placeholder="API URI" required onChange={(e) => setApiUri(e.target.value)} />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid API URI.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} md="12" controlId="validationEditSensorSettings" className='mb-3'>
                        <Form.Label>Api version</Form.Label>
                        <Form.Control value="" type="text" placeholder="API Version" required onChange={(e) => setApiVersion(e.target.value)} />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid API version.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} md="12" controlId="validationEditSensorSettings" className='mb-3'>
                        <Form.Label>Sensor Id</Form.Label>
                        <Form.Control value="" type="text" placeholder="Sensor Id" required onChange={(e) => setSensorId(e.target.value)} />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid Sensor Id.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} md="12" controlId="validationEditSensorSettings" className='mb-3'>
                        <Form.Label>Secret Key</Form.Label>
                        <Form.Control value="" type="text" placeholder="Secret Key" required onChange={(e) => setSecretKey(e.target.value)} />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid Secret Key.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} md="12" controlId="validationEditSensorSettings" className='mb-3'>
                        <Form.Label>Data sending frequency (in minutes)</Form.Label>
                        <Form.Control value="" type="number" placeholder="Every x minutes" required onChange={(e) => setDataSendingFrequency(e.target.value)} />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid Data sending frequency.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} md="12" controlId="validationEditSensorSettings" className='mb-3'>
                        <Form.Label>Send sensor data</Form.Label>
                        <Form.Check
                            type="checkbox"
                            onChange={handleSendDataChange}
                        />
                    </Form.Group>

                    <Form.Group as={Col} md="12" controlId="validationEditSensorSettings" className='mb-3'>
                        <Form.Label>Server always live</Form.Label>
                        <Form.Check
                            type="checkbox"
                            onChange={handleSendServerAlwaysLive}
                        />
                    </Form.Group>

                    {/* MODAL BODY */}
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

export default SensorSettings;
