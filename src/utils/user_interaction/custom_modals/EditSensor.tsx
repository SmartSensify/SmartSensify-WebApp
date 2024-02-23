import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';
import Group from '../../../interfaces/Group';
import { showAlert } from '../alertController';
import { createNewGroup, editExistingGroup, editSensor } from '../../api';
import Sensor from '../../../interfaces/Sensor';

interface ChildProps {
    sensor: Sensor;
    fetchDataCallback: () => void;
  }
  
  const EditSensor: React.FC<ChildProps> = ({ sensor, fetchDataCallback }) => {
    const [showModal, setShowModal] = useState(false);
    const [name, setName] = useState('');
    const [isPublic, setIsPublic] = useState(false);
    const isDarkTheme = document.getElementById('page-dashboard')?.dataset.bsTheme === 'dark';

    const handleButtonClick = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleSave = () => {
        handleEditSensor();
        handleCloseModal();
    };

    useEffect(() => {
        setName(sensor.name);
        setIsPublic(sensor.isPublic);
    }, []);

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsPublic(e.target.checked);
    };

    const handleEditSensor = () => {
        // TODO: Rewrite this, add form checking
        const newSensor = sensor;
        newSensor.name = name;
        newSensor.isPublic = isPublic;

        editSensor(newSensor, fetchDataCallback);
    };

    return (
        <div>
            <Button variant="secondary" onClick={handleButtonClick}>
                Edit this sensor
            </Button>
            <Modal show={showModal} data-bs-theme={isDarkTheme ? 'dark' : 'white'} className='text-body'>
                <Modal.Header>
                    <Modal.Title>
                        Edit sensor
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* MODAL BODY */}

                    <label>Name:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
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

export default EditSensor;
