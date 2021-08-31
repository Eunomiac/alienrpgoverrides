const SPLASHDEFS = {
    bloodbursterBirth: {
        template: "systems/alienrpg/module/alienrpgoverrides/templates/bloodbursterBirth.html",
        classes: ["maskedPopout", "bloodbursterBirth"],
        get position() { return getPositioning({padding: 0.1, aspectRatio: 1.7764705882352941176470588235294}) },
        options: {
            assets: [
                "systems/alienrpg/module/alienrpgoverrides/templates/assets/bloodbursterBirth.webp"
            ],
            isBringingToTop: true
        }
    }
};

const getPositioning = ({height, width, padding, aspectRatio}) => {
    if (height && width) {
        return {
            top: 0.5 * (window.innerHeight - height),
            left: 0.5 * (window.innerWidth - width),
            height,
            width
        };
    } else {
        // Determine height and width from provided data.
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

export const hooks = {
    init: () => {
        for (const [id, {position, options}] of Object.entries(SPLASHDEFS)) {
            SplashElement.All[id] = new SplashElement(
                id,
                position,
                options
            );
        }
    },
    ARPGO_preloadSplashElement: (id) => {SplashElement.All[id]?.preload()},
    ARPGO_renderSplashElement: (id) => {SplashElement.All[id]?.render()},
    ARPGO_closeSplashElement: (id) => {SplashElement.All[id]?.close()}
};

export const templates = Object.values(SPLASHDEFS).map((splashDef) => splashDef.template);

export class SplashElement {
    static get All() { return (this._elements = this._elements ?? {}) }

    static getTemplate(id) { return SPLASHDEFS[id]?.template }
    static getClasses(id) { return SPLASHDEFS[id]?.classes || [] }
    static getOptions(id) { return SPLASHDEFS[id]?.options || {} }

/*     static registerHooks() {
        Hooks.on("init", () => {
            for (const [id, {position, options}] of Object.entries(SPLASHDEFS)) {
                SplashElement.All[id] = new SplashElement(
                    id,
                    position,
                    options
                );
            }
        });
        Hooks.on("ARPGO_preloadSplashElement", (id) => {
            SplashElement.All[id]?.preload();
        });
        Hooks.on("ARPGO_renderSplashElement", (id) => {
            SplashElement.All[id]?.render();
        });
        Hooks.on("ARPGO_closeSplashElement", (id) => {
            SplashElement.All[id]?.close();
        });
    } */

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
            throw `Unrecognized type: ${type}`;
        }
    }

    parseOptions() {
        this._assets = this._options.assets ?? false;
        this._isBringingToTop = this._options.isBringingToTop ?? false;
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
            await this._element.render(true, {top: this._top, left: this._left, height: this._height, width: this._width, focus: true});
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