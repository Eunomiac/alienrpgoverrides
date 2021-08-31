import {templates as splashElementTemplates} from "./renderMaster.mjs";

export const preloadHandlebarsTemplates = async function() {
    return loadTemplates([
        // Splash HTML Elements.
        ...splashElementTemplates
    ]);
};