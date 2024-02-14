import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Group from '../../../interfaces/Group';

const ModalNewGroup: React.FC = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const certainFunction = () => {
        const group: Group = {
            _id: 'generatedId',
            name,
            description,
            users: [],
            sensors: [],
        };
        alert(group.name + "  added 2");
    };

    return (
        <div>
            <form>
                <h1>Custom Form</h1>
                <label>Name:</label>
                <input type="text" onChange={(e) => setName(e.target.value)} />
            </form>
        </div>
    );
};

export default ModalNewGroup;
