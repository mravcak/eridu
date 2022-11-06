const defTechs = [
  {
    name: 'GEOMETRY',
    readable: 'Geometria',
    lore: {
      summary: 'Sumeri boli majstri merači. Poznali aj aritmetiku, algebru a geometriu.',
    },
    cost: {
      food: 150,
      reed: 50,
    },
    req: {
      buildings: ['RESIDENCE'],
    },
  },
  {
    name: 'TOOLMAKING',
    readable: 'Výroba nástrojov',
    lore: {
      summary: 'Pílky, dláta, kladivá, sekery a rôzne ďalšie nástroje umožnili Sumerom efektívnu výstavbu.',
    },
    cost: {
      food: 50,
      reed: 150,
      clay: 70,
    },
    req: {
      buildings: ['RESIDENCE'],
    },
  },
  {
    name: 'SLOW_WHEEL',
    readable: 'Hrnčiarsky kruh',
    lore: {
      summary: 'Hrnčiarsky kruh spustil v staroveku malú priemyselnú revolúciu a umožnil budovanie veľkých hrnčiarskych podnikov.',
    },
    cost: {
      food: 300,
      reed: 200,
      clay: 300,
    },
    req: {
      techs: ['TOOLMAKING'],
      buildings: ['CLAY_PIT'],
    },
  },

  {
    name: 'CUNEIFORM',
    readable: 'Klinové písmo',
    lore: {
      summary: 'Prvé slabičné písmo vzniklo pre potreby uchovávania obchodných záznamov, ale umožnilo zároveň zaznamenávať históriu a literatúru. Píše sa tŕstím na hlinenné tabuľky.',
    },
    cost: {
      food: 420,
      reed: 600,
      clay: 600,
    },
    req: {
      buildings: ['REED_FARM', 'CLAY_PIT', 'POTTERY_SHOP'],
    },
  },
  {
    name: 'BEERMAKING',
    readable: 'Pivovarníctvo',
    lore: {
      summary: 'Sumeri boli prví pivovarníci. Dochované texty spomínajú 8 druhov jačmenného piva, 8 druhov pšeničkého a 3 miešané.',
    },
    cost: {
      food: 1000,
      reed: 800,
      clay: 800,
    },
    req: {
      techs: ['CUNEIFORM'],
      buildings: ['POTTERY_SHOP'],
    },
  },

];

export default defTechs;
