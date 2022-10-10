const displayIncome = document.querySelector(".ressources__income");
const displayPollution = document.querySelector(".ressources__pollution");
const factoryBtn = document.querySelector(".factory__btn");
const factoryUpgradeBtn = document.querySelector(".factory__upgrade__btn");
const factoryUpgradeInfo = [
  ...document.querySelectorAll(".factory__upgrade__info"),
];
const greenTicketBtn = document.querySelector(".green__ticket__btn");
const greenTicketUpgradeBtn = document.querySelector(
  ".greenTicket__upgrade__btn"
);
const greenTicketUpgradeInfo = [
  ...document.querySelectorAll(".greenTicket__upgrade__info"),
];
const robotBtn = document.querySelector(".robot__btn");
const robotUpgradeBtn = document.querySelector(".robot__upgrade__btn");
const robotUpgradeInfo = [
  ...document.querySelectorAll(".robot__upgrade__info"),
];
const treeBtn = document.querySelector(".tree__btn");
const treeUpgradeBtn = document.querySelector(".tree__upgrade__btn");
const treeUpgradeInfo = [...document.querySelectorAll(".tree__upgrade__info")];

let robotInterval,
  treeinterval,
  income = 0,
  pollution = 0,
  robotTick = 1000,
  treeTick = 1000;

class PerClick {
  constructor(cost, production, pollution) {
    this.cost = cost;
    this.pollution = pollution;
    this.production = production;
  }
}

class Upgrade {
  constructor(
    DOMBtn,
    DOMDisplay,
    cost,
    nextUpgrade,
    pollution,
    production,
    isActive
  ) {
    this.DOMBtn = DOMBtn;
    this.DOMDisplay = DOMDisplay;
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
  factory: new Upgrade(
    factoryUpgradeBtn,
    factoryUpgradeInfo,
    10,
    2,
    10,
    10,
    false
  ),
  greenTicket: new Upgrade(
    greenTicketUpgradeBtn,
    greenTicketUpgradeInfo,
    5,
    4,
    3,
    1,
    false
  ),
  robot: new Upgrade(robotBtn, robotUpgradeInfo, 5, 10, 20, 10, false),
  tree: new Upgrade(treeBtn, treeUpgradeInfo, 30, 15, 40, 20, false),
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
      greenTicket.displayUpgradeInfo();
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
  display: () => {},
  prod: () => {
    income += upgrades.robot.production;
    pollution += upgrades.robot.pollution;
  },
  onClick: () => {
    if (income >= upgrades.robot.cost && !upgrades.robot.isActive) {
      income -= upgrades.robot.cost;
      setInterval(robot.prod, tick);
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
      setInterval(tree.prod, tick);
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
    const { cost, DOMBtn, DOMDisplay, production, pollution, isActive } =
      upgrades[upgrade];
    DOMDisplay[0].innerText = cost;
    DOMDisplay[1].innerText = production;
    DOMDisplay[2].innerText = pollution;
    income >= cost
      ? cssAddRemoveClass(DOMBtn, "enough", "not__enough")
      : cssAddRemoveClass(DOMBtn, "not__enough", "enough");
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
