/* eslint-disable */
const alienModuleExample = () => {
    Hooks.on("renderCombatTracker", (app, html, user) => {
        const effectIcons = html.find(".token-effect");
        effectIcons.each(function(i) {
            const rawPath = this.getAttribute("src");

            const combatantId = $(this).closest(".combatant").data("combatant-id");
            const combatant = game.combat?.combatants?.get(combatantId);
            const effect = combatant?.actor?.data?.effects?.find((e) => e.data.icon === rawPath);
            if (effect) {
                // Active effects based effect label
                this.title = effect.data.label;
            } else {
                // Legacy filename based effect name
                const strippedPath = stripQueryStringFromUrl(rawPath);
                const name = getFilenameFromUrl(strippedPath);
                this.title = toTitleCase(name);
            }
        });
    });

    function stripQueryStringFromUrl(url) {
        return url.split("#")[0].split("?")[0];
    }

    // url must not have query strings!
    function getFilenameFromUrl(url) {
        return url.split("/").pop().split(".").splice(0, 1)
            .join(" ");
    }

    function toTitleCase(str) {
        const words = str.toLowerCase().split(/[ \-_.]/);
        return words
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    }
};
const alienSystemExample = () => {
    Hooks.on("renderChatMessage", (message, html, data) => {
        html.find("button.alien-Push-button").each((i, li) => {
        // console.warn(li);
            li.addEventListener("click", (ev) => {
                const tarG = ev.target.previousElementSibling.checked;

                if (ev.target.classList.contains("alien-Push-button")) {
            // do stuff
                    const actor = game.actors.get(message.data.speaker.actor);
                    if (!actor) { return ui.notifications.warn(game.i18n.localize("ALIENRPG.NoToken")) }
                    let reRoll = "push";

                    if (tarG) {
                        reRoll = "mPush";
                    }
                    let hostile = actor.data.type,
                        blind = false,
            //  Initialse the chat message
                        chatMessage = "";

                    if (actor.data.token.disposition === -1) {
                        blind = true;
                    }
                    if (actor.data.type == "character") {
                        actor.update({"data.header.stress.value": actor.data.data.header.stress.value + 1});
                    } else { return }
                    const reRoll1 = game.alienrpg.rollArr.r1Dice - game.alienrpg.rollArr.r1Six;
                    const reRoll2 = game.alienrpg.rollArr.r2Dice + 1 - (game.alienrpg.rollArr.r2One + game.alienrpg.rollArr.r2Six);
                    yze.yzeRoll(hostile, blind, reRoll, game.alienrpg.rollArr.tLabel, reRoll1, game.i18n.localize("ALIENRPG.Black"), reRoll2, game.i18n.localize("ALIENRPG.Yellow"), actor.id);
                }
            });
        });
    });
};
/* eslint-enable */

/* const toggleAction = {
    fast: (combatant, elem) => {
        combatant.setFlag("alienrpgoverrides", "usedFast", elem.dataset.isUsed === "0");
    }
} (combatant, ) */

export default (() => ({
    "~renderCombatTracker": (ctApp, ctHTML, ctData) => {
        console.log("██████ OVERRIDING COMBAT TRACKER ... ██████");
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
        const HTMLTEMPLATES = {
            Wrapper: (combatantID) => "<div class=\"combatant-wrapper flexrow\"></div>",
            ActionBox: (usedSlow, usedFast, slowIcon, fastIcon, combatantID) => `<div class="combatant-action-box">${[
                `<div class="alienrpgoverrides-button fast-action-toggle ${fastIcon ? `icon-${fastIcon}` : ""}" data-is-used="${usedFast ? 1 : 0}" data-combatant-id="${combatantID}"></div>`,
                `<div class="alienrpgoverrides-button slow-action-toggle ${slowIcon ? `icon-${slowIcon}` : ""}" data-is-used="${usedSlow ? 1 : 0}" data-combatant-id="${combatantID}"></div>`
            ].join("")}</div>`
        };
        ctData.combat.turns.forEach((combatant) => {
            ctHTML.find(`.combatant[data-combatant-id=${combatant.id}]`)
                .wrap(HTMLTEMPLATES.Wrapper(combatant.id))
                .before(HTMLTEMPLATES.ActionBox(
                    combatant.getFlag("alienrpgoverrides", "usedSlow"),
                    combatant.getFlag("alienrpgoverrides", "usedFast"),
                    combatant.id
                ));
            ctHTML.find(`.alienrpgoverrides-button.fast-action-toggle[data-combatant-id=${combatant.id}]`)
                .each(function toggleFastAction() {
                    $(this).dblclick(({target}) => {
                        combatant.setFlag("alienrpgoverrides", "usedFast", target.dataset.isUsed === "0");
                    });
                });
            ctHTML.find(`.alienrpgoverrides-button.slow-action-toggle[data-combatant-id=${combatant.id}]`)
                .each(function toggleSlowAction() {
                    $(this).dblclick(({target}) => {
                        combatant.setFlag("alienrpgoverrides", "usedSlow", target.dataset.isUsed === "0");
                    });
                });
        });

        // Add listeners to rendered html for clicks and right clicks
        // ... and eventually drag-drop for switching combatant initiative values
        // ... or could just have a 'click button on first combatant' -> 'click button on second combatant' = SWITCH THEM
        console.log("██████ COMBAT TRACKER OVERRIDING COMPLETE █████████");
    }
}))();