import {RE} from "./utils.mjs";

const parseLightAdjustmentData = (light, upData) => {
  const updateData = {...upData};
  if (light) {
    for (const [key, val] of Object.entries({...upData})) {
      if (/%$/.test(key)) {
        if (key === "intensity%") {
          const curIntensity = light.data.tintAlpha ** (1 / 2.2);
          updateData.intensity = curIntensity * val;
          delete updateData["intensity%"];
        } else {
          const realKey = key.slice(0, -1);
          const curValue = light.data[realKey];
          const newValue = curValue * val;
          updateData[realKey] = newValue;
          delete updateData[key];
        }
      }
    }
    if ("intensity" in updateData) {
      updateData.tintAlpha = Math.max(0, Math.min(1, updateData.intensity ** 2.2));
      delete updateData.intensity;
    }
  }
  return updateData;
};

const parseLightUpdateData = (groupRef, upData, scene) => {
  scene = scene ?? canvas.scene;
  const updateData = [];
  if (typeof groupRef === "object") {
    for (const [gRef, uData] of Object.entries(groupRef)) {
      updateData.push(...parseLightUpdateData(gRef, uData, scene));
    }
  } else {
    const regExpTest = new RegExp(groupRef, "ui");
    updateData.push(...scene.lights.filter((light) => regExpTest.test(light.data.flags?.alienrpgoverrides?.group))
      .map((light) => ({_id: light.id, ...parseLightAdjustmentData(light, upData)})));
  }
  return updateData;
};

const parseSoundUpdateData = (soundName, upData, scene) => {
  scene = scene ?? canvas.scene;
  const updateData = [];
  if (typeof soundName === "object") {
    for (const [sName, uData] of Object.entries(soundName)) {
      updateData.push(...parseSoundUpdateData(sName, uData, scene));
    }
  } else {
    const regExpTest = new RegExp(soundName, "ui");
    updateData.push(...scene.sounds.filter((sound) => regExpTest.test(sound.data.path))
      .map((sound) => ({_id: sound.id, ...upData})));
  }
  return updateData;
};

export const setLights = async (groupRef, updateData, scene) => {
  scene = scene ?? canvas.scene;
  await scene.updateEmbeddedDocuments("AmbientLight", parseLightUpdateData(groupRef, updateData, scene));
  return true;
};

export const setSounds = async (soundName, updateData, scene) => {
  scene = scene ?? canvas.scene;
  await scene.updateEmbeddedDocuments("AmbientSound", parseSoundUpdateData(soundName, updateData, scene));
  return true;
};

export default (() => ({
  toggleLights: async (groupRef, isActive, scene) => {
    if (game.user.isGM) {
      scene = scene ?? canvas.scene;
      const updateData = [];
      if (typeof groupRef === "object") {
        for (const [gRef, iActive] of Object.entries(groupRef)) {
          groupRef[gRef] = {hidden: !iActive};
        }
        updateData.push(...parseLightUpdateData(groupRef));
      } else {
        updateData.push(...parseLightUpdateData(groupRef, {hidden: !isActive}));
      }
      return scene.updateEmbeddedDocuments("AmbientLight", updateData);
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
  setLights: (groupRef, updateData, scene) => {
    if (game.user.isGM) {
      setLights(groupRef, updateData, scene);
    }
  },
  setSounds: (soundName, updateData, scene) => {
    if (game.user.isGM) {
      setSounds(soundName, updateData, scene);
    }
  },
  scaleLightGroup: async (groupRef, {bright, dim, intensity, radius}, scene) => {
    if (game.user.isGM) {
      scene = scene ?? canvas.scene;
      return scene.updateEmbeddedDocuments(
        "AmbientLight",
        parseLightUpdateData(groupRef,
                             scene.getEmbeddedCollection("AmbientLight")
                               .filter((light) => new RegExp(groupRef, "ui").test(light.getFlag("alienrpgoverrides", "group")))
                               .map((groupLight) => ({
                                 _id: groupLight.id,
                                 bright: Math.max(groupLight.data.bright, groupLight.data.dim) * (bright ?? 1),
                                 dim: Math.max(groupLight.data.bright, groupLight.data.dim) * (dim ?? 1),
                                 tintAlpha: groupLight.data.tintAlpha * (intensity ?? 1),
                                 radius: groupLight.data.radius * (radius ?? 1)
                               })))
      );
    }
    return false;
  }
}))();

/*
let multBRIGHT = 0,
    multDIM = 1.5;

canvas.scene.updateEmbeddedDocuments("AmbientLight", Array.from(canvas.scene.getEmbeddedCollection("AmbientLight")
  // .filter((light) => new RegExp("SHIPLIGHTS-AWAKE", "ui").test(light.getFlag("alienrpgoverrides", "group")))
  .map((groupLight) => {
    const radius = groupLight.getFlag("alienrpgoverrides", "radius") ?? Math.max(groupLight.data.bright, groupLight.data.dim);
    const bright = radius * multBRIGHT;
    const dim = radius * multDIM;
    return {
      "_id": groupLight.id,
      bright,
      dim,
      "data.flag.alienrpgoverrides.radius": radius
    };
  })));

  */