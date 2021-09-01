import {templates as splashElementTemplates} from "./renderMaster.mjs";

export default async () => loadTemplates([
    // Splash HTML Elements.
    ...splashElementTemplates
]);