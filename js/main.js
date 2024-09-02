// selecting all elements

const floorInputEl = document.getElementById("floor-input");
const liftInputEl = document.getElementById("lift-input");
const simulateBtnEl = document.querySelector(".simulate-btn");
const appViewEl = document.querySelector(".app-container");
const inputViewEl = document.querySelector(".input-view");

// Setting up input state, lifts, and rendering

const inputStatus = {};
const lifts = [];
function setInitialStateAndRender() {
	inputStatus.floorCount = floorInputEl.value;
	inputStatus.liftCount = liftInputEl.value;
	for (let i = 0; i < inputStatus.liftCount; i++) {
		lifts.push({ index: i + 1, position: 1, busy: false });
	}

	const liftHTML = (function getLiftString() {
		let string = "";
		for (let i = 0; i < inputStatus.liftCount; i++) {
			string += `<div class="lift" data-number=${i + 1}>lift</div>`;
		}
		return string;
	})();

	(function render() {
		for (let i = 0; i < inputStatus.floorCount; i++) {
			if (i + 1 == 1) {
				appViewEl.insertAdjacentHTML(
					"beforeend",
					` <div class="floor-element">
                <div>
                    <button class="btn-up" data-btnNumber=${i + 1}>Up</button>
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
                    <button class="btn-down" data-btnNumber=${
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
                    <button class="btn-up" data-btnNumber=${i + 1}>Up</button>
                    <button class="btn-down" data-btnNumber=${
											i + 1
										}>Down</button>
                    <hr>
                </div>
				<div class="floor-section"></div>
            </div>`
				);
			}
			console.log(i);
		}
	})();
	inputViewEl.classList.add("hidden");
}

simulateBtnEl.addEventListener("click", setInitialStateAndRender);
