import React, { useEffect, useState } from "react";

const Responses = ({ socket, setResponseData }) => {
    const [noOfRes, setNoOfResponses] = useState(0);
    // const [responseData, setResponseData] = useState([])

    useEffect(() => {
        let resdata = ["B", 12]
        socket.on('receive_message', (resdata) => {
            //console.log(resdata);
            setResponseData((currData) => {
                return [...currData, resdata]
            })
            setNoOfResponses((curr) => {
                return curr + 1;
            })
        })
    }, [noOfRes]);

    return (
        <div>
            <h5>Responses<span>{` ( ${noOfRes} ) `}</span></h5>
        </div>
    )
}

export default Responses;