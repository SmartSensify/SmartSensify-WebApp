import React from 'react';
import Group from '../../interfaces/Group';

const GroupItem: React.FC<{ group: Group; handleGroupClick: (groupId: string) => void }> = ({ group, handleGroupClick }) => {
    return (
        <div className="transition-bg cursor-pointer group-card p-3 m-3 border rounded bg-body" onClick={() => handleGroupClick(group._id)}>
            <span className="noselect material-symbols-outlined d-block text-center">
                workspaces
            </span>
            <h4 className="text-center mt-2 mb-1">{group?.name}</h4>
            <p className="text-center mb-1">ID: {group?._id}</p>
            <p className="text-center">Sensors: {group?.sensors?.length}</p>
        </div>
    );
};

export default GroupItem;