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
import lightMasterHooks from "./lightMaster.mjs";
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
    scenes: {
      "Alien: Chariot of the Gods": {isResettingViewOnActivate: true, isLandingPage: true},
      "USCSS Montero - Deck A": {isResettingViewOnActivate: true, ship: "Montero", deck: 1},
      "USCSS Cronus - Exterior": {isResettingViewOnActivate: true, ship: "Cronus", deck: 0},
      "USCSS Cronus - Deck A": {isResettingViewOnActivate: true, ship: "Cronus", deck: 1},
      "USCSS Cronus - Deck B": {isResettingViewOnActivate: true, ship: "Cronus", deck: 2},
      "USCSS Cronus - Deck C": {isResettingViewOnActivate: true, ship: "Cronus", deck: 3},
      "USCSS Cronus - Deck D": {isResettingViewOnActivate: true, ship: "Cronus", deck: 4}
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
    setLights: (...args) => RE.F.callGM("setLights", ...args),
    setSounds: (...args) => RE.F.callGM("setSounds", ...args),
    assignActor,
    toggleLights: (...args) => RE.F.callGM("toggleLights", ...args),
    toggleDarkness: () => RE.F.call("toggleDarkness"),
    resetSceneView: () => RE.F.call("forceView", "initial"),
    preloadBirth: () => RE.F.callGM("preloadSplashElement", "bloodbursterBirth"),
    loadBirth: () => RE.F.callGM("renderSplashElement", "bloodbursterBirth"),
    closeBirth: () => RE.F.callGM("closeSplashElement", "bloodbursterBirth"),
    preloadDeviation: () => RE.F.callGM("preloadSplashElement", "deviationAlert"),
    loadDeviation: () => RE.F.callGM("renderSplashElement", "deviationAlert"),
    closeDeviation: () => RE.F.callGM("closeSplashElement", "deviationAlert")
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