import {RE} from "./utils.mjs";

const VIEWS = {
    get current() { return canvas.scene._viewPosition },
    get initial() { return canvas.scene.data.initial },
    saved: false,
    lastScene: false
};
const setView = ({x, y, scale}) => {
    canvas.stage.pivot.set(x, y);
    canvas.stage.scale.set(scale);
};

export default (() => ({
    "~preUpdateScene": (scene) => {
        const [curScene, nextScene] = [canvas.scene, scene];
        console.log(`[PREUPDATE SCENE] ${curScene?.name} to ${nextScene?.name}`);
        if (curScene.name !== nextScene.name && RE.F.scenes[curScene.name]?.ship === RE.F.scenes[nextScene.name]?.ship) {
            console.log(`[PREUPDATE SCENE] Saving View: ${JSON.stringify(VIEWS.current)}`);
            VIEWS.saved = VIEWS.current;
            if (game.user.isGM) {
                RE.F.call("saveView");
            }
        } else {
            console.log("[PREUPDATE SCENE] Clearing View");
            VIEWS.saved = false;
        }
        VIEWS.lastScene = curScene;
        return true;
    },
    "~updateScene": (scene) => {
        const [curScene, nextScene] = [canvas.scene, scene];
        console.log(`[UPDATE SCENE] ${curScene?.name} to ${nextScene?.name}`);
        if (curScene.name !== nextScene.name && RE.F.scenes[curScene.name]?.ship === RE.F.scenes[nextScene.name]?.ship) {
            VIEWS.saved = VIEWS.current;
            console.log(`[UPDATE SCENE] Saving View: ${JSON.stringify(VIEWS.saved)}`);
        } else {
            VIEWS.saved = false;
            console.log("[UPDATE SCENE] Clearing View");
        }
        VIEWS.lastScene = curScene;
        return true;
    },
    "~canvasReady": () => {
        console.log("[CANVAS READY] Canvas Ready");
        if (VIEWS.saved) {
            console.log(`[CANVAS READY] Forcing View: ${JSON.stringify(VIEWS.saved)}`);
            setView(VIEWS.saved);
        } else if (RE.F.scenes[canvas.scene.name].isResettingViewOnActivate) {
            console.log(`[CANVAS READY] Resetting View: ${JSON.stringify(VIEWS.initial)}`);
            setView(VIEWS.initial);
        }
    },
    "unlockSceneView": (sceneName) => {
        RE.F.scenes[sceneName].isResettingViewOnActivate = false;
    },
    "forceView": (x, y, scale) => {
        if (/^i/.test(`${x}`)) {
            setView(VIEWS.initial);
        } else {
            setView({x, y, scale});
        }
    },
    "saveView": () => {
        console.log(`[SAVEVIEW] Saving View: ${JSON.stringify(VIEWS.current)}`);
        VIEWS.saved = VIEWS.current;
    }
}))();