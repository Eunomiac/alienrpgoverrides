import {RE} from "./utils.mjs";

const parseLightUpdateData = (groupRef, upData) => {
    const updateData = [];
    if (typeof groupRef === "object") {
        for (const [gRef, uData] of Object.entries(groupRef)) {
            updateData.push(...parseLightUpdateData(gRef, uData));
        }
    } else {
        const regExpTest = new RegExp(groupRef, "ui");
        updateData.push(...canvas.scene.lights.filter((light) => regExpTest.test(light.data.flags?.alienrpgoverrides?.group))
            .map((light) => ({_id: light.id, ...upData})));
    }
    return updateData;
};

export default (() => ({
    toggleLights: async (groupRef, isActive) => {
        if (game.user.isGM) {
            const updateData = [];
            if (typeof groupRef === "object") {
                for (const [gRef, iActive] of Object.entries(groupRef)) {
                    groupRef[gRef] = {hidden: !iActive};
                }
                updateData.push(...parseLightUpdateData(groupRef));
            } else {
                updateData.push(...parseLightUpdateData(groupRef, {hidden: !isActive}));
            }
            return canvas.scene.updateEmbeddedDocuments("AmbientLight", updateData);
        }
        return false;
    },
    toggleDarkness: async () => {
        const targetDarkLevel = canvas.lighting.darknessLevel === 1 ? 0 : 1;
        return canvas.lighting.animateDarkness(targetDarkLevel, 20000).then(() => {
            if (game.user.isGM) {
                return canvas.scene.update({darkness: targetDarkLevel});
            }
            return false;
        });
    },
    setLights: async (groupRef, updateData) => {
        if (game.user.isGM) {
            return canvas.scene.updateEmbeddedDocuments("AmbientLight", parseLightUpdateData(groupRef, updateData));
        }
        return false;
    }
}))();