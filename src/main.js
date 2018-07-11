
import {Asset} from "./engine/assets.js"

let canvas
let ctx
let gameMode = "game"


const init = function () {
    canvas = document.querySelector("#mainCanvas")
    ctx = canvas.getContext("2d")
    
}

window.addEventListener("DOMContentLoaded", init)

