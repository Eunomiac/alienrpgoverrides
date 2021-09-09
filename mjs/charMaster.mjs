// #region ▮▮▮▮▮▮▮[IMPORTS]▮▮▮▮▮▮▮ ~
import {RE} from "./utils.mjs";
import {alienrpgActor} from "../../../systems/alienrpg/module/actor/actor.js";
import {alienrpgActorSheet} from "../../../systems/alienrpg/module/actor/actor-sheet.js";
import {alienrpgSynthActorSheet} from "../../../systems/alienrpg/module/actor/synth-sheet.js";
import {aliencrtActorSheet} from "../../alien-crt-ui/module/sheet/character-sheet.js";
import {aliencrtSynthActorSheet} from "../../alien-crt-ui/module/sheet/synth-sheet.js";
import {ActorSheetAlienRPGVehicle} from "../../../systems/alienrpg/module/actor/vehicles.js";
// #endregion ▮▮▮▮[IMPORTS]▮▮▮▮

// #region ████████ ACTOR DATA: Getter Functions for Common Actor Data ████████ ~
const getStatData = (actor) => Object.fromEntries([
    ...Object.values(actor.data.attributes),
    ...Object.values(actor.data.skills)
].map(({value, label}) => [label, value]));
const getInventoryData = (actor) => Object.fromEntries([
    ...actor.items.filter(({type, data: {header: {active}}}) => active && ["item", "weapon", "armor"].includes(type))
        .map(({name, img}) => [name, img])
]);
const getAgendaData = (actor) => Object.fromEntries([
    ...actor.items.filter(({type}) => type === "agenda")
        .map(({name, data: {general}}) => [name, general])
]);
const getTalentData = (actor) => Object.fromEntries([
    ...actor.items.filter(({type}) => type === "talent")
        .map(({name, data: {general: comment}}) => [name, comment])
]);
const getInjuryData = (actor) => Object.fromEntries([
    ...actor.items.filter(({type}) => type === "critical-injury")
        .map(({name, data: {attributes: effects}}) => [name, effects])
]);

const getActorData = (actor) => ({
    stats: getStatData(actor),
    items: getInventoryData(actor),
    agendas: getAgendaData(actor),
    talents: getTalentData(actor),
    injuries: getInjuryData(actor)
});
// #endregion ▄▄▄▄▄ ACTOR DATA ▄▄▄▄▄

// #region ████████ ACTOR ASSIGNMENT: Assigning Actors to Users ████████ ~
const assignActor = async (actorRef, userRef) => {
    // Find the Actor
    if (typeof actorRef === "string") {
        if (game.actors.get(actorRef)) {
            actorRef = game.actors.get(actorRef);
        } else {
            const regExpTest = new RegExp(actorRef.toLowerCase().replace(/[^a-z0-9]/g, ""));
            actorRef = game.actors.find((actor) => regExpTest.test(actor.name.toLowerCase().replace(/[^a-z0-9]/g, "")));
        }
    }
    if (!(actorRef instanceof alienrpgActor)) {
        throw new Error(`Unknown Actor Reference: '${JSON.stringify(actorRef)}'`);
        return false;
    }
    // Find the User
    if (typeof userRef === "string") {
        if (game.users.get(userRef)) {
            userRef = game.users.get(userRef);
        } else {
            const regExpTest = new RegExp(userRef.toLowerCase().replace(/[^a-z0-9]/g, ""));
            userRef = game.users.find((user) => regExpTest.test(user.name.toLowerCase().replace(/[^a-z0-9]/g, "")));
        }
    }
    if (!(userRef instanceof User)) {
        throw new Error(`Unknown User Reference: '${JSON.stringify(userRef)}'`);
        return false;
    }
    // Update the user's old character by removing permissions
    const formerActor = userRef.character;
    if (formerActor) {
        const {permission} = formerActor.data;
        delete permission[userRef.id];
        await userRef.character.update({permission});
    }

    userRef.character?.update({});
    // Update the user's character and avatar data.
    await userRef.update({
        avatar: actorRef.data.img,
        character: actorRef.id
    });
    // Update the user's new character by removing any other owner permissions and setting them as owner
    const permission = {};
    for (const [pKey, pVal] of Object.entries(actorRef.data.permission)) {
        if (pKey === "default" || pVal !== 3) {
            permission[pKey] = pVal;
        }
    }
    permission[userRef.id] = 3;
    await actorRef.update({permission});
    console.log(`Actor '${actorRef.name}' assigned to User '${userRef.name}'`);
    return true;
};
// #endregion ▄▄▄▄▄ ACTOR ASSIGNMENT ▄▄▄▄▄

// #region ████████ SHEET OVERRIDES: Overriding Actor Sheet with Subclass Extension ████████ ~
const sheetTemplates = {
    character: "modules/alienrpgoverrides/html/actor/character-sheet.html",
    synthetic: "modules/alienrpgoverrides/html/actor/synth-sheet.html",
    vehicles: "modules/alienrpgoverrides/html/actor/vehicles-sheet.html",
    tab_inventory: "modules/alienrpgoverrides/html/actor/tabs/actor-inventory.html"
};
class alienrpgoverridesActorSheet extends aliencrtActorSheet {
    get template() { return sheetTemplates.character }

    _rollCrit(event) {
        event.preventDefault();
        if (game.user.isGM) {
            RE.F.lastCritRoller = this.actor;
        } else {
            delete RE.F.lastCritRoller;
        }
        super._rollCrit(event);
    }
}
class alienrpgoverridesSynthActorSheet extends aliencrtSynthActorSheet {
    get template() { return sheetTemplates.synthetic }

    _rollCrit(event) {
        event.preventDefault();
        if (game.user.isGM) {
            RE.F.lastCritRoller = this.actor;
        } else {
            delete RE.F.lastCritRoller;
        }
        super._rollCrit(event);
    }
}

class alienrpgoverridesVehiclesActorSheet extends ActorSheetAlienRPGVehicle {
    get template() { return sheetTemplates.vehicles }
}
// #endregion ▄▄▄▄▄ SHEET OVERRIDES ▄▄▄▄▄

// #region ▮▮▮▮▮▮▮[EXPORTS]▮▮▮▮▮▮▮ ~
const templates = Object.values(sheetTemplates);
export {
    getActorData,
    assignActor,
    templates
};

export default (() => ({
    "~setup": () => {
        console.log("██████ SETTING UP CHARACTER SHEET OVERRIDES ... ██████");
        Actors.unregisterSheet("alienrpg", alienrpgActorSheet);
        Actors.unregisterSheet("alienrpg", aliencrtActorSheet);
        Actors.registerSheet("alienrpg", alienrpgoverridesActorSheet, {
            types: ["character"],
            makeDefault: true
        });
        Actors.unregisterSheet("alienrpg", alienrpgSynthActorSheet);
        Actors.unregisterSheet("alienrpg", aliencrtSynthActorSheet);
        Actors.registerSheet("alienrpg", alienrpgoverridesSynthActorSheet, {
            types: ["synthetic"],
            makeDefault: true
        });
        Actors.unregisterSheet("alienrpg", ActorSheetAlienRPGVehicle);
        Actors.registerSheet("alienrpg", alienrpgoverridesVehiclesActorSheet, {
            types: ["vehicles"],
            makeDefault: true
        });
        console.log("██████ CHARACTER SHEET OVERRIDING COMPLETE █████████");
    },
    "~createChatMessage": (message) => {
        console.log("██████ RECEIVED CHAT MESSAGE ██████");
        console.log(message);
        if (game?.user?.isGM && /Critical injuries table|Critical Injuries on Synthetics/i.test(message.data.flavor)) {
            console.log("██████ Is GM and Is Crit Injuries Table ██████");
            const critChar = message.user.id === game.user.id
                ? RE.F.lastCritRoller
                : game.users.get(message.user.id)?.character;
            console.log("... Fetching Character");
            console.log(critChar);
            if (critChar) {
                const critTable = game.tables.find((table) => (/Synthetics/.test(message.data.flavor)
                    ? table.name === "Critical Injuries on Synthetics"
                    : table.name === "Critical injuries"));
                const critID = message.roll.total;
                console.log(critTable, critID);
                if (typeof critID === "number") {
                    const critResult = Array.from(critTable.results)[message.roll.total - 1];
                    const critName = critResult.data.text.match(/>([A-Z ]+)<\/h1>/).pop() || "NO SUCH CRIT";
                    const critItem = game.items.find((item) => new RegExp(critName, "i").test(item.name));
                    console.log(critResult, critName);
                    console.log(critItem);
                    if (critItem) {
                        if (critChar.items.find((item) => item.name === critItem.name)) {
                            ui.notifications.error(`${critChar.name} Already Has '${critItem.name}' - Roll Again.`);
                        } else {
                            console.log("██████ CREATING ITEM WITH ITEM, ITEM.DATA: ██████");
                            console.log(critItem);
                            console.log(critItem.data);
                            critChar.createEmbeddedDocuments("Item", [critItem.data]).then(([crit]) => {
                                if (/>\s*(\d+)<\/a>\s*Days/i.test(message.data.content)) {
                                    const updateData = {_id: crit.id};
                                    const healTime = parseInt(message.data.content.match(/>\s*(\d+)<\/a>\s*Days/i).pop());
                                    updateData["data.attributes.timelimit.value"] = healTime;
                                    updateData["data.attributes.effects"] = critItem.data.data.attributes.effects.replace(/@@HEALTIME@@/, healTime)
                                        .replace(/1 Days/, "1 Day");
                                    critChar.updateEmbeddedDocuments("Item", [updateData]);
                                }
                            });
                        }
                    }
                }
            }
        }
    }
}))();
// #endregion ▮▮▮▮[EXPORTS]▮▮▮▮