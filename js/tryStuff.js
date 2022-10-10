// let incomeT = 100;
// const btnFactory = document.querySelector(".factory");

// class Upgrade {
//   constructor(name, cost, nextUpgrade, pollution, production) {
//     this.name = name;
//     this.cost = cost;
//     this.nextUpgrade = nextUpgrade;
//     this.pollution = pollution;
//     this.production = production;
//     // this.income = incomeT;
//     // this.isUpgrade = false;
//     // this.addEventLister("click", this.checkIncome.bind(this));
//     // this.checkIncome();
//   }
// checkIncome(event) {
//   if (this.cost > this.income) {
//     console.log("hello");
//   }
// }
// }

// class Factory {
//   constructor() {

//   }
//   onClick() {
//     if()
//   }
// }
// const b = new Game(10, 10);

// const a = new Upgrade(btnFactory, 5, 10, 50, 5);

// const objA = {
//   b: new Upgrade(btnFactory, 5, 10, 50, 5),
// c: () => {
//   console.log(objA.b.Upgrade);
// },
// };

// const { cost, isUpgrade } = objA.b;
// console.log(a);
// console.log(cost, a.checkIncome(), isUpgrade);

// class Game {
//   constructor(total) {
//     // this.element = element;
//     this.total = total;
//     this.el = document.querySelector(".factory");
//     this.value = 0;
//     // this.welcome();
//     this.addEvents();
//   }
//   welcome() {
//     console.log("welcome");
//   }
//   addEvents() {
//     document
//       .querySelector(".factory")
//       .addEventListener("click", this.welcome.bind(this));
//   }
// }
// let t = 0;
// document.querySelector(".factory").addEventListener("click", e => {
//   t = new Game(e.target, 0);
//   console.log("t", t);
// });

// new Game(0);

// class Render extends Game {
//   constructor() {}
//   render()
// }

// let ressources = {
//   income: {
//     total: 0,
//     perClick: 1,
//     upgrade: {
//       cost: 0,
//       nextUpgrade: 0,
//     },
//   },
//   pollution: {
//     total: 0,
//     perClick: 4,
//     upgrade: {
//       cost: 0,
//       nextUpgrade: 2,
//     },
//   },
//   factory: {
//     upgrade: {
//       cost: 0,
//       nextUpgrade: 2,
//     },
//   },
//   greenTicket: {
//     cost: 0,
//     perClick: 0,
//     upgrade: {
//       cost: 0,
//       nextUpgrade: 2,
//     },
//   },
//   tree: {
//     cost: 0,
//     perClick: 0,
//     upgrade: {
//       cost: 0,
//       nextUpgrade: 2,
//     },
//   },
//   robots: {
//     cost: 10,
//     production: 1,
//     pollution: 1,
//     speed: 1000,
//     isUpgradable: false,
//     upgrade: {
//       cost: 10,
//       nextUpgrade: 1,
//     },
//   },
// };

// const calcProdPerClick = () => {
//   ressources.income.total += ressources.income.perClick;
//   ressources.pollution.total += ressources.pollution.perClick;
// };

// const calcRobotsProd = () => {
//   ressources.income.total += ressources.robots.production;
//   ressources.pollution.total += ressources.robots.pollution;
// };

// const calcRobotsCost = () => {
//   ressources.income.total -= ressources.robots.cost;
//   ressources.robots.cost += ressources.robots.upgrade.nextUpgrade;
// };

// const robotsIntervalProd = () => {
//   if (interval) clearInterval(interval);
//   interval = setInterval(calcRobotsProd, ressources.robots.speed);
// };

// const onRobots = () => {
//   if (ressources.income.total >= ressources.robots.cost) {
//     calcRobotsCost();
//     robotsIntervalProd();
//     ressources.robots.isUpgradable = true;
//   }
// };
// const checkIncome = (el, val, bool) => {
//   if (income >= val) {
//     el.classList.remove("not__enough");
//     el.classList.add("enough");
//     bool = true;
//   } else {
//     el.classList.remove("enough");
//     el.classList.add("not__enough");
//     bool = false;
//   }
// };

// upgrades.forEach(upgrade => {
//   for (let props in upgrade) {
//     console.log("loop 2", upgrade[props].cost);
//   }
// });

// const robot = {
//   cost: 10,
//   pollution: 50,
//   production: 10,
//   speed: 1000,
//   upgrade: {
//     speed: {
//       cost: 0,
//       nextUpgrade: 0,
//       ratio: 0.25,
//       effect: () => robot.speed * robot.upgrade.speed.ratio,
//       checkIncome: () => {
//         if (income > robot.upgrade.speed.cost) {
//           income -= robot.upgrade.speed.cost;
//           robot.upgrade.speed.effect();
//         }
//       },
//     },
//   },
//   calc: {
//     cost: () => {
//       income -= robot.cost;
//     },
//     prod: () => {
//       income += robot.production;
//       pollution += robot.pollution;
//     },
//     interval: () => {
//       if (interval) clearInterval(interval);
//       interval = setInterval(robot.calc.prod, robot.speed);
//     },
//   },
//   check: {
//     onClick: () => {
//       if (income >= robot.cost) {
//         robot.calc.cost();
//         robot.calc.interval();
//       }
//     },
//   },
// };

// const factory = {
//   perClick: new PerClick(0, 2, 10),
//   onClick: () => {
//     income += factory.perClick.production;
//     pollution += factory.perClick.pollution;
//   },
//   upgrade: {
//     cost: 10,
//     nextUpgrade: 2,
//     production: 2,
//     pollution: 4,
//     onUpgrade: () => {
//       const { perClick, upgrade } = factory;
//       perClick.production *= upgrade.production;
//       perClick.pollution *= upgrade.pollution;
//       upgrade.cost *= upgrade.nextUpgrade;
//     },
//   },
// };

// const greenTicket = {
//   perClick: new PerClick(10, 0, 2),
//   onClick: () => {
//     income -= greenTicket.perClick.cost;
//     pollution -= greenTicket.perClick.pollution;
//   },
//   upgrade: {
//     cost: 20,
//     nextUpgrade: 2,
//     pollution: 2,
//     onUpgrade: () => {
//       greenTicket.perClick;
//     },
//   },
// };

// const addEvents = () => {
//   btnFactory.addEventListener("click", factory.onClick);
//   btnAutomation.addEventListener("click", robot.check.onClick);
// };

// const updateUi = () => {
//   treshold.check();
//   displayIncome.innerText = income;
//   displayPollution.innerText = pollution;

//   //   isEnoughIncome(btnAutomation, robot.cost);
//   requestAnimationFrame(updateUi);
// };

// setTimeout(() => {
//   upgrades.forEach(upgrade => {
//     console.log("loop 1", upgrade.factory.cost);
//     for (let item in upgrade) {
//       console.log("loop 2", item.upgrade);
//     }
//   });
// }, 300);

// const game = () => {
//   //   addEvents();
//   //   updateUi();
//   console.log("game running!");
// };

// game();

// function onUpgrade(objA, objB) {
//   let a = { ...objA };
//   let b = { ...objB };
//   if (income > b.cost) {
//     income -= b.cost;
//     a.pollution += b.pollution;
//     a.cost += b.cost;
//     b.cost += b.nextUpgrade;
//   }
// }
