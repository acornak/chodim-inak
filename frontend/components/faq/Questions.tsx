"use client";
import React, { FC, useState } from "react";
import { ChevronDown } from "../icons/Chevrons";

type Question = {
	question: string;
	answer: string;
};

type QuestionsProps = {
	questions: Question[];
};

const Questions: FC<QuestionsProps> = ({ questions }): JSX.Element => {
	const midIndex = Math.ceil(questions.length / 2);
	const firstHalf = questions.slice(0, midIndex - 1);
	const secondHalf = questions.slice(midIndex - 1);

	const QuestionItem: FC<{
		question: Question;
		index: number;
		len: number;
	}> = ({ question, index, len }) => {
		const [isAnswerVisible, setIsAnswerVisible] = useState(false);
		return (
			<div
				className="flex flex-col cursor-pointer"
				onClick={() => setIsAnswerVisible(!isAnswerVisible)}
			>
				<hr className="border-primary-base" />
				<div className="px-2 hover:bg-primary-light dark:hover:bg-primary-dark flex justify-between items-center">
					<h2 className="text-xl font-bold py-4">
						{question.question}
					</h2>
					<div
						className={`transform ${
							isAnswerVisible ? "rotate-180" : ""
						} transition-transform duration-300 ease-in-out`}
					>
						<ChevronDown className="text-primary-base" />
					</div>
				</div>
				<div
					className={`px-2 overflow-hidden transition-max-height duration-300 ease-in-out ${
						isAnswerVisible ? "max-h-[10000px]" : "max-h-0"
					}`}
				>
					{question.answer.split("\n").map(
						(paragraph: string, pIndex: number): JSX.Element => (
							<p className="text-justify py-4 pt-0" key={pIndex}>
								{paragraph}
							</p>
						),
					)}
				</div>

				{index === len - 1 && <hr className="border-primary-base" />}
			</div>
		);
	};

	return (
		<div className="px-10 grid grid-cols-1 md:grid-cols-2 gap-x-4 pb-10">
			<div className="hidden md:block">
				{firstHalf.map(
					(question: Question, index: number): JSX.Element => (
						<QuestionItem
							key={index}
							question={question}
							index={index}
							len={firstHalf.length}
						/>
					),
				)}
			</div>
			<div className="hidden md:block">
				{secondHalf.map(
					(question: Question, index: number): JSX.Element => (
						<QuestionItem
							key={index}
							question={question}
							index={index}
							len={secondHalf.length}
						/>
					),
				)}
			</div>
			<div className="md:hidden">
				{questions.map(
					(question: Question, index: number): JSX.Element => (
						<QuestionItem
							key={index}
							question={question}
							index={index}
							len={questions.length}
						/>
					),
				)}
			</div>
		</div>
	);
};

export default Questions;
