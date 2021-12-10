import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './internList.css';

const InternList = () => {

    const [interns, setInterns] = useState([]);

    useEffect(() => {
        const fetchInterns = async () => {
            const response = await fetch('http://localhost:3001/interns');
            const interns = await response.json();
            setInterns(interns);
        }
        fetchInterns();
    }, []);

    return (
        <div id="container">
            <h1>Participants</h1>
            <div>
                {interns.map(u => (<div className="field" key={u.id}><p>{u.name}</p> <NavLink to={`/interns/${u.id}`}>Edit</NavLink></div>))}
            </div>
        </div>
    );
};

export default InternList;