import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Timer from "./Timer";
import Footer from "./Footer";
import { useQuiz } from "../contexts/QuizContext";

export default function App() {
	const { questions, status } = useQuiz();

	const numQuestions = questions.length;
	const maxPossiblePoints = questions.reduce(
		(prev, cur) => prev + cur.points,
		0
	);

	return (
		<div className="app">
			<Header />
			<Main>
				{status === "loading" && <Loader />}
				{status === "error" && <Error />}
				{status === "ready" && (
					<StartScreen numQuestions={numQuestions} />
				)}
				{status === "active" && (
					<>
						<Progress
							numQuestions={numQuestions}
							maxPossiblePoints={maxPossiblePoints}
						/>
						<Question />
						<Footer>
							<Timer />
							<NextButton numQuestions={numQuestions} />
						</Footer>
					</>
				)}
				{status === "finished" && (
					<FinishScreen maxPossiblePoints={maxPossiblePoints} />
				)}
			</Main>
		</div>
	);
}
