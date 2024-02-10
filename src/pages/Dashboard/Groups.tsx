import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sensor from '../../interfaces/Sensor';
import { getPrivateGroups } from '../../utils/api';
import Group from '../../interfaces/Group';
import { useNavigate } from 'react-router-dom';

// Components
import GroupItem from '../../components/dashboard/GroupItem';

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
        <div id="main-content" data-name="Groups">
            {/* <h1>Sensor Data</h1>
            <ul>
                {Array.isArray(groupData) && groupData.length > 0 ? (
                    groupData.map((group, index) => (
                        <GroupItem key={index} group={group} handleGroupClick={handleGroupClick} />
                    ))
                ) : (
                    <li>No groups data available</li>
                )}
            </ul> */}
            <div className="container">
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                    {Array.isArray(groupData) && groupData.length > 0 ? (
                        groupData.map((group, index) => (
                            <GroupItem key={index} group={group} handleGroupClick={handleGroupClick} />
                        ))
                    ) : (
                        <li>No groups data available</li>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Groups;
