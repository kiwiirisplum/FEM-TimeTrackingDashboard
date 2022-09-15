let timeframe ="monthly";
const container = document.querySelector('.container');
let itemCards;

const menu = document.querySelectorAll('.menu-link');

menu.forEach(element => {
    element.addEventListener('click', menuOnclick);
});

let data = {};

fetch('../data.json')
.then(resp => resp.json())
.then(jsonData => {
    jsonData.forEach(element => {
        container.insertAdjacentHTML('beforeend', 
        createItemCard(element, timeframe));  
    });

    jsonData.forEach(element => {
        data[element.title] = element.timeframes;
    });

    itemCards = document.querySelectorAll('.item-card');
    // console.log(itemCards);
    
});



function menuOnclick(event) {
    // console.log('click', event.target.innerText.toLowerCase());
    menu.forEach(element => {
        element.classList.remove('menu-active');
    });
    event.target.classList.add('menu-active');
    timeframe = event.target.innerText.toLowerCase();

    updateCards(timeframe);
}

function updateCards(timeframe) {
    itemCards.forEach(card => {
        updateCard(card, timeframe);
    });
}

function updateCard(card, timeframe) {
    const title = card.querySelector('.title').innerText;
    const current = data[title][timeframe]['current'];
    const previous = data[title][timeframe]['previous'];

    const timeframeMsg = {
        'daily': 'Yesterday',
        'weekly': 'Last Week',
        'monthly': 'Last Month'
    };

    const hoursElement = card.querySelector('.hours');
    hoursElement.innerText = `${current}hrs`;
    const msgElement = card.querySelector('.description');
    msgElement.innerText = `${timeframeMsg[timeframe]} - ${previous}hrs`;
}

function createItemCard(element, timeframe) {
    let title = element['title'];
    let current = element['timeframes'][timeframe]['current'];
    let previous = element['timeframes'][timeframe]['previous'];

    const timeframeMsg = {
        'daily': 'Yesterday',
        'weekly': 'Last Week',
        'monthly': 'Last Month'
    };

    return `
    <div class="item-card ${title.toLowerCase().replace(/\s/g, '')}">
    <div class="property-card">
      <div class="row">
        <div class="title">${title}</div>
          <div class="points">
             <div class="point"></div>
             <div class="point"></div>
            <div class="point"></div>
           </div>
        </div>
  
          <div class="row-2">
            <div class="hours">${current}hrs</div>
            <div class="description">${timeframeMsg[timeframe]} - ${previous}hrs</div>
          </div>
        </div>
      </div>`
}