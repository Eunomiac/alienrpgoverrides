import {RE} from "./utils.mjs";
import {getActorData} from "./charMaster.mjs";

const SPLASHDEFS = {
  bloodbursterBirth: {
    template: "modules/alienrpgoverrides/html/bloodbursterBirth.html",
    classes: ["masked-popout", "full-screen"],
    get position() { return getPositioning({padding: 0.1, aspectRatio: 1.77647}) },
    options: {
      assets: [
        "modules/alienrpgoverrides/assets/animation/bloodbursterBirth.webp",
        "modules/alienrpgoverrides/assets/sounds/script_bloodbursterBirth.ogg"
      ],
      isBringingToTop: true,
      isPlayingSoundOnRender: ["Soundboard", "Bloodburster Birth"]
    }
  },
  scenarioIntro: {
    template: "modules/alienrpgoverrides/html/landingPage/scenarioIntro.html",
    classes: ["masked-popout", "landing-page", "scenario-intro"],
    get position() { return {top: 0, left: window.outerWidth - 790, height: window.outerHeight, width: 790} },
    options: {
      assets: [
        "modules/alienrpgoverrides/assets/splash/travelMap.png"
      ]
    }
  },
  deviationAlert: {
    template: "modules/alienrpgoverrides/html/splash/deviationReport.html",
    classes: ["masked-popout", "deviation-report"],
    get position() { return getPositioning({padding: 0.5, aspectRatio: 900 / 575}) },
    options: {
      assets: [
        "modules/alienrpgoverrides/assets/splash/deviation-map.webp"
      ]
    }
  },
  increaseStress: {
    template: "modules/alienrpgoverrides/html/splash/increaseStress.html",
    classes: ["masked-popout", "quick-fade", "increase-stress"],
    get position() { return {top: 0, left: 0, height: window.innerHeight, width: window.innerWidth} },
    options: {
      assets: [
        "modules/alienrpgoverrides/assets/sounds/script_increaseStress.ogg"
      ],
      isBringingToTop: true,
      isPlayingSoundOnRender: ["Soundboard", "Increase Stress"]
    }
  }
};

const getPositioning = ({height, width, padding, aspectRatio}) => {
  if (height && width) {
    if (padding) {
      return getPositioning({padding, aspectRatio: width / height});
    }
    console.log(`Final Get Position Return: ${JSON.stringify({
      top: 0.5 * (window.innerHeight - height),
      left: 0.5 * (window.innerWidth - width),
      height,
      width
    })}`);
    return {
      top: 0.5 * (window.innerHeight - height),
      left: 0.5 * (window.innerWidth - width),
      height,
      width
    };
  } else {
        // Determine height and width from provided data, then recall function with {height, width}
    if (height && aspectRatio) {
      width = parseInt(height * aspectRatio);
    } else if (height && padding) {
      width = parseInt(padding <= 1
        ? window.innerWidth * (1 - (0.5 * padding))
        : window.innerWidth - (2 * padding));
    } else if (width && aspectRatio) {
      height = parseInt(width / aspectRatio);
    } else if (width && padding) {
      height = parseInt(padding <= 1
        ? window.innerHeight * (1 - (0.5 * padding))
        : window.innerHeight - (2 * padding));
    } else if (padding && aspectRatio) {
      if (window.innerWidth / window.innerHeight > aspectRatio) {
                // Apply padding to horizontal axis.
        width = parseInt(padding <= 1
          ? window.innerWidth * (1 - (0.5 * padding))
          : window.innerWidth - (2 * padding));
        return getPositioning({width, aspectRatio});
      } else {
                // Apply padding to vertical axis.
        height = parseInt(padding <= 1
          ? window.innerHeight * (1 - (0.5 * padding))
          : window.innerHeight - (2 * padding));
        return getPositioning({height, aspectRatio});
      }
    }
    return getPositioning({height, width});
  }
};

class SplashElement {
  static get All() { return (this._elements = this._elements ?? {}) }

  static getTemplate(id) { return SPLASHDEFS[id]?.template }
  static getClasses(id) { return SPLASHDEFS[id]?.classes || [] }
  static getOptions(id) { return SPLASHDEFS[id]?.options || {} }

  constructor(type, {top, left, height, width} = {}, options = {}) {
    const [template, classes, baseOptions] = [
      SplashElement.getTemplate(type),
      SplashElement.getClasses(type),
      SplashElement.getOptions(type)
    ];
    if (template) {
      this._type = type;
      this._template = template;
      this._classes = classes;
      this._top = top;
      this._left = left;
      this._height = height;
      this._width = width;
      this._options = {...baseOptions, ...options};
      this.parseOptions();
      this.create();
    } else {
      throw new Error(`Unrecognized type: ${type}`);
    }
  }

  parseOptions() {
    this._assets = this._options.assets ?? false;
    this._isBringingToTop = this._options.isBringingToTop ?? false;
    this._isPlayingSoundOnRender = Boolean(this._options.isPlayingSoundOnRender ?? false);
  }

  get playlist() {
    return (this._playlist = this._playlist ?? game.playlists.find((playlist) => playlist.name === this._options.isPlayingSoundOnRender[0]));
  }
  get playlistSound() {
    return (this._playlistSound = this._playlistSound ?? this._playlist?.sounds.find((sound) => sound.name === this._options.isPlayingSoundOnRender[1]));
  }

  create() {
    this._element = new Application({
      popOut: true,
      template: this._template,
      classes: this._classes
    });
  }

  async preload() {
    if (this._assets) {
      await TextureLoader.loader.load(this._assets);
    }
    return true;
  }

  async render() {
    if (this._element) {
      await this._element.render(true, {
        top: this._top,
        left: this._left,
        height: this._height,
        width: this._width,
        focus: true
      });
      if (this._isPlayingSoundOnRender) {
        this.playlist?.playSound(this.playlistSound);
      }
      if (this._isBringingToTop) {
        this._element.bringToTop();
      }
      return true;
    } else {
      console.error("Must create the Application element before rendering it!");
      return false;
    }
  }

  async close() {
    await this._element.close();
  }
}

export const templates = Object.values(SPLASHDEFS).map((splashDef) => splashDef.template);

export default (() => ({
  "~init": () => {
    for (const [id, {position}] of Object.entries(SPLASHDEFS)) {
      SplashElement.All[id] = new SplashElement(id, position);
    }
  },
  "~canvasReady": () => ["scenarioIntro"].forEach((id) => {
    console.log(`[CANVAS READY] Preparing ${id}...`);
    if (RE.F.scenes[canvas.scene.name]?.isLandingPage) {
      console.log(`[CANVAS READY] ... RENDERING ${id}`);
      SplashElement.All[id]?.render();
    } else {
      console.log(`[CANVAS READY] ... CLOSING ${id}`);
      SplashElement.All[id]?.close();
    }
  }),
  "preloadSplashElement": (id) => { SplashElement.All[id]?.preload() },
  "renderSplashElement": (id) => { SplashElement.All[id]?.render() },
  "closeSplashElement": (id) => { SplashElement.All[id]?.close() }
}))();