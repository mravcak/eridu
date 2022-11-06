import defBuildings from '@/data/defBuildings';
import defTechs from '@/data/defTechs';

const translations = {
  translateBuilding: (type) => {
    const match = defBuildings.find((t) => t.name === type);
    if (!match) {
      return type;
    }
    return match.readable;
  },
  translateTech: (type) => {
    const match = defTechs.find((t) => t.name === type);
    if (!match) {
      return type;
    }
    return match.readable;
  },
};

export default translations;
