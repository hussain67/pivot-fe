import { createContext, useContext } from "react";
import { useEffect, useState } from "react";
import { url } from "../utils/api/axios";
import io from "socket.io-client";

const SocketContext = createContext();

function SocketProvider({ children }) {
	const [socket, setSocket] = useState();
	console.log(socket);

	useEffect(() => {
		const socket = io.connect(url);
		setSocket(socket);
	}, []);
	return <SocketContext.Provider value={{ socket }}>{children}</SocketContext.Provider>;
}

const useSocket = () => {
	const context = useContext(SocketContext);
	if (context === undefined) {
		throw new Error("useSocket must be used within SocketProvider");
	}
	return context;
};

export { useSocket, SocketProvider };
