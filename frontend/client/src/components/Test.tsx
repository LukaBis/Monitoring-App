import React from "react";
import { useState } from "react";
import { urlPrefix } from "../helpers/getPrefixBasedOnEnvironment";

function Test(){
    const [pingResponse, setPingResponse] = useState("no response");

    const pingBackend = () => {
        
        fetch(urlPrefix() + "/helloworld", {
            method: "GET",
        })
        .then((response) =>
            response.text().then(function (text) {
                setPingResponse(text);
            })
        )
        .catch((err) => console.log(err));
    };

    return (
        <div className="test">
            <h1>Hello World!</h1>
            <p>{process.env.REACT_APP_ENV}</p>
            <button onClick={pingBackend}>Ping Backend</button>
            {pingResponse && <p>Backend Responded with <b>'{pingResponse}'</b></p>}
        </div>
    );
}

export default Test;