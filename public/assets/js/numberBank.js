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
  
  //regenerate numbers if there are duplicate numbers 
  let hasDuplicates = strings.length !== new Set(strings).size
  
  if (hasDuplicates) {
    generatePuzzle()
    return
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

//when number bank tab is clicked or swiped, bank slides up/down 
//define initial position of touch

let startY
let isOpen = false

bankTab.addEventListener("touchstart", function(e) {
  startY = e.touches[0].clientY
})

bankTab.addEventListener("touchend", function(e) {
  
  let touchToOpenCheck = e.changedTouches[0].clientY < startY - 20 || e.changedTouches[0].clientY === startY
  let touchToCloseCheck = e.changedTouches[0].clientY > startY + 20 || e.changedTouches[0].clientY === startY
  
  if (touchToOpenCheck && isOpen === false) {
    
    bankContainer.style.transform = "translate(-50%, -3%)"
    isOpen = true
    
  } else if (touchToCloseCheck && isOpen === true) {
    
    bankContainer.style.transform = "translate(-50%, 100%)"
    isOpen = false
  }
})