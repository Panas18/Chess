export default class Timer {
	constructor(min) {
		this.min = min - 1;
		this.second = 60;
		this.pause = false;
	}

	timerCycle(board) {
		if (!this.pause) {
			this.second = this.second - 1
		}
		if (this.second <= 0 && this.min <= 0) {
			this.pause = true
			let side = board.sideToPlay
			loseByTime(side)
		}

		if ((this.second === 0) && !this.pause) {
			this.min -= 1;
			this.second = 60;
		}
	}
}

function loseByTime(side) {
	let color = side === COLOR.WHITE ? "Black" : "White"
	endContainer.innerHTML = `${color} won time`
	gameWrapper.style.display = "none"
	endWrapper.style.display = "block"
	MOVELIST = {}

}
