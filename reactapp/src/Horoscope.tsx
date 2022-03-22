import React, {useState} from 'react';
import './App.css';
// @ts-ignore
import axios from "axios";
import TextBox from "./TextBox";
// @ts-ignore
import {AwesomeButton} from "react-awesome-button";

function Horoscope() {
    const [sun, setSun] = useState("");
    const [moon, setMoon] = useState("");
    const [rising, setRising] = useState("");
    const [horoscope, setHoroscope] = useState([]);

    const requestHoroscope = () => {
        const toSend = {
            sun: sun,
            moon: moon,
            rising: rising
        };

        let config = {
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
            }
        }

        axios.post('http://localhost:4567/horoscope', toSend, config)
            .then((response: { data: { [x: string]: React.SetStateAction<never[]>; }; }) => {
                console.log(response.data);
                setHoroscope(response.data['horoscope']);
            })
            .catch((error: any) => {
                console.log(error);
            });
    }

    return (
        <div className="Horoscope">
            <header>
                <h1>Horoscope</h1>
            </header>
            <TextBox label={"Sun Sign"} change={setSun}/>
            <TextBox label={"Moon Sign"} change={setMoon}/>
            <TextBox label={"Rising Sign"} change={setRising}/>
            <AwesomeButton onPress={requestHoroscope} type="primary">Submit</AwesomeButton>
            <br></br>
            {horoscope.map(e => <p>{e}</p>)}
        </div>
    );
}

export default Horoscope;