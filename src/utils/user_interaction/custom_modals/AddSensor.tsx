import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';
import Group from '../../../interfaces/Group';
import { showAlert } from '../alertController';
import { createNewSensor } from '../../api';
import Sensor from '../../../interfaces/Sensor';

interface ChildProps {
    fetchDataCallback: () => void;
    groupId: string;
}

const NewSensorButton: React.FC<ChildProps> = ({ fetchDataCallback, groupId }) => {
    const [showModal, setShowModal] = useState(false);
    const [name, setName] = useState('');
    const [isPublic, setIsPublic] = useState(false);
    const isDarkTheme = document.getElementById('page-dashboard')?.dataset.bsTheme === 'dark';

    const handleButtonClick = () => {
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
            type: [],
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
                <Modal.Body>
                    {/* MODAL BODY */}

                    <label>Name:</label>
                    <input type="text" onChange={(e) => setName(e.target.value)} />
                    <br />
                    <label>isPublic:</label>
                    <input type="checkbox" checked={isPublic} onChange={handleCheckboxChange} />

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

export default NewSensorButton;
