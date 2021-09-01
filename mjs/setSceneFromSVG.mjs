/* ████████ USAGE ████████████████████████████████████████████████████████████████████████████████████████████████████
   █
   █ ░░░░ [1] SET UP YOUR SCENE ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
   █ ░      - Set "Padding Percentage" to 0. (Sorry, I haven't included support for scene padding;
   █ ░                                        you can always just pad your background image instead.)
   █ ░      - Ensure "Scene Dimensions" are the same as your background image. (Or, at least, the
   █ ░                                        same aspect ratio --- but you'll have to scale the
   █ ░                                        image to the scene size before you add walls to it in your
   █ ░                                        SVG editor.)
   █
   █ ░░░░ [2] SET UP YOUR EDITOR ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
   █ ░      - Open your background map image into an image editor capable of drawing vector graphics
   █ ░        and exporting them in the SVG format (e.g. Adobe Illustrator)
   █ ░      - Make sure the dimensions of your SVG image *exactly* match your Scene Dimensions.
   █ ░      - If your background image doesn't exactly match your Scene Dimensions, scale it so that it does
   █
   █ ░░░░ [3] DRAW WALLS ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
   █ ░      These instructions assume you're using Adobe Illustrator, but they shouldn't be too hard to translate.
   █ ░      - Activate Pixel Snapping (or whatever feature ensures points snap to integer pixel coordinates)
   █ ░      - Draw walls over your map with the Pen tool, following TWO IMPORTANT RULES:
   █ ░
   █ ░        1) The STROKE COLOR must *exactly* match a recognized wall type:
   █ ░                '#FFFF00' (yellow) = Normal Wall
   █ ░                '#FF00FF' (magenta) = Normal Door
   █ ░                '#00FF00' (green) = Terrain Wall
   █ ░                '#FFFFFF' (white) & '#000000' (black) = "Non-Walls" ignored by this function; you can use
   █ ░                                                        them to draw guides or as rough drafts, etc.
   █ ░             You can define additional wall types and their colors by editing the wall definitions object
   █ ░             within the 'setSceneFromSVG' function, below.
   █ ░
   █ ░        2) ONLY 'line' and 'polyline' (a series of connected lines) objects will be recognized as walls.
   █ ░           - Other object types will be ignored. If you see missing walls, it's most likely because the
   █ ░             missing walls were drawn as an invalid object type. Open up your SVG file in a text editor
   █ ░             (ignore all the code relating to the background image), look for the 'line' and 'polylines'
   █ ░             of any walls that *did* draw, and you should see other, non-line/polyline objects nearby.
   █ ░           - To AVOID invalid object types (i.e. to ENSURE all your walls are 'lines' or 'polylines'):
   █ ░               * Don't CLOSE any of your polyline paths (by clicking on the start point to complete the shape).
   █ ░                 Instead, hit Escape to stop drawing your line without closing it. (To build walls that do form
   █ ░                 a closed shape, create the final line segment on a new layer as a separate line object, leaving
   █ ░                 the rest of the shape as an unclosed polyline path)
   █ ░               * Your lines can't include points with bezier curve handles (be careful if your software
   █ ░                 automatically creates them when you drag a point --- sometimes they'll be created accidentally)
   █
   █ ░░░░ [4] DRAW LIGHTS ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
   █ ░      Using the Shape: Ellipse tool, add lights to your scene, following these rules:
   █ ░
   █ ░        1) The shape must be a CIRCLE (i.e. with a constant radius).
   █ ░           - The BRIGHT and DIM LIGHT RANGES of the light source will match the RADIUS of the circle
   █ ░           - The COLOR of the light source will match the FILL COLOR of the circle
   █ ░
   █ ░      You can override this behavior by entering light source data into the 'LIGHTSOVERRIDES' variable. All
   █ ░      lights will be updated with this data once created.
   █
   █ ░░░░ [5] PREPARE AND RUN THE SCRIPT ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
   █ ░      - Copy the text from your .svg file and paste it where indicated in the code below.
   █ ░      - Run either 'setSceneFromSVG()' or 'addWallsFromSVG()' (the first function will clear the scene of
   █ ░        existing walls before generating those from your .svg file; the second will leave all walls intact)
   █ ░    (How to run these functions in your game is beyond the scope of this intro. You could register them to your
   █ ░     game object and call them by macro, or you could import them into your own API scripts.)
   █
   ███████████████████████████████████████████████████████████████████████████████████████████████████████████████████ */
/* ████████ EXAMPLE ██████████████████████████████████████████████████████████████████████████████████████████████████
   █
   █ An example .svg walls file and its corresponding .webp background map image are available at the links below.
   █    - Open the .svg file in your editor as an example to follow
   █    - View the .svg file in a text editor to see the <line> and <polyline> wall objects
   █    - Create a scene in Foundry (Padding Percentage = 0, Scene Dimensions = width: 3500, height: 4500), set
   █      the background image to the provided example, copy the text from the .svg file into the "SVGCODE" variable,
   █      then run the 'setSceneFromSVG' function to see the code in action.
   █
   ███████████████████████████████████████████████████████████████████████████████████████████████████████████████████ */
/* ██████████ REPLACE XML CODE BELOW WITH CODE COPIED FROM THE TEXT OF YOUR SVG FILE █████████████████████████████████ */
const LIGHTOVERRIDES = {
    percentBright: 0,
    percentDim: 1,
    tintAlpha: 0.5,
    angle: 360
};
const LIGHTCORRECTIONS = {
    // For some reason, direct pixel conversion of both radius and intensity must be scaled to result in matching values
    // in FoundryVTT.  These are the "correcting" multipliers that should result in your SVG shapes translating into
    // matching Foundry objects.
    //
    // If future updates change (or fix) this behavior, you may need to adjust these values.
    //
    // Because they are multipliers, to remove the correction entirely, set the value to '1' (not '0').
    tintAlpha: 0.6,
    radius: 1.79
};
const LIGHTCLASSES = {
    dimAmber: {
        percentBright: 0,
        percentDim: 1,
        tintAlpha: 0.12,
        hidden: true
    },
    awakeAmber: {
        percentBright: 0,
        percentDim: 1,
        tintAlpha: 0.4,
        hidden: true
    },
    coldSmoke: {
        lightAnimation: {
            type: "SecretFireSmoke Patch",
            speed: 10,
            intensity: 1
        },
        tintAlpha: 0.6
    },
    cryoSleep: {
        tintColor: "#ffbb00",
        tintAlpha: 0.5,
        percentBright: 1,
        percentDim: 1,
        lightAnimation: {
            type: "pulse",
            speed: 1,
            intensity: 8
        }
    },
    muthurSleep: {
        tintColor: "#ffbb00",
        tintAlpha: 0.5,
        percentBright: 1,
        percentDim: 1,
        lightAnimation: {
            type: "pulse",
            speed: 1,
            intensity: 8
        }
    },
    terminalBlink: {
        lightAnimation: {
            type: "BlitzAlternate Torch",
            intensity: 10,
            speed: 10,
            alterAlpha: true,
            alterTranslation: true,
            blueStrength: 31,
            ratioDamper: 1,
            secondaryColor: "#ffff00"
        },
        hidden: true
    },
    muthurChroma: {
        lightAnimation: {
            type: "chroma",
            intensity: 10,
            speed: 10
        },
        hidden: true
    },
    legend: {
        bright: 20,
        dim: 0,
        tintAlpha: 0.4,
        t: "g",
        lightAnimation: {
            type: "BlitzElectric Fault",
            speed: 6,
            intensity: 3
        }
    },
    extArcUp: {
        angle: 160,
        rotation: 180,
        t: "g",
        percentBright: 1,
        percentDim: 1,
        lightAnimation: {
            type: "BlitzElectric Fault",
            speed: 2,
            intensity: 10
        }
    },
    exterior: {
        t: "g",
        percentBright: 1,
        percentDim: 1,
        lightAnimation: {
            type: "BlitzElectric Fault",
            speed: 2,
            intensity: 10
        }
    }
};

export default async (svgXML, isClearingExistingLights = false, isClearingExistingWalls = true) => {
    const {scene} = canvas;
    if (typeof svgXML === "string" && /<((poly)?line|circle)/.test(svgXML)) {
        // Clear existing walls, if indicated.
        if (isClearingExistingWalls) {
            await scene.deleteEmbeddedDocuments("Wall", scene.getEmbeddedCollection("Wall").map((wall) => wall.id));
        }
        // Clear existing lights, if indicated.
        if (isClearingExistingLights) {
            await scene.deleteEmbeddedDocuments("AmbientLight", scene.getEmbeddedCollection("AmbientLight").map((wall) => wall.id));
        }
        // Extract array of '<g>, </g>, <polyline>', '<line>' and '<circle>' XML objects from full XML string
        const xmlLines = svgXML.match(/<(?:polyline|line|circle|g) [^>]+>|<\/g>/g)
            .map((line) => line.replace(/[\r\n\t<]|\/?>/g, "")
                .replace(/\s+/g, " "));

        // Iterate through lines, categorizing each line into a WALLS or LIGHTS object,
        // and grouping by layer names.
        const [wallData, lightData, groupRef] = [[], [], []];
        const layerClass = [];

        const parseXMLLines = (linesObj, parseFunc, classParams = []) => {
            if (!linesObj) { return false }
            if (Array.isArray(linesObj)) {
                return linesObj.map((line) => parseXMLLines(line, parseFunc, classParams)).flat(3).filter((line) => Boolean(line));
            } else if (typeof linesObj === "object") {
                const returnObj = {};
                Object.keys(linesObj).forEach((key) => { returnObj[key] = parseXMLLines(linesObj[key], parseFunc, classParams) });
                return returnObj;
            } else if (typeof linesObj === "string") {
                classParams = classParams.reduceRight((fullObj, classObj) => Object.assign(fullObj, classObj), {});
                return parseFunc(linesObj, classParams);
            }
            return false;
        };
        const wallParseFunc = (xmlLine, classParams = {}) => {
            try {
                const lineWalls = [];
                const [lineWallOptions, lineWallPoints] = [{}, []];

                // Convert XML element string to Javascript object.
                const dataLine = Object.fromEntries(xmlLine.match(/[^ ]+="[^"]+"/g)
                    .map((xmlKeyVal) => (
                        ([key, val]) => [key, val.replace(/"/g, "").trim()]
                    )(xmlKeyVal.split(/=/))));

                // Determine wall type from stroke color, define associated wall options
                Object.assign(lineWallOptions, {
                    "#FFFFFF": {isNotWall: true}, // Black & White = Non-Walls (use as guides, rough drafts, etc.)
                    "#000000": {isNotWall: true},
                    "#FFFF00": {move: 1, sense: 1, sound: 1, door: 0}, // Yellow = Normal Wall
                    "#00FFFF": {move: 1, sense: 0, sound: 0, door: 0}, // Cyan = Invisible Wall
                    "#00FF00": {move: 1, sense: 2, sound: 1, door: 0}, // Green = Terrain Wall
                    "#FF5522": {move: 0, sense: 1, sound: 1, door: 0}, // Orange = Ethereal Wall
                    "#223399": {move: 1, sense: 1, sound: 1, door: 1}, // Purple = Normal Door
                    "#FF00FF": {move: 1, sense: 1, sound: 1, door: 2}, // Magenta = Secret Door
                    "#774422": {move: 1, sense: 0, sound: 0, door: 2} // Brown = Invisible Door
                }[dataLine.stroke] || {});

                if (lineWallOptions.isNotWall) { return false } // Skip recognized non-walls.
                if (!Object.values(lineWallOptions).length) {
                    throw new Error(`Unrecognized stroke color: ${dataLine.stroke}`); // Skip unrecognized walls, with error.
                }
                if (lineWallOptions.group) {
                    lineWallOptions["flags.alienrpgoverrides.group"] = lineWallOptions.group;
                    delete lineWallOptions.group;
                }

                // Determine wall coordinates from <polyline>/<line> data, parse as integers.
                lineWallPoints.push(..."points" in dataLine
                    ? dataLine.points.split(/ /) // Data is for a 'polyline' object, described by a series of points.
                        .map((pointPair) => pointPair.split(/,/)
                            .map((pt) => parseInt(pt)))
                    : [ // Data is for a 'line' object, described by a start point and an end point.
                            [dataLine.x1, dataLine.y1],
                            [dataLine.x2, dataLine.y2]
                        ].map((pts) => pts.map((pt) => parseInt(pt))));

                // Convert line coordinates (series of points) to a series of wall segments (defined by start and end points).
                while (lineWallPoints.length > 1) {
                    // Construct final data object for each segment.
                    lineWalls.push({
                        ...lineWallOptions,
                        c: [lineWallPoints.shift(), lineWallPoints[0]].flat()
                    });
                }

                // Return array of wall data objects.
                return lineWalls;
            } catch (err) {
                // Skip any individual XML elements that throw errors, but continue processing elements without halting.
                console.error(`[SKIPPING WALL] ${err.message}`);
                return false;
            }
        };
        const lightParseFunc = (xmlLine, classParams = {}) => {
            try {
                classParams = {...classParams};
                const circLights = [];

                // Convert XML circle string to Javascript object.
                const [, layerName, tintColor, x, y, radius, group] = xmlLine.match(/(?:id="([^"]+)" )?(?:fill="(#.{6})" )?cx="([.\d]+)" cy="([.\d]+)" r="([.\d]+)"(?: group="([^"]+)")?/);
                const circLightData = {
                    x: parseInt(x),
                    y: parseInt(y),
                    bright: (parseInt(radius) / canvas.scene.data.grid) * LIGHTCORRECTIONS.radius * (classParams.percentBright ?? LIGHTOVERRIDES.percentBright),
                    dim: (parseInt(radius) / canvas.scene.data.grid) * LIGHTCORRECTIONS.radius * (classParams.percentDim ?? LIGHTOVERRIDES.percentDim)
                };
                delete classParams.percentBright;
                delete classParams.percentDim;
                if (tintColor) {
                    circLightData.tintColor = tintColor;
                }
                Object.assign(circLightData, classParams);
                if (group) {
                    circLightData["flags.alienrpgoverrides.group"] = group;
                }
                if (layerName) {
                    const [lightName, params] = layerName.split(/PARAMS-/);
                    if (lightName) {
                        circLightData["flags.alienrpgoverrides.name"] = lightName;
                    }
                    if (params) {
                        const parsedParams = Object.fromEntries(params.split(/-/).map((paramKeyVal) => paramKeyVal.split(/:/).map((kv) => (/^[0-9.]+$/.test(kv) ? parseFloat(kv) : kv))));
                        if ("class" in parsedParams) {
                            const classData = {...LIGHTCLASSES[parsedParams.class]};
                            delete parsedParams.class;
                            Object.assign(parsedParams, classData);
                        }
                        Object.assign(circLightData, parsedParams);
                    }
                }
                circLightData.angle = circLightData.angle ?? 360;
                circLightData.tintAlpha = (circLightData.tintAlpha ?? LIGHTOVERRIDES.tintAlpha) * LIGHTCORRECTIONS.tintAlpha;

                // Push light creation data to circLights
                circLights.push(circLightData);

                // Return array of light data objects.
                return circLights;
            } catch (err) {
                // Skip any individual XML elements that throw errors, but continue processing elements without halting.
                console.error(`[SKIPPING LIGHT] ${err.message}`);
                return false;
            }
        };

        xmlLines.forEach((xmlLine) => {
            xmlLine = xmlLine.replace(/_[_\d]+"/g, "\"");
            if (/^g/.test(xmlLine)) {
                // Group Start: Log ID to groupRef
                const groupName = (xmlLine.match(/id="([^"]+)"/) || [""]).pop();
                layerClass.push(LIGHTCLASSES[(groupName.match(/-class:([^-"]+)/) || [""]).pop()] ?? {});
                groupRef.push(groupName.replace(/-class:.*$/, ""));
            } else if (/^\/g/.test(xmlLine)) {
                // Group End: Remove most recent groupRef AND most recent class application
                groupRef.pop();
                layerClass.pop();
            } else if (/^(poly)?line /.test(xmlLine)) {
                // Wall Data: Parse line and add to wallData
                wallData.push(...parseXMLLines(`${xmlLine} group="${groupRef.filter((ref) => Boolean(ref)).join(".")}"`, wallParseFunc, layerClass));
            } else if (/^circle /.test(xmlLine)) {
                // Light Data: Add to lightXML
                lightData.push(...parseXMLLines(`${xmlLine} group="${groupRef.filter((ref) => Boolean(ref)).join(".")}"`, lightParseFunc, layerClass));
            }
        });
        await scene.createEmbeddedDocuments("Wall", wallData);
        await scene.createEmbeddedDocuments("AmbientLight", lightData);
    } else {
        throw new Error("[BAD SVG DATA] Requires XML contents of an SVG image, passed as a string.");
    }
};