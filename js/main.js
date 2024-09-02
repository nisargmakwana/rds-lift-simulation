// INPUT VIEW
const inputViewEl = document.querySelector(".input-view");
const simulateBtnEl = document.querySelector(".simulate-btn");
const floorInputEl = document.querySelector("#floor-input");
const liftInputEl = document.querySelector("#lift-input");
const appViewEl = document.querySelector(".app-container");

const floorAndLiftState = {
	floorCount: 0,
	liftCount: 0,
	floorContent1: "",
};
const liftContent = function (liftCount) {
	let string = "";
	for (let i = 0; i < liftCount; i++) {
		string += '<div class="lift">lift</div>';
	}
	return string;
};

const floorContentLast = `<div class="floor-element">
			<div>
				<button class="btn-down">Down</button>
				<hr>
			</div>
			<div class="floor-section">
			</div>
		</div>`;
const floorContent = `<div class="floor-element">
		<div>
			<button class="btn-up">Up</button>
			<button class="btn-down">Down</button>
			<hr>
		</div>
		<div class="floor-section">

		</div>
	</div>`;
const generateFloorAndLiftContent = function (floorCount) {
	let string = "";
	for (let i = 1; i <= floorCount; i++) {
		if (i == 1) {
			string += floorAndLiftState.floorContent1;
		} else if (i == floorCount) {
			string += floorContentLast;
		} else {
			string += floorContent;
		}
	}
	return string;
};
function renderLiftsAndFloors() {
	appViewEl.insertAdjacentHTML(
		"beforeend",
		generateFloorAndLiftContent(floorAndLiftState.floorCount)
	);
}
simulateBtnEl.addEventListener("click", () => {
	floorAndLiftState.floorCount = floorInputEl.value;
	floorAndLiftState.liftCount = liftInputEl.value;

	floorAndLiftState.floorContent1 = `<div class="floor-element">
                <div>
                    <button class="btn-up">Up</button>
                    <hr>
                </div>
                <div class="floor-section">
                ${liftContent(floorAndLiftState.liftCount)}
                </div>
            </div>`;
	render();
	inputViewEl.classList.add("hidden");
});

function render() {
	renderLiftsAndFloors();
}
