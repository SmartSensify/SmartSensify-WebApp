import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Sensor from '../../interfaces/Sensor';
import { deleteGroup, getGroupById, getAllSensorsByGroup } from '../../utils/api';
import { useNavigate } from 'react-router-dom';

// Components
import SensorItem from '../../components/dashboard/SensorItem';
import EditGroup from '../../utils/user_interaction/custom_modals/EditGroup';
import Group from '../../interfaces/Group';

const GroupSensors: React.FC = () => {
    const { groupId } = useParams<{ groupId: string }>();
    const [sensors, setSensors] = useState<Sensor[] | undefined>([]);
    const [group, setGroup] = useState<Group>();
    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            setSensors(await getAllSensorsByGroup(groupId || '',));
        } catch (error) {
            console.error('Error fetching sensors:', error);
        }
        try {
            setGroup(await getGroupById(groupId || ''));
        } catch (error) {
            console.error('Error fetching sensors:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [groupId]);

    const handleRefreshClick = async () => {
        setSensors(undefined);
        fetchData();
    };

    const handleSensorClick = async (sensorId: string) => {
        navigate(`/dashboard/sensors/${sensorId}`);
    };

    const handleDeleteClick = () => {
        deleteGroup(groupId!, () => { navigate(`/dashboard/groups`); });
    }

    return (
        <div id="main-content" data-name={`Sensors for ${groupId}`}>
            <div className="container">
                <div id='main-menu' className='w-100'>
                    <div className='row'>
                        <div className='col-auto'>
                            <input type='button' className='btn btn-secondary' value='refresh' onClick={() => handleRefreshClick()} />
                        </div>
                        <div className='col-auto'>
                            <input type='button' value="Delete this group" className='btn btn-danger' onClick={handleDeleteClick} />
                        </div>
                        <div className='col-auto'>
                            {group ? <EditGroup group={group} fetchDataCallback={fetchData} /> : ''}
                        </div>
                    </div>
                </div>
                
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                    {Array.isArray(sensors) && sensors.length > 0 ? (
                        sensors.map((sensor, index) => (
                            <SensorItem key={index} sensor={sensor} handleSensorClick={handleSensorClick} />
                        ))
                    ) : (
                        <div>
                            <p>Loading sensors...</p>
                            <div className="spinner-border" style={{ width: '10rem', height: '10rem' }} role="status">
                                <span className="sr-only"></span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default GroupSensors;
