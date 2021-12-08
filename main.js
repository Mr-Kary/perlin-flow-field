// main.js

window.addEventListener("load", init);

var canvas, context;

function init() {
    canvas = document.getElementById("cnv");
    context = canvas.getContext("2d");

    let flowField = new FlowField(40);
    flowField.display();

}

function setup() {}
function draw() {}
