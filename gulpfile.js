// #region ████████ CONFIGURATION: Define Parsing Behavior ████████
const CURRENTVERSION = "0.0.3";
const BUILDFILES = {
    js: {
        "./dist/mjs": ["mjs/**/*.mjs"]
    },
    css: {
        "./dist/css/": ["scss/**/*.scss"],
        "./css/": ["scss/**/*.scss"]
    },
    html: {
        "./dist/html": []
    }
};
const REGEXPPATTERNS = {
    js: [
        [ // Insert date and version info into file headers.
            /^\|\* {5}▌█+v@@VERSION@@█+@@DATE@@█+.*?$/gmu,
            (match) => {
                const subStrs = `|*     ▌██ v${currentVersionInfo.version} ██ ${currentVersionInfo.date} ██▐     *|`.split(/█/u);
                const lengthDiff = match.length - subStrs.join("").length;
                subStrs[1] = "█".repeat(Math.floor((lengthDiff - 2) / 2));
                subStrs[3] = "█".repeat(2 + (lengthDiff % 2));
                [, subStrs[5]] = subStrs;
                return subStrs.join("");
            }
        ],
        [/\n?\s*\/\*~(.|\n)*?~\*\/\n?/gs, ""], // Strip multi-line comments of form '/*~ ... ~*/'
        [/\n?\s*\/\*\*(.|\n)*?\*\/\n?/gs, ""], // Strip multi-line comments beginning with '/**'
        [/\n?\s*\/\/~.*?$/gm, ""], // Strip single-line comments beginning with '//~'
        [/\s*\/\/\s*eslint.*$/gm, ""], // Strip eslint enable/disable single-line comments
        [/\s*\/\*\s*eslint[^*]*\*\/\s*/g, ""], // Strip eslint enable/disable mult-line comments
        [/\s*\/\/ no default.*$/gm, ""], // Strip '// no default'
        [/\s*\/\/ falls through.*$/gm, ""], // Strip '// falls through'
        [/\s*~$/gm, ""], // Strip '~' from end-of-lines (used for automatic region folding)
        [/#reg.*? /gs, ""], // Convert region headers to standard headers
        // [/\n?\s*\/\/ #endreg[^\n]+/gs, ""] // Remove region footers
        [/^\s*\/\/ #endreg.*$/gm, ""], // Remove region footers
        [/(\s*\n\s*)+/g, "$1"], // Strip excess blank lines
        [/\s*\n$/g, ""], // Strip whitespace from end of files
        [/^\s*\n/g, ""] // Strip whitespace from start of files
    ]
};
// #endregion ▄▄▄▄▄ CONFIGURATION ▄▄▄▄▄

// #region ▒░▒░▒░▒[INITIALIZATION]▒░▒░▒░▒ ~
const {src, dest, series, parallel, watch} = require("gulp");
const prefix = require("gulp-autoprefixer");
const replacer = require("gulp-replace");
const sass = require("gulp-sass")(require("node-sass"));

const currentVersionInfo = {
    version: CURRENTVERSION,
    date: new Date().toString().match(/\b[A-Z][a-z]+ \d+ \d+/).shift()
};
const BUILDFUNCS = {};
const DEFAULTBUILDFUNCS = [];
// #endregion ▒▒▒▒[INITIALIZATION]▒▒▒▒

// #region ████████ JS: Compiling Javascript ████████ ~
const BUILDFUNCS_JS = ((sourceDestGlobs) => {
    const compiledJSFuncs = [];
    for (const [destGlob, sourceGlobs] of Object.entries(sourceDestGlobs)) {
        for (const sourceGlob of sourceGlobs) {
            compiledJSFuncs.push(() => REGEXPPATTERNS.js
                .reduce((gulper, replaceArgs) => gulper.pipe(replacer(...replaceArgs)), src(sourceGlob))
                .pipe(dest(destGlob)));
        }
    }
    return compiledJSFuncs;
})(BUILDFILES.js);

if (BUILDFUNCS_JS.length) {
    BUILDFUNCS.js = series(...BUILDFUNCS_JS);
    DEFAULTBUILDFUNCS.push(parallel(BUILDFUNCS.js));
}
// #endregion ▄▄▄▄▄ JS ▄▄▄▄▄
// #region ████████ CSS: Compiling CSS ████████ ~
const BUILDFUNCS_CSS = ((sourceDestGlobs) => {
    const compiledCSSFuncs = [];
    for (const [destGlob, sourceGlobs] of Object.entries(sourceDestGlobs)) { 
        for (const sourceGlob of sourceGlobs) { 
            compiledCSSFuncs.push(
                () => src(sourceGlobs)
                    .pipe(sass({outputStyle: "expanded"})
                        .on("error", function reportError(err) { console.log(err.toString()); this.emit("end") }))
                    .pipe(prefix({cascade: false}))
                    .pipe(dest(destGlob))
            );
        }
    }
    return compiledCSSFuncs;
})(BUILDFILES.css);

if (BUILDFUNCS_CSS.length) {
    BUILDFUNCS.css = series(...BUILDFUNCS_CSS);
    DEFAULTBUILDFUNCS.push(parallel(BUILDFUNCS.css));
}
// #endregion ▄▄▄▄▄ CSS ▄▄▄▄▄
// #region ████████ HTML: Compiling HTML ████████ ~
const BUILDFUNCS_HTML = ((sourceDestGlobs) => {
    const compiledHTMLFuncs = [];
    for (const [destGlob, sourceGlobs] of Object.entries(sourceDestGlobs)) {
        for (const sourceGlob of sourceGlobs) {
            compiledHTMLFuncs.push(() => src(sourceGlobs)
                .pipe(sass({outputStyle: "expanded"})
                    .on("error", function reportError(err) { console.log(err.toString()); this.emit("end") }))
                .pipe(prefix({cascade: false}))
                .pipe(dest(destGlob)));
        }
    }
    return compiledHTMLFuncs;
})(BUILDFILES.html);

if (BUILDFUNCS_HTML.length) {
    BUILDFUNCS.html = series(...BUILDFUNCS_HTML);
    DEFAULTBUILDFUNCS.push(parallel(BUILDFUNCS.html));
}
// #endregion ▄▄▄▄▄ HTML ▄▄▄▄▄
// #region ████████ WATCH: Watch Tasks to Fire On File Update ████████ ~
function watchUpdates() {
    for (const type of Object.keys(BUILDFUNCS)) {
        Object.values(BUILDFILES[type] || {}).forEach((sourceGlob) => watch(sourceGlob, BUILDFUNCS[type]));
    }
}
BUILDFUNCS.watch = watchUpdates;
DEFAULTBUILDFUNCS.push(watchUpdates);
// #endregion ▄▄▄▄▄ WATCH ▄▄▄▄▄

// #region ▒░▒░▒░▒[EXPORTS]▒░▒░▒░▒ ~
exports.default = series(...DEFAULTBUILDFUNCS);
for (const [expType, expFunc] of Object.entries(BUILDFUNCS)) {
    exports[expType] = expFunc;
}
// #endregion ▒▒▒▒[EXPORTS]▒▒▒▒
