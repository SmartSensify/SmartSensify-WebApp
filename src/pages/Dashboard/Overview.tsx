import React, { useState, useEffect } from 'react';
import OverviewPageElement from './Elements/OverviewPageElement';
import { getLoggedUserData } from '../../utils/api';

const Overview: React.FC = () => {
    // const [currentUser, setCurrentUser] = useState<any>(null);

    // useEffect(() => {
    //     const fetchUserData = async () => {
    //     const response = await getLoggedUserData();
    //     setCurrentUser(response.data);
    //     }
    //     fetchUserData();
    // });

    return (
        <div id="main-content" data-name="Overview">
            <OverviewPageElement />
        </div>
    );
}

export default Overview;
