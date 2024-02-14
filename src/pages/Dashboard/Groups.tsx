import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sensor from '../../interfaces/Sensor';
import { getPrivateGroups } from '../../utils/api';
import Group from '../../interfaces/Group';
import { useNavigate } from 'react-router-dom';

// Components
import GroupItem from '../../components/dashboard/GroupItem';
import NewGroupButton from '../../utils/user_interaction/custom_modals/NewGroupButton';

const Groups: React.FC = () => {
    const [groupData, setGroupData] = useState<Group[]>([]);
    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            setGroupData(await getPrivateGroups());
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleGroupClick = async (groupId: string) => {
        navigate(`/dashboard/groups/${groupId}`);
    };

    // const createNewGroup = (args: any) => {
    //     // Perform actions with the form values, for example:
    //     console.log('Name:', args.name);
    //     console.log('Description:', args.description);
    //     // Implement your logic here, e.g., make an API call, update state, etc.
    // };

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
                <div className='w-100'>

                    <NewGroupButton fetchDataCallback={fetchData} />

                </div>
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                    {Array.isArray(groupData) && groupData.length > 0 ? (
                        groupData.map((group, index) => (
                            <GroupItem key={index} group={group} handleGroupClick={handleGroupClick} />
                        ))
                    ) : (
                        <div>
                            <p>Loading groups...</p>
                            <div className="spinner-border" style={{ width: '10rem', height: '10rem' }} role="status">
                                <span className="sr-only"></span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Groups;
