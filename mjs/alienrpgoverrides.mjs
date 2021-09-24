// #region ▒░▒░▒░▒[IMPORTS] Importing Modules ▒░▒░▒░▒ ~
/*DEVCODE*/
// #region ░░░░░░░[GMPREP]░░░░ Setup & Design Functions for Scenario Creation ░░░░░░░ ~
import setSceneFromSVG from "./setSceneFromSVG.mjs";
// #endregion ░░░░[GMPREP]░░░░
/*!DEVCODE*/
// #region ░░░░░░░[UTILITIES]░░░░ Utility Functions ░░░░░░░ ~
import {RE} from "./utils.mjs";
// #endregion ░░░░[UTILITIES]░░░░
// #region ░░░░░░░[SCRIPTS]░░░░ Companion Script Hooks & Templates for Registration & Preloading ░░░░░░░ ~
import viewMasterHooks from "./viewMaster.mjs";
import combatMasterHooks from "./combatMaster.mjs";
import renderMasterHooks, {
  templates as renderMasterTemplates
} from "./renderMaster.mjs";
import lightMasterHooks, {
  setLights, setSounds
} from "./lightMaster.mjs";
import charMasterHooks, {
  templates as charMasterTemplates,
  assignActor
} from "./charMaster.mjs";
import itemMasterHooks, {
  templates as itemMasterTemplates
} from "./itemMaster.mjs";
// #endregion ░░░░[SCRIPTS]░░░░
// #endregion ▒▒▒▒[IMPORTS]▒▒▒▒

/*~
    Update Command with the missing [6].
    Update the talents that let people push twice with a warning about clicking the multi-push box.

~*/
// Register Hooks from imported scripts
[
  viewMasterHooks,
  combatMasterHooks,
  renderMasterHooks,
  lightMasterHooks,
  charMasterHooks,
  itemMasterHooks
].forEach((hooks) => Object.entries(hooks) // Namespace each hook with a prefix, unless hook begins with tilde ('~')
  .forEach(([hook, func]) => Hooks.on(`ARPGO_${hook}`.replace(/(ARPGO_)?~/, ""), func)));

const getScene = (sceneName) => (sceneName
  ? game.scenes.find((scene) => scene.name === sceneName)
  : canvas.scene);
const hasSceneModes = (sceneName) => "sceneModes" in (RE.F.scenes[getScene(sceneName)?.name] ?? {});
const getSceneMode = (sceneName = canvas.scene.name) => {
  if (hasSceneModes(sceneName)) {
    return getScene(sceneName)?.getFlag("alienrpgoverrides", "sceneMode")
      ?? Object.keys(RE.F.scenes[sceneName].sceneModes)[0];
  }
  return "default";
};
const changeSceneMode = async (sceneMode, sceneRef) => {
  const targetScenes = [];
  if (sceneRef === "all") {
    targetScenes.push(...game.scenes);
  } else {
    targetScenes.push(getScene(sceneRef));
  }
  for (const targetScene of targetScenes) {
    const sceneName = targetScene.name;
    if (sceneName && sceneMode in RE.F.sceneModes) {
      const modeData = RE.F.sceneModes[sceneMode];
      await targetScene.setFlag("alienrpgoverrides", "sceneMode", sceneMode);
      if ("lights" in modeData) {
        for (const [lightRef, updateData] of Object.entries(modeData.lights)) {
          await setLights(lightRef, updateData, targetScene);
        }
      }
      if ("sounds" in modeData) {
        for (const [soundRef, updateData] of Object.entries(modeData.sounds)) {
          await setSounds(soundRef, updateData, targetScene);
        }
      }
    }
  }
};

// #region ████████ ON INIT: On-Initialization Hook ████████ ~
Hooks.once("init", async () => {
  console.log("██████ INITIALIZING ALIEN RPG OVERRIDES ... ██████");
    /*DEVCODE*/
    // CONFIG.debug.hooks = true;
  window.RE = RE;
    /*!DEVCODE*/
  game.socket.on("module.alienrpgoverrides", (data) => Hooks.call(...[data].flat()));
  RE.F = {
        /*DEVCODE*/
    setSVG: (isKillingLights = false, isKillingWalls = true) => setSceneFromSVG(canvas.scene.name, isKillingLights, isKillingWalls),
        /*!DEVCODE*/
    sceneModes: {
      muthurAsleep: {
        lights: {
          "MUTHUR-SLEEPING": {hidden: false},
          "CRYO-SLEEPING": {hidden: false},
          "SHIPLIGHTS-AMBER": {
            intensity: 0.6,
            mult_bright: 1,
            mult_dim: 1,
            tintColor: "#005F61",
            lightAnimation: {
              type: "SecretFireSmoke Patch",
              speed: 10,
              intensity: 1
            },
            hidden: false
          },
          "BRIDGE-MAIN": {hidden: true},
          "BRIDGE-COMMAND": {hidden: true},
          "BRIDGE-COMMS": {hidden: true},
          "BRIDGE-SENSORS": {hidden: true},
          "BRIDGE-PILOT": {hidden: true},
          "BRIDGE-LIFE": {hidden: true},
          "BRIDGE-TERMINAL-COMMAND": {hidden: true},
          "BRIDGE-TERMINAL-COMMS": {hidden: true},
          "BRIDGE-TERMINAL-SENSORS": {hidden: true},
          "BRIDGE-TERMINAL-PILOT": {hidden: true},
          "BRIDGE-TERMINAL-LIFE": {hidden: true},
          "SHIPLIGHTS-AWAKE": {hidden: true},
          "MUTHUR-AWAKE": {hidden: true},
          "TERMINAL-AWAKE": {hidden: true}
        },
        sounds: {
          airvent: {hidden: true},
          accessterminal: {hidden: true}
        }
      },
      muthurAwake: {
        lights: {
          "MUTHUR-SLEEPING": {hidden: true},
          "CRYO-SLEEPING": {hidden: true},
          "SHIPLIGHTS-AMBER": {
            intensity: 0.35,
            mult_bright: 0,
            mult_dim: 1,
            tintColor: "#FF8800",
            lightAnimation: {
              type: "SecretFireSmoke Patch",
              speed: 10,
              intensity: 1
            },
            hidden: false
          },
          "BRIDGE-MAIN": {hidden: false},
          "BRIDGE-COMMAND": {hidden: false},
          "BRIDGE-TERMINAL-COMMAND": {hidden: false},
          "BRIDGE-LIFE": {
            intensity: 0.65,
            mult_bright: 1.5,
            mult_dim: 1.5,
            tintColor: "#FF0000",
            lightAnimation: {
              type: "pulse",
              speed: 6,
              intensity: 5
            },
            hidden: false
          },
          "BRIDGE-TERMINAL-LIFE": {
            intensity: 1,
            mult_bright: 1,
            mult_dim: 1,
            tintColor: "#FF0000",
            lightAnimation: {
              type: "BlitzSimple Flash",
              speed: 6,
              intensity: 10
            },
            hidden: false
          },
          "SHIPLIGHTS-AWAKE": {hidden: false},
          "MUTHUR-AWAKE": {hidden: false},
          "TERMINAL-AWAKE": {hidden: false}
        },
        sounds: {
          airvent: {hidden: false},
          accessterminal: {hidden: false}
        }
      },
      scrubbersFixed: {
        lights: {
          "MUTHUR-SLEEPING": {hidden: true},
          "CRYO-SLEEPING": {hidden: true},
          "SHIPLIGHTS-AMBER": {
            intensity: 0.35,
            mult_bright: 0,
            mult_dim: 1,
            tintColor: "#FFAA00",
            lightAnimation: {type: null, speed: 5, intensity: 5},
            hidden: false
          },
          "BRIDGE-MAIN": {hidden: false},
          "BRIDGE-COMMAND": {hidden: false},
          "BRIDGE-TERMINAL-COMMAND": {hidden: false},
          "BRIDGE-LIFE": {
            intensity: 0.35,
            mult_bright: 0,
            mult_dim: 1,
            tintColor: "#00FF00",
            lightAnimation: {type: null, speed: 5, intensity: 5},
            hidden: false
          },
          "BRIDGE-TERMINAL-LIFE": {
            intensity: 0.35,
            mult_bright: 1,
            mult_dim: 1,
            tintColor: "#FFFF00",
            lightAnimation: {
              type: "BlitzAlternate Torch",
              intensity: 10,
              speed: 10,
              alterAlpha: true,
              alterTranslation: true,
              blueStrength: 31,
              ratioDamper: 1,
              secondaryColor: "#ffff00"
            },
            hidden: false
          },
          "SHIPLIGHTS-AWAKE": {hidden: false},
          "MUTHUR-AWAKE": {hidden: false},
          "TERMINAL-AWAKE": {hidden: false}
        },
        sounds: {
          airvent: {hidden: false},
          accessterminal: {hidden: false}
        }
      }
    },
    scenes: {
      "Alien: Chariot of the Gods": {
        isResettingViewOnActivate: true,
        name: "Alien: Chariot of the Gods",
        isLandingPage: true,
        deck: 3,
        get mode() { return getSceneMode(this.name) }
      },
      "USCSS Montero - Deck A": {
        isResettingViewOnActivate: true,
        name: "USCSS Montero - Deck A",
        ship: "Montero",
        deck: 1,
        get mode() { return getSceneMode(this.name) }
      },
      "USCSS Cronus - Exterior": {
        isResettingViewOnActivate: true,
        name: "USCSS Cronus - Exterior",
        ship: "Cronus",
        deck: 0,
        get mode() { return getSceneMode(this.name) }
      },
      "USCSS Cronus - Deck A": {
        isResettingViewOnActivate: false,
        name: "USCSS Cronus - Deck A",
        ship: "Cronus",
        deck: 1,
        get mode() { return getSceneMode(this.name) }
      },
      "USCSS Cronus - Deck B": {
        isResettingViewOnActivate: false,
        name: "USCSS Cronus - Deck B",
        ship: "Cronus",
        deck: 2,
        get mode() { return getSceneMode(this.name) }
      },
      "USCSS Cronus - Deck C": {
        isResettingViewOnActivate: false,
        name: "USCSS Cronus - Deck C",
        ship: "Cronus",
        deck: 3,
        get mode() { return getSceneMode(this.name) }
      },
      "USCSS Cronus - Deck D": {
        isResettingViewOnActivate: false,
        name: "USCSS Cronus - Deck D",
        ship: "Cronus",
        deck: 4,
        get mode() { return getSceneMode(this.name) }
      }
    },
    call: (hook, ...args) => {
      game.socket.emit("module.alienrpgoverrides", [`ARPGO_${hook}`, ...args]);
    },
    callGM: (hook, ...args) => {
      Hooks.call(`ARPGO_${hook}`, ...args);
      RE.F.call(hook, ...args);
    },
    combats: {},
    scaleLightGroup: (...args) => RE.F.callGM("scaleLightGroup", ...args),
    setLights: async (...args) => RE.F.callGM("setLights", ...args),
    setSounds: async (...args) => RE.F.callGM("setSounds", ...args),
    assignActor,
    toggleLights: (...args) => RE.F.callGM("toggleLights", ...args),
    toggleDarkness: () => RE.F.call("toggleDarkness"),
    resetSceneView: () => RE.F.call("forceView", "initial"),
    changeSceneMode: (mode, sceneName) => changeSceneMode(mode, sceneName),
    preloadBirth: () => RE.F.callGM("preloadSplashElement", "bloodbursterBirth"),
    loadBirth: () => RE.F.callGM("renderSplashElement", "bloodbursterBirth"),
    closeBirth: () => RE.F.callGM("closeSplashElement", "bloodbursterBirth"),
    preloadDeviation: () => RE.F.callGM("preloadSplashElement", "deviationAlert"),
    loadDeviation: () => RE.F.callGM("renderSplashElement", "deviationAlert"),
    closeDeviation: () => RE.F.callGM("closeSplashElement", "deviationAlert"),
    preloadStress: () => RE.F.callGM("preloadSplashElement", "increaseStress"),
    loadStress: () => RE.F.callGM("renderSplashElement", "increaseStress"),
    closeStress: () => RE.F.callGM("closeSplashElement", "increaseStress")
  };
  loadTemplates([
    ...renderMasterTemplates,
    ...charMasterTemplates,
    ...itemMasterTemplates
  ]);
  Handlebars.registerHelper({
    mergeDicePools: (actorData) => {
      const {attributes, skills} = actorData;
      for (const [attrName, attrData] of Object.entries(attributes)) {
        actorData.attributes[attrName] = {
          ...attrData,
          hasNegMod: attrData.value > attrData.mod,
          hasPosMod: attrData.value < attrData.mod,
          floorTotal: Math.max(attrData.mod, 0)
        };
      }
      for (const [skillName, skillData] of Object.entries(skills)) {
        actorData.skills[skillName] = {
          ...skillData,
          atrVal: attributes[skillData.ability].value,
          hasNegMod: skillData.value + attributes[skillData.ability].value > skillData.mod,
          hasPosMod: skillData.value + attributes[skillData.ability].value < skillData.mod,
          floorTotal: Math.max(skillData.mod, 0)
        };
      }
    },
    includeAllCrits: (actorData, critList) => actorData.items.filter((item) => item.type === "critical-injury")
  });
  console.log("██████ OVERRIDES INITIALIZATION COMPLETE █████████");
});
Hooks.on("ready", () => {
  if (RE.F.scenes[canvas.scene.name]?.isLandingPage) {
    game.user.character?.sheet?.close(true).then(() => {
      game.user.character?.sheet?.render(true, {left: 100, top: 50});
    });
  }
});
// #endregion ▄▄▄▄▄ ON INIT ▄▄▄▄▄

export default RE;