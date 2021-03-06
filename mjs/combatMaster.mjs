import {RE, Cycle} from "./utils.mjs";

const ICONCLASSES = {
  stance: [
    ["None", "none", "fas fa-street-view"],
    ["Prone", "prone", "fas fa-running"],
    ["Grappling", "grappling", "fas fa-random"]
  ],
  readying: [
    ["None", "none", "far fa-circle"],
    ["Aiming", "aiming", "fas fa-crosshairs"],
    ["Overwatch", "overwatch", "far fa-eye"],
    ["Panic", "panic", "fas fa-flushed"],
    ["Helping", "helping", "fas fa-people-carry"]
  ],
  cover: [
    ["None", "none", "fas fa-shield-alt"],
    ["Light (2-3)", "light", "fas fa-shield-alt"],
    ["Full (4-5)", "full", "fas fa-shield-alt"],
    ["Armored (6-7)", "armored", "fas fa-shield-alt"]
  ]
};

const HTMLTEMPLATES = {
  Wrapper: (combatantID) => "<div class=\"combatant-wrapper flexrow\"></div>",
  ActionBox: (combatantID, {usedSlow, usedFast} = {}) => `<div class="combatant-action-box">${[
    `<img class="alienrpgoverrides-button fast-action-toggle" src="modules/alienrpgoverrides/assets/ui/fast-action-${usedFast ? "block" : "available"}.png" height="26px" width="20px" data-is-used="${usedFast ? 1 : 0}" data-combatant-id="${combatantID}">`,
    `<img class="alienrpgoverrides-button slow-action-toggle" src="modules/alienrpgoverrides/assets/ui/slow-action-${usedSlow ? "block" : "available"}.png" height="26px" width="20px" data-is-used="${usedSlow ? 1 : 0}" data-combatant-id="${combatantID}">`
  ].join("")}</div>`,
  CycleButton: (combatant, iconCategory) => {
    const curState = combatant.getFlag("alienrpgoverrides", `cyclebutton.${iconCategory}`);
    const curIndex = curState
      ? Math.max(0, ICONCLASSES[iconCategory].findIndex(([title]) => title === curState))
      : 0;
    const [title, className, iconClass] = ICONCLASSES[iconCategory][curIndex];
    return `
        <a class="combatant-control alienrpgoverrides-button cycle-button cycle-${iconCategory} ${className}" title="${iconCategory.toUpperCase()}: ${title}">
            <i class="${iconClass}"></i>
        </a>`;
  },
  ToggleButton: (combatant, title, toggleClass, isToggledFunc, iconClass) => `
        <a class="combatant-control alienrpgoverrides-button toggle-button ${isToggledFunc(combatant) ? toggleClass : ""}" title="${title}">
            <i class="${iconClass}"></i>
        </a>`,
  SwitchInitiative: (combatantID, switchFlag) => `
        <a class="combatant-control alienrpgoverrides-button switch-initiative ${switchFlag === combatantID ? "switcher" : ""} ${switchFlag ? "switch-active" : ""}" title="Switch Initiative">
            <i class="fas fa-people-arrows"></i>
        </a>`
};

export default (() => ({
  "~renderCombatTracker": (ctApp, ctHTML, ctData) => {
    if (ctData.combat) {
        /*DEVCODE*/
      console.log("?????????????????? OVERRIDING COMBAT TRACKER ... ??????????????????");
      console.log(ctApp);
      console.log(ctHTML);
      console.log(ctData);
          // Cycle through combatants, adding functionality:
          // - Push icons over token image to track usage of Slow/Fast Action
          //     - DOUBLE-CLICK: Toggles On/Off
          //     - SINGLE-CLICK: Cycles through various symbols for what action was/planned to be used for
          //          - Panic, Aim, Overwatch, Block...
          // - Icons before name showing various flag effects
          //     - Panic actions (automatically added from combat tracker)
          //     - Prone / Grapple / On Fire / Aiming / Overwatching <-- These toggle off at a click
          //
          //
          // - CYCLE BUTTON: "STANCE"
          //      - "Standing" --> Normal, Default Stance
          //      - "Prone"
          //      - "Grappled"
          // - CYCLE BUTTON: "READY"
          //      - "Reacting" --> Normal, Default Readiness
          //      - "Aiming"
          //      - "Overwatch"
          //      - "Helping"

          /*!DEVCODE*/
      ctData.combat.turns.forEach((combatant) => {
        ctHTML.find(`.combatant[data-combatant-id=${combatant.id}]`)
          .wrap(HTMLTEMPLATES.Wrapper(combatant.id))
          .before(HTMLTEMPLATES.ActionBox(
            combatant.id,
            {
              usedSlow: combatant.getFlag("alienrpgoverrides", "usedSlow"),
              usedFast: combatant.getFlag("alienrpgoverrides", "usedFast")
            }
          ))
          .find(".combatant-controls")
          .prepend([
            HTMLTEMPLATES.CycleButton(
              combatant,
              "stance"
            ),
            HTMLTEMPLATES.CycleButton(
              combatant,
              "readying"
            ),
            HTMLTEMPLATES.CycleButton(
              combatant,
              "cover"
            ),
            HTMLTEMPLATES.SwitchInitiative(
              combatant.id,
              ctData.combat.getFlag("alienrpgoverrides", "swapInitWith")
            )
          ].join(""));
        ctHTML.find(`.fast-action-toggle[data-combatant-id=${combatant.id}]`)
          .click(({target: {dataset: {isUsed}}}) => { combatant.setFlag("alienrpgoverrides", "usedFast", isUsed === "0") });
        ctHTML.find(`.slow-action-toggle[data-combatant-id=${combatant.id}]`)
          .click(({target: {dataset: {isUsed}}}) => { combatant.setFlag("alienrpgoverrides", "usedSlow", isUsed === "0") });
        ctHTML.find(`.combatant[data-combatant-id=${combatant.id}] .switch-initiative:not(.switcher)`)
          .click(() => {
            const swapInitWith = ctData.combat.getFlag("alienrpgoverrides", "swapInitWith");
            if (swapInitWith) {
              const combatantA = ctData.combat.turns.find((cbt) => cbt.id === swapInitWith);
              const [initA, initB] = [
                combatantA.initiative,
                combatant.initiative
              ];
              ctData.combat.updateEmbeddedDocuments("Combatant", [
                {_id: combatant.id, initiative: initA},
                {_id: combatantA.id, initiative: initB}
              ]);
              ctData.combat.setFlag("alienrpgoverrides", "swapInitWith", null);
            } else {
              ctData.combat.setFlag("alienrpgoverrides", "swapInitWith", combatant.id);
            }
          });
        ctHTML.find(`.combatant[data-combatant-id=${combatant.id}] .switcher`)
          .click(() => { ctData.combat.setFlag("alienrpgoverrides", "swapInitWith", null) });
        for (const iconCategory of Object.keys(ICONCLASSES)) {
          ctHTML.find(`.combatant[data-combatant-id=${combatant.id}] .cycle-${iconCategory}`)
            .click(() => {
              const curState = combatant.getFlag("alienrpgoverrides", `cyclebutton.${iconCategory}`);
              const curIndex = curState
                ? Math.max(0, ICONCLASSES[iconCategory].findIndex(([title]) => title === curState))
                : 0;
              const [title, className, iconClass] = ICONCLASSES[iconCategory][curIndex];
              const [newTitle] = Cycle(ICONCLASSES[iconCategory], curIndex);
              combatant.setFlag("alienrpgoverrides", `cyclebutton.${iconCategory}`, newTitle);
            });
        }
      });
          /*DEVCODE*/
      console.log("?????????????????? COMBAT TRACKER OVERRIDING COMPLETE ???????????????????????????");
          /*!DEVCODE*/
    }
  },
  "~updateCombat": (combat, ctData) => {
    console.log("... Checking Update Combat ...");
    console.log(combat);
    console.log(ctData);
    if (game.user.isGM) {
      if (ctData.turn === 0 && RE.F.combats[combat.id] !== ctData.turn) {
        console.log("*** *** *** UPDATING COMBAT! *** *** ***");
                // Reset all flags on all combatants to default.
        combat.updateEmbeddedDocuments("Combatant", combat.turns.map((turn) => ({
          "_id": turn.id,
          "flags.alienrpgoverrides.usedSlow": false,
          "flags.alienrpgoverrides.usedFast": false
        })));
        combat.setFlag("alienrpgoverrides", "swapInitWith", null);
      }
      RE.F.combats[combat.id] = ctData.turn;
    }
  }
}))();