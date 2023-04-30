import { React, useRef } from 'react'
//import { twilio } from 'twilio'
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
//const client = twilio(accountSid, authToken);
const client = ""



const Phone = () => {
    const inputRef = useRef();
    const handleClick = () => {
        var val = inputRef.current.value
        client.messages
            .create({
                body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
                from: '+16479579940',
                to: val
            })
            .then(message => console.log(message.sid));
    }



    return (
        <div className="single">
        <div className="cont">
            <div className="wrap">
            <p>Enter Phone Number!</p>
            <input id="inpt" ref={inputRef} placeholder="Join Code" />
            <button className="button" onClick={handleClick}>Click Me!</button>
            </div>
        </div>
        </div>
    )
}

export default Phone