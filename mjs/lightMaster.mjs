const RE = {
    get F() { return game.alienrpgoverrides },
    set F(v) { game.alienrpgoverrides = v }
};
const parseLightUpdateData = (groupRef, upData) => {
    const updateData = [];
    if (typeof groupRef === "object") {
        for (const [gRef, uData] of Object.entries(groupRef)) {
            updateData.push(...parseLightUpdateData(gRef, uData));
        }
    } else {
        const regExpTest = new RegExp(groupRef.toLowerCase());
        updateData.push(...canvas.scene.lights.filter((light) => regExpTest.test(light.data.flags?.alienrpgoverrides?.group?.toLowerCase()))
            .map((light) => ({_id: light.id, ...upData})));
    }
    return updateData;
};

export default (() => ({
    ARPGO_toggleLights: (groupRef, isActive) => {
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
            canvas.scene.updateEmbeddedDocuments("AmbientLight", updateData);
        }
    },
    ARPGO_toggleDarkness: async () => {
        const targetDarkLevel = canvas.lighting.darknessLevel === 1 ? 0 : 1;
        await canvas.lighting.animateDarkness(targetDarkLevel, 20000);
        if (game.user.isGM) {
            canvas.scene.update({darkness: targetDarkLevel});
        }
    },
    ARPGO_setLights: async (groupRef, updateData) => {
        if (game.user.isGM) {
            updateData = parseLightUpdateData(groupRef, updateData);
            await canvas.scene.updateEmbeddedDocuments("AmbientLight", updateData);
        }
    }
}))();