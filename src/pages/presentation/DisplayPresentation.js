import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { getAllSlides } from "../../utils/api/presentationApi";
import Page from "../../components/Page";
import { useSocket } from "../../context/socketContext";

const DisplayPresentation = () => {
	const { presentationTitle, presentationId } = useParams();
	const [slides, setSlides] = useState([]);
	const [index, setIndex] = useState(0);
	const [isStarted, setIsStart] = useState(true);
	const navigate = useNavigate();
	const { socket } = useSocket();

	const room = presentationTitle.trim().toLocaleLowerCase();
	const username = "presenter";

	useEffect(() => {
		getAllSlides(presentationId).then(slides => {
			setSlides(slides);
			socket.emit("join", { username, room }, (error, user) => {
				if (error) {
					alert(error);
					console.log(error);
				} else {
				}
			});
		});
	}, [presentationId, room, socket]);

	const startSlide = () => {
		if (isStarted) {
			socket.emit("current-slide", { slide: slides[0] });
			setIndex(0);
			setIsStart(!isStarted);
		} else {
			socket.emit("remove-user");
			setSlides([]);
			setIsStart(!isStarted);
			navigate("/presentation");
		}
	};
	const prevSlide = () => {
		let currentIndex;
		currentIndex = index - 1;
		if (currentIndex < 0) {
			currentIndex = slides.length - 1;
		}
		setIndex(currentIndex);
		const slide = slides[currentIndex];
		socket.emit("current-slide", { slide });
	};

	const nextSlide = () => {
		let currentIndex;
		currentIndex = index + 1;
		if (currentIndex > slides.length - 1) {
			currentIndex = 0;
		}
		setIndex(currentIndex);
		const slide = slides[currentIndex];
		socket.emit("current-slide", { slide });
	};

	return (
		<Page title={"Presentation-display"}>
			<section className="slide">
				{slides.length > 0 && (
					<>
						<div
							className={`slide__content`}
							key={slides[index]._id}
						>
							<h3 className="slide__title">{slides[index].slideTitle}</h3>
							<img
								className="slide__image"
								src={slides[index].slideImage}
								alt=""
							/>
							<p className="slide__body">{slides[index].slideBody}</p>
						</div>
						<footer className="slide__footer">
							<button
								onClick={startSlide}
								className={"btn btn__start"}
							>
								{isStarted ? "Start Presentation" : "Stop Presentation"}
							</button>
							{index === slides.length - 1 && (
								<button
									className="btn btn__pool"
									onClick={() => navigate(`/presentation-poll/${presentationTitle}/${presentationId}`)}
								>
									Start Poll
								</button>
							)}
						</footer>
						<button
							className="btn btn-prev"
							onClick={prevSlide}
							disabled={isStarted}
						>
							<FiChevronLeft />
						</button>
						<button
							className="btn btn-next"
							onClick={nextSlide}
							disabled={isStarted}
						>
							<FiChevronRight />
						</button>
					</>
				)}
			</section>
		</Page>
	);
};

export default DisplayPresentation;
