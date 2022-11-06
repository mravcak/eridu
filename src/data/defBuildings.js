const defBuildings = [
  {
    name: 'RESIDENCE',
    readable: 'Rezidencia',
    lore: {
      summary: 'Rezidencia, kde býva kňaz-kráľ.',
    },
    cost: {
      reed: 40,
      food: 40,
    },
    production: {
      food: 5,
      reed: 5,
    },
  },
  {
    name: 'DATE_FARM',
    readable: 'Datľová farma',
    lore: {
      summary: 'Datle patria medzi hlavné plodiny Sumerov. Stromy naviac poskytujú svojmu okoliu príjemný tieň.',
    },
    cost: {
      food: 35,
      reed: 60,
    },
    production: {
      food: 10,
    },
    req: {
      buildings: ['RESIDENCE'],
    },
  },
  {
    name: 'REED_FARM',
    readable: 'Trstinová plantáž',
    lore: {
      summary: 'Trstina je základný stavebný materiál Sumerov. Stavali z nej chatrče, vyrábajú lode a rôzne nástroje.',
    },
    cost: {
      food: 45,
      reed: 50,
    },
    production: {
      reed: 15,
    },
    req: {
      buildings: ['RESIDENCE'],
    },
  },
  {
    name: 'CLAY_PIT',
    readable: 'Hlinený dol',
    lore: {
      summary: 'Mezopotámia má mäkkú pôdu, ktorá bola nielen úrodná, ale dala sa využiť aj na stavbu budov.',
    },
    cost: {
      food: 10,
      reed: 130,
    },
    production: {
      clay: 15,
    },
    req: {
      buildings: ['REED_FARM'],
      techs: ['GEOMETRY'],
    },
  },
  {
    name: 'POMEGRANATE_FARM',
    readable: 'Farma gránatových jabĺk',
    lore: {
      summary: 'Granátové jablká ponúkajú oproti datliam vyšší výnos.',
    },
    cost: {
      food: 120,
      reed: 70,
      clay: 60,
    },
    production: {
      food: 30,
    },
    req: {
      techs: ['GEOMETRY'],
    },
  },
  {
    name: 'CARPENTER_SHOP',
    readable: 'Stolárska dielňa',
    lore: {
      summary: 'Tu sa vyrába nábytok a najrôznejšie nástroje.',
    },
    cost: {
      food: 260,
      clay: 90,
      reed: 50,
    },
    production: {
      food: -15,
      reed: 20,
      clay: 15,
    },
    req: {
      techs: ['TOOLMAKING'],
    },
  },
  {
    name: 'FISHING_HUT',
    readable: 'Rybárska charč',
    lore: {
      summary: 'Rybári prinášajú do mesta nielen jedlo, ale aj tŕstie, ktoré nájdu na rieke. Sumeri na lov používali harpúny.',
    },
    cost: {
      food: 170,
      reed: 140,
      clay: 120,
    },
    production: {
      food: 30,
      reed: 10,
    },
    req: {
      buildings: ['CARPENTER_SHOP', 'DATE_FARM'],
      techs: ['TOOLMAKING'],
    },
  },
  {
    name: 'POTTERY_SHOP',
    readable: 'Hrnčiarska dielňa',
    lore: {
      summary: 'Tu sa vyrábajú amfory, nádoby a obradné misy.',
    },
    cost: {
      food: 460,
      reed: 200,
      clay: 170,
    },
    production: {
      food: -15,
      reed: 20,
      clay: 50,
    },
    req: {
      buildings: ['CARPENTER_SHOP'],
      techs: ['SLOW_WHEEL'],
    },
  },

  {
    name: 'ZIGGURAT',
    readable: 'Zikkurat',
    lore: {
      summary: 'Vrch bohov. Má pravouhlý pôdorys a 3 terasovité stupne. Natretý je modrou farbou a ozdobený kameňmi Lapis Lazuli.',
    },
    cost: {
      food: 300,
      reed: 240,
      clay: 370,
    },
    production: {
      food: -40,
    },
    req: {
      techs: ['CUNEIFORM'],
      buildings: ['POTTERY_SHOP'],
    },
  },

  {
    name: 'LEATHER_SHOP',
    readable: 'Kožkárska dielňa',
    lore: {
      summary: 'Sumeria vedeli tkať a rovnako aj opracovávať kožu. Tá sa mohla využiť na výrobu stanov, lodí alebo nástrojov.',
    },
    cost: {
      food: 380,
      reed: 400,
      clay: 340,
    },
    production: {
      food: -30,
      clay: 50,
      reed: 70,
    },
    req: {
      techs: ['CUNEIFORM'],
    },
  },
  {
    name: 'BREWERY',
    readable: 'Pivovar',
    lore: {
      summary: 'Najobľúbenejšie miesto v celom meste. Produkuje veľké množstvo obživy.',
    },
    cost: {
      food: 240,
      reed: 600,
      clay: 600,
    },
    production: {
      food: 100,
      reed: -10,
      clay: -10,
    },
    req: {
      techs: ['BEERMAKING'],
    },
  },

  {
    name: 'GREAT_ZIGGURAT',
    readable: 'Veľký zikkurat',
    lore: {
      summary: 'Veľký zikkurat zasvätený bohovi Enki.',
    },
    cost: {
      reed: 2000,
      food: 2000,
      clay: 2000,
    },
    production: {
    },
    req: {
      buildings: ['ZIGGURAT', 'LEATHER_SHOP', 'BREWERY'],
    },
  },

];

export default defBuildings;
