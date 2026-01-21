//DIVS
const section = document.getElementById("boxes")
const numBankDiv = document.getElementById("numBank")
const dropdown = document.getElementById("dropdown")
const howTo = document.getElementById("howTo")

//BUTTON DEFINITIONS
const clear = document.getElementById("clearGrid")
const generate = document.getElementById("generatePuzzle")
const answer = document.getElementById("answerCheck")
let isActive = answer.classList.contains("active")
isActive = false

//GLOBAL DEFINITIONS
const totalCells = 13;
let moveDirection = "horizontal"
//for parameters
let myBank
//arrays 
let puzzlePatterns = [
  [
    [1,1,1,0,0,1,1,1,0,0,1,1,1],
    [1,1,1,1,0,1,1,1,1,0,1,1,1],
    [1,1,1,1,1,1,1,1,1,0,1,1,1],
    [0,0,0,1,1,1,0,0,1,1,1,1,1],
    [1,1,1,1,1,0,0,1,1,1,0,0,0],
    [1,1,1,0,1,1,1,1,0,1,1,1,0],
    [1,1,1,1,0,1,1,1,0,1,1,1,1],
    [0,1,1,1,0,1,1,1,1,0,1,1,1],
    [0,0,0,1,1,1,0,0,1,1,1,1,1],
    [1,1,1,1,1,0,0,1,1,1,0,0,0],
    [1,1,1,0,1,1,1,1,1,1,1,1,1],
    [1,1,1,0,1,1,1,1,0,1,1,1,1],
    [1,1,1,0,0,1,1,1,0,0,1,1,1]
  ],
  [
    [1,1,1,0,0,1,1,1,0,0,1,1,1],
    [1,1,1,0,1,1,1,1,0,1,1,1,1],
    [1,1,1,0,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,0,0,1,1,1,0,0,0],
    [0,0,0,1,1,1,0,0,1,1,1,1,1],
    [0,1,1,1,0,1,1,1,1,0,1,1,1],
    [1,1,1,1,0,1,1,1,0,1,1,1,1],
    [1,1,1,0,1,1,1,1,0,1,1,1,0],
    [1,1,1,1,1,0,0,1,1,1,0,0,0],
    [0,0,0,1,1,1,0,0,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,0,1,1,1],
    [1,1,1,1,0,1,1,1,1,0,1,1,1],
    [1,1,1,0,0,1,1,1,0,0,1,1,1]
  ],
  [
    [1,1,1,1,0,0,1,1,1,0,1,1,1],
    [1,1,1,1,1,0,1,1,1,0,1,1,1],
    [1,1,1,1,1,0,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,0,1,1,1,0,0,0],
    [0,0,0,1,1,1,1,0,1,1,1,1,1],
    [0,1,1,1,1,1,1,1,0,1,1,1,1],
    [1,1,1,0,1,1,1,1,1,0,1,1,1],
    [1,1,1,1,0,1,1,1,1,1,1,1,0],
    [1,1,1,1,1,0,1,1,1,1,0,0,0],
    [0,0,0,1,1,1,0,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,0,1,1,1,1,1],
    [1,1,1,0,1,1,1,0,1,1,1,1,1],
    [1,1,1,0,1,1,1,0,0,1,1,1,1]
  ],
  [
    [1,1,1,0,1,1,1,0,0,1,1,1,1],
    [1,1,1,0,1,1,1,0,1,1,1,1,1],
    [1,1,1,1,1,1,1,0,1,1,1,1,1],
    [0,0,0,1,1,1,0,1,1,1,1,1,1],
    [1,1,1,1,1,0,1,1,1,1,0,0,0],
    [1,1,1,1,0,1,1,1,1,1,1,1,0],
    [1,1,1,0,1,1,1,1,1,0,1,1,1],
    [0,1,1,1,1,1,1,1,0,1,1,1,1],
    [0,0,0,1,1,1,1,0,1,1,1,1,1],
    [1,1,1,1,1,1,0,1,1,1,0,0,0],
    [1,1,1,1,1,0,1,1,1,1,1,1,1],
    [1,1,1,1,1,0,1,1,1,0,1,1,1],
    [1,1,1,1,0,0,1,1,1,0,1,1,1]
  ],
  [
    [1,1,1,1,0,1,1,1,0,1,1,1,1],
    [1,1,1,1,0,1,1,1,0,1,1,1,1],
    [1,1,1,1,0,1,1,1,0,1,1,1,1],
    [1,1,1,1,1,1,1,0,1,1,1,1,1],
    [0,0,0,1,1,1,0,1,1,1,0,0,0],
    [1,1,1,1,1,0,1,1,1,0,1,1,1],
    [1,1,1,0,1,1,1,1,1,0,1,1,1],
    [1,1,1,0,1,1,1,0,1,1,1,1,1],
    [0,0,0,1,1,1,0,1,1,1,0,0,0],
    [1,1,1,1,1,0,1,1,1,1,1,1,1],
    [1,1,1,1,0,1,1,1,0,1,1,1,1],
    [1,1,1,1,0,1,1,1,0,1,1,1,1],
    [1,1,1,1,0,1,1,1,0,1,1,1,1]
  ],
  [
    [1,1,1,1,0,1,1,1,0,1,1,1,1],
    [1,1,1,1,0,1,1,1,0,1,1,1,1],
    [1,1,1,1,0,1,1,1,0,1,1,1,1],
    [1,1,1,1,1,0,1,1,1,1,1,1,1],
    [0,0,0,1,1,1,0,1,1,1,0,0,0],
    [1,1,1,0,1,1,1,0,1,1,1,1,1],
    [1,1,1,0,1,1,1,1,1,0,1,1,1],
    [1,1,1,1,1,0,1,1,1,0,1,1,1],
    [0,0,0,1,1,1,0,1,1,1,0,0,0],
    [1,1,1,1,1,1,1,0,1,1,1,1,1],
    [1,1,1,1,0,1,1,1,0,1,1,1,1],
    [1,1,1,1,0,1,1,1,0,1,1,1,1],
    [1,1,1,1,0,1,1,1,0,1,1,1,1]
  ],
  [
[1,1,1,0,0,1,1,1,0,0,1,1,1],
[1,1,1,0,1,1,1,1,0,1,1,1,1],
[1,1,1,0,1,1,1,1,0,1,1,1,1],
[0,0,1,1,1,1,1,0,1,1,1,1,0],
[0,1,1,1,1,0,1,1,1,1,0,0,0],
[1,1,1,1,0,1,1,1,1,0,1,1,1],
[1,1,1,1,1,1,0,1,1,1,1,1,1],
[1,1,1,0,1,1,1,1,0,1,1,1,1],
[0,0,0,1,1,1,1,0,1,1,1,1,0],
[0,1,1,1,1,0,1,1,1,1,1,0,0],
[1,1,1,1,0,1,1,1,1,0,1,1,1],
[1,1,1,1,0,1,1,1,1,0,1,1,1],
[1,1,1,0,0,1,1,1,0,0,1,1,1]
  ],
  [
[1,1,1,0,0,1,1,1,0,0,1,1,1],
[1,1,1,1,0,1,1,1,1,0,1,1,1],
[1,1,1,1,0,1,1,1,1,0,1,1,1],
[0,1,1,1,1,0,1,1,1,1,1,0,0],
[0,0,0,1,1,1,1,0,1,1,1,1,0],
[1,1,1,1,0,1,1,1,1,0,1,1,1],
[1,1,1,1,1,1,0,1,1,1,1,1,1],
[1,1,1,1,0,1,1,1,1,0,1,1,1],
[0,1,1,1,1,0,1,1,1,1,0,0,0],
[0,0,1,1,1,1,1,0,1,1,1,1,0],
[1,1,1,1,0,1,1,1,1,0,1,1,1],
[1,1,1,1,0,1,1,1,1,0,1,1,1],
[1,1,1,0,0,1,1,1,0,0,1,1,1]
  ],
  [
[1,1,1,1,0,1,1,1,1,0,1,1,1],
[1,1,1,1,0,1,1,1,1,0,1,1,1],
[1,1,1,1,0,1,1,1,1,1,1,1,1],
[1,1,1,1,1,0,1,1,1,1,0,0,0],
[0,0,0,0,1,1,1,0,1,1,1,1,1],
[1,1,1,0,1,1,1,1,0,1,1,1,1],
[1,1,1,1,1,1,0,1,1,1,1,1,1],
[1,1,1,1,0,1,1,1,1,0,1,1,1],
[1,1,1,1,1,0,1,1,1,0,0,0,0],
[0,0,0,1,1,1,1,0,1,1,1,1,1],
[1,1,1,1,1,1,1,1,0,1,1,1,1],
[1,1,1,0,1,1,1,1,0,1,1,1,1],
[1,1,1,0,1,1,1,1,0,1,1,1,1]
  ],
  [
[1,1,1,0,1,1,1,1,0,1,1,1,1],
[1,1,1,0,1,1,1,1,0,1,1,1,1],
[1,1,1,1,1,1,1,1,0,1,1,1,1],
[0,0,0,1,1,1,1,0,1,1,1,1,1],
[1,1,1,1,1,0,1,1,1,0,0,0,0],
[1,1,1,1,0,1,1,1,1,0,1,1,1],
[1,1,1,1,1,1,0,1,1,1,1,1,1],
[1,1,1,0,1,1,1,1,0,1,1,1,1],
[0,0,0,0,1,1,1,0,1,1,1,1,1],
[1,1,1,1,1,0,1,1,1,1,0,0,0],
[1,1,1,1,0,1,1,1,1,1,1,1,1],
[1,1,1,1,0,1,1,1,1,0,1,1,1],
[1,1,1,1,0,1,1,1,1,0,1,1,1]
  ],
  [
[1,1,1,0,1,1,1,1,0,1,1,1,1],
[1,1,1,0,1,1,1,1,0,1,1,1,1],
[1,1,1,0,1,1,1,1,0,1,1,1,1],
[1,1,1,1,1,0,0,0,1,1,1,0,0],
[0,0,0,1,1,1,0,1,1,1,1,1,1],
[1,1,1,1,0,1,1,1,1,0,1,1,1],
[1,1,1,0,1,1,1,1,1,0,1,1,1],
[1,1,1,0,1,1,1,1,0,1,1,1,1],
[1,1,1,1,1,1,0,1,1,1,0,0,0],
[0,0,1,1,1,0,0,0,1,1,1,1,1],
[1,1,1,1,0,1,1,1,1,0,1,1,1],
[1,1,1,1,0,1,1,1,1,0,1,1,1],
[1,1,1,1,0,1,1,1,1,0,1,1,1]
  ],
  [
[1,1,1,1,0,1,1,1,1,0,1,1,1],
[1,1,1,1,0,1,1,1,1,0,1,1,1],
[1,1,1,1,0,1,1,1,1,0,1,1,1],
[0,0,1,1,1,0,0,0,1,1,1,1,1],
[1,1,1,1,1,1,0,1,1,1,0,0,0],
[1,1,1,0,1,1,1,1,0,1,1,1,1],
[1,1,1,0,1,1,1,1,1,0,1,1,1],
[1,1,1,1,0,1,1,1,1,0,1,1,1],
[0,0,0,1,1,1,0,1,1,1,1,1,1],
[1,1,1,0,0,0,1,1,1,0,0,1,1],
[1,1,1,1,0,1,1,1,1,0,1,1,1],
[1,1,1,1,0,1,1,1,1,0,1,1,1],
[1,1,1,1,0,1,1,1,1,0,1,1,1]
  ],
  [
[0,0,1,1,1,0,0,0,1,1,1,0,0],
[0,1,1,1,1,0,0,1,1,1,1,1,0],
[1,1,1,1,1,0,1,1,1,1,1,1,1],
[1,1,1,1,0,1,1,1,1,0,1,1,1],
[1,1,1,0,1,1,1,1,0,1,1,1,1],
[1,1,1,1,1,1,1,0,1,1,1,1,1],
[0,0,0,1,1,1,0,1,1,1,0,0,0],
[1,1,1,1,1,0,1,1,1,1,1,1,1],
[1,1,1,1,0,1,1,1,1,0,1,1,1],
[1,1,1,0,1,1,1,1,0,1,1,1,1],
[1,1,1,1,1,1,1,0,1,1,1,1,1],
[0,1,1,1,1,1,0,0,1,1,1,1,0],
[0,0,1,1,1,0,0,0,1,1,1,0,0]
  ],
  [
[0,0,1,1,1,0,0,0,1,1,1,0,0],
[0,1,1,1,1,1,0,0,1,1,1,1,0],
[1,1,1,1,1,1,1,0,1,1,1,1,1],
[1,1,1,0,1,1,1,1,0,1,1,1,1],
[1,1,1,1,0,1,1,1,1,0,1,1,1],
[1,1,1,1,1,0,1,1,1,1,1,1,1],
[0,0,0,1,1,1,0,1,1,1,0,0,0],
[1,1,1,1,1,1,1,0,1,1,1,1,1],
[1,1,1,0,1,1,1,1,0,1,1,1,1],
[1,1,1,1,0,1,1,1,1,0,1,1,1],
[1,1,1,1,1,0,1,1,1,1,1,1,1],
[0,1,1,1,1,0,0,1,1,1,1,1,0],
[0,0,1,1,1,0,0,0,1,1,1,0,0]
  ],
  [
[0,0,1,1,1,1,1,0,0,0,1,1,1],
[0,0,1,1,1,1,1,1,0,1,1,1,1],
[0,0,1,1,1,1,1,1,0,1,1,1,1],
[0,0,0,1,1,1,0,1,1,1,1,1,0],
[0,1,1,1,1,0,1,1,1,0,1,1,1],
[0,1,1,1,0,1,1,1,1,0,1,1,1],
[1,1,1,0,1,1,1,1,1,0,1,1,1],
[1,1,1,0,1,1,1,1,0,1,1,1,0],
[1,1,1,0,1,1,1,0,1,1,1,1,0],
[0,1,1,1,1,1,0,1,1,1,0,0,0],
[1,1,1,1,0,1,1,1,1,1,1,0,0],
[1,1,1,1,0,1,1,1,1,1,1,0,0],
[1,1,1,0,0,0,1,1,1,1,1,0,0]
  ],
  [
    [1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0],
[1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0],
[1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0],
[0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0],
[1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0],
[1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0],
[1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1],
[0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1],
[0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1],
[0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0],
[0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1],
[0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1],
[0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1]
  ],
  [
[1,1,1,1,0,1,1,1,1,0,1,1,1],
[1,1,1,1,0,1,1,1,1,0,1,1,1],
[1,1,1,1,0,1,1,1,1,0,1,1,1],
[0,0,0,1,1,1,1,0,0,0,1,1,1],
[1,1,1,0,1,1,1,1,0,1,1,1,1],
[1,1,1,1,1,0,1,1,1,1,0,0,0],
[1,1,1,1,1,1,0,1,1,1,1,1,1],
[0,0,0,1,1,1,1,0,1,1,1,1,1],
[1,1,1,1,0,1,1,1,1,0,1,1,1],
[1,1,1,0,0,0,1,1,1,1,0,0,0],
[1,1,1,0,1,1,1,1,0,1,1,1,1],
[1,1,1,0,1,1,1,1,0,1,1,1,1],
[1,1,1,0,1,1,1,1,0,1,1,1,1],
[1,1,1,0,1,1,1,1,0,1,1,1,1]
  ],
  [
    [1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1],
[1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1],
[1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1],
[1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
[1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1],
[0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1],
[1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1],
[1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0],
[1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1],
[0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1],
[1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1],
[1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1],
[1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1],
[1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1]
  ],
  [
[1,1,1,0,0,1,1,1,0,0,1,1,1],
[1,1,1,0,1,1,1,1,1,0,1,1,1],
[1,1,1,0,1,1,1,1,1,0,1,1,1],
[1,1,1,1,1,1,0,1,1,1,1,1,1],
[0,0,0,1,1,1,0,1,1,1,0,0,0],
[1,1,1,1,1,0,1,1,1,1,1,1,1],
[1,1,1,0,0,1,1,1,0,0,1,1,1],
[1,1,1,1,1,1,1,0,1,1,1,1,1],
[0,0,0,1,1,1,0,1,1,1,0,0,0],
[1,1,1,1,1,1,0,1,1,1,1,1,1],
[1,1,1,0,1,1,1,1,1,0,1,1,1],
[1,1,1,0,1,1,1,1,1,0,1,1,1],
[1,1,1,0,0,1,1,1,0,0,1,1,1]
  ],
  [
    [1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1],
[1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1],
[1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1],
[1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1],
[0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0],
[1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1],
[1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1],
[1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1],
[0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0],
[1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1],
[1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1],
[1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1],
[1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1]
  ]
]

let answerKey = []

let highlightedCells = []
let gridArray = []


//BUTTONS

console.log(dropdown.getBoundingClientRect())
//drop down menu
howTo.addEventListener("click", function() {
  if (dropdown.classList.contains("open")) {
    dropdown.classList.remove("open")
  } else if (!dropdown.classList.contains("open")) {
    dropdown.classList.add("open")
  }
})

//randomly selects one of the puzzle options
function randomizer() {
  
  let totalPatterns = puzzlePatterns.length
  let puzzleIndex = Math.floor(Math.random() * totalPatterns)
  
  return puzzleIndex
}

//generates random grid and number bank
function generatePuzzle() {
  section.innerHTML = ""
  answerKey = []
  gridArray = []
  puzzleIndex = randomizer()
  let currentPattern = puzzlePatterns[puzzleIndex]
  
  for (let row = 0; row < totalCells; row++) {
    let rowArray = [];
    let tempArray = []
    for (let col = 0; col < totalCells; col++) {
      let cell = document.createElement("div");
      let input = document.createElement("input");
      
      input.type = "number";
      input.classList.add("no-spinner")
      cell.classList.add("cell");
      input.dataset.row = row;
      input.dataset.col = col;
      
      if (currentPattern[row][col] === 0) {
        cell.classList.add("null");
        input.disabled = true;
        tempArray.push(null)
      } else {
        let randomNum = Math.floor(Math.random() * 10)
        tempArray.push(randomNum)
      }
      
      cell.appendChild(input);
      section.appendChild(cell);
      rowArray.push(cell);
      
      input.addEventListener("input", function(e) {
        applyGrey(myBank)
        
        let grid = e.target.closest(".cell")
        let userInput = e.target.value.trim();
        let row = Number(e.target.dataset.row)
        let col = Number(e.target.dataset.col)
        
        if (userInput === "") {
          grid.classList.remove("wrong")
          console.log(grid.classList)
        } else {
          if (isActive === true) {

         if (answerKey[row][col] !== Number(userInput)) {
            grid.classList.add("wrong");
          } else {
            grid.classList.remove("wrong")
          }
        } else {
          grid.classList.remove("wrong")
        }
        }
      })
    }
    gridArray.push(rowArray);
    answerKey.push(tempArray)
  }
  myBank = createBank()
}
generate.addEventListener("click", generatePuzzle)

//toggle button to show incorrectly placed numbers
function answerCheck() {
  
  answer.classList.toggle("active")
  
  if (isActive === true) {
    isActive = false
    answer.innerHTML = "Check: Off"
  } else {
    isActive = true
    answer.innerHTML = "Check: On"
  }
  
  for (let row = 0; row < 13; row++) {
    for (let col = 0; col < 13; col++) {
      
      let grid = gridArray[row][col]
      let input = grid.querySelector("input");
      let userInput = input.value.trim();
      if (userInput === "") {
        grid.classList.remove("wrong")
      } else {
      if (isActive === true) {
        if (input.disabled === true) continue;
        
       if (answerKey[row][col] !== Number(userInput)) {
          grid.classList.add("wrong");
        } else {
          grid.classList.remove("wrong")
        }
      } else {
        grid.classList.remove("wrong")
      }
    }
    }
  }
}
answer.addEventListener("click", answerCheck)

//clears grid of inputs + .wrong
function clearGrid() {
  for (let row = 0; row < 13; row++) {
    for (let col = 0; col < 13; col++) {
      
      let input = section.querySelector(`input[data-row="${row}"][data-col="${col}"]`)
      input.value = ""
    }
  }
  applyGrey(myBank)
}
clear.addEventListener("click", clearGrid)


//AUTO JUMP FUNCTIONS

//jumps to next cell on input (right/down)
function autoJumpRight(cell, row, col, input, totalCells, e) {
  
  e.target.value = e.target.value.replace(/\D/g, "").slice(-1);
  
  if (!input.disabled) {
    
    let nextCol = col + 1;
    
    while (true) {
      if (nextCol >= totalCells) {
        nextCol = 0;
        row++;
      }
      
      if (row >= totalCells) break;
      
      let nextInput = document.querySelector(`
        [data-row="${row}"][data-col="${nextCol}"]`)

        console.log(nextInput, nextInput.value)

      if (!nextInput) break;
      
      if (!nextInput.disabled && nextInput.value === "") {
        nextInput.focus();
        break;
      } 

      nextCol++;
    }
  }
}

function autoJumpDown(cell, row, col, input, totalCells, e) {
  
  e.target.value = e.target.value.replace(/\D/g, "").slice(-1);
  
  if (!input.disabled) {
    
    let nextRow = row + 1;
    
    while (true) {
      if (nextRow >= totalCells) {
        nextRow = 0;
        col++;
      }
      
      if (col >= totalCells) break;
      
      let nextInput = document.querySelector(`
        [data-row="${nextRow}"][data-col="${col}"]`)
      if (!nextInput) break;
      
       
      if (!nextInput.disabled && nextInput.value === "") {
        nextInput.focus();
        break;
      } 

      nextRow++;
    }
  }
}

//deletes numbers + goes back one cell (left/up)
function backspaceLeft(cell, row, col, input, totalCells, e, myBank) {
  
  
  if (e.key === "Backspace") {
    if (input.value === "") {
      if (!input.disabled) {
        
        let prevCol = col - 1;
        
        while (true) {
          if (prevCol < 0) {
            prevCol = totalCells - 1
            row--
          }
          
          if (row < 0) {
            break
          }
          
          let prevInput = document.querySelector(
            `[data-row="${row}"][data-col="${prevCol}"]`
          )
          if (!prevInput) {
            break
          }
          
          if (!prevInput.disabled) {
            prevInput.focus()
            prevInput.value = ""
            applyGrey(myBank)
            break
          }
          prevCol--
        }
      }
      
    } else {
      input.value = ""
      applyGrey(myBank)
      e.preventDefault()
    }
  }
}

function backspaceUp(cell, row, col, input, totalCells, e, myBank) {
  
  if (e.key === "Backspace") {
    if (input.value === "") {
      if (!input.disabled) {
        
        let prevRow = row - 1;
        
        while (true) {
          if (prevRow < 0) {
            prevRow = totalCells - 1
            col--
          }
          
          if (col < 0) {
            break
          }
          
          let prevInput = document.querySelector(
            `[data-row="${prevRow}"][data-col="${col}"]`
          )
          if (!prevInput) {
            break
          }
          
          if (!prevInput.disabled) {
            prevInput.focus()
            prevInput.value = ""
            applyGrey(myBank)
            break
          }
          prevRow--
        }
      }
      
    } else {
      input.value = ""
      applyGrey(myBank)
      e.preventDefault()
    }
  }
}

//HIGHLIGHT FUNCTIONS

function highlightLR(e) {
  
  /*Define cell as e.target.closest(“.cell”)
     Define row and col Number(e.target.dataset) 
     Define currentRow and currentCol to use for incrementing/decrementing later without affecting row/col definition
    
     Define temp array to hold collected cells*/
  let cell = e.target.closest(".cell")
  let row = Number(e.target.dataset.row)
  let col = Number(e.target.dataset.col)
  let currentCol = col
  const needToHighlight = []
  
  //Clear .highlight class from all cells by looping through global array
  highlightedCells.forEach(cell => {
    cell.classList.remove("highlight")
  })
  
  //Push cell that caused event into array
  needToHighlight.push(cell)
  /*start while loop to scan left/right
  Add condition that checks if the neighbouring cells are 1. Within grid bounds and 2. Valid cell where !input.disabled
    If true, push valid cell into array
    Else break*/
  while (currentCol > 0) {
    
    let leftInput = document.querySelector(`input[data-row="${row}"][data-col="${currentCol-1}"]`)
    let leftCell = leftInput.closest(".cell")
    
    if (leftInput.disabled === false) {
      needToHighlight.push(leftCell)
      currentCol--
    } else { break }
  }
  //reset position
  currentCol = col
  
  while (currentCol < totalCells - 1) {
    
    let rightInput = document.querySelector(`input[data-row="${row}"][data-col="${currentCol+1}"]`)
    let rightCell = rightInput.closest(".cell")
    
    if (rightInput.disabled === false) {
      needToHighlight.push(rightCell)
      currentCol++
    } else { break }
  }
  //forEach the temp array and add .highlight
  needToHighlight.forEach(cell => {
    cell.classList.add("highlight")
  })
  //Make global array = temp array
  highlightedCells = needToHighlight
}

function highlightUD(e) {
  
  /*Define cell as e.target.closest(“.cell”)
     Define row and col Number(e.target.dataset) 
     Define currentRow and currentCol to use for incrementing/decrementing later without affecting row/col definition
    
     Define temp array to hold collected cells*/
  let cell = e.target.closest(".cell")
  let row = Number(e.target.dataset.row)
  let col = Number(e.target.dataset.col)
  let currentRow = row
  const needToHighlight = []
  
  //Clear .highlight class from all cells by looping through global array
  highlightedCells.forEach(cell => {
    cell.classList.remove("highlight")
  })
  
  //Push cell that caused event into array
  needToHighlight.push(cell)
  /*start while loop to scan up/down
  Add condition that checks if the neighbouring cells are 1. Within grid bounds and 2. Valid cell where !input.disabled
    If true, push valid cell into array
    Else break*/
  while (currentRow > 0) {
    
    let upInput = document.querySelector(`input[data-row="${currentRow-1}"][data-col="${col}"]`)
    let upCell = upInput.closest(".cell")
    
    if (upInput.disabled === false) {
      needToHighlight.push(upCell)
      currentRow--
    } else { break }
  }
  //reset position
  currentRow = row
  
  while (currentRow < totalCells) {
    
    let downInput = document.querySelector(`input[data-row="${currentRow}"][data-col="${col}"]`)
    let downCell = downInput.closest(".cell")
    
    if (downInput.disabled === false) {
      needToHighlight.push(downCell)
      currentRow++
    } else { break }
  }
  //forEach the temp array and add .highlight
  needToHighlight.forEach(cell => {
    cell.classList.add("highlight")
  })
  //Make global array = temp array
  highlightedCells = needToHighlight
}


//DIRECTION / HIGHLIGHTING / AUTO JUMP EVENT LISTENERS

//switch from left/right to up/down + highlighting on spacebar
section.addEventListener("keydown", e => {
  
  if (e.code === "Space") {
    e.preventDefault()
    if (moveDirection === "vertical") {
      moveDirection = "horizontal"
      highlightLR(e)
    } else if (moveDirection === "horizontal") {
      moveDirection = "vertical"
      highlightUD(e)
    }
  }
})

//auto jump backwards on backspace
section.addEventListener("keydown", e => {
  let cell = e.target.closest(".cell")
  let row = Number(e.target.dataset.row)
  let col = Number(e.target.dataset.col)
  let input = e.target
  if (e.key === "Backspace") {
    if (moveDirection === "vertical") {
      backspaceUp(cell, row, col, input, totalCells, e, myBank)
    } else if (moveDirection === "horizontal") {
      backspaceLeft(cell, row, col, input, totalCells, e, myBank)
    }
  }
})

//auto jump forward on input
section.addEventListener("input", e => {
  let cell = e.target.closest(".cell")
  let row = Number(e.target.dataset.row)
  let col = Number(e.target.dataset.col)
  let input = e.target
  if (moveDirection === "vertical") {
    autoJumpDown(cell, row, col, input, totalCells, e)
  } else if (moveDirection === "horizontal") {
    autoJumpRight(cell, row, col, input, totalCells, e)
  }
})

//highlight on focus
section.addEventListener("focusin", e => {
  if (moveDirection === "horizontal") {
    highlightLR(e)
  } else if (moveDirection === "vertical") {
    highlightUD(e)
  }
})

//NUMBER BANK LOGIC

//builds number bank
function createBank() {
  numBankDiv.innerHTML = ""
  let strings = []
  let numBank = new Map()
  
  for (let row = 0; row < 13; row++) {
    let tempArray = []
    for (let col = 0; col < 13; col++) {
      let value = answerKey[row][col]
      if (value !== null) {
        tempArray.push(value)
      } else {
        if (tempArray.length > 1) {
          strings.push(tempArray.join(""))
        }
        tempArray = []
      }
    }
    if (tempArray.length > 1) {
      strings.push(tempArray.join(""))
      tempArray = []
    }
  }
  for (let col = 0; col < 13; col++) {
    let tempArray = []
    for (let row = 0; row < 13; row++) {
      let value = answerKey[row][col]
      if (value !== null) {
        tempArray.push(value)
      } else {
        if (tempArray.length > 1) {
          strings.push(tempArray.join(""))
        }
        tempArray = []
      }
    }
    if (tempArray.length > 1) {
      strings.push(tempArray.join(""))
      tempArray = []
    }
  }
  
  strings.forEach(num => {
    let length = num.length
    if (numBank.has(length)) {
      numBank.get(length).push(num)
    } else {
      numBank.set(length, [num])
    }
  })
  
  let keySort = Array.from(numBank.keys())
  keySort.sort((a, b) => a - b)
  
  keySort.forEach(length => {
    let numbers = numBank.get(length)
    numbers.sort((a, b) => a - b)
    let groupDiv = document.createElement("div")
    let header = document.createElement("h4")
    let ul = document.createElement("ul")
    
    groupDiv.classList.add("lengthGroup")
    groupDiv.dataset.length = length
    header.innerHTML = `${length} Numbers`
    groupDiv.appendChild(header)
    
    numbers.forEach(num => {
      let li = document.createElement("li")
      li.innerHTML = num
      ul.appendChild(li)
    })
    groupDiv.appendChild(ul)
    numBankDiv.appendChild(groupDiv)
    
  })
  return numBank
}

//reset invalid class and wrong class
function resetGridValidation() {
  let allInputs = section.querySelectorAll("input")

  allInputs.forEach(input => {
    input.classList.remove("invalid")
    
    if (input.value === "") {
      let cell = input.closest(".cell")
      cell.classList.remove("wrong")
    }
  })
}



//greys out used numbers and un-greys numbers when user deletes them from grid
function applyGrey(myBank) {
  
  resetGridValidation();

  let allLi = numBankDiv.querySelectorAll("li")
  let masterSet = new Set()
  
  allLi.forEach(li => {
    li.classList.remove("grey")
  })
  
  for (let row = 0; row < 13; row++) {
    for (let col = 0; col < 13; col++) {
      
      //current and neighbouring inputs
      let hasValue = document.querySelector(`input[data-row="${row}"][data-col="${col}"]`)
      let leftCheck = document.querySelector(`input[data-row="${row}"][data-col="${col-1}"]`)
      let upCheck = document.querySelector(`input[data-row="${row-1}"][data-col="${col}"]`)
      let currentCell = hasValue.closest(".cell")
      
      //condition to check if neighbouring cell is invalid
      let leftCheckCondition = leftCheck === null || leftCheck.disabled === true
      let upCheckCondition = upCheck === null || upCheck.disabled === true
      
      if (hasValue.disabled === false && hasValue.value !== "") {
        
          if (leftCheckCondition) {
            
            let numArray = []
            let inputArray = []
            let currentCol = col
            
            numArray.push(hasValue.value)
            inputArray.push(hasValue)
            
            //scan left and right until it reaches grid border or null cell
            while (currentCol < totalCells - 1) {
              if (document.querySelector(`input[data-row="${row}"][data-col="${currentCol+1}"]`) === null || document.querySelector(`input[data-row="${row}"][data-col="${currentCol+1}"]`).value === "") {
                break
              } else {
                currentCol++
                
                let nextCol = document.querySelector(`input[data-row="${row}"][data-col="${currentCol}"]`)
                
                numArray.push(nextCol.value)
                inputArray.push(nextCol)
                
              }
            }
            let joiner = numArray.join("")
            masterSet.add(joiner)
            
            let rightCheck = document.querySelector(`input[data-row="${row}"][data-col="${currentCol+1}"]`)
            let rightCheckCondition = rightCheck === null || rightCheck.disabled === true

            //check if typed number is in bank
            if (rightCheckCondition) {
              if (myBank.has(joiner.length)) {
                let hasNumber = myBank.get(joiner.length)
                
                if (hasNumber.includes(joiner) === false) {
                  
                  inputArray.forEach(input => {
                    input.classList.add("invalid")
                  })
                } 
              }
            }
          }

          if (upCheckCondition) {
            let numArray = []
            let inputArray = []
            let currentRow = row
            
            numArray.push(hasValue.value)
            inputArray.push(hasValue)
            //scan up and down until it reaches grid border or null cell
            while (currentRow < totalCells - 1) {
              if (document.querySelector(`input[data-row="${currentRow+1}"][data-col="${col}"]`) === null || document.querySelector(`input[data-row="${currentRow+1}"][data-col="${col}"]`).value === "") {
                break
              } else {
                currentRow++
                
                let nextRow = document.querySelector(`input[data-row="${currentRow}"][data-col="${col}"]`)
                
                numArray.push(nextRow.value)
                inputArray.push(nextRow)
              }
            }
            
            let joiner = numArray.join("")
            masterSet.add(joiner)
            let downCheck = document.querySelector(`input[data-row="${currentRow+1}"][data-col="${col}"]`)
            let downCheckCondition = downCheck === null || downCheck.disabled === true
            
            //check if typed number is in bank
            if (downCheckCondition) {
              
              if (myBank.has(joiner.length)) {
                let hasNumber = myBank.get(joiner.length)
                
                if (hasNumber.includes(joiner) === false) {
                  
                  inputArray.forEach(input => {
                    input.classList.add("invalid")
                  })
                }
              }
            }
          }



      }
    }
  }
  
  allLi.forEach(li => {
    if (masterSet.has(li.innerHTML)) {
      li.classList.add("grey")
    }
  })
}