import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Form, Col } from 'react-bootstrap';
import Group from '../../../../interfaces/Group';
import { showAlert } from '../../alertController';
import { createNewSensor } from '../../../api';
import Sensor from '../../../../interfaces/Sensor';
import { createAlert } from '../../../api';

interface ChildProps {
    sensor: Sensor
}

const CreateNewAlert: React.FC<ChildProps> = (sensor) => {
    const [showModal, setShowModal] = useState(false);
    const isDarkTheme = document.getElementById('page-dashboard')?.dataset.bsTheme === 'dark';
    const [sensorType, setSensorType] = useState(sensor.sensor.types[0]);
    const [condition, setCondition] = useState('above');
    const [conditionNumber, setConditionNumber] = useState(0);
    const [action, setAction] = useState('email');

    const handleButtonClick = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleAccept = () => {
        createAlert(sensor.sensor._id, sensorType, condition, conditionNumber, action, () => {});
        handleCloseModal();
    };

    return (
        <div>
            <Button variant="secondary" className='btn btn-secondary col-md-12 mt-4' onClick={handleButtonClick}>
                Create new alert
            </Button>
            <Modal show={showModal} data-bs-theme={isDarkTheme ? 'dark' : 'white'} className='text-body'>
                <Modal.Header>
                    <Modal.Title>
                        Create new alert
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* MODAL BODY */}

                    <Form.Group as={Col} md="12" controlId="validationEditSensorType" className='mb-3'>
                        <Form.Label>Sensor Type</Form.Label>
                        <Form.Select value={sensorType} onChange={(e) => setSensorType(e.target.value)}>
                            {sensor.sensor.types.length === 0 ? (
                                <option value="">No types available for this sensor</option>
                            ) : (
                                <>
                                    <option value={sensor.sensor.types[0]}>{sensor.sensor.types[0]}</option>
                                    {sensor.sensor.types.slice(1).map((types, index) => ( // Exclude the first types
                                        <option key={index} value={types}>{types}</option>
                                    ))}
                                </>
                            )}
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                            Please select a sensor type.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} md="12" controlId="validationEditSensorType" className='mb-3'>
                        <Form.Label>Contition</Form.Label>
                        <Form.Select value={condition} onChange={(e) => setCondition(e.target.value)}>
                            <option value="under">Below</option>
                            <option value="above">Above</option>
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                            Please select a proper condition.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} md="12" controlId="validationEditSensorSettings" className='mb-3'>
                        <Form.Label>Condition number</Form.Label>
                        <Form.Control value={conditionNumber} type="number" placeholder="Input number" required onChange={(e) => setConditionNumber(parseFloat(e.target.value))} />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid condition number.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} md="12" controlId="validationEditSensorType" className='mb-3'>
                        <Form.Label>Action</Form.Label>
                        <Form.Select value={action} onChange={(e) => setAction(e.target.value)}>
                            <option value="email">Email</option>
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                            Please select a proper action.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <p>
                        When {sensorType} will be {condition} {conditionNumber}, {action} will be send
                    </p>

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

export default CreateNewAlert;
