// TODO: add typing

export let unitSystems: {[key: string]: {[key:string]: string}} = {
  Imperial: {
    length: 'in',
    weight: 'lb',
    age: 'yr',
    dailyEnergyRequirement: 'Cal/day',
    percent: '%',
  },
  Metric: {
    length: 'cm',
    weight: 'kg',
    age: 'yr',
    dailyEnergyRequirement: 'Cal/day',
    percent: '%',
  }
}