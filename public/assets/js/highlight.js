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


//highlight on focus
section.addEventListener("focusin", e => {
  if (moveDirection === "horizontal") {
    highlightLR(e)
  } else if (moveDirection === "vertical") {
    highlightUD(e)
  }
})