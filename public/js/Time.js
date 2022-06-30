export default class Timer {
	constructor(min) {
		this.min = min - 1;
		this.second = 60;
		this.pause = false;
	}

	timerCycle() {
		if (!this.pause) {
			this.second = this.second - 1
		}
		if (this.second <= 0 && this.min <= 0) {
			this.pause = true
		}

		if ((this.second === 0) && !this.pause) {
			this.min -= 1;
			this.second = 60;
		}
	}
}
