const displayIncome = document.querySelector(".ressources__income");
const displayPollution = document.querySelector(".ressources__pollution");
const factoryBtn = document.querySelector(".factory__btn");
const greenTicketBtn = document.querySelector(".green__ticket__btn");

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
    classBtn,
    classDisplay,
    cost,
    nextUpgrade,
    pollution,
    production
  ) {
    this.classBtn = classBtn;
    this.classDisplay = classDisplay;
    this.cost = cost;
    this.nextUpgrade = nextUpgrade;
    this.pollution = pollution;
    this.production = production;
    this.isActive = false;
    this.DOMBtn = document.querySelector(this.classBtn);
    this.DOMElements = [...document.querySelectorAll(this.classDisplay)];
  }
  display() {
    this.DOMElements[0].innerText = this.cost;
    this.DOMElements[1].innerText = this.production;
    this.DOMElements[2].innerText = this.pollution;
  }
}

const cssAddRemoveClass = (el, add, remove) => {
  el.classList.add(add);
  el.classList.remove(remove);
};

const upgrades = {
  factory: new Upgrade(
    ".factory__upgrade__btn",
    ".factory__upgrade__info",
    10,
    2,
    10,
    10
  ),
  greenTicket: new Upgrade(
    ".greenTicket__upgrade__btn",
    ".greenTicket__upgrade__info",
    5,
    4,
    3,
    1
  ),
  robot: new Upgrade(".robot__btn", ".robot__upgrade__info", 5, 10, 20, 10),
  tree: new Upgrade(".tree__btn", ".tree__upgrade__info", 30, 15, 40, 20),
};

const factory = {
  perClick: new PerClick(0, 2, 1),
  onClick: () => {
    income += factory.perClick.production;
    pollution += factory.perClick.pollution;
    console.log("hello");
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
  upgrades.factory.DOMBtn.addEventListener("click", factory.onUpgrade);
  greenTicketBtn.addEventListener("click", greenTicket.onClick);
  upgrades.greenTicket.DOMBtn.addEventListener("click", greenTicket.onUpgrade);
  upgrades.robot.DOMBtn.addEventListener("click", robot.onClick);
  upgrades.tree.DOMBtn.addEventListener("click", tree.onClick);
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
    const { cost, DOMBtn, isActive } = upgrades[upgrade];
    upgrades[upgrade].display();
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
