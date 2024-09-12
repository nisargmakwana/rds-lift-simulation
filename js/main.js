// SELECTING ALL ELEMENTS

const floorInputEl = document.getElementById("floor-input");
const liftInputEl = document.getElementById("lift-input");
const simulateBtnEl = document.querySelector(".simulate-btn");
const appViewEl = document.querySelector(".app-container");
const inputViewEl = document.querySelector(".input-view");

// GLOBAL VARIABLES
const inputStatus = {};
const lifts = [];
const delayedClick = new Event("delayedClick");

// MAIN FUNCTION
function main(e) {
	e.preventDefault();
	class Queue {
		constructor() {
			this.queue = [];
			this.isProcessing = false;
		}
		addBtnElement(el) {
			this.queue.push(el);
		}
		async processQueue() {
			if (this.isProcessing && this.queue.length == 0) return;
			this.isProcessing = true;
			const { target } = this.queue.shift();
			// console.log(targetBtn);
			target.addEventListener("delayedClick", handleFloorBtns);
			await target.dispatchEvent(delayedClick);
			this.isProcessing = false;
		}
	}
	const extraBtnClicks = new Queue();
	const floorCount = Number(floorInputEl.value);
	const liftCount = Number(liftInputEl.value);

	function storedEventsHandler(e) {
		extraBtnClicks.addBtnElement({ target: e.target });
		e.target.disabled = true;
	}

	// validation
	if (
		floorCount === 1 ||
		floorCount === e ||
		floorCount <= 0 ||
		liftCount <= 0
	) {
		alert(
			"You require more than 1 floors for this lift simulation OR invalid input"
		);
		floorInputEl.value = "";
		liftInputEl.value = "";
		return;
	}
	inputStatus.floorCount = floorInputEl.value;
	inputStatus.liftCount = liftInputEl.value;

	// rendering
	for (let i = 0; i < inputStatus.liftCount; i++) {
		lifts.push({ index: i + 1, position: 1, busy: false });
	}

	const liftHTML = (function getLiftString() {
		let string = "";
		for (let i = 0; i < inputStatus.liftCount; i++) {
			string += `<div class="lift" data-number=${
				i + 1
			}><div class="door left"></div><div class="door right"></div></div>`;
		}
		return string;
	})();

	(function render() {
		for (let i = 0; i < inputStatus.floorCount; i++) {
			if (i + 1 == 1) {
				appViewEl.insertAdjacentHTML(
					"beforeend",
					` <div class="floor-element">
					<div class='floor-no'>${i + 1}</div>
                <div>
                    <button class="lift-btn btn-up" data-btnnumber=${
											i + 1
										}>Up</button>
                    <hr>
                </div>
                <div class="floor-section">
               ${liftHTML}
                </div>
            </div>`
				);
			} else if (i + 1 == inputStatus.floorCount) {
				appViewEl.insertAdjacentHTML(
					"beforeend",
					`<div class="floor-element">
					<div class='floor-no'>${i + 1}</div>
                <div>
                    <button class="lift-btn btn-down" data-btnnumber=${
											i + 1
										}>Down</button>
                    <hr>
                </div>
				<div class="floor-section"></div>
            </div>`
				);
			} else {
				appViewEl.insertAdjacentHTML(
					"beforeend",
					`<div class="floor-element">
					<div class='floor-no'>${i + 1}</div>
                <div>
                    <button class="lift-btn btn-up" data-btnnumber=${
											i + 1 + 0.1
										} data-type="up">Up</button>
                    <button class="lift-btn btn-down" data-btnnumber=${
											i + 1
										} data-type="down">Down</button>
                    <hr>
                </div>
				<div class="floor-section"></div>
            </div>`
				);
			}
		}
	})();
	inputViewEl.classList.add("hidden");

	// event handler
	const floorBtnsEl = document.querySelectorAll(".lift-btn");

	function handleFloorBtns(e) {
		// getting button numbers and type (up or down)
		const btnNumberType = Number(e.target.dataset.btnnumber);
		const btnNumber = Math.floor(Number(e.target.dataset.btnnumber));

		// adding a lift's distance from called floor
		(function addingLiftDistancesFromCalledFloor() {
			lifts.map(
				(lift) =>
					(lift.distanceFromCalledFloor = Math.abs(btnNumber - lift.position))
			);
		})();

		// getting the available lift
		const availableLift = lifts.reduce(
			(min, lift) => {
				if (
					lift.busy === false &&
					lift.distanceFromCalledFloor < min.distanceFromCalledFloor
				) {
					return lift;
				}
				return min;
			},
			{
				distanceFromCalledFloor: 1000000000000,
				busy: false,
			}
		);

		if (!availableLift.index) {
			storedEventsHandler(e);
			return;
		}

		// lift action starts from here
		availableLift.busy = true;

		const transitionTime = 2 * Math.abs(availableLift.position - btnNumber);
		const clickedBtn = document.querySelector(
			`[data-btnnumber='${btnNumberType}']`
		);
		clickedBtn.disabled = true;

		// updating the lift's state after complete execution
		setTimeout(() => {
			availableLift.busy = false;
			availableLift.position = btnNumber;
			clickedBtn.disabled = false;
			if (extraBtnClicks.queue.length > 0) {
				extraBtnClicks.processQueue();
			}
		}, (transitionTime + 5) * 1000);
		const targetDistance = -(btnNumber - 1) * 13;
		const lift = document.querySelector(
			`div[data-number="${availableLift.index}"]`
		);

		// selecting lift children (doors)
		const liftDoorsEl = lift.children;

		// door open and close animation
		function doorsOpen() {
			liftDoorsEl[0].classList.remove("close");
			liftDoorsEl[1].classList.remove("close");
			liftDoorsEl[0].classList.add("open");
			liftDoorsEl[1].classList.add("open");
		}
		function doorsClose() {
			liftDoorsEl[0].classList.remove("open");
			liftDoorsEl[1].classList.remove("open");
			liftDoorsEl[0].classList.add("close");
			liftDoorsEl[1].classList.add("close");
		}

		// 2 cases: when lift is on the called floor and otherwise
		if (availableLift.position === btnNumber) {
			doorsOpen();
			setTimeout(doorsClose, 2.5 * 1000);
		} else {
			lift.style.transform = `translateY(${targetDistance}rem)`;
			lift.style.transition = `transform ${transitionTime}s linear`;
			setTimeout(doorsOpen, transitionTime * 1000);
			setTimeout(doorsClose, (transitionTime + 2.5) * 1000);
		}
	}
	floorBtnsEl.forEach((el) => el.addEventListener("click", handleFloorBtns));
}
simulateBtnEl.addEventListener("click", main);
