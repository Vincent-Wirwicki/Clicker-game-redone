const factoryBtn = document.querySelector(".factory__btn");
const factoryUpgradeBtn = document.querySelector(".factory__upgrade__btn");
const greenTicketBtn = document.querySelector(".green__ticket__btn");
const greenTicketUpgradeBtn = document.querySelector(
  ".greenTicket__upgrade__btn"
);
const robotBtn = document.querySelector(".robot__btn");
const robotUpgradeBtn = document.querySelector(".robot__upgrade__btn");
const treeBtn = document.querySelector(".tree__btn");
const treeUpgradeBtn = document.querySelector(".tree__upgrade__btn");
const displayIncome = document.querySelector(".ressources__income");
const displayPollution = document.querySelector(".ressources__pollution");

let intervalRobot,
  intervalTree,
  income = 0,
  pollution = 0,
  tick = 1000;

class PerClick {
  constructor(cost, production, pollution) {
    this.cost = cost;
    this.pollution = pollution;
    this.production = production;
  }
}

class Upgrade {
  constructor(DOMel, cost, nextUpgrade, pollution, production, isActive) {
    this.DOMel = DOMel;
    this.cost = cost;
    this.nextUpgrade = nextUpgrade;
    this.pollution = pollution;
    this.production = production;
    this.isActive = isActive;
  }
}

const cssAddRemoveClass = (el, add, remove) => {
  el.classList.add(add);
  el.classList.remove(remove);
};

const upgrades = {
  factory: new Upgrade(factoryUpgradeBtn, 10, 2, 10, 10, false),
  greenTicket: new Upgrade(greenTicketUpgradeBtn, 5, 4, 3, 0, false),
  robot: new Upgrade(robotBtn, 5, 10, 20, 10, false),
  tree: new Upgrade(treeBtn, 300, 10, 10, 10, false),
};

const factory = {
  perClick: new PerClick(0, 2, 1),
  onClick: () => {
    income += factory.perClick.production;
    pollution += factory.perClick.pollution;
  },
  onUpgrade: () => {
    if (income >= upgrades.factory.cost) {
      income -= factory.perClick.cost;
      factory.perClick.production += upgrades.factory.production;
      upgrades.factory.cost *= upgrades.factory.nextUpgrade;
    }
  },
};

const greenTicket = {
  perClick: new PerClick(10, 0, 2),
  animate: () => {},
  isEnough: () => {
    income >= greenTicket.perClick.cost
      ? cssAddRemoveClass(greenTicketBtn, "enough", "not__enough")
      : cssAddRemoveClass(greenTicketBtn, "not__enough", "enough");
  },
  onClick: () => {
    if (income >= greenTicket.perClick.cost) {
      income -= greenTicket.perClick.cost;
      pollution -= greenTicket.perClick.pollution;
    }
  },
  onUpgrade: () => {
    if (income >= upgrades.greenTicket.cost) {
      income -= upgrades.greenTicket.cost;
      greenTicket.perClick.pollution += upgrades.greenTicket.pollution;
      greenTicket.perClick.cost += upgrades.greenTicket.cost;
      upgrades.greenTicket.cost += upgrades.greenTicket.nextUpgrade;
    }
  },
};

const robot = {
  prod: () => {
    income += upgrades.robot.production;
    pollution += upgrades.robot.pollution;
  },
  onClick: () => {
    if (income >= upgrades.robot.cost && !upgrades.robot.isActive) {
      income -= upgrades.robot.cost;
      setInterval(robot.calcProd, tick);
      upgrades.robot.isActive = true;
    }
    if (income >= upgrades.robot.cost && upgrades.robot.isActive)
      robot.onUpgrade();
  },
  onUpgrade: () => {},
};

const tree = {
  prod: () => {
    income += upgrades.tree.production;
    pollution += upgrades.tree.pollution;
  },
  onClick: () => {
    if (income >= upgrades.tree.cost && !upgrades.robot.isActive) {
      income -= upgrades.tree.cost;
      setInterval(tree.calcProd, tick);
    }
    if (income >= upgrades.robot.cost && upgrades.robot.isActive)
      tree.onUpgrade();
  },
  onUpgrade: () => {},
};

const addEvents = () => {
  factoryBtn.addEventListener("click", factory.onClick);
  factoryUpgradeBtn.addEventListener("click", factory.onUpgrade);
  greenTicketBtn.addEventListener("click", greenTicket.onClick);
  greenTicketUpgradeBtn.addEventListener("click", greenTicket.onUpgrade);
  robotBtn.addEventListener("click", robot.onClick);
  treeBtn.addEventListener("click", tree.onClick);
};

const gameOver = () => {
  if (income > treshold.win) {
    console.log("win");
  }
  if (pollution > treshold.lost) {
    console.log("lost");
  }
};

const treshold = {
  win: 10000,
  lost: 10000,
  check: () => {
    if (income < 0) income = 0;
    if (pollution < 0) pollution = 0;
  },
};

const checkUpgrades = () => {
  for (let upgrade in upgrades) {
    const { cost, DOMel, isActive } = upgrades[upgrade];
    income >= cost
      ? cssAddRemoveClass(DOMel, "enough", "not__enough")
      : cssAddRemoveClass(DOMel, "not__enough", "enough");
    isActive && DOMel.classList.remove("not__enough");
  }
};

const render = () => {
  displayIncome.innerText = income;
  displayPollution.innerText = pollution;
  checkUpgrades();
  gameOver();
  greenTicket.isEnough();
  treshold.check();
  requestAnimationFrame(render);
};

const game = () => {
  addEvents();
  render();
};

game();

// const cheatForDev = () => {
//   let clicked = 0;
//   console.log(
//     "I see you checking the console....Please don't change any var...The game is perfectly fair ^^' or just click for a while "
//   );
//   window.addEventListener("click", () => clicked++);
//   setTimeout(() => {
//     console.log("income = treshold.win +1 to win");
//     console.log("krkesq = treshold.win +1 to win");
//   }, 1000000 - clicked);
// };
// cheatForDev();
