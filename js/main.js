// selecting all elements

const floorInputEl = document.getElementById("floor-input");
const liftInputEl = document.getElementById("lift-input");
const simulateBtnEl = document.querySelector(".simulate-btn");
const appViewEl = document.querySelector(".app-container");
const inputViewEl = document.querySelector(".input-view");

// Setting up input state, lifts, and rendering

const inputStatus = {};
const lifts = [];
function main(e) {
	// Rendering
	// e.preventDefault();
	inputStatus.floorCount = floorInputEl.value;
	inputStatus.liftCount = liftInputEl.value;
	for (let i = 0; i < 3; i++) {
		lifts.push({ index: i + 1, position: 1, busy: false });
	}

	const liftHTML = (function getLiftString() {
		let string = "";
		for (let i = 0; i < 3; i++) {
			string += `<div class="lift" data-number=${i + 1}>lift</div>`;
		}
		return string;
	})();

	(function render() {
		for (let i = 0; i < 3; i++) {
			if (i + 1 == 1) {
				appViewEl.insertAdjacentHTML(
					"beforeend",
					` <div class="floor-element">
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
                <div>
                    <button class="lift-btn btn-up" data-btnnumber=${
											i + 1
										}>Up</button>
                    <button class="lift-btn btn-down" data-btnnumber=${
											i + 1
										}>Down</button>
                    <hr>
                </div>
				<div class="floor-section"></div>
            </div>`
				);
			}
		}
	})();
	// inputViewEl.classList.add("hidden");

	// Attaching event listeners to lift buttons
	const floorBtnsEl = document.querySelectorAll(".lift-btn");
	const liftPos = Array.from(lifts, (lift) => lift.position);
	floorBtnsEl.forEach((el) =>
		el.addEventListener("click", (e) => {
			const btnNumber = e.target.dataset.btnnumber;
			const availableLift = lifts.find((lift) => lift.busy === false);
			availableLift.busy = true;
			setTimeout(() => {
				availableLift.busy = false;
			}, 6.5 * 1000);
			function calcTargetDistance(btnNumber) {
				// console.log(btnNumber);

				// console.log(availableLift);

				const remDistance = (btnNumber - liftPos[availableLift.position]) * 13;
				return remDistance;
			}
			const targetDistance = -calcTargetDistance(btnNumber);
			// console.log(targetDistance);
			const lift = document.querySelector(
				`div[data-number="${availableLift.index}"]`
			);
			lift.style.transform = `translateY(${targetDistance}rem)`;
		})
	);
}
main();
// simulateBtnEl.addEventListener("click", main);
