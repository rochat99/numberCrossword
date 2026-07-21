function checkCompletion() {

  let hasWrong = false;

  for (let row = 0; row < 13; row++) {
    for (let col = 0; col < 13; col++) {
      
      let grid = gridArray[row][col]
      let input = grid.querySelector("input");
      let userInput = input.value.trim();
    
      if (input.disabled === true) continue;
      
      if (userInput === "") return;
      
      if (answerKey[row][col] !== Number(userInput)) {
        hasWrong = true;
      }
    }
  }

  if (hasWrong) {
    if (!errorModalShown) {

      errorModalShown = true;
      //show error modal

    }
  } else {

    // show winning modal

  }
}

section.addEventListener("input", checkCompletion)