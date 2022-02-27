import React, { useEffect, useState } from "react";

const Responses = ({ socket }) => {
    const [noOfRes, setNoOfResponses] = useState(0);

    // useEffect(() => {
    //     socket.on('receive_message', (data) => {
    //         //console.log(data);
    //         setNoOfResponses(data)
    //     })
    // }, [noOfRes]);

    return (
        <div>
            <h5>Responses<span>{` ( ${noOfRes} ) `}</span></h5>
        </div>
    )
}

export default Responses;