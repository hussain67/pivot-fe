import { useState } from "react";
import JoinPresentation from "./JoinPresentation";
import SelectPresentation from "./SelectPresentation";

// Main function
function Participant() {
	const [presentationName, setPresentationName] = useState("");

	const [isSelectedPresentation, setIsSelectedPresentation] = useState(false);

	return (
		<>
			<h1>Participant</h1>
			{!isSelectedPresentation && (
				<SelectPresentation
					setPresentationName={setPresentationName}
					setIsSelectedPresentation={setIsSelectedPresentation}
				/>
			)}

			{isSelectedPresentation && <JoinPresentation presentationName={presentationName} />}
		</>
	);
}

export default Participant;
