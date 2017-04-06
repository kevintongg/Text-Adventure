const names = [
  'Noctis',
  'Gladiolus',
  'Ignis',
  'Prompto',
];
const monsterList = [
  'Kel\'thuzad', // 0
  "Kael'thas Sunstrider", // 1
  'Arthas Menethil', // 2
  'Deathwing', // 3
  'Garrosh Hellscream', // 4
  'Archimonde', // 5
  'Gul\'dan', // 6
];
let prizes = [
  'Black Ice [Polearm]', // 0
  'Excalibur [Sword]', // 1
  'Sword of a Thousand Truths [Sword]', // 2
  'Lambent Light [Rapier]', // 3
  'Elucidator [Sword]', // 4
  'Dark Repulser [Sword]', // 5
  'Titanium Exoskeleton [Armor]', // 6
  'Purple Floppyslapper [Bludgeon]', // 7
];
let explorationMessages = [
  'You see something bright. Ooh! Shiny!', // 0
  'You see a treasure chest. To your surprise, this is the item you have been wanting all your life!', // 1
  'You find an item that could really save your life when you really need it.', // 2
  'You find an interesting item. Hrm. Quite.', // 3
  'You find an item you always wished was real from your video games!', // 4
  'You find an exotic item. Could be one of a kind.', // 5
];
let encounterMessages = [
  'You sense a powerful enemy.', // 1
  'You can feel an extraordinary aura.', // 2
  'You have a feeling that this will be one of the hardest fights of your life.', // 3
];
let potionMessages = [
  'You feel reinvigorated.', // 1
  'You feel refreshed.', // 2
  'You feel like you could do things you could not do before!', // 3
];

const log = [];
const playerHealth = 50;
const x = 6;
const y = 4;
let lastX;
let lastY;
let prize1 = false;
let prize2 = false;
let potion1 = false;
let potion2 = false;


function Adventurer(name, health, prizeCounter, loot, xCoordinate, yCoordinate) {
  this.name = name;
  this.health = health;
  this.prizeCounter = prizeCounter;
  this.loot = loot;
  this.xCoordinate = xCoordinate;
  this.yCoordinate = yCoordinate;
}

function Monster(name, health, prize, alive) {
  this.name = name;
  this.health = health;
  this.prize = prize;
  this.alive = alive;
}

function randomHealth(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function potionCalculator() {
  return Math.floor(Math.random() * (15 - 5) + 5);
}

function remove(array, element) {
  return array.filter(e => e !== element);
}

function makeTableHTML(myArray) {
  let result = '<table class="table table-bordered text-center map" border=1 style="margin-top: 10px;">';
  for (let i = 0; i < myArray.length; i++) {
    result += '<tr>';
    for (let j = 0; j < myArray[i].length; j++) {
      result += '<td>' + myArray[i][j] + '</td>';
    }
    result += '</tr>';
  }
  result += '</table>';

  return result;
}

const hero = new Adventurer(randomElement(names), playerHealth, 0, [], x, y);

const monsters = [
  new Monster(randomElement(monsterList), randomHealth(10, 15), randomElement(prizes), true),
  new Monster(randomElement(monsterList), randomHealth(10, 15), randomElement(prizes), true),
  new Monster(randomElement(monsterList), randomHealth(10, 15), randomElement(prizes), true),
];

// 4,6 monster
// 5,3 monster
// 1,2 monster
// 6,1 prize
// 1,6 prize
// 4,3 potion
// 3,5 potion

const map = [
  // 0,0 0,1 0,2 0,3 0,4 0,5 0,6 0,7
  ['—', '—', '—', '—', '—', '—', '—', '—'],
  // 1,0 1,1 1,2 1,3 1,4 1,5 1,6 1,7
  ['—', '—', '—', '—', '—', '—', '—', '—'],
  // 2,0 2,1 2,2 2,3 2,4 2,5 2,6 2,7
  ['—', '—', '—', '—', '—', '—', '—', '—'],
  // 3,0 3,1 3,2 3,3 3,4 3,5 3,6 3,7
  ['—', '—', '—', '—', '—', '—', '—', '—'],
  // 4,0 4,1 4,2 4,3 4,4 4,5 4,6 4,7
  ['—', '—', '—', '—', '—', '—', '—', '—'],
  // 5,0 5,1 5,2 5,3 5,4 5,5 5,6 5,7
  ['—', '—', '—', '—', '—', '—', '—', '—'],
  // 6,0 6,1 6,2 6,3 6,4 6,5 6,6 6,7
  ['—', '—', '—', '—', `<strong style='font-size: 12pt;'>${hero.name}</strong>`, '—', '—', '—'],
  // 7,0 7,1 7,2 7,3 7,4 7,5 7,6 7,7
  ['—', '—', '—', '—', '—', '—', '—', '—'],
];

function checkWin() {
  if (!monsters[0].alive && !monsters[1].alive && !monsters[2].alive) {
    document.write('<style>#victory { position:fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); } #refresh { position: absolute; width: 300px; height: 300px; bottom: 0; right: 25%; left: 50%; margin-left: -150px</style><link rel="stylesheet" href="bootstrap.css"><div class="container"><h2 id="victory" class="text-center">You\'ve won!<br/>Please refresh the page to play again!</h2><div id="refresh" class="text-center"><button id="refreshButton" class="btn btn-primary text-center">Refresh</button></div></div>');
    $('#refreshButton').click(() => {
      location.reload();
    });
  }
}

function events() {
  if ((hero.xCoordinate === 4 && hero.yCoordinate === 6) && monsters[0].alive === true) {
    const message = randomElement(encounterMessages);
    $('#fight-info').html(message);
    $('#ok1').show();
    $('#ok1').click(() => {
      encounterMessages = remove(encounterMessages, message);
      $('#fight-info').html(`${monsters[0].name} has appeared!`);
      $('#ok1').hide();
      $('#ok2').show();
      $('#ok2').click(() => {
        $('#fight-info').html('Would you like to fight?');
        $('#ok2').hide();
        $('#yes').show();
        $('#no').show();
        $('#yes').click(() => {
          const treasure = randomElement(prizes);
          monsters[0].alive = false;
          log.push(`You have defeated ${monsters[0].name} and have received ${treasure}!`);
          $('#log-info').html(log.join('<br/>'));
          for (let i = 0; i <= hero.loot.length; i++) {
            if (hero.loot[i] === undefined) {
              hero.loot.push(treasure);
              hero.prizeCounter++;
              prizes = remove(prizes, treasure);
              break;
            }
          }
          $('#ok1').hide();
          $('#ok2').hide();
          $('#yes').hide();
          $('#no').hide();
        });
        $('#no').click(() => {
          log.push('Returning to the previous spot');
          $('#log-info').html(log.join('<br/>'));
          map[hero.xCoordinate][hero.yCoordinate] = '<i class="monster">Monster</i>';
          hero.xCoordinate = lastX;
          hero.yCoordinate = lastY;
          map[hero.xCoordinate][hero.yCoordinate] = `<strong style='font-size: 12pt;'>${hero.name}</strong>`;
          $('#map').html(makeTableHTML(map));
          $('#ok1').hide();
          $('#ok2').hide();
          $('#yes').hide();
          $('#no').hide();
        });
      });
    });
    checkWin();
  }
  if ((hero.xCoordinate === 5 && hero.yCoordinate === 3) && monsters[1].alive === true) {
    const message = randomElement(encounterMessages);
    $('#fight-info').html(message);
    $('#ok1').show();
    $('#ok1').click(() => {
      encounterMessages = remove(encounterMessages, message);
      $('#fight-info').html(`${monsters[1].name} has appeared!`);
      $('#ok1').hide();
      $('#ok2').show();
      $('#ok2').click(() => {
        $('#fight-info').html('Would you like to fight?');
        $('#ok2').hide();
        $('#yes').show();
        $('#no').show();
        $('#yes').click(() => {
          const treasure = randomElement(prizes);
          monsters[1].alive = false;
          log.push(`You have defeated ${monsters[1].name} and have received ${treasure}!`);
          $('#log-info').html(log.join('<br/>'));
          for (let i = 0; i <= hero.loot.length; i++) {
            if (hero.loot[i] === undefined) {
              hero.loot.push(treasure);
              hero.prizeCounter++;
              prizes = remove(prizes, treasure);
              break;
            }
          }
          $('#ok1').hide();
          $('#ok2').hide();
          $('#yes').hide();
          $('#no').hide();
        });
        $('#no').click(() => {
          log.push('Returning to the previous spot');
          $('#log-info').html(log.join('<br/>'));
          map[hero.xCoordinate][hero.yCoordinate] = '<i class="monster">Monster</i>';
          hero.xCoordinate = lastX;
          hero.yCoordinate = lastY;
          map[hero.xCoordinate][hero.yCoordinate] = `<strong style='font-size: 12pt;'>${hero.name}</strong>`;
          $('#map').html(makeTableHTML(map));
          $('#ok1').hide();
          $('#ok2').hide();
          $('#yes').hide();
          $('#no').hide();
        });
      });
    });
    checkWin();
  }
  if ((hero.xCoordinate === 1 && hero.yCoordinate === 2) && monsters[2].alive === true) {
    const message = randomElement(encounterMessages);
    $('#fight-info').html(message);
    $('#ok1').show();
    $('#ok1').click(() => {
      encounterMessages = remove(encounterMessages, message);
      $('#fight-info').html(`${monsters[2].name} has appeared!`);
      $('#ok1').hide();
      $('#ok2').show();
      $('#ok2').click(() => {
        $('#fight-info').html('Would you like to fight?');
        $('#ok2').hide();
        $('#yes').show();
        $('#no').show();
        $('#yes').click(() => {
          const treasure = randomElement(prizes);
          monsters[2].alive = false;
          log.push(`You have defeated ${monsters[2].name} and have received ${treasure}!`);
          $('#log-info').html(log.join('<br/>'));
          for (let i = 0; i <= hero.loot.length; i++) {
            if (hero.loot[i] === undefined) {
              hero.loot.push(treasure);
              hero.prizeCounter++;
              prizes = remove(prizes, treasure);
              break;
            }
          }
          $('#ok1').hide();
          $('#ok2').hide();
          $('#yes').hide();
          $('#no').hide();
        });
        $('#no').click(() => {
          log.push('Returning to the previous spot');
          $('#log-info').html(log.join('<br/>'));
          map[hero.xCoordinate][hero.yCoordinate] = '<i class="monster">Monster</i>';
          hero.xCoordinate = lastX;
          hero.yCoordinate = lastY;
          map[hero.xCoordinate][hero.yCoordinate] = `<strong style='font-size: 12pt;'>${hero.name}</strong>`;
          $('#map').html(makeTableHTML(map));
          $('#ok1').hide();
          $('#ok2').hide();
          $('#yes').hide();
          $('#no').hide();
        });
      });
    });
    checkWin();
  }
  if ((hero.xCoordinate === 6 && hero.yCoordinate === 1) && prize1 === false) {
    const treasure = randomElement(prizes);
    const message = randomElement(explorationMessages);
    const event = `Obtained: ${treasure} at [${hero.xCoordinate}, ${hero.yCoordinate}]`;
    log.push(`${message}<br/>${event}`);
    $('#log-info').html(log.join('<br/>'));
    for (let i = 0; i <= hero.loot.length; i++) {
      if (hero.loot[i] === undefined) {
        hero.loot.push(treasure);
        hero.prizeCounter++;
        prizes = remove(prizes, treasure);
        prize1 = true;
        break;
      }
      explorationMessages = remove(explorationMessages, message);
      $('#prizes').html(hero.loot.join('<br/>'));
      if ($('#yes').is(':visible')) {
        $('#yes').show();
      }
      $('#prizeCounter').html(`Your current number of prizes: ${hero.prizeCounter}`);
    }
  }
  if ((hero.xCoordinate === 1 && hero.yCoordinate === 6) && prize2 === false) {
    const treasure = randomElement(prizes);
    const message = randomElement(explorationMessages);
    const event = `Obtained: ${treasure} at [${hero.xCoordinate}, ${hero.yCoordinate}]`;
    log.push(`${message}<br/>${event}`);
    $('#log-info').html(log.join('<br/>'));
    for (let i = 0; i <= hero.loot.length; i++) {
      if (hero.loot[i] === undefined) {
        hero.loot.push(treasure);
        hero.prizeCounter++;
        prizes = remove(prizes, treasure);
        prize2 = true;
        break;
      }
      explorationMessages = remove(explorationMessages, message);
      $('#prizes').html(hero.loot.join('<br/>'));
      if ($('#yes').is(':visible')) {
        $('#yes').show();
      }
      $('#prizeCounter').html(`Your current number of prizes: ${hero.prizeCounter}`);
    }
  }
  if ((hero.xCoordinate === 4 && hero.yCoordinate === 3) && potion1 === false) {
    const message = randomElement(potionMessages);
    const event = `Obtained a potion at [${hero.xCoordinate}, ${hero.yCoordinate}]`;
    hero.health += potionCalculator();
    log.push(`${message}<br/>${event}`);
    $('#log-info').html(log.join('<br/>'));
    potionMessages = remove(potionMessages, message);
    potion1 = true;
  }
  if ((hero.xCoordinate === 3 && hero.yCoordinate === 5) && potion2 === false) {
    const message = randomElement(potionMessages);
    const event = `Obtained a potion at [${hero.xCoordinate}, ${hero.yCoordinate}]`;
    hero.health += potionCalculator();
    log.push(`${message}<br/>${event}`);
    $('#log-info').html(log.join('<br/>'));
    potionMessages = remove(potionMessages, message);
    potion2 = true;
  }
  if (!monsters[0].alive && !monsters[1].alive && !monsters[2].alive) {
    document.write('<style>#victory { position:fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); } #refresh { position: absolute; width: 300px; height: 300px; bottom: 0; right: 25%; left: 50%; margin-left: -150px</style><link rel="stylesheet" href="bootstrap.css"><div class="container"><h2 id="victory" class="text-center">You\'ve won!<br/>Please refresh the page to play again!</h2><div id="refresh" class="text-center"><button id="refreshButton" class="btn btn-primary text-center">Refresh</button></div></div>');
    $('#refreshButton').click(() => {
      location.reload();
    });
  }
}

function mapInfo() {
  if (lastX === 4 && lastY === 6) {
    map[4][6] = '<i class="monster">Monster</i>';
  }
  if (lastX === 5 && lastY === 3) {
    map[5][3] = '<i class="monster">Monster</i>';
  }
  if (lastX === 1 && lastY === 2) {
    map[1][2] = '<i class="monster">Monster</i>';
  }
  if (lastX === 6 && lastY === 1) {
    map[6][1] = '<i class="prize">Prize</i>';
  }
  if (lastX === 1 && lastY === 6) {
    map[1][6] = '<i class="prize">Prize</i>';
  }
  if (lastX === 4 && lastY === 3) {
    map[4][3] = '<i class="potion">Potion</i>';
  }
  if (lastX === 3 && lastY === 5) {
    map[3][5] = '<i class="potion">Potion</i>';
  }
  if (!(lastX === 4 && lastY === 6) && !(lastX === 5 && lastY === 3) &&
    !(lastX === 1 && lastY === 2) && !(lastX === 6 && lastY === 1) &&
    !(lastX === 1 && lastY === 6) && !(lastX === 4 && lastY === 3) &&
    !(lastX === 3 && lastY === 5)) {
    map[lastX][lastY] = '<i class="explored">Explored</i>';
  }
}

$(document).ready(() => {
  $('#ok1').hide();
  $('#ok2').hide();
  $('#yes').hide();
  $('#no').hide();
  $('#next1').hide();
  $('#next2').hide();
  $('#next3').hide();
  $('#title').html(`The Adventures of ${hero.name}`);
  $('#name').html(`The Adventures of ${hero.name}`);

  log.push('You are an adventurer who before entering this dungeon, was given an invincibility potion by a local resident before entering to tackle this dungeon.');
  $('#log-info').html(log.join('<br/>'));

  function move() {
    $('#north').click(() => {
      $('#health').html(`Your current health: ${hero.health}`);
      $('#prizeCounter').html(`Your current number of prizes: ${hero.prizeCounter}`);
      $('#prizes').html(hero.loot.join('<br/>'));
      lastX = hero.xCoordinate;
      lastY = hero.yCoordinate;
      hero.xCoordinate--;
      if (hero.xCoordinate === 0) {
        log.push(`${hero.name} has hit a wall at [${hero.xCoordinate}, ${hero.yCoordinate}], returning to previous location`);
        $('#log-info').html(log.join('<br/>'));
        map[hero.xCoordinate][hero.yCoordinate] = '<strong>WALL</strong>';
        hero.xCoordinate++;
      }
      events();
      mapInfo();
      map[lastX][lastY] = '<i>Explored</i>';
      map[hero.xCoordinate][hero.yCoordinate] = `<strong style='font-size: 12pt;'>${hero.name}</strong>`;
      console.log(`x: ${hero.xCoordinate}, y: ${hero.yCoordinate}`);
      $('#location').html(`Your current position: [${hero.xCoordinate}, ${hero.yCoordinate}]`);
      $('#map').html(makeTableHTML(map));
    });
    $('#west').click(() => {
      $('#health').html(`Your current health: ${hero.health}`);
      $('#prizeCounter').html(`Your current number of prizes: ${hero.prizeCounter}`);
      $('#prizes').html(hero.loot.join('<br/>'));
      lastX = hero.xCoordinate;
      lastY = hero.yCoordinate;
      hero.yCoordinate--;
      mapInfo();
      if (hero.yCoordinate === 0) {
        log.push(`${hero.name} has hit a wall at [${hero.xCoordinate}, ${hero.yCoordinate}], returning to previous location`);
        $('#log-info').html(log.join('<br/>'));
        map[hero.xCoordinate][hero.yCoordinate] = '<strong>WALL</strong>';
        hero.yCoordinate++;
      }
      mapInfo();
      events();
      map[hero.xCoordinate][hero.yCoordinate] = `<strong style='font-size: 12pt;'>${hero.name}</strong>`;
      console.log(`x: ${hero.xCoordinate}, y: ${hero.yCoordinate}`);
      $('#location').html(`Your current position: [${hero.xCoordinate}, ${hero.yCoordinate}]`);
      $('#prizeCounter').html(`Your current number of prizes: ${hero.prizeCounter}`);
      $('#map').html(makeTableHTML(map));
    });
    $('#east').click(() => {
      $('#health').html(`Your current health: ${hero.health}`);
      $('#prizeCounter').html(`Your current number of prizes: ${hero.prizeCounter}`);
      $('#prizes').html(hero.loot.join('<br/>'));
      lastX = hero.xCoordinate;
      lastY = hero.yCoordinate;
      hero.yCoordinate++;
      mapInfo();
      if (hero.yCoordinate === 7) {
        log.push(`${hero.name} has hit a wall at [${hero.xCoordinate}, ${hero.yCoordinate}], returning to previous location`);
        $('#log-info').html(log.join('<br/>'));
        map[hero.xCoordinate][hero.yCoordinate] = '<strong>WALL</strong>';
        hero.yCoordinate--;
      }
      events();
      mapInfo();
      map[hero.xCoordinate][hero.yCoordinate] = `<strong style='font-size: 12pt;'>${hero.name}</strong>`;
      console.log(`x: ${hero.xCoordinate}, y: ${hero.yCoordinate}`);
      $('#location').html(`Your current position: [${hero.xCoordinate}, ${hero.yCoordinate}]`);
      $('#prizeCounter').html(`Your current number of prizes: ${hero.prizeCounter}`);
      $('#map').html(makeTableHTML(map));
          });
    $('#south').click(() => {
      $('#health').html(`Your current health: ${hero.health}`);
      $('#prizeCounter').html(`Your current number of prizes: ${hero.prizeCounter}`);
      $('#prizes').html(hero.loot.join('<br/>'));
      lastX = hero.xCoordinate;
      lastY = hero.yCoordinate;
      hero.xCoordinate++;
      if (hero.xCoordinate === 7) {
        log.push(`${hero.name} has hit a wall at [${hero.xCoordinate}, ${hero.yCoordinate}], returning to previous location`);
        $('#log-info').html(log.join('<br/>'));
        map[hero.xCoordinate][hero.yCoordinate] = '<strong>WALL</strong>';
        hero.xCoordinate--;
      }
      events();
      mapInfo();
      map[hero.xCoordinate][hero.yCoordinate] = `<strong style='font-size: 12pt;'>${hero.name}</strong>`;
      console.log(`x: ${hero.xCoordinate}, y: ${hero.yCoordinate}`);
      $('#location').html(`Your current position: [${hero.xCoordinate}, ${hero.yCoordinate}]`);
      $('#map').html(makeTableHTML(map));
    });
    $('html').keydown((e) => {
      switch (e.which) {
        case 38: // up
          $('#health').html(`Your current health: ${hero.health}`);
          $('#prizeCounter').html(`Your current number of prizes: ${hero.prizeCounter}`);
          $('#prizes').html(hero.loot.join('<br/>'));
          lastX = hero.xCoordinate;
          lastY = hero.yCoordinate;
          hero.xCoordinate--;
          if (hero.xCoordinate === 0) {
            log.push(`${hero.name} has hit a wall at [${hero.xCoordinate}, ${hero.yCoordinate}], returning to previous location`);
            $('#log-info').html(log.join('<br/>'));
            map[hero.xCoordinate][hero.yCoordinate] = '<strong>WALL</strong>';
            hero.xCoordinate++;
          }
          events();
          mapInfo();
          map[hero.xCoordinate][hero.yCoordinate] = `<strong style='font-size: 12pt;'>${hero.name}</strong>`;
          console.log(`x: ${hero.xCoordinate}, y: ${hero.yCoordinate}`);
          $('#location').html(`Your current position: [${hero.xCoordinate}, ${hero.yCoordinate}]`);
          $('#map').html(makeTableHTML(map));
          break;
        case 39: // right
          $('#health').html(`Your current health: ${hero.health}`);
          $('#prizeCounter').html(`Your current number of prizes: ${hero.prizeCounter}`);
          $('#prizes').html(hero.loot.join('<br/>'));
          lastX = hero.xCoordinate;
          lastY = hero.yCoordinate;
          hero.yCoordinate++;
          mapInfo();
          if (hero.yCoordinate === 7) {
            log.push(`${hero.name} has hit a wall at [${hero.xCoordinate}, ${hero.yCoordinate}], returning to previous location`);
            $('#log-info').html(log.join('<br/>'));
            map[hero.xCoordinate][hero.yCoordinate] = '<strong>WALL</strong>';
            hero.yCoordinate--;
          }
          events();
          mapInfo();
          map[hero.xCoordinate][hero.yCoordinate] = `<strong style='font-size: 12pt;'>${hero.name}</strong>`;
          console.log(`x: ${hero.xCoordinate}, y: ${hero.yCoordinate}`);
          $('#location').html(`Your current position: [${hero.xCoordinate}, ${hero.yCoordinate}]`);
          $('#prizeCounter').html(`Your current number of prizes: ${hero.prizeCounter}`);
          $('#map').html(makeTableHTML(map));
          break;
        case 37: // left
          $('#health').html(`Your current health: ${hero.health}`);
          $('#prizeCounter').html(`Your current number of prizes: ${hero.prizeCounter}`);
          $('#prizes').html(hero.loot.join('<br/>'));
          lastX = hero.xCoordinate;
          lastY = hero.yCoordinate;
          hero.yCoordinate--;
          if (hero.yCoordinate === 0) {
            log.push(`${hero.name} has hit a wall at [${hero.xCoordinate}, ${hero.yCoordinate}], returning to previous location`);
            $('#log-info').html(log.join('<br/>'));
            map[hero.xCoordinate][hero.yCoordinate] = '<strong>WALL</strong>';
            hero.yCoordinate++;
          }
          mapInfo();
          events();
          map[hero.xCoordinate][hero.yCoordinate] = `<strong style='font-size: 12pt;'>${hero.name}</strong>`;
          console.log(`x: ${hero.xCoordinate}, y: ${hero.yCoordinate}`);
          $('#location').html(`Your current position: [${hero.xCoordinate}, ${hero.yCoordinate}]`);
          $('#prizeCounter').html(`Your current number of prizes: ${hero.prizeCounter}`);
          $('#map').html(makeTableHTML(map));
          break;
        case 40: // down
          $('#health').html(`Your current health: ${hero.health}`);
          $('#prizeCounter').html(`Your current number of prizes: ${hero.prizeCounter}`);
          $('#prizes').html(hero.loot.join('<br/>'));
          lastX = hero.xCoordinate;
          lastY = hero.yCoordinate;
          hero.xCoordinate++;
          if (hero.xCoordinate === 7) {
            log.push(`${hero.name} has hit a wall at [${hero.xCoordinate}, ${hero.yCoordinate}], returning to previous location`);
            $('#log-info').html(log.join('<br/>'));
            map[hero.xCoordinate][hero.yCoordinate] = '<strong>WALL</strong>';
            hero.xCoordinate--;
          }
          events();
          mapInfo();
          map[hero.xCoordinate][hero.yCoordinate] = `<strong style='font-size: 12pt;'>${hero.name}</strong>`;
          console.log(`x: ${hero.xCoordinate}, y: ${hero.yCoordinate}`);
          $('#location').html(`Your current position: [${hero.xCoordinate}, ${hero.yCoordinate}]`);
          $('#map').html(makeTableHTML(map));
          break;
      }
    });
  }

  function info() {
    $('#health').html(`Your current health: ${hero.health}`);
    $('#prizeCounter').html('Your current number of prizes: 0');
    $('#location').html(`Your current position: [${hero.xCoordinate}, ${hero.yCoordinate}]`);
  }


  function game() {
    $('#map').html(makeTableHTML(map));
    info();
    move();
  }

  game();
});
