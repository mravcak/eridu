<template>
  <div class="play-screen">
    <div class="header">
      <ul class="group meta">
        <li class="cell -display">Mesto: {{ name }}</li>
        <!-- li class="cell -display">Populácia: 0</li -->
        <li class="cell -display">Kolo: {{ rounds.current }}</li>
        <li class="cell -display">Rok: {{ 5401 - (rounds.current.value * 1) }} p.n.l.</li>
      </ul>
      <ul class="group resources">
        <li class="cell -display">🍲 Jedlo: {{ resources.state.food }}</li>
        <li class="cell -display">🌿 Tŕstie: {{ resources.state.reed }}</li>
        <li class="cell -display">🧱 Hlina: {{ resources.state.clay }}</li>
      </ul>
      <ul class="group actions">
        <li class="cell">
          <button class="base-button" @click="interf.music.toggle()">
            <span v-if="interf.music.isPlaying.value">Zastav </span>
            <span v-else>Spusti </span>
            <span class="hotkey">h</span>udbu
          </button>
        </li>
        <li class="cell">
          <button class="base-button" @click="interf.techsToggle()">
            <span class="hotkey">T</span>echnológie
          </button>
        </li>
        <li class="cell">
          <button class="base-button" @click="rounds.next()">
            P<span class="hotkey">r</span>eskočiť kolo
          </button>
        </li>
      </ul>
    </div>
    <div class="map-wrap">
      <table class="map">
        <tr
          v-for="(y) in map.config.height"
          :key="y"
        >
          <td
            v-for="(x) in map.config.width"
            :key="x"
            class="tile"
            :class="[
              'tile',
              map.tileGetTerrain({ x, y }),
              (map.tileGetBuilding({ x, y }) ? 'building' : null),
              (interf.tileIsSelected({ x, y }) ? 'active' : null),
            ]"
            :style="map.tileGetBuildingStyle({ x, y })"
            @click="interf.tileSelect({ x, y })"
          />
        </tr>
      </table>
    </div>
    <div class="window window--tile"
      v-if="interf.selectedTile.active"
    >
      <div class="window-header">
        <h2>
          <span v-if="map.tileGetTerrain(interf.selectedTile.position) === 'SOIL'">
            Pôda
          </span>
          <span v-if="map.tileGetTerrain(interf.selectedTile.position) === 'RIVER'">
            Rieka
          </span>
          <span v-if="map.tileGetTerrain(interf.selectedTile.position) === 'MARSH'">
            Močiar
          </span>
        </h2>
        <button class="base-button" @click="interf.tileDeselect()">Zatvoriť</button>
      </div>
      <div
        class="window-section"
        v-if="map.tileGetTerrain(interf.selectedTile.position) === 'RIVER'"
      >
        <h3>Rieka</h3>
        <p>Rieka Eufrat poskytuje obživu, ale je aj hrozbou</p>
      </div>
      <div class="window-section" v-if="map.tileGetBuilding(interf.selectedTile.position)">
        <h3>Stavba</h3>
        <BuildingDetail
          :building="buildings.getSpec(map.tileGetBuilding(interf.selectedTile.position))"
        />
      </div>
      <div class="window-section" v-if="interf.tileGetActions().canBuild">
        <h3>Stavba budovy</h3>
        <BuildingButton
          v-for="b in interf.getAvailableBuildings()"
          :key="b.name"
          :building="b"
          @click="b.isAvailable && buildings.create(b.name, interf.selectedTile.position)"
        />
      </div>
      <div class="window-section" v-if="interf.tileGetActions().canChangeTerrain">
        <p>Močiar je plný tŕstia, ktoré môžete využiť na stavbu.</p>
        <p>Cena vyčistenia: 🍲 20</p>
        <p>Výnos vyčistenia: 🌿 10</p>
        <p>
          <button
            class="base-button"
            @click="map.tileChangeTerrain(interf.selectedTile.position, 'SOIL')"
          >
            Vyčistiť močiar
          </button>
        </p>
        <button
          v-if="map.tileGetTerrain(interf.selectedTile.position) === 'SOIL'"
          @click="map.tileChangeTerrain(interf.selectedTile.position, 'SOIL-IRRIGATED')"
        >
          Vybudovať závlahu
        </button>
      </div>
    </div>
    <div class="window window--technologies"
      v-if="interf.techsActive.value"
    >
      <div class="window-header">
        <h2>Technológie</h2>
        <button class="base-button" @click="interf.techsActive.value = false">Zatvoriť</button>
      </div>
      <div class="window-section">
        <div>
          <TechButton
            v-for="t in interf.getAvailableTechs()"
            :key="t.name"
            :tech="t"
            @click="t.isAvailable && techs.research(t.name)"
          />
        </div>
      </div>
    </div>
    <div v-if="interf.showIntro.value" class="window window--center">
      <div class="window-header">
        <h2>Vitajte</h2>
      </div>
      <div class="window-section">
        <blockquote>
          Civilizácie zomierajú na samovraždu, nie na vraždu.<br>
          &mdash; Arnold J. Toynbee
        </blockquote>
        <p>
          Ťažké podmienky Mezopotámie v šiestom tisícročí pred našim letopočtom
          poskytli vhodnú kombináciu možného a nemožného a ich obyvateľov doviedli
          vôbec prvýkrát v histórii k tomu, aby postavili niečo, čomu hovoríme mestá.
        </p>
        <p>
          Tvojou úlohou je vybudovať mesto Eridu a postaviť Veľký zikkurat.
          Za koľko kôl sa ti to podarí?
        </p>
        <p>
          <button class="base-button" @click="interf.showIntro.value = false">
            Začať hrať
          </button>
        </p>
      </div>
    </div>
    <div v-if="interf.showOutro.value" class="window window--center">
      <div class="window-header">
        <h2>Blahoželám</h2>
      </div>
      <div class="window-section">
        <p>
          Podarilo sa ti vybudovať úspešné mesto.
        </p>
        <p>Počet budov: {{ buildings.state.length }}</p>
        <p>Počet kôl: {{ rounds.current.value }}</p>
        <p>Rok: {{ 5401 - (rounds.current.value * 1) }} p.n.l.</p>
        <p>
          <button class="base-button" @click="interf.showOutro.value = false">
            Zatvoriť a hrať ďalej
          </button>
        </p>
      </div>
    </div>
  </div>

</template>

<script setup>
import { ref, reactive } from 'vue';
import '@/style/main.scss';
import defBuildings from '@/data/defBuildings';
import defTechs from '@/data/defTechs';
// import translations from '@/translations';

import BuildingButton from '@/components/BuildingButton.vue';
import BuildingDetail from '@/components/BuildingDetail.vue';
import TechButton from '@/components/TechButton.vue';

const isSamePosition = (p1, p2) => p1.x === p2.x && p1.y === p2.y;

// Resources
const resources = {
  state: reactive({
    food: 100,
    reed: 100,
    clay: 0,
  }),
  add(payload) {
    const addList = payload ? Object.entries(payload) : [];
    addList.forEach(([resource, value]) => {
      this.state[resource] += value;
    });
  },
  subtract(payload) {
    const subList = payload ? Object.entries(payload) : [];
    subList.forEach(([resource, value]) => {
      this.state[resource] -= value;
    });
  },
  checkAffordability(cost) {
    const costList = Object.entries(cost);
    return costList.every(([resource, value]) => this.state[resource] >= value);
  },
};

// Buildings
const buildings = {
  state: reactive([]),
  idIncrement: 0,
  getSpec(type) {
    const match = defBuildings.find((b) => b.name === type);
    return match;
  },
  getSpecById(id) {
    const match = this.state.find((b) => b.id === id);
    if (!match) {
      return null;
    }
    return this.getSpec(match.type);
  },
  hasBuilding(type) {
    const myBuildings = this.state.map((b) => b.type);
    return myBuildings.includes(type);
  },
  createAble(type, position, options) {
    if (!type) {
      return false;
    }
    const spec = this.getSpec(type);
    const isAffordable = () => resources.checkAffordability(spec.cost);
    const isRequirementsFulfilledTechs = () => {
      if (!spec.req || !spec.req.techs) {
        return true;
      }
      // eslint-disable-next-line no-use-before-define
      return spec.req.techs.every((t) => techs.list.includes(t));
    };
    const isRequirementsFulfilledBuildings = () => {
      if (!spec.req || !spec.req.buildings) {
        return true;
      }
      return spec.req.buildings.every((b) => this.hasBuilding(b));
    };
    const isSpaceAvailable = () => {
      if (options?.isUpgrade) {
        return true;
      }
      const collision = this.state.some(
        (b) => isSamePosition(b.position, position),
      );
      return !collision;
    };

    return isAffordable()
      && isRequirementsFulfilledTechs()
      && isRequirementsFulfilledBuildings()
      && isSpaceAvailable();
  },
  upgradeAble(id, type) {
    if (!id || !type) {
      return false;
    }
    const oldSpec = this.getSpecById(id);
    const newSpec = this.getSpec(type);
    if (!oldSpec || !newSpec) {
      return false;
    }
    if (oldSpec.name !== newSpec.upgrades) {
      return false;
    }
    if (!this.createAble(type, null, { isUpgrade: true })) {
      return false;
    }
    return true;
  },
  create(type, position, options) {
    if (!this.createAble(type, position, options)) {
      console.error('Unable to build');
      return null;
    }
    const spec = this.getSpec(type);
    resources.subtract(spec.cost);
    const newBuilding = {
      type,
      id: this.idIncrement += 1,
      position: { ...position },
    };

    // eslint-disable-next-line no-use-before-define
    rounds.next();
    this.state.push(newBuilding);
    if (newBuilding.type === 'GREAT_ZIGGURAT') {
      // eslint-disable-next-line no-use-before-define
      interf.showOutro.value = true;
    }
    return newBuilding;
  },
  destroy(id) {
    const index = this.state.findIndex((b) => b.id === id);
    const destroyedBuilding = { ...this.state[index] };
    this.state.splice(index, 1);
    return destroyedBuilding;
  },
  upgrade(id, type) {
    if (!this.upgradeAble(id, type)) {
      console.error('Unable to upgrade');
      return null;
    }
    const destroyed = this.destroy(id);
    return this.create(type, destroyed.position, { isUpgrade: true });
  },
};

// Map
const map = {
  config: {
    width: 7,
    height: 7,
  },
  tiles: reactive([]),
  generateMap() {
    const generateTerrainType = (x, y) => {
      if ((x * 1) + (y * 2) > 14) {
        return 'RIVER';
      }
      if (x === 4 && y === 5) {
        return 'SOIL';
      }
      return 'MARSH';
    };
    for (let y = 1; y <= this.config.height; y += 1) {
      for (let x = 1; x <= this.config.width; x += 1) {
        this.tiles.push({
          terrain: generateTerrainType(x, y),
          position: {
            x,
            y,
          },
        });
      }
    }
  },
  tileChangeTerrain(position, newTerrain) {
    const tile = this.tileGet(position);
    tile.terrain = newTerrain;
    resources.subtract({ food: 20, reed: -10 });
    // eslint-disable-next-line no-use-before-define
    rounds.next();
  },
  tileGet(position) {
    const match = this.tiles.find((t) => isSamePosition(t.position, position));
    if (!match) {
      return null;
    }
    return match;
  },
  tileGetTerrain(position) {
    const tile = this.tileGet(position);
    return tile ? tile.terrain : null;
  },
  tileGetBuilding(position) {
    const match = buildings.state.find(
      (b) => isSamePosition(b.position, position),
    );
    if (!match) {
      return null;
    }
    return match.type;
  },
  tileGetBuildingStyle(position) {
    const building = this.tileGetBuilding(position);
    if (!building) {
      return null;
    }
    // eslint-disable-next-line import/no-dynamic-require, global-require
    const dataUrl = require(`@/assets/buildings-icons/${building}.png`);
    return {
      backgroundImage: `url(${dataUrl})`,
    };
  },

};
map.generateMap();

// Techs
const techs = {
  list: reactive([]),
  getSpec(type) {
    const match = defTechs.find((t) => t.name === type);
    return match;
  },
  research(type) {
    if (!this.researchAble(type)) {
      console.error('Not able to research');
      return null;
    }
    const spec = this.getSpec(type);
    resources.subtract(spec.cost);
    this.list.push(type);
    // eslint-disable-next-line no-use-before-define
    rounds.next();
    return type;
  },
  researchAble(type) {
    const spec = this.getSpec(type);
    const isAffordable = () => resources.checkAffordability(spec.cost);
    const isRequirementsFulfilledTechs = () => {
      if (!spec.req || !spec.req.techs) {
        return true;
      }
      return spec.req.techs.every((t) => this.list.includes(t));
    };
    const isRequirementsFulfilledBuildings = () => {
      if (!spec.req || !spec.req.buildings) {
        return true;
      }
      return spec.req.buildings.every((b) => buildings.hasBuilding(b));
    };
    const isNew = () => !this.list.includes(type);

    return isAffordable()
      && isRequirementsFulfilledTechs()
      && isRequirementsFulfilledBuildings()
      && isNew();
  },
};

// Round
const rounds = {
  current: ref(1),
  produce: () => {
    const iterator = buildings.state;
    iterator.forEach((b) => {
      const spec = buildings.getSpec(b.type);
      resources.add(spec.production);
    });
  },
  next: () => {
    // eslint-disable-next-line global-require
    const audio = new Audio(require('@/assets/audio/shutter.mp3'));
    audio.play();
    rounds.current.value += 1;
    rounds.produce();
  },
};

// Misc
const name = ref('Eridu');

// Interface
const interf = {
  selectedTile: reactive({
    active: false,
    position: {
      x: null,
      y: null,
    },
  }),

  tileSelect(position) {
    this.selectedTile.position = {
      x: position.x,
      y: position.y,
    };
    this.selectedTile.active = true;
  },
  tileIsSelected(position) {
    return isSamePosition(this.selectedTile.position, position) && this.selectedTile.active;
  },
  tileDeselect() {
    this.selectedTile.active = false;
  },
  tileGetTerrain() {
    return map.tileGetTerrain(this.selectedTile.position);
  },
  tileGetActions() {
    const actions = {
      canBuild: false,
      canChangeTerrain: false,
    };
    const tile = map.tileGet(this.selectedTile.position);
    if (!tile) {
      return actions;
    }
    if (tile.terrain === 'SOIL') {
      actions.canBuild = true;
      // actions.canChangeTerrain = true;
    }
    if (tile.terrain === 'MARSH') {
      actions.canChangeTerrain = true;
    }
    if (map.tileGetBuilding(this.selectedTile.position)) {
      actions.canBuild = false;
    }
    return actions;
  },

  techsActive: ref(false),
  techsToggle() {
    this.techsActive.value = !this.techsActive.value;
  },

  getAvailableTechs() {
    // Gets available techs for player
    return defTechs.map((t) => ({
      ...t,
      isAvailable: techs.researchAble(t.name),
      isResearched: techs.list.includes(t.name),
    }));
  },
  getAvailableBuildings() {
    return defBuildings.map((b) => ({
      ...b,
      isAvailable: buildings.createAble(b.name, this.selectedTile.position),
    }));
  },

  music: {
    // eslint-disable-next-line global-require
    file: new Audio(require('@/assets/audio/rebetikaud.mp3')),
    isPlaying: ref(false),
    toggle() {
      if (!interf.music.isPlaying.value) {
        interf.music.file.play();
        interf.music.file.loop = true;
        interf.music.isPlaying.value = true;
      } else {
        interf.music.file.pause();
        interf.music.isPlaying.value = false;
      }
    },
  },
  showIntro: ref(true),
  showOutro: ref(false),
};

// Hotkeys
document.onkeypress = (e) => {
  if (e.key === 't') {
    interf.techsToggle();
  }
  if (e.key === 'r') {
    rounds.next();
  }
  if (e.key === 'h') {
    interf.music.toggle();
  }
};

</script>
