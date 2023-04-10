


const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')


let state = {}

function startGame() {
  state = {}
  showTextNode(1)
  
}


function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => selectOption(option))
      optionButtonsElement.appendChild(button)
      document.body.style.backgroundColor = option.backgroundColor || "black";
    }
  })
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startGame()
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
  document.querySelector('.selection').remove();
  document.querySelector('#game-container').style.display = 'block';
}

const textNodes = [
  {
    id: 1,
    text: 'Welcome to bilmem ne, you must choose your character', 
    options: [
      {
        text: 'Play as Daria Federova',
        setState: { weapon: true, IdCard: true, knife: true, phone:true, coin:true},
        nextText: -1,
        
      },
      {
        text: 'Play as Sergey Morozov',
        setState: { weapon: true, IdCard: true, knife: true, phone:true, coin:true},
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
        setState: { weapon: true, IdCard: true, knife: true, phone:true, coin:true},
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
		setState: { weapon: true, IdCard: true, knife: true, phone:true, coin:true},
    nextText: 4,
	  },
    {
      text: 'burst into the apartment hall',
      setState: { weapon: true, IdCard: true, knife: true, phone:true, coin:true},
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
        setState: { weapon: true, IdCard: true, knife: true, phone:true, coin:true},
        nextText:  6
      },
      {
        text: 'Let\'s get started',
        setState: { weapon: true, IdCard: true, knife: true, phone:true, coin:true},
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
        setState: { weapon: true, IdCard: true, knife: true, phone:true, coin:true},
        nextText: 6
      },
      {
        text: 'jumped through the apartment window',
        setState: { weapon: true, IdCard: true, knife: true, phone:true, coin:true},
        nextText: 6
      }
    ]
  },
  

  
]









startGame()
