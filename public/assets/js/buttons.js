//BUTTONS

//drop down menu
howTo.addEventListener("click", function() {
    dropdown.classList.add("open")
    overlay.classList.add("darken")
    howTo.style.pointerEvents = "none"
  }
)

close.addEventListener("click", function() {
      dropdown.classList.remove("open")
      overlay.classList.remove("darken")
      howTo.style.pointerEvents = "auto"
  }
)

document.addEventListener("keydown", function(e) {
  if (dropdown.classList.contains("open") && e.key === "Escape") {
    dropdown.classList.remove("open")
    overlay.classList.remove("darken")
    howTo.style.pointerEvents = "auto"
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
      
      //create div for container and input for number input
      let cell = document.createElement("div");
      let input = document.createElement("input");
      
      input.type = "number";
      input.classList.add("no-spinner")
      cell.classList.add("cell");
      
      //add a dataset to create coordinates for each cell
      input.dataset.row = row;
      input.dataset.col = col;
      
      //create a black square when the pattern has a 0 ELSE geberate a random number to be put into that cell for the answer key
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
      
      //reference answer key to see if number is correct. if incorrect, apply .wrong class else remove it
      //run applyGrey function to grey out used numbers
      input.addEventListener("input", function(e) {
        applyGrey(myBank)
        
        let grid = e.target.closest(".cell")
        let userInput = e.target.value.trim();
        let row = Number(e.target.dataset.row)
        let col = Number(e.target.dataset.col)
        
        if (userInput === "") {
          grid.classList.remove("wrong")
          //console.log(grid.classList)
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
    //push built row elements into gridArray and digit values into answerKey
    gridArray.push(rowArray);
    answerKey.push(tempArray)
  }
  //build the number bank in HTML
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