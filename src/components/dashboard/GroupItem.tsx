import React from 'react';
import Group from '../../interfaces/Group';

const GroupItem: React.FC<{ group: Group; handleGroupClick: (groupId: string) => void }> = ({ group, handleGroupClick }) => {
    return (
        <li>
            <h3>{group.name}</h3>
            <h5>Group ID: {group._id}</h5>
            <p>{group.description}</p>
            {group.sensors && <p>Sensors: {group.sensors.length}</p>}
            <button onClick={() => handleGroupClick(group._id)}>
                View Sensors
            </button>
        </li>
    );
};

export default GroupItem;