import {RE} from "./utils.mjs";

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

export {getActorData, getStatData, getInventoryData, getAgendaData, getTalentData, getInjuryData};