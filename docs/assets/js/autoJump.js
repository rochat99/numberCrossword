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