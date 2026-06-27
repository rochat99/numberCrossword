const resultModal = document.getElementById("resultModal");

function checkCompletion() {
  for (let row = 0; row < 13; row++) {
    for (let col = 0; col < 13; col++) {
      
      let grid = gridArray[row][col]
      let input = grid.querySelector("input");
      let userInput = input.value.trim();
    
      if (input.disabled === true) continue;
      
      if (userInput === "") return;
      
      if (answerKey[row][col] !== Number(userInput)) {
        //error modal
        return
      }
    }
  }
  
  //completion modal
}

//check for completion on input 
section.addEventListener("input", function(){})