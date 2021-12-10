import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { NavLink } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import './editIntern.css'

const EditIntern = () => {
    const { id } = useParams();
    const [intern, setIntern] = useState({});
    //after submit radirect to internList
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        const fetchIntern = async () => {
            const response = await fetch(`http://localhost:3001/interns/${id}`);
            const intern = await response.json();
            setIntern(intern);
            //in order to display date in input (callendar) without timezone
            const getDate = () => {
                let { internshipStart, internshipEnd } = intern;
                var date = document.querySelectorAll("input[type='date']");
                date[0].value = internshipStart.slice(0, internshipStart.indexOf('T'));
                date[1].value = internshipEnd.slice(0, internshipEnd.indexOf('T'));
            }
            getDate();
        }
        fetchIntern();
    }, [id]);

    const handleSubmit = (event) => {
        event.preventDefault();
        //save to db
        fetch(`http://localhost:3001/interns/${id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(intern)
        });
        setRedirect(true);
    }

    const handleChange = (event) => {
        let { name, value } = event.target;

        //concat timezone to input date
        if (name === "internshipStart" || name === "internshipEnd")
            value += "T00:00+00Z";
        
        //validate input - red border
        if(value === ""){
            event.target.style = "outline: 1px solid red";
            document.querySelector(`span[name='${name}']`).style = "display: inline-block;";
        }
        else {
            event.target.style = "outline: none"
            var errors = document.querySelectorAll('span');
            errors[0].style = "display: none;";
            errors[1].style = "display: none;";
        }

        setIntern(prevIntern => ({
            ...prevIntern,
            [name]: value
        }));
    }

    return (
        <div id="container">
            {redirect && <Redirect to='/'/>}
            <div style={{textAlign: "start"}}>
                <NavLink to="/"><i className="fa fa-arrow-left" style={{marginRight: "10px"}} />Back to list </NavLink>
            </div>
            <h1 style={{marginBottom: "5px", marginTop: "5px"}}>Edit</h1>
            <form id="edit-form" onSubmit={handleSubmit}>
                <div className="inpt">
                    <label>Full name *</label>
                    <input
                        type="text"
                        name="name"
                        autoComplete="off"
                        placeholder={intern.name}
                        onChange={handleChange} />
                        <span name="name" className="error">This field is required</span>
                </div>

                <div className="inpt">
                    <label>Email adress *</label>
                    <input
                        // type="email"
                        type="text"
                        name="email"
                        autoComplete="off"
                        placeholder={intern.email}
                        onChange={handleChange} />
                        <span name="email" className="error">This is not a valid email address</span>
                </div>

                <div className="inpt">
                    <label>Internship start *</label>
                    <input
                        name="internshipStart"
                        type="date"
                        onChange={handleChange} />
                </div>

                <div className="inpt">
                    <label>Internship end *</label>
                    <input
                        name="internshipEnd"
                        type="date"
                        onChange={handleChange} />
                </div>

                <input type="submit" value="Submit" />
            </form>
        </div>
    );
};

export default EditIntern;