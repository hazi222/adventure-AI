// Get the necessary HTML elements
const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

// Set initial game state to an empty object
let state = {}

// Function to start the game by resetting the state and displaying the first text node
function startGame() {
  state = {}
  showTextNode(1)
}

// Function to display a text node
function showTextNode(textNodeIndex) {
  // Find the text node with the given index
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  if (!textNode) {
    console.error(`Text node with ID ${textNodeIndex} not found!`)
    return
  }

  // Display the text of the text node
  textElement.innerText = textNode.text

  // Remove any existing option buttons
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  // Add option buttons for each option in the text node
  textNode.options.forEach(option => {
    // Show the option only if its requiredState is null or evaluates to true
    if (showOption(option)) {
      // Create a button for the option
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')

      // Add an event listener for when the button is clicked
      button.addEventListener('click', () => selectOption(option))

      // Add the button to the optionButtonsElement
      optionButtonsElement.appendChild(button)

      // Set the background color of the document to the option's backgroundColor or "black" if not specified
      document.body.style.backgroundColor = option.backgroundColor || "black";
    }
  })

  // Save the game state and the current text node index in local storage
  localStorage.setItem('gameState', JSON.stringify(state));
  localStorage.setItem('currentTextNodeIndex', textNodeIndex);
}

// Function to determine whether to show an option based on its requiredState
function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

// Function to select an option and display the corresponding text node
function selectOption(option) {
  // If the option does not have a nextText property or its value is not a number, start the game
  const nextTextNodeId = option.nextText
  if (nextTextNodeId === undefined || isNaN(nextTextNodeId)) {
    return startGame()
  }

  // Update the game state with the option's setState property
  state = Object.assign(state, option.setState)

  // Display the next text node
  showTextNode(nextTextNodeId)

  // Remove the selection element and show the game container element (if they exist)
  const selectionElement = document.querySelector('.selection');
  if (selectionElement) {
    selectionElement.remove();
  }
  const gameContainerElement = document.querySelector('#game-container');
  if (gameContainerElement) {
    gameContainerElement.style.display = 'flex';
  }
}

// When the window loads, check for saved game state and display the corresponding text node
window.onload = () => {
  const savedState = JSON.parse(localStorage.getItem('gameState'));
  if (savedState) {
    state = savedState;
    const currentTextNodeIndex = localStorage.getItem('currentTextNodeIndex');
    if (currentTextNodeIndex !== undefined && !isNaN(currentTextNodeIndex)) {
      showTextNode(parseInt(currentTextNodeIndex));
    } else {
      startGame();
    }
  } else {
    startGame();
  }
};



// Text Nodes
const textNodes = [
  {
    id: 1,
    text: 'Welcome to bilmem ne, you must choose your character',
    options: [
      {
        text: 'Play as Daria Federova',
        setState: { weapon: true, IdCard: true, knife: true, phone: true, coin: true },
        nextText: -1,

      },
      {
        text: 'Play as Sergey Morozov',
        setState: { weapon: true, IdCard: true, knife: true, phone: true, coin: true },
        nextText: 2,
      }
    ]
  },


  {
    id: 2,
    text: 'You are Agent rus adam from National Intelligence Agency. For five years, you have been gathering highly classified intel about government\'s biological experiments in North Korea. One day, your report about a secret antigen was interrupted by anonymous hackers and your cover has been exposed. The law enforcements are on high alert and you\'ve asked for immediate evacuation. Response from the HQ was that, you need to get to the safehouse in Pyongyang in 48 hours. (You must choose your moves wisely. Beware that some decisions are time sensitive!)',
    options: [
      {
        text: 'Let\'s get started',
        setState: { weapon: true, IdCard: true, knife: true, phone: true, coin: true },
        nextText: 3,

      },
    ]
  },

  {
    id: 3,
    text: 'While destroying classified evidences indicating your presence, you casually looked at the window and noticed a black SUV you haven\'t seen before. You took your backpack and...',
    options: [
      {
        text: 'infiltrated the secret service tunnel behind your bookshelf',
        setState: { weapon: true, IdCard: true, knife: true, phone: true, coin: true },
        nextText: 4,
      },
      {
        text: 'burst into the apartment hall',
        setState: { weapon: true, IdCard: true, knife: true, phone: true, coin: true },
        nextText: 5,

      },

    ]
  },
  {
    id: 4,
    text: 'bookshelf',
    options: [
      {
        text: 'Let\'s get started',
        setState: { weapon: true, IdCard: true, knife: true, phone: true, coin: true },
        nextText: 6
      },
      {
        text: 'Let\'s get started',
        setState: { weapon: true, IdCard: true, knife: true, phone: true, coin: true },
        nextText: 6
      }
    ]
  },


  {
    id: 4,
    text: 'You checked every corner for potential threats in a few seconds. You are ready to escape the building but with the noises coming from lower floors, you realized that using the stairs is out of option. You...',
    options: [
      {
        text: 'reached fire escape',
        setState: { weapon: true, IdCard: true, knife: true, phone: true, coin: true },
        nextText: 6
      },
      {
        text: 'jumped through the apartment window',
        setState: { weapon: true, IdCard: true, knife: true, phone: true, coin: true },
        nextText: 6
      }
    ]
  },



]

const savedState = localStorage.getItem('state')
if (savedState) {
  state = JSON.parse(savedState)
}

startGame()