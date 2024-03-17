import React, { useState, useEffect } from 'react';
import { getAllSensors } from '../../../utils/api';
import Sensor from '../../../interfaces/Sensor';
import { Link } from 'react-router-dom';

interface ChildProps {
}

const OverviewPageElement: React.FC<ChildProps> = () => {
    // const [allSensors, setAllSensors] = useState<Sensor[] | undefined>([]);

    // useEffect(() => {
    //     const fetchSensors = async () => {
    //         try {
    //             let sensors = await getAllSensors();
    //             setAllSensors(sensors);
    //             console.log(allSensors);
    //         } catch (error) {
    //             console.error('Error fetching sensors:', error);
    //         }
    //     };

    //     fetchSensors();
    // }, []);

    // useEffect(() => {
    //     console.log("gwtsgb"+allSensors);
    // }, [allSensors]);
    const [allSensors, setAllSensors] = useState<any | undefined>([]);
    const fetchData = async (useCache: boolean = true) => {
        try {
            setAllSensors(await getAllSensors());
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
        console.log(allSensors);
    }, []);

    return (
        <div className="card w-25">
            <img id="image-sensor" className="img-fluid mb-3 noselect" src="/images/sensor_image.png" alt="Logo" />
            <div className="card-body">
                <h5 className="card-title">Sensors</h5>
                {allSensors ?
                allSensors ? (
                    <p className="card-text">You have a total of {allSensors?.sensors?.length} sensors</p>
                ) : (
                    <p className="card-text">You don't have any sensors</p>
                ):'loading'}
                <Link to="/dashboard/groups"><a href="#" className="btn btn-primary">Go to all sensors</a></Link>
            </div>
        </div>
    );
}

export default OverviewPageElement;