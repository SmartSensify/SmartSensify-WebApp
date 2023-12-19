import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sensor from '../../interfaces/Sensor';
import { getPrivateGroups } from '../../utils/api';
import Group from '../../interfaces/Group';
import { useNavigate } from 'react-router-dom';

const Groups: React.FC = () => {
    const [groupData, setgroupData] = useState<Group[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setgroupData(await getPrivateGroups());
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleGroupClick = async (groupId: string) => {
        navigate(`/dashboard/groups/${groupId}`);
    };

    return (
        <div>
            <h1>Sensor Data</h1>
            <ul>
                {Array.isArray(groupData) && groupData.length > 0 ? (
                    groupData.map((group, index) => (
                        <li key={index}>
                            <h3>{group.name}</h3>
                            <h5>Grpup ID: {group._id}</h5>
                            <p>{group.description}</p>
                            <button onClick={() => handleGroupClick(group._id)}>
                                View Sensors
                            </button>
                        </li>
                    ))
                ) : (
                    <li>No groups data available</li>
                )}
            </ul>
        </div>
    );
}

export default Groups;
