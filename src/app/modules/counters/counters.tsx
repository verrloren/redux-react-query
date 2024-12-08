'use client'

import { useDispatch } from "react-redux";
import { useAppSelector } from "../../hooks/react-redux";
import { CounterId, decrementAction, incrementAction, selectCounter } from "./counters.slice";

export function Counters() {
	return (
		<div className="flex flex-row items-center justify-center gap-5">
			<Counter counterId="first" />
			<Counter counterId="second" />
		</div>
	)
}


export function Counter({ counterId }: { counterId: CounterId }) {

	const dispatch = useDispatch();
	const counterState = useAppSelector((state) => selectCounter(state, counterId))


	return (
		<div className="flex flex-col ">
			<h3>couter {counterState?.counter}</h3>
				

				<div className="flex items-center gap-x-2">

				<button
					className="rounded-xl border border-neutral-600 px-4 py-2 hover:border-neutral-400 transition-colors"
					onClick={() => dispatch(incrementAction({ counterId }))}
					>
						decrement
					</button>

					<button
					className="rounded-xl border border-neutral-600 px-4 py-2 bg-white text-black hover:border-neutral-400 transition-colors"
					onClick={() => dispatch(decrementAction({ counterId }))}
					>
						increment
					</button>

				</div>
		</div>
	)
}
