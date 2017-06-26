/*
	Gradient Generator
	See https://jsfiddle.net/efx06rxL/
*/
function randomize() {
	let container = document.getElementById("container");
	while(container.firstChild) {
		container.removeChild(container.firstChild);
	}
	let stepCount = 16;
	let startClr = {
		R: Math.floor(Math.random() * 255),
  		G: Math.floor(Math.random() * 255),
  		B: Math.floor(Math.random() * 255),
  	};
  	let endClr = {
    		R: Math.floor(Math.random() * 255),
    		G: Math.floor(Math.random() * 255),
    		B: Math.floor(Math.random() * 255),
  	};
	let htmlGradient = document.getElementById("htmlgradient");
	let startRGB = "rgb(" + startClr.R + "," + startClr.G + "," + startClr.B + ")";
	let endRGB = "rgb(" + endClr.R + "," + endClr.G + "," + endClr.B + ")";
	htmlGradient.style.background = "linear-gradient(" + startRGB + "," + endRGB + ")";
	let increments = {
		R: (endClr.R - startClr.R) / (stepCount - 1),
		G:(endClr.G - startClr.G) / (stepCount - 1),
		B:(endClr.B - startClr.B) / (stepCount - 1)
	};
	let steps = [];
	steps.push(startClr);
	for(i=0; i<stepCount-2; i++) {
		steps.push({
			R: startClr.R + ((i+1) * increments.R),
			G: startClr.G + ((i+1) * increments.G),
			B: startClr.B + ((i+1) * increments.B)
		});
	}
	steps.push(endClr);
	for(i=0; i<steps.length; i++) {
		let step = steps[i];
		let clrDiv = document.createElement('div');
		let clrString = toHex(Math.floor(step.R)) + toHex(Math.floor(step.G)) + toHex(Math.floor(step.B));
		clrDiv.className = "colorContainer";
		clrDiv.style.backgroundColor = "#" + clrString;
		clrDiv.innerHTML = clrString;
		container.appendChild(clrDiv);
	}
}

function toHex(val) {
	val = Math.max(0, val);
	let str = "00" + val.toString(16);
	return str.substr(-2);
}

document.getElementById("generateBtn").onclick = () => randomize();

/*
HTML:
<div class="page">
  <div id="container"></div>
  <div id="htmlgradient"></div>
</div>
<button id="generateBtn">Generate</button>

CSS:
.page {
  margin: 0 auto;
  width:510px;
}
.colorContainer {
  color: white;
  font-family: verdana;
  font-size:12px;
  height: 20px;
  text-align: center;
}
#container {
  float: left;
  margin-right:10px;
  width:250px;
}
#htmlgradient {
  float: right;
  height: 320px;
  width:250px;
}
*/
