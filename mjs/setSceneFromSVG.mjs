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
// #region SVGDATA ~
/* eslint-disable no-tabs */
const SVGDATA = {
  "USCSS Montero - Deck A": `
    <g id="MONTERO_A">
    <image display="none" width="3500" height="4500" xlink:href="4A34D33F.jpg" >
    </image>
    <g id="Layer_3">
        <polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1699,2589 1619,2669 1618,2778 
            1696,2857 1805,2858 1885,2779 1885,2754 2165,2754 2337,2901 2337,2971 2319,2971 2253,3037 2253,3050 1806,3050 1806,3034 
            1782,3034 1782,3001 1839,3001 1839,2901 1738,2901 1738,2938 1716,2938 1716,2911 1617,2911 1617,2940 1533,2940 1533,3041 
            1561,3041 1561,3051 1014,3051 1014,2973 1061,2926 1095,2926 1129,2893 1129,2882 1176,2882 1176,2779 1077,2779 1077,2806 
            1044,2806 1010,2840 1010,2887 981,2916 964,2888 841,2888 790,2901 733,2929 711,2951 694,2975 609,3015 602,3024 602,3044 
            615,3044 615,3123 600,3123 605,3149 640,3168 674,3183 693,3190 710,3215 732,3237 773,3259 834,3276 953,3276 1572,3587 
            1572,3609 1642,3676 1642,3699 1836,3699 1836,3597 1803,3597 1803,3592 2197,3592 2398,3416 2398,3216 2494,3216 2494,3115 
            2484,3115         "/>
    </g>
    <g id="Layer_4">
        <polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1699,2589 1702,2589 1702,2572 
            1899,2572 1899,2675 1885,2675 1885,2688 2191,2688 2397,2872 2397,2971 2416,2971 2484,3039 2484,3050 2656,3050 2656,3024 
            2832,3024 2835,3012 2845,3000 2858,2993 2876,2992 3073,2992 3089,2996 3101,3006 3107,3020 3108,3040 3108,3147 3102,3161 
            3091,3173 3077,3177 2860,3177 2846,3171 2834,3154 2830,3139 2656,3139 2656,3115 2601,3115 2601,3256 2666,3256 2666,3453 
            2469,3453 2469,3256 2541,3256 2541,3115 2494,3115         "/>
    </g>
    <g id="Layer_5">
        <g id="Layer_5_1_">
            <g>
                <polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1806,3116 1806,3138 1823,3144 
                    1837,3158 1845,3171 1846,3191 1842,3207 1831,3220 1816,3229 1803,3233 1784,3230 1768,3222 1756,3207 1751,3187 1732,3187 
                    1732,3442 1804.5,3514.5 1804.5,3528 2168,3528 2337,3384 2337,3379 2283,3379 2283,3400 2203,3472 2170,3462 2164,3476 
                    2145,3489 2120,3491 2097,3488 2077,3475 2063,3461 2053,3446 2028,3453 2017,3446 1920,3446 1920,3340 2022,3340 2022,3365 
                    2058,3360 2097,3349 2097,3287 2163,3287 2177,3251 2183,3216 2184,3185 2202,3199 2215,3213 2215,3193 2313,3193 2313,3292 
                    2292,3292 2292,3302 2337,3302 2337,3200 2320,3200 2253,3133 2253,3116                 "/>
                <line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="1806" y1="3116" x2="2253" y2="3116"/>
            </g>
            <g>
                <polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1806,3116 1806,3138 1823,3144 
                    1837,3158 1845,3171 1846,3191 1842,3207 1831,3220 1816,3229 1803,3233 1784,3230 1768,3222 1756,3207 1751,3187 1732,3187 
                    1732,3442 1804.5,3514.5 1804.5,3528 2168,3528 2337,3384 2337,3379 2283,3379 2283,3400 2203,3472 2170,3462 2164,3476 
                    2145,3489 2120,3491 2097,3488 2077,3475 2063,3461 2053,3446 2028,3453 2017,3446 1920,3446 1920,3340 2022,3340 2022,3365 
                    2058,3360 2097,3349 2097,3287 2163,3287 2177,3251 2183,3216 2184,3185 2202,3199 2215,3213 2215,3193 2313,3193 2313,3292 
                    2292,3292 2292,3302 2337,3302 2337,3200 2320,3200 2253,3133 2253,3116                 "/>
                <line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="1806" y1="3116" x2="2253" y2="3116"/>
            </g>
        </g>
    </g>
    <g id="Layer_6">
        <polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1014,3116 1014,3235 1570,3515 
            1639,3446 1647,3446 1647,3186 1618,3186 1606,3207 1546,3154 1561,3125 1561,3116         "/>
        <line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="1014" y1="3116" x2="1561" y2="3116"/>
    </g>
    <g id="Layer_7">
        <polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="994,2062 1001,2041 1019,2024 1039,2020 
            1628,2020 1645,2025 1663,2041 1670,2060 1670,2251 1664,2269 1646,2284 1628,2290 1036,2290 1015,2283 998,2264 994,2246         "/>
        <line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="994" y1="2062" x2="994" y2="2246"/>
    </g>
    <g id="Layer_8">
        <line fill="none" stroke="#223399" stroke-width="6" stroke-miterlimit="10" x1="1892" y1="2688" x2="1892" y2="2754"/>
        <line fill="none" stroke="#223399" stroke-width="6" stroke-miterlimit="10" x1="2656" y1="3050" x2="2656" y2="3115"/>
        <line fill="none" stroke="#223399" stroke-width="6" stroke-miterlimit="10" x1="2541" y1="3256" x2="2601" y2="3256"/>
        <line fill="none" stroke="#223399" stroke-width="6" stroke-miterlimit="10" x1="2337" y1="3302" x2="2337" y2="3379"/>
        <line fill="none" stroke="#223399" stroke-width="6" stroke-miterlimit="10" x1="1014" y1="3051" x2="1014" y2="3116"/>
        <line fill="none" stroke="#223399" stroke-width="6" stroke-miterlimit="10" x1="1014" y1="3235" x2="953" y2="3276"/>
        <line fill="none" stroke="#223399" stroke-width="6" stroke-miterlimit="10" x1="981" y1="2916" x2="1014" y2="2973"/>
    </g>
    <g id="Layer_9">
        <polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="216,2333 295,2254 936,2254 1016,2334 
            3164,2334 3241,2411 3241,3779 3162,3858 295,3858 216,3779         "/>
        <line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="216" y1="2333" x2="216" y2="3779"/>
    </g>
    <g id="Layer_10">
        <polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="141,235 247.5,128.5 868,128.5 
            987.25,247.75 3203,247.75 3314.12,358.88 3314.12,3835 3215.06,3934.06 253,3934.06 141,3820         "/>
        <line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="141" y1="3820" x2="141" y2="235"/>
    </g>
    <g id="Layer_41">
        <line fill="none" stroke="#00FFFF" stroke-width="2" stroke-miterlimit="10" x1="1561" y1="3041" x2="1561" y2="2941"/>
        <polyline fill="none" stroke="#00FFFF" stroke-width="2" stroke-miterlimit="10" points="1782,3001 1782,2938 1738,2938         "/>
        <polyline fill="none" stroke="#00FFFF" stroke-width="2" stroke-miterlimit="10" points="1803,3597 1803,3609 1736,3676 
            1642,3676         "/>
        <line fill="none" stroke="#00FFFF" stroke-width="2" stroke-miterlimit="10" x1="1972" y1="3340" x2="1972" y2="3446"/>
        <line fill="none" stroke="#00FFFF" stroke-width="2" stroke-miterlimit="10" x1="2215" y1="3213" x2="2292" y2="3292"/>
    </g>
    <g id="Layer_42">
        <polyline fill="none" stroke="#00FFFF" stroke-width="2" stroke-miterlimit="10" points="2484,3115 2484,3133 2417,3200 
            2398,3200 2398,3216         "/>
        <polyline fill="none" stroke="#00FFFF" stroke-width="2" stroke-miterlimit="10" points="1077,2806 1129,2806 1129,2882         "/>
        <polyline fill="none" stroke="#00FFFF" stroke-width="2" stroke-miterlimit="10" points="1702,2589 1805,2589 1885,2669.5 
            1885,2674         "/>
    </g>
</g>
    `,
  "USCSS Cronus - Deck A": `
  <g id="LIGHTS">
	<g id="EXTERIOR-class:exterior">
		<circle id="PARAMS-class:cronusLogo" cx="962.3" cy="753" r="1199"/>
		<circle id="PARAMS-class:aftEngines_1_" cx="539" cy="3738" r="2186"/>
		<circle id="PARAMS-class:aftEngines_2_" cx="4050" cy="3738" r="2186"/>
		<circle id="PARAMS-class:still" cx="2326" cy="4162" r="876"/>
		<circle id="PARAMS-class:foreEngines" cx="961" cy="2687" r="1412"/>
		<circle id="PARAMS-class:foreEngines_1_" cx="3663" cy="2687" r="1412"/>
		<circle id="PARAMS-class:still_1_" cx="2332" cy="764" r="501"/>
		<circle id="PARAMS-class:deckLogo" cx="3095.3" cy="1048" r="380"/>
		<circle id="PARAMS-class:wireframe" cx="3662.3" cy="852" r="1073"/>
	</g>
	<g id="SHIPLIGHTS-AMBER-class:amberLights">
		<circle fill="#005F61" cx="1716.8" cy="2652.7" r="134"/>
		<circle fill="#005F61" cx="2930" cy="2652.7" r="134"/>
		<circle fill="#005F61" cx="2550.5" cy="3310" r="134"/>
		<circle fill="#005F61" cx="2056.3" cy="1984" r="59"/>
		<circle fill="#005F61" cx="2772.2" cy="3315.9" r="59"/>
		<circle fill="#005F61" cx="2056.3" cy="1729" r="274"/>
		<circle fill="#005F61" cx="2056.3" cy="2318.7" r="300"/>
		<circle fill="#005F61" cx="2594" cy="1984" r="59"/>
		<circle fill="#005F61" cx="2594" cy="1729" r="274"/>
		<circle fill="#005F61" cx="2594" cy="2318.7" r="300"/>
		<circle fill="#005F61" cx="2325.7" cy="1892.6" r="59"/>
		<circle fill="#005F61" cx="2325.7" cy="2072.8" r="59"/>
		<circle fill="#005F61" cx="2323.8" cy="1591.5" r="59"/>
		<circle fill="#005F61" cx="2325.7" cy="1396" r="59"/>
		<circle fill="#005F61" cx="2325.7" cy="2655.9" r="464"/>
		<circle fill="#005F61" cx="2325.7" cy="3621.7" r="181"/>
		<circle fill="#005F61" cx="2325.1" cy="1743" r="120"/>
		<circle fill="#005F61" cx="2323.5" cy="3190" r="44"/>
		<circle fill="#005F61" cx="2325.1" cy="2217.9" r="120"/>
		<circle fill="#005F61" cx="2325.1" cy="3895.4" r="120"/>
		<circle id="PARAMS-class:airScrubbers" fill="#005F61" cx="2325.1" cy="2482.5" r="120"/>
		<circle fill="#005F61" cx="2325.7" cy="1497.7" r="274"/>
		<circle fill="#005F61" cx="2325.7" cy="1984" r="229"/>
		<circle fill="#005F61" cx="2323.8" cy="2857.7" r="190"/>
	</g>
	<g id="SHIPLIGHTS-AWAKE-class:awakeLights">
		<circle id="PARAMS-class:examinationRoom_1_" fill="#00FFFF" cx="2325.7" cy="3421" r="126"/>
		<circle id="PARAMS-class:examinationRoom" fill="#00FFFF" cx="2325.7" cy="3286.5" r="126"/>
		<circle id="PARAMS-class:showers_2_" fill="#FFFFFF" cx="2438" cy="3353.1" r="152"/>
		<circle id="PARAMS-class:showers_1_" fill="#FFFFFF" cx="2217" cy="3353.1" r="152"/>
		<circle id="_x3C_Path_x3E_" fill="#FFFF00" cx="2131" cy="3353.1" r="152"/>
		<circle id="PARAMS-class:EVASuitStorage" fill="#00FF00" cx="2680.5" cy="3314.1" r="59"/>
		<circle fill="#FFFF00" cx="2131" cy="3228.3" r="78.8"/>
		<circle fill="#FFFF00" cx="2131" cy="3529.8" r="78.8"/>
		<circle fill="#FFFF00" cx="2936" cy="2760" r="80.9"/>
		<circle fill="#FFFF00" cx="1715" cy="2760" r="80.9"/>
		<circle fill="#FFFF00" cx="2323.8" cy="1255.8" r="97"/>
		<circle fill="#FFD000" cx="2482.4" cy="2856.3" r="134"/>
		<circle fill="#FFD000" cx="2169.3" cy="2856.3" r="134"/>
		<circle fill="#FFD000" cx="2325.7" cy="3077.7" r="134"/>
	</g>
	<g id="TERMINAL-AWAKE-class:terminalBlink">
		<circle fill="#FFFF00" cx="1978" cy="2693.7" r="36"/>
	</g>
	<g id="CRYO-SLEEPING-class:cryoSleep">
		<circle fill="#FFFF00" cx="2175" cy="2859.7" r="122"/>
		<circle fill="#FFFF00" cx="2480" cy="2859.7" r="122"/>
		<circle fill="#FFFF00" cx="2329" cy="3085.7" r="122"/>
	</g>
	<g id="MUTHUR-SLEEPING-class:muthurSleep">
		<circle id="MUTHUR_SLEEPING" fill="#FFFF00" cx="2324" cy="1255.9" r="107.7"/>
	</g>
	<g id="MUTHUR-AWAKE">
		<circle id="PARAMS-class:terminalBlink" fill="#FFFF00" cx="2324" cy="1247.7" r="60"/>
		<circle id="PARAMS-class:muthurChroma" fill="#FF00FF" cx="2324" cy="1220" r="88"/>
	</g>
</g>
<g id="WALLS">
	<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2331,1176 2353,1181 2376,1193 2393,1214 
		2403,1238 2405,1266 2397,1293 2382,1314 2364,1326 2364,1338 2362,1338 2371,1455 2638,1455 2638,1718 	"/>
	<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2277,1455 2286,1338 2284,1338 2284,1326 
		2266,1314 2251,1293 2243,1266 2245,1238 2255,1214 2272,1193 2295,1181 2317,1176 2331,1176 	"/>
	<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="2638" y1="1767" x2="2638" y2="2259"/>
	<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2638,2308 2638,2610 2703,2610 	"/>
	<path fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" d="M2638,2259"/>
	<path fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" d="M2703,2610"/>
	<path fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" d="M2638,2308"/>
	<path fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" d="M2753,2610"/>
	<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2753,2610 2979,2610 2979,2708 2985,2708 
			"/>
	<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="2075" y1="3214" x2="2189" y2="3214"/>
	<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="2300" y1="3167" x2="2281" y2="3167"/>
	<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="2353" y1="3167" x2="2367" y2="3167"/>
	<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="2370" y1="2811" x2="2391" y2="2811"/>
	<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="2262" y1="2811" x2="2282" y2="2811"/>
	<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2083,2801 2083,2766 2262,2766 	"/>
	<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2262,2944 2083,2944 2083,2850 	"/>
	<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2391,2896 2391,2944 2430,2944 	"/>
	<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2391,2811 2391,2766 2570,2766 2570,2800 
			"/>
	<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="2262" y1="2896" x2="2262" y2="2944"/>
	<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="2262" y1="2766" x2="2262" y2="2811"/>
	<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2570,2850 2570,2944 2430,2944 	"/>
	<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2299,2383 2258,2383 2219,2422 2219,2544 
		2260,2582 2395,2582 2434,2545 2434,2424 2392,2383 2347,2383 	"/>
	<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="2075" y1="3265" x2="2075" y2="3267"/>
	<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2953,2807 2985,2807 2985,2708 	"/>
	<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2777,2700 2796,2700 2796,2705 2890,2705 
		2890,2709 2887,2709 2887,2807 2920,2807 	"/>
	<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="2370" y1="2700" x2="2727" y2="2700"/>
	<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2189,3295 2189,3214 2281,3214 2281,3167 
		2236,3167 2236,2988 2281,2988 2281,2896 2262,2896 	"/>
	<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1918,2700 2281,2700 2281,2811 	"/>
	<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="1762" y1="2700" x2="1868" y2="2700"/>
	<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1740,2805 1765,2805 1765,2705 1762,2705 
		1762,2700 	"/>
	<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1892,2610 1850,2610 1850,2602 1754,2602 
		1754,2610 1674,2610 1674,2706 1666,2706 1666,2805 1690,2805 	"/>
	<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2010,1718 2010,1455 2277,1455 	"/>
	<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="2010" y1="2259" x2="2010" y2="1767"/>
	<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1942,2610 2010,2610 2010,2309 	"/>
	<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="2550" y1="1940" x2="2550" y2="1542"/>
	<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2100,2028 2281,2028 2281,2119 2264,2119 
		2226,2157 2226,2277 2264,2315 2299,2315 	"/>
	<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2550,2324 2550,2028 2370,2028 	"/>
	<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2100,2374 2100,2610 2550,2610 2550,2374 
			"/>
	<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="2100" y1="2028" x2="2100" y2="2324"/>
	<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2550,1940 2369,1940 2369,1845 2388,1845 
		2427,1804 2427,1680 2388,1641 2369,1641 	"/>
	<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2277,1641 2277,1542 2100,1542 2100,1940 
		2281,1940 2281,1845 2264,1845 2224,1804 2224,1680 2263,1641 2277,1641 	"/>
	<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2369,1641 2369,1542 2550,1542 	"/>
	<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2347,2315 2386,2315 2423,2277 2423,2157 
		2385,2119 2370,2119 2370,2028 	"/>
	<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="2163" y1="3267" x2="2189" y2="3267"/>
	<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2132,3267 2075,3267 2075,3555 2189,3555 
		2189,3325 	"/>
	<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="2244" y1="3381" x2="2244" y2="3214"/>
	<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="2409" y1="3381" x2="2409" y2="3214"/>
	<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="2409" y1="3490" x2="2409" y2="3434"/>
	<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2244,3435 2244,3490 2190,3490 	"/>
	<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2370,3490 2464,3490 2464,3335 	"/>
	<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2243,3490 2281,3490 2281,3797 2268,3797 
		2230,3836 2230,3956 2268,3994 2388,3994 2426,3955 2426,3837 2387,3797 2370,3797 2370,3490 	"/>
	<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2777,3285 2818,3285 2818,3345 2735,3345 
		2712,3365 2651,3365 2629,3339 2629,3342 2468,3342 	"/>
	<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2734,3285 2733,3285 2712,3262 2652,3262 
		2629,3285 2629,3279 2468,3279 2464,3285 2464,3214 2367,3214 2367,3167 2414,3167 2414,2988 2370,2988 2370,2896 2391,2896 	"/>
	<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="2370" y1="2700" x2="2370" y2="2811"/>
	<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="2075" y1="3498" x2="2104" y2="3498"/>
	<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="2161" y1="3498" x2="2189" y2="3498"/>
	<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="2464" y1="3335" x2="2468" y2="3342"/>
	<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="2300" y1="3214" x2="2281" y2="3214"/>
	<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="2367" y1="3214" x2="2353" y2="3214"/>
</g>
<g id="WALLS-VENTS">
	<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2638,1767 2773,1767 2773,2259 2638,2259 
			"/>
	<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2638,2308 2773,2308 2773,2424 2703,2424 
		2703,2610 	"/>
	<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2985,2708 2985,2308 2823,2308 2823,2474 
		2753,2474 2753,2610 	"/>
	<path display="none" fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" d="M2942,2083"/>
	<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2570,2850 2727,2850 2727,3277 2734,3285 
			"/>
	<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2638,1718 2823,1718 2823,2259 3034,2259 
		3034,2850 2777,2850 2777,3285 	"/>
	<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2777,2700 2777,2800 2887,2800 	"/>
	<path fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" d="M2777,3286"/>
	<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2727,2700 2727,2800 2570,2800 	"/>
	<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2550,2324 2347,2324 2347,2315 	"/>
	<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2100,2324 2299,2324 2299,2315 	"/>
	<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2100,2374 2299,2374 2299,2383 	"/>
	<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2347,2383 2347,2374 2550,2374 	"/>
	<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="1918" y1="2850" x2="2083" y2="2850"/>
	<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1822,2259 1612,2259 1612,2850 1868,2850 
		1868,3265 2075,3265 	"/>
	<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="2010" y1="2259" x2="1872" y2="2259"/>
	<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1822,2259 1822,1718 2010,1718 	"/>
	<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1892,2610 1892,2474 1822,2474 1822,2309 
		1661,2309 1661,2801 1666,2801 	"/>
	<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1942,2611 1942,2425 1872,2425 1872,2309 
		2010,2309 	"/>
	<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2010,1768 1872,1768 1872,2260 	"/>
	<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="1868" y1="2801" x2="1765" y2="2801"/>
	<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="2083" y1="2801" x2="1918" y2="2801"/>
	<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="1868" y1="2700" x2="1868" y2="2801"/>
	<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="1918" y1="2700" x2="1918" y2="2801"/>
	<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2075,3214 1918,3214 1918,2850 	"/>
</g>
<g id="DOORS-VENTS-UP-or-RIGHT">
	<line fill="none" stroke="#8800FF" stroke-width="2" stroke-miterlimit="10" x1="2638" y1="1718" x2="2638" y2="1767"/>
	<line fill="none" stroke="#8800FF" stroke-width="2" stroke-miterlimit="10" x1="2638" y1="2259" x2="2638" y2="2308"/>
	<line fill="none" stroke="#8800FF" stroke-width="2" stroke-miterlimit="10" x1="2734" y1="3285" x2="2777" y2="3285"/>
	<line fill="none" stroke="#8800FF" stroke-width="2" stroke-miterlimit="10" x1="2570" y1="2800" x2="2570" y2="2850"/>
	<line fill="none" stroke="#8800FF" stroke-width="2" stroke-miterlimit="10" x1="2703" y1="2610" x2="2753" y2="2610"/>
	<line fill="none" stroke="#8800FF" stroke-width="2" stroke-miterlimit="10" x1="1892" y1="2610" x2="1942" y2="2610"/>
	<line fill="none" stroke="#8800FF" stroke-width="2" stroke-miterlimit="10" x1="2100" y1="2324" x2="2100" y2="2374"/>
	<line fill="none" stroke="#8800FF" stroke-width="2" stroke-miterlimit="10" x1="2299" y1="2383" x2="2347" y2="2383"/>
</g>
<g id="DOORS-VENTS-DOWN-or-LEFT">
	<line fill="none" stroke="#FF0088" stroke-width="2" stroke-miterlimit="10" x1="2550" y1="2324" x2="2550" y2="2374"/>
	<line fill="none" stroke="#FF0088" stroke-width="2" stroke-miterlimit="10" x1="2075" y1="3214" x2="2075" y2="3265"/>
	<line fill="none" stroke="#FF0088" stroke-width="2" stroke-miterlimit="10" x1="2083" y1="2801" x2="2083" y2="2850"/>
	<line fill="none" stroke="#FF0088" stroke-width="2" stroke-miterlimit="10" x1="2010" y1="2259" x2="2010" y2="2309"/>
	<line fill="none" stroke="#FF0088" stroke-width="2" stroke-miterlimit="10" x1="2010" y1="1718" x2="2010" y2="1767"/>
	<line fill="none" stroke="#FF0088" stroke-width="2" stroke-miterlimit="10" x1="2727" y1="2700" x2="2777" y2="2700"/>
	<line fill="none" stroke="#FF0088" stroke-width="2" stroke-miterlimit="10" x1="2920" y1="2807" x2="2953" y2="2807"/>
	<line fill="none" stroke="#FF0088" stroke-width="2" stroke-miterlimit="10" x1="1868" y1="2700" x2="1918" y2="2700"/>
	<line fill="none" stroke="#FF0088" stroke-width="2" stroke-miterlimit="10" x1="1690" y1="2805" x2="1740" y2="2805"/>
	<line fill="none" stroke="#FF0088" stroke-width="2" stroke-miterlimit="10" x1="2299" y1="2315" x2="2347" y2="2315"/>
</g>
<g id="DOORS">
	<line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="2132" y1="3267" x2="2163" y2="3267"/>
	<line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="2189" y1="3295" x2="2189" y2="3325"/>
	<line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="2104" y1="3498" x2="2161" y2="3498"/>
	<line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="2244" y1="3381" x2="2244" y2="3435"/>
	<line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="2409" y1="3381" x2="2409" y2="3434"/>
	<line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="2464" y1="3285" x2="2464" y2="3336"/>
	<line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="2281" y1="3797" x2="2370" y2="3797"/>
	<line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="2629" y1="3285" x2="2629" y2="3339"/>
	<line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="2300" y1="3167" x2="2353" y2="3167"/>
	<line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="2300" y1="3214" x2="2353" y2="3214"/>
	<line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="2281" y1="2988" x2="2370" y2="2988"/>
	<line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="2262" y1="2811" x2="2262" y2="2896"/>
	<line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="2391" y1="2811" x2="2391" y2="2896"/>
	<line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="2281" y1="2119" x2="2370" y2="2119"/>
	<line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="2281" y1="1845" x2="2369" y2="1845"/>
	<line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="2277" y1="1641" x2="2369" y2="1641"/>
	<line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="2277" y1="1455" x2="2371" y2="1455"/>
	<line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="2277" y1="1542" x2="2369" y2="1542"/>
	<line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="2100" y1="1940" x2="2010" y2="1940"/>
	<line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="2100" y1="2028" x2="2010" y2="2028"/>
	<line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="2370" y1="2028" x2="2281" y2="2028"/>
	<line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="2638" y1="2028" x2="2550" y2="2028"/>
	<line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="2100" y1="2610" x2="2010" y2="2610"/>
	<line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="1850" y1="2700" x2="1850" y2="2610"/>
	<line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="2796" y1="2700" x2="2796" y2="2610"/>
	<line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="2638" y1="2610" x2="2550" y2="2610"/>
	<line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="2369" y1="1940" x2="2281" y2="1940"/>
	<line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="2638" y1="1940" x2="2550" y2="1940"/>
	<line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="2100" y1="1940" x2="2100" y2="2028"/>
	<line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="2551" y1="1940" x2="2551" y2="2028"/>
</g>
<g id="DOORS_-_LOCKED">
	<line fill="none" stroke="#888888" stroke-width="2" stroke-miterlimit="10" x1="2370" y1="2700" x2="2281" y2="2700"/>
	<line fill="none" stroke="#888888" stroke-width="2" stroke-miterlimit="10" x1="2286" y1="1338" x2="2362" y2="1338"/>
</g>
<g id="WALLS-ETHEREAL">
	<polyline fill="none" stroke="#FF5522" stroke-width="2" stroke-miterlimit="10" points="2324,5664 1917,5664 1739,5105 1739,4933 
		1553,4667 1415,4391 1470,4280 2324,4280 	"/>
	<polyline fill="none" stroke="#FF5522" stroke-width="2" stroke-miterlimit="10" points="2324,5664 2731,5664 2909,5105 2909,4933 
		3095,4667 3233,4391 3178,4280 2324,4280 	"/>
	<polyline fill="none" stroke="#FF5522" stroke-width="2" stroke-miterlimit="10" points="1256,3696 1301,3787 1326,3897 1321,4005 
		1306,4049 1245,4074 1245,4661 1239,4692 1115,4692 1067.5,4644.5 1067.5,4179 978,4289 973,4888 905,5680 656,5680 675,5314 
		505,5314 524,5669 211,5669 55,3907 67,3785 86,3603 145,3413 175,3368 173,3345 234,3281 232,3190 363,3111 387,3104 393,3029 
		460,2986 707,2986 769,3028 804,3120 933,3193 944,3696 1256,3696 	"/>
	<polyline fill="none" stroke="#FF5522" stroke-width="2" stroke-miterlimit="10" points="3392,3696 3347,3787 3322,3897 3327,4005 
		3342,4049 3403,4074 3403,4661 3409,4692 3533,4692 3580.5,4644.5 3580.5,4179 3670,4289 3675,4888 3743,5680 3992,5680 3973,5314 
		4143,5314 4124,5669 4437,5669 4593,3907 4581,3785 4562,3603 4503,3413 4473,3368 4475,3345 4414,3281 4416,3190 4285,3111 
		4261,3104 4255,3029 4188,2986 3941,2986 3879,3028 3844,3120 3715,3193 3704,3696 3392,3696 	"/>
	<polyline fill="none" stroke="#FF5522" stroke-width="2" stroke-miterlimit="10" points="2324,1146 2299,1146 2276,1153 2255,1166 
		2235,1185 2221,1207 2214,1236 2214,1264 2214,1301 2249,1340 2249,1359 2252,1363 2246.8,1455.1 	"/>
	<polyline fill="none" stroke="#FF5522" stroke-width="2" stroke-miterlimit="10" points="2324,1146 2349,1146 2372,1153 2393,1166 
		2413,1185 2427,1207 2434,1236 2434,1264 2434,1301 2399,1340 2399,1359 2396,1363 2401.2,1455.1 	"/>
	<polyline fill="none" stroke="#FF5522" stroke-width="2" stroke-miterlimit="10" points="2010,1478 1707,1478 1660,1578 1660,1821 
		1567,2066 1493,2433 1467,2846 1467,3167 1663,3167 1678,3182 1678,4040 2324,4040 	"/>
	<polyline fill="none" stroke="#FF5522" stroke-width="2" stroke-miterlimit="10" points="2638,1478 2941,1478 2988,1578 2988,1821 
		3081,2066 3155,2433 3181,2846 3181,3167 2985,3167 2970,3182 2970,4040 2324,4040 	"/>
</g>
</svg>

    `,
  "USCSS Cronus - Deck B": `<g id="LIGHTS">
	<g id="EXTERIOR-class:exterior">
		<circle id="PARAMS-class:cronusLogo_1_" cx="962.3" cy="753" r="1199"/>
		<circle id="PARAMS-class:aftEngines_4_" cx="539" cy="3738" r="2186"/>
		<circle id="PARAMS-class:aftEngines_3_" cx="4050" cy="3738" r="2186"/>
		<circle id="PARAMS-class:foreEngines_3_" cx="658" cy="2343" r="1412"/>
		<circle id="PARAMS-class:foreEngines_2_" cx="3944" cy="2343" r="1412"/>
		<circle id="PARAMS-class:deckLogo_1_" cx="3095.3" cy="1048" r="380"/>
		<circle id="PARAMS-class:wireframe_1_" cx="3662.3" cy="852" r="1073"/>
		<circle id="PARAMS-class:still" cx="2335.3" cy="188" r="491"/>
	</g>
	<g id="SHIPLIGHTS-AMBER-class:amberLights_1_">
		<circle fill="#005F61" cx="2113.7" cy="1594.6" r="105.6"/>
		<circle fill="#005F61" cx="2113.7" cy="1904.6" r="105.6"/>
		<circle fill="#005F61" cx="2154.7" cy="1744.6" r="106.3"/>
		<circle fill="#005F61" cx="2534.4" cy="1594.6" r="105.6"/>
		<circle fill="#005F61" cx="2534.4" cy="1904.6" r="105.6"/>
		<circle fill="#005F61" cx="2493.4" cy="1744.6" r="106.3"/>
		<circle fill="#005F61" cx="2324.7" cy="1573.6" r="106.3"/>
		<circle fill="#005F61" cx="2324.7" cy="2043.6" r="315.6"/>
		<circle fill="#005F61" cx="2114.7" cy="2379.6" r="315.6"/>
		<circle fill="#005F61" cx="2320.7" cy="3181.6" r="315.6"/>
		<circle fill="#005F61" cx="2536.7" cy="2379.6" r="315.6"/>
		<circle fill="#005F61" cx="1800.7" cy="1692.6" r="315.6"/>
		<circle fill="#005F61" cx="1684.7" cy="2004.6" r="145.6"/>
		<circle fill="#005F61" cx="1827.7" cy="2004.6" r="145.6"/>
		<circle fill="#005F61" cx="2779.7" cy="2042.6" r="190.6"/>
		<circle fill="#005F61" cx="1970.7" cy="2004.6" r="145.6"/>
		<circle fill="#005F61" cx="2325.1" cy="1743" r="120"/>
		<circle fill="#005F61" cx="2325.1" cy="2217.9" r="120"/>
		<circle fill="#005F61" cx="2325.1" cy="3895.4" r="120"/>
		<circle id="PARAMS-class:airScrubbers_1_" fill="#005F61" cx="2325.1" cy="2482.5" r="120"/>
		<circle fill="#005F61" cx="2325.7" cy="1336.7" r="274"/>
		<circle id="PARAMS-t:l" fill="#005F61" cx="2325.7" cy="729.7" r="189.7"/>
		<circle id="PARAMS-t:l_4_" fill="#005F61" cx="2126.7" cy="627.7" r="92.3"/>
		<circle id="PARAMS-t:l_6_" fill="#005F61" cx="2514.7" cy="627.7" r="92.3"/>
		<circle id="PARAMS-t:l_3_" fill="#005F61" cx="2134.7" cy="863.7" r="189.7"/>
		<circle id="PARAMS-t:l_8_" fill="#005F61" cx="2524.7" cy="863.7" r="189.7"/>
		<circle id="PARAMS-t:l_1_" fill="#005F61" cx="2328.7" cy="1016.7" r="189.7"/>
		<circle fill="#005F61" cx="2323.8" cy="2755.7" r="230.7"/>
		<circle fill="#005F61" cx="2691.8" cy="2755.7" r="230.7"/>
		<circle fill="#005F61" cx="1955.8" cy="2755.7" r="230.7"/>
		<circle fill="#005F61" cx="2109.8" cy="3033.7" r="230.7"/>
		<circle fill="#005F61" cx="1900.8" cy="3178.7" r="230.7"/>
		<circle fill="#005F61" cx="2758.8" cy="3178.7" r="230.7"/>
		<circle fill="#005F61" cx="2537.8" cy="3033.7" r="230.7"/>
	</g>
	<g id="SHIPLIGHTS-AWAKE-class:awakeLights_1_">
		<circle id="PARAMS-class:EVASuitStorage_1_" fill="#00FF00" cx="2702.5" cy="1748.1" r="116.1"/>
		<g id="PARAMS-class:science">
			<circle fill="#00FFFF" cx="2113" cy="3372" r="155"/>
		</g>
		<g id="PARAMS-class:science_1_">
			<circle fill="#00FFFF" cx="2113" cy="3616" r="155"/>
		</g>
		<g id="PARAMS-class:science_14_">
			<circle fill="#FFFFFF" cx="1764" cy="3631" r="193"/>
		</g>
		<g id="PARAMS-class:science_8_">
			<circle fill="#FFFFFF" cx="1819" cy="3338" r="117"/>
		</g>
		<g id="PARAMS-class:science_18_">
			<circle fill="#FFFFFF" cx="1988" cy="3338" r="117"/>
		</g>
		<g id="PARAMS-class:science_22_">
			<circle fill="#FFFFFF" cx="1988" cy="3554" r="149"/>
		</g>
		<g id="PARAMS-class:science_4_">
			<circle fill="#00FFFF" cx="2113" cy="3868" r="155"/>
		</g>
		<g id="PARAMS-class:science_6_">
			<circle fill="#00FFFF" cx="2266" cy="3753" r="155"/>
		</g>
		<g id="PARAMS-class:medical">
			<circle fill="#00FFFF" cx="2548" cy="3753" r="155"/>
		</g>
		<g id="PARAMS-class:science_10_">
			<circle fill="#00FFFF" cx="2812" cy="3753" r="155"/>
		</g>
		<circle id="PARAMS-class:EVASuitStorage_2_" fill="#00FF00" cx="2882.5" cy="1748.1" r="116.1"/>
		<circle fill="#FFFF00" cx="2936" cy="2760" r="80.9"/>
		<circle fill="#FFFF00" cx="1715" cy="2760" r="80.9"/>
	</g>
	<g id="SHIPLIGHTS-AWAKE">
		<g>
			<circle fill="#FFFFFF" cx="2898.7" cy="2142.6" r="106.3"/>
		</g>
		<g>
			<circle fill="#FFFFFF" cx="2784.7" cy="2142.6" r="106.3"/>
		</g>
		<g>
			<circle fill="#FFFFFF" cx="2670.7" cy="2142.6" r="106.3"/>
		</g>
		<g id="_x3C_Path_x3E__4_">
			<circle fill="#00FFFF" cx="2762" cy="3842" r="46"/>
		</g>
		<circle id="_x3C_Path_x3E__3_" cx="2326.7" cy="486.7" r="92.3"/>
		<circle id="_x3C_Path_x3E__2_" cx="2172.7" cy="468.7" r="200.7"/>
		<circle id="_x3C_Path_x3E__1_" cx="2481.7" cy="468.7" r="200.7"/>
		<g id="PARAMS-class:electricalShort_9_">
			<circle fill="#00FFFF" cx="2738" cy="4075" r="65"/>
		</g>
		<g id="PARAMS-class:electricalShort_8_">
			<circle fill="#00FFFF" cx="2959" cy="3832" r="65"/>
		</g>
		<g id="PARAMS-class:electricalShort_7_">
			<circle fill="#00FFFF" cx="2967" cy="3909" r="80"/>
		</g>
		<g id="PARAMS-class:electricalShort_6_">
			<circle fill="#00FFFF" cx="2729" cy="3915" r="113"/>
		</g>
		<g id="PARAMS-class:electricalShort_5_">
			<circle fill="#FFFF00" cx="1689" cy="2331" r="144"/>
		</g>
		<circle id="PARAMS-class:corporateQuarters-intensity:0.5_1_" fill="#FFFF00" cx="1389" cy="2272" r="60"/>
		<circle id="PARAMS-class:corporateQuarters_1_" fill="#FFFF00" cx="1370" cy="2355" r="60"/>
		<circle id="PARAMS-class:corporateQuarters-intensity:0.5_2_" fill="#FFFF00" cx="1386" cy="2444" r="60"/>
		<circle id="PARAMS-class:corporateQuarters_6_" fill="#FFFF00" cx="1470" cy="2445" r="60"/>
		<circle id="PARAMS-class:corporateQuarters_8_" fill="#FFFF00" cx="1470" cy="2269" r="60"/>
		<circle id="PARAMS-class:corporateQuarters-intensity:0.5" fill="#FFFF00" cx="1439" cy="2349" r="60"/>
		<circle id="PARAMS-class:corporateQuarters-intensity:0.5_3_" fill="#FFFF00" cx="1497" cy="2350" r="60"/>
		<circle id="PARAMS-class:corporateQuarters_14_" fill="#FFFF00" cx="1555" cy="2353" r="60"/>
		<circle id="PARAMS-class:corporateQuarters_16_" fill="#FFFF00" cx="1537" cy="2450" r="80"/>
		<circle id="PARAMS-class:corporateQuarters_17_" fill="#FFFF00" cx="1537" cy="2253" r="80"/>
		<g id="PARAMS-class:electricalShort_4_">
			<circle fill="#FFFF00" cx="1895" cy="2897" r="144"/>
		</g>
		<g id="PARAMS-class:electricalShort_3_">
			<circle fill="#FFC200" cx="1796" cy="2440" r="65"/>
		</g>
		<g id="_x3C_Path_x3E_">
			<circle fill="#FFC200" cx="1222" cy="2358" r="183"/>
		</g>
		<g id="PARAMS-class:escapePod">
			<circle fill="#FF0000" cx="1437" cy="2116" r="114"/>
		</g>
		<g id="PARAMS-class:electricalShort_2_">
			<circle fill="#FFC200" cx="2805" cy="2626" r="98"/>
		</g>
		<g id="PARAMS-class:electricalShort_1_">
			<circle fill="#FFFFFF" cx="1994" cy="2348" r="126"/>
		</g>
		<g id="PARAMS-class:electricalShort">
			<circle fill="#FFFFFF" cx="2332" cy="2889" r="126"/>
		</g>
	</g>
	<g id="TERMINAL-AWAKE-class:terminalBlink_6_">
		<g id="PARAMS-class:terminalBlink_3_">
			<circle fill="#FFFF00" cx="2833" cy="2243.7" r="31.7"/>
		</g>
		<g id="PARAMS-class:terminalBlink_2_">
			<circle fill="#FFFF00" cx="2536" cy="3215.7" r="31.7"/>
		</g>
	</g>
	<g id="BRIDGE-COMMAND">
		<g>
			<circle fill="#0AFFA2" cx="2222" cy="600" r="187"/>
		</g>
	</g>
	<g id="BRIDGE-COMMAND_1_">
		<g>
			<circle fill="#0AFFA2" cx="2438" cy="600" r="187"/>
		</g>
	</g>
	<g id="BRIDGE-TERMINAL-COMMAND">
		<g id="PARAMS-class:terminalBlink_1_">
			<circle fill="#FFFF00" cx="2392" cy="534.7" r="78"/>
		</g>
		<g id="PARAMS-class:terminalBlink_8_">
			<circle fill="#FFFF00" cx="2325" cy="639.7" r="45.7"/>
		</g>
		<g id="PARAMS-class:terminalBlink">
			<circle fill="#FFFF00" cx="2262" cy="534.7" r="78"/>
		</g>
	</g>
	<g id="BRIDGE-TERMINAL-LIFE">
		<g id="PARAMS-class:terminalBlink_6_">
			<circle fill="#FFFF00" cx="2549" cy="1040.7" r="31.7"/>
		</g>
	</g>
	<g id="BRIDGE-TERMINAL-PILOT">
		<g id="PARAMS-class:terminalBlink_5_">
			<circle fill="#FFFF00" cx="2551" cy="802.7" r="31.7"/>
		</g>
	</g>
	<g id="BRIDGE-TERMINAL-SENSORS">
		<g id="PARAMS-class:terminalBlink_7_">
			<circle fill="#FFFF00" cx="2101" cy="1040.7" r="31.7"/>
		</g>
	</g>
	<g id="BRIDGE-TERMINAL-COMMS">
		<g id="PARAMS-class:terminalBlink_15_">
			<circle fill="#FFFF00" cx="2327" cy="939.7" r="31.7"/>
		</g>
	</g>
	<g id="BRIDGE-COMMS">
		<g>
			<circle fill="#FFFFFF" cx="2328" cy="954" r="83"/>
		</g>
	</g>
	<g id="BRIDGE-PILOT">
		<g>
			<circle fill="#FFFF00" cx="2513" cy="811" r="166"/>
		</g>
	</g>
	<g id="BRIDGE-LIFE">
		<g>
			<circle fill="#00FF00" cx="2519" cy="1047" r="165"/>
		</g>
	</g>
	<g id="BRIDGE-SENSORS">
		<g>
			<circle fill="#FFFF00" cx="2140" cy="1042" r="165"/>
		</g>
	</g>
</g>
<g id="VENTS">
	<line fill="none" stroke="#FF00FF" stroke-width="4" stroke-miterlimit="10" x1="2294" y1="2311" x2="2332" y2="2311"/>
	<line fill="none" stroke="#FF00FF" stroke-width="8" stroke-miterlimit="10" x1="2289" y1="2385" x2="2340" y2="2385"/>
	<line fill="none" stroke="#FF00FF" stroke-width="8" stroke-miterlimit="10" x1="2160" y1="2332" x2="2160" y2="2369"/>
	<line fill="none" stroke="#FF00FF" stroke-width="8" stroke-miterlimit="10" x1="2023" y1="3513" x2="2023" y2="3551"/>
	<line fill="none" stroke="#FF00FF" stroke-width="8" stroke-miterlimit="10" x1="2965" y1="2121" x2="2965" y2="2164"/>
	<line fill="none" stroke="#FF00FF" stroke-width="8" stroke-miterlimit="10" x1="2869" y1="2541" x2="2869" y2="2582"/>
	<line fill="none" stroke="#FF00FF" stroke-width="8" stroke-miterlimit="10" x1="2962" y1="3165" x2="2962" y2="3204"/>
	<line fill="none" stroke="#FF00FF" stroke-width="8" stroke-miterlimit="10" x1="3007" y1="4031" x2="3007" y2="4072"/>
	<line fill="none" stroke="#FF00FF" stroke-width="8" stroke-miterlimit="10" x1="2425" y1="3880" x2="2425" y2="3916"/>
	<line fill="none" stroke="#FF00FF" stroke-width="4" stroke-miterlimit="10" x1="2068" y1="3513" x2="2068" y2="3551"/>
	<line fill="none" stroke="#FF00FF" stroke-width="4" stroke-miterlimit="10" x1="2068" y1="3724" x2="2068" y2="3775"/>
	<line fill="none" stroke="#FF00FF" stroke-width="4" stroke-miterlimit="10" x1="1934" y1="3436" x2="1934" y2="3477"/>
	<line fill="none" stroke="#FF00FF" stroke-width="4" stroke-miterlimit="10" x1="1686" y1="3159" x2="1686" y2="3199"/>
	<line fill="none" stroke="#FF00FF" stroke-width="4" stroke-miterlimit="10" x1="1724" y1="2894" x2="1724" y2="2932"/>
	<line fill="none" stroke="#FF00FF" stroke-width="4" stroke-miterlimit="10" x1="2068" y1="2512" x2="2068" y2="2548"/>
	<line fill="none" stroke="#FF00FF" stroke-width="4" stroke-miterlimit="10" x1="1542" y1="2017" x2="1542" y2="2057"/>
	<line fill="none" stroke="#FF00FF" stroke-width="4" stroke-miterlimit="10" x1="2490" y1="2333" x2="2490" y2="2372"/>
	<line fill="none" stroke="#FF00FF" stroke-width="4" stroke-miterlimit="10" x1="2682" y1="3880" x2="2682" y2="3918"/>
</g>
<g id="DOORS">
	<line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="2279" y1="1158" x2="2372" y2="1158"/>
	<line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="2279" y1="1642" x2="2372" y2="1642"/>
	<line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="2279" y1="1526" x2="2372" y2="1526"/>
	<line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="2068" y1="1998" x2="2160" y2="1998"/>
	<line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="2490" y1="1997" x2="2584" y2="1997"/>
	<line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="2279" y1="1843" x2="2372" y2="1843"/>
	<line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="2226" y1="1696" x2="2226" y2="1790"/>
	<line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="2057" y1="1696" x2="2057" y2="1790"/>
	<line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="2609" y1="1718" x2="2609" y2="1780"/>
	<line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="2791" y1="1718" x2="2791" y2="1780"/>
	<line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="2427" y1="1696" x2="2427" y2="1790"/>
	<path fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" d="M2792,1565"/>
	<line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="1648" y1="1856" x2="1716" y2="1856"/>
	<line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="1790" y1="1856" x2="1863" y2="1856"/>
	<line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="1935" y1="1856" x2="2004" y2="1856"/>
	<line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="1652" y1="2109" x2="1715" y2="2109"/>
	<line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="1798" y1="2109" x2="1861" y2="2109"/>
	<line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="1938" y1="2109" x2="1995" y2="2109"/>
	<line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="2300" y1="2116" x2="2354" y2="2116"/>
	<line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="2605" y1="2092" x2="2673" y2="2092"/>
	<line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="2584" y1="2235" x2="2584" y2="2308"/>
	<line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="2584" y1="2488" x2="2584" y2="2562"/>
	<line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="2717" y1="2806" x2="2793" y2="2806"/>
	<line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="2297" y1="2806" x2="2374" y2="2806"/>
	<line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="1797" y1="2829" x2="1858" y2="2829"/>
	<line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="1797" y1="2688" x2="1858" y2="2688"/>
	<line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="1767" y1="2731" x2="1767" y2="2782"/>
	<line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="2878" y1="2731" x2="2878" y2="2782"/>
	<path fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" d="M2878,2804"/>
	<line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="2068" y1="2370" x2="2068" y2="2466"/>
	<line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="1588" y1="2306" x2="1588" y2="2395"/>
	<line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="1529" y1="2306" x2="1529" y2="2395"/>
	<line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="1485" y1="2440" x2="1529" y2="2395"/>
	<line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="1485" y1="2261" x2="1529" y2="2306"/>
	<line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="1345" y1="2322" x2="1345" y2="2398"/>
	<line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="1413" y1="2225" x2="1466" y2="2225"/>
	<line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="1803" y1="3255" x2="1853" y2="3255"/>
	<line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="1910" y1="3316" x2="1910" y2="3369"/>
	<line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="1955" y1="3427" x2="2007" y2="3427"/>
	<line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="1914" y1="3601" x2="1914" y2="3657"/>
	<line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="2294" y1="3804" x2="2363" y2="3804"/>
	<line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="2520" y1="3519" x2="2580" y2="3519"/>
	<line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="2808" y1="3804" x2="2878" y2="3804"/>
	<line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="2747" y1="3868" x2="2779" y2="3868"/>
	<line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="2945" y1="3868" x2="2976" y2="3868"/>
	<line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="2160" y1="3707" x2="2160" y2="3804"/>
	<line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="2500" y1="3707" x2="2597" y2="3707"/>
	<line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="2068" y1="2092" x2="2160" y2="2092"/>
	<line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="2490" y1="2092" x2="2584" y2="2092"/>
	<line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="2068" y1="2712" x2="2160" y2="2712"/>
	<line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="2490" y1="2712" x2="2584" y2="2712"/>
	<line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="2064" y1="3255" x2="2160" y2="3255"/>
</g>
<g id="WALLS-ETHEREAL_1_">
	<polyline fill="none" stroke="#FF5522" stroke-width="2" stroke-miterlimit="10" points="2078,568 2107,567 2115,571 2152,576 
		2191,578 2203,578 2203,505 2210,505 2210,501 2227,501 2267,457 2274,451 2384,451 	"/>
	<polyline fill="none" stroke="#FF5522" stroke-width="2" stroke-miterlimit="10" points="2580,568 2551,567 2543,571 2506,576 
		2467,578 2455,578 2455,505 2448,505 2448,501 2431,501 2391,457 2384,451 	"/>
	<polyline fill="none" stroke="#FF5522" stroke-width="2" stroke-miterlimit="10" points="2237,490 2309,490 2309,532 2327,540 	"/>
	<polyline fill="none" stroke="#FF5522" stroke-width="2" stroke-miterlimit="10" points="2421,490 2343,490 2343,531 2327,540 	"/>
	<path fill="none" stroke="#FF5522" stroke-width="2" stroke-miterlimit="10" d="M1144,3295"/>
	<polyline fill="none" stroke="#FF5522" stroke-width="2" stroke-miterlimit="10" points="2324,5731.4 1872.7,5731.4 1675.3,5111.5 
		1675.3,4920.8 1469,4625.8 1317,4282 1263,4076 	"/>
	<polyline fill="none" stroke="#FF5522" stroke-width="2" stroke-miterlimit="10" points="2324,5731.4 2775.3,5731.4 2972.7,5111.5 
		2972.7,4920.8 3179,4625.8 3332,4319.7 3403,4074 	"/>
	<polyline fill="none" stroke="#FF5522" stroke-width="2" stroke-miterlimit="10" points="1192,3696 944,3696 933,3193 804,3120 
		769,3028 707,2986 460,2986 393,3029 387,3104 363,3111 232,3190 234,3281 173,3345 175,3368 145,3413 86,3603 67,3785 55,3907 
		211,5669 524,5669 505,5314 675,5314 656,5680 905,5680 973,4888 978,4289 1067.5,4179 1067.5,4644.5 1115,4692 1239,4692 
		1245,4661 1263,4076 1192,4076 1192,3696 	"/>
	<path fill="none" stroke="#FF5522" stroke-width="2" stroke-miterlimit="10" d="M1191,3696"/>
	<polyline fill="none" stroke="#FF5522" stroke-width="2" stroke-miterlimit="10" points="3554,3696 3704,3696 3715,3193 3844,3120 
		3879,3028 3941,2986 4188,2986 4255,3029 4261,3104 4285,3111 4416,3190 4414,3281 4475,3345 4473,3368 4503,3413 4562,3603 
		4581,3785 4593,3907 4437,5669 4124,5669 4143,5314 3973,5314 3992,5680 3743,5680 3675,4888 3670,4289 3580.5,4179 3580.5,4644.5 
		3533,4692 3409,4692 3403,4661 3403,4074 3554,4074 3554,3696 	"/>
	<polyline fill="none" stroke="#FF5522" stroke-width="2" stroke-miterlimit="10" points="1263,4076 1210,3659 1210,2776 1022,2776 
		1022,2683 	"/>
	<polyline fill="none" stroke="#FF5522" stroke-width="2" stroke-miterlimit="10" points="1022,2008 1022,1992 1536,1992 1536,1529 
		2032,1529 2091,1470 2233,1470 2233,1217 2112,1217 2072,1158 	"/>
	<polyline fill="none" stroke="#FF5522" stroke-width="2" stroke-miterlimit="10" points="3449,3919 3449,1992 3108,1992 3108,1529 
		2620,1529 2561,1470 2419,1470 2419,1217 2540,1217 2580,1158 	"/>
	<line fill="none" stroke="#FF5522" stroke-width="2" stroke-miterlimit="10" x1="3403" y1="4074" x2="3449" y2="3919"/>
</g>
<g id="WALLS-NORMAL">
	<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2004,1856 2057,1856 2057,1790 2068,1790 
		2068,1998 2017,1998 2017,1856 	"/>
	<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="1863" y1="1856" x2="1935" y2="1856"/>
	<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="1716" y1="1856" x2="1790" y2="1856"/>
	<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2609,1696 2584,1696 2584,1526 2372,1526 
		2372,1158 2580,1158 2580,480 2473,386 2183,386 2072,480 2072,1158 2279,1158 2279,1526 2068,1526 2068,1696 2057,1696 2057,1556 
		1552,1556 1552,1856 1648,1856 	"/>
	<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2279,1843 2265,1843 2226,1804 	"/>
	<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2427,1790 2427,1804 2388,1843 2372,1843 
			"/>
	<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2372,1642 2388,1642 2427,1682 2427,1696 
			"/>
	<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2226,1696 2226,1682 2267,1642 2279,1642 
			"/>
	<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2226,1804 2226,1790 2160,1790 2160,1998 
			"/>
	<path fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" d="M2229,2273.2"/>
	<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="2332" y1="2311" x2="2386" y2="2311"/>
	<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2269,2116 2229,2155 2229,2273.2 
		2267,2311 2294,2311 	"/>
	<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="2300" y1="2116" x2="2269" y2="2116"/>
	<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2386,2311 2424,2273 2424,2155 2387,2116 
		2354,2116 	"/>
	<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="2289" y1="2385" x2="2260" y2="2385"/>
	<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2260,2385 2221,2423 2221,2543 2260,2582 
		2395,2582 2434,2544 2434,2422 2394,2385 2340,2385 	"/>
	<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="2294" y1="3804" x2="2265" y2="3804"/>
	<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2425,3880 2425,3838 2392,3804 2363,3804 
			"/>
	<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2265,3804 2233,3837 2233,3954 2269,3993 
		2387,3993 2425,3955 2425,3916 	"/>
	<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="1914" y1="3601" x2="1914" y2="3544"/>
	<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1623,3542 1623,3720 1679,3777 1857,3777 
		1914,3718 1914,3657 	"/>
	<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1623,3542 1681,3487 1856,3487 1914,3544 
			"/>
	<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2427,1790 2490,1790 2490,1997 2372,1997 
		2372,1844 	"/>
	<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2279,1843 2279,1998 2160,1998 	"/>
	<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2226,1696 2160,1696 2160,1620 2279,1620 
		2279,1642 	"/>
	<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2427,1696 2490,1696 2490,1620 2372,1620 
		2372,1642 	"/>
	<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2160,3229 2160,3707 2500,3707 2500,3537 
		2274,3537 2274,3237 2780,3237 2780,3537 2597,3537 2597,3707 2916,3707 2916,3804 2911,3804 2911,3868 2945,3868 	"/>
	<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="2962" y1="3204" x2="2962" y2="3229"/>
	<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2717,2806 2584,2806 2584,3137 2962,3137 
		2962,3165 	"/>
	<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="2965" y1="2121" x2="2965" y2="1997"/>
	<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2869,2202 2965,2202 2965,2164 	"/>
	<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="2869" y1="2541" x2="2869" y2="2202"/>
	<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2793,2806 2878,2806 2878,2810 2976,2810 
		2976,2712 2584,2712 2584,2692 2869,2692 2869,2582 	"/>
	<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2609,1790 2584,1790 2584,1997 2965,1997 
			"/>
	<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="2779" y1="3868" x2="2911" y2="3868"/>
	<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2976,3868 3009,3868 3009,3804 2916,3804 
			"/>
	<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2747,3868 2682,3868 2682,3804 2392,3804 
			"/>
	<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="2265" y1="3804" x2="2160" y2="3804"/>
	<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2064,3502 2064,3255 2068,3252 2068,3229 
		1874,3229 1874,3255 2064,3255 	"/>
	<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2068,3513 2068,3507 2064,3502 	"/>
	<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2068,3724 2064,3718 2064,3561 2068,3558 
		2068,3551 	"/>
	<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2160,3804 2160,3975 2064,3975 2064,3785 
		2066,3779 2068,3775 	"/>
	<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1724,2894 1724,2799 1667,2799 1667,2729 
		1572,2729 1572,2558 2068,2558 	"/>
	<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1686,3159 1686,3137 2068,3137 2068,2976 
		1724,2976 1724,2932 	"/>
	<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1934,3477 1934,3583 1914,3583 	"/>
	<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1686,3199 1686,3229 1781,3229 1781,3255 
		1738,3255 1738,3427 1934,3427 1934,3436 	"/>
	<path fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" d="M1914,3583"/>
	<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="2023" y1="3680" x2="1914" y2="3680"/>
	<path fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" d="M3009,3868"/>
	<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="3007" y1="4031" x2="3007" y2="3868"/>
	<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="2682" y1="3880" x2="2682" y2="3868"/>
	<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="3007,4072 3007,4129 2682,4129 2682,3918 
			"/>
	<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2374,2806 2490,2806 2490,3137 2160,3137 
			"/>
	<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2160,3137 2160,2806 2297,2806 	"/>
	<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2584,2991 2929,2991 2929,2810 	"/>
	<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="2160" y1="2991" x2="2490" y2="2991"/>
	<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1877,2806 1877,2829 1858,2829 	"/>
	<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1724,2799 1767,2799 1767,2806 1785,2806 
		1785,2829 1797,2829 	"/>
	<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1877,2806 2068,2806 2068,2976 	"/>
	<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1667,2729 1667,2712 1785,2712 	"/>
	<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1797,2688 1785,2688 1785,2712 	"/>
	<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2068,2548 2068,2712 1877,2712 1877,2688 
		1858,2688 	"/>
	<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="2068" y1="2466" x2="2068" y2="2512"/>
	<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2068,2370 2068,2248 2068,2092 2016,2092 
		2016,2109 2035,2109 2035,2237 	"/>
	<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="1443" y1="2499" x2="2068" y2="2499"/>
	<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2791,1780 2791,1813 2759,1844 2647,1844 
		2609,1803 2609,1780 	"/>
	<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2609,1718 2609,1692 2647,1652 2761,1652 
		2791,1685 2791,1718 	"/>
	<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2974,1780 2974,1800 2935,1844 2821,1844 
		2791,1813 	"/>
	<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2791,1685 2820,1652 2932,1652 2974,1692 
		2974,1780 	"/>
	<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1923,1856 1923,1998 1873,1998 1873,1856 
			"/>
	<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1780,1856 1780,1998 1730,1998 1730,1856 
			"/>
	<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1542,2057 1542,2091 1636,2091 1636,2109 
		1618,2109 1618,2237 1588,2237 	"/>
	<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1636,1856 1636,1998 1542,1998 1542,2017 
			"/>
	<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="1588" y1="2395" x2="1588" y2="2499"/>
	<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1588,2306 1588,2203 1517,2203 1517,2098 
		1484,2068 1394,2068 1361,2097 1361,2225 1374,2225 1345,2252 1345,2237 1098,2237 1098,2484 1345,2484 1345,2448 1376,2472 
		1485,2472 1485,2440 	"/>
	<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="1485" y1="2472" x2="1485" y2="2499"/>
	<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="1588" y1="2306" x2="1529" y2="2306"/>
	<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="1588" y1="2395" x2="1529" y2="2395"/>
	<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1517,2203 1517,2225 1485,2225 1485,2261 
			"/>
	<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="1466" y1="2225" x2="1485" y2="2225"/>
	<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="1374" y1="2225" x2="1413" y2="2225"/>
	<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="1345" y1="2398" x2="1345" y2="2448"/>
	<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="1345" y1="2251" x2="1345" y2="2322"/>
	<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="1618" y1="2237" x2="2068" y2="2237"/>
	<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="2878" y1="3804" x2="2911" y2="3804"/>
	<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="2682" y1="3804" x2="2808" y2="3804"/>
	<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2160,2332 2160,2092 2279,2092 2279,2092 
		2279,2116 	"/>
	<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2490,2372 2490,2712 2160,2712 2160,2369 
			"/>
	<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2372,2116 2372,2092 2490,2092 2490,2333 
			"/>
	<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="1652" y1="2109" x2="1636" y2="2109"/>
	<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1798,2109 1780,2109 1780,2092 1730,2092 
		1730,2109 1715,2109 	"/>
	<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1938,2109 1923,2109 1923,2092 1873,2092 
		1873,2109 1861,2109 	"/>
	<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="2016" y1="2109" x2="1995" y2="2109"/>
	<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1748,2237 1748,2109 1730,2109 	"/>
	<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1780,2109 1766,2109 1766,2237 	"/>
	<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1873,2109 1898,2109 1898,2237 	"/>
	<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1904,2237 1904,2109 1923,2109 	"/>
	<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="2962" y1="3229" x2="2160" y2="3229"/>
	<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="2023" y1="3551" x2="2023" y2="3680"/>
	<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2064,3427 2023,3427 2023,3513 	"/>
	<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2965,2112 3375,2112 3375,4082 3007,4082 
			"/>
	<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2966,2172 3315,2172 3315,2532 2869,2532 
			"/>
	<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2869,2591 3315,2591 3315,3154 2962,3154 
			"/>
	<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="3007,4022 3315,4022 3315,3214 2962,3214 
			"/>
	<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="2425" y1="3928" x2="2682" y2="3928"/>
	<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="2425" y1="3872" x2="2682" y2="3872"/>
	<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1686,3210 1528,3210 1528,3141 1421,3141 
		1421,3427 1738,3427 	"/>
	<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2064,3718 1995,3718 1995,3848 1421,3848 
		1421,3487 1681,3487 	"/>
	<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1504,3081 1589,3081 1589,3150 1686,3150 
			"/>
	<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2066,3779 2055,3779 2055,3908 1361,3908 
		1361,3081 1444,3081 1444,2944 1246,2944 1246,2683 1022,2683 1022,2008 1542,2008 	"/>
	<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="1484" y1="2068" x2="1542" y2="2068"/>
	<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1394,2068 1081,2068 1081,2623 1443,2623 
		1443,2499 	"/>
	<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1724,2884 1306,2884 1306,2683 1501,2683 
		1501,2558 1572,2558 	"/>
	<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1724,2944 1504,2944 1504,3081 	"/>
	<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="1856" y1="3487" x2="1934" y2="3487"/>
	<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="2023" y1="3502" x2="2064" y2="3502"/>
	<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="2023" y1="3561" x2="2064" y2="3561"/>
	<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="1910" y1="3369" x2="1910" y2="3427"/>
	<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="1910" y1="3255" x2="1910" y2="3316"/>
	<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="1853" y1="3255" x2="1874" y2="3255"/>
	<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="1781" y1="3255" x2="1803" y2="3255"/>
	<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="2007" y1="3427" x2="2023" y2="3427"/>
	<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="1934" y1="3427" x2="1955" y2="3427"/>
	<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2160,2323 2288,2323 2288,2311 	"/>
	<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2160,2382 2289,2382 2289,2386 	"/>
	<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2490,2382 2340,2382 2340,2385 	"/>
	<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2490,2323 2340,2323 2340,2311 	"/>
	<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2584,2235 2584,2202 2869,2202 	"/>
	<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="2584" y1="2488" x2="2584" y2="2308"/>
	<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="2584" y1="2692" x2="2584" y2="2562"/>
	<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="2673" y1="2092" x2="2965" y2="2092"/>
	<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2584,2202 2584,2092 2605,2092 	"/>
	<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="1767" y1="2731" x2="1767" y2="2712"/>
	<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="1767" y1="2782" x2="1767" y2="2799"/>
	<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="2878" y1="2806" x2="2878" y2="2782"/>
	<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="2878" y1="2731" x2="2878" y2="2712"/>
	<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="2580" y1="3519" x2="2597" y2="3537"/>
	<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="2500" y1="3537" x2="2520" y2="3519"/>
</g>
`,
  "USCSS Cronus - Deck C": `
  <g id="LIGHTS_1_">
	<g id="EXTERIOR-class:exterior">
		<circle id="PARAMS-class:cronusLogo_1_" cx="962.3" cy="753" r="1199"/>
		<circle id="PARAMS-class:foreEngines_2_" cx="4007" cy="2446" r="1412"/>
		<circle id="PARAMS-class:foreEngines_3_" cx="669" cy="2446" r="1412"/>
		<circle id="PARAMS-class:foreEngines_1_" cx="669" cy="4009" r="1412"/>
		<circle id="PARAMS-class:foreEngines_4_" cx="3964" cy="4009" r="1412"/>
		<circle id="PARAMS-class:foreEngines_5_" cx="2323" cy="4927" r="1412"/>
		<circle id="PARAMS-class:deckLogo_1_" cx="3095.3" cy="1134" r="380"/>
		<circle id="PARAMS-class:wireframe_1_" cx="3662.3" cy="852" r="1073"/>
	</g>
	<g id="SHIPLIGHTS-AMBER-class:amberLights_1_">
		<circle id="PARAMS-class:airScrubbers_1_" fill="#005F61" cx="2325.1" cy="2482.5" r="120"/>
		<circle id="_x3C_Path_x3E__2_" fill="#005F61" cx="2113.1" cy="1897.5" r="208.9"/>
		<circle id="_x3C_Path_x3E__4_" fill="#005F61" cx="2113.1" cy="2325.5" r="257.5"/>
		<circle id="_x3C_Path_x3E__6_" fill="#005F61" cx="2113.1" cy="2637.5" r="122.5"/>
		<circle id="_x3C_Path_x3E__9_" fill="#005F61" cx="2536.1" cy="2637.5" r="122.5"/>
		<circle id="_x3C_Path_x3E__13_" fill="#005F61" cx="2537.1" cy="1897.5" r="208.9"/>
		<circle id="_x3C_Path_x3E__15_" fill="#005F61" cx="2328.1" cy="2044.5" r="252.5"/>
		<circle id="_x3C_Path_x3E__16_" fill="#005F61" cx="2834.1" cy="2044.5" r="286.9"/>
		<circle id="_x3C_Path_x3E__22_" fill="#005F61" cx="1814.1" cy="2044.5" r="286.9"/>
		<circle id="_x3C_Path_x3E__31_" fill="#005F61" cx="2327.1" cy="1737.5" r="114.5"/>
		<circle id="_x3C_Path_x3E__32_" fill="#005F61" cx="2327.1" cy="1477.5" r="114.5"/>
		<circle id="_x3C_Path_x3E__35_" fill="#005F61" cx="2327.1" cy="2215.5" r="114.5"/>
		<circle id="_x3C_Path_x3E__37_" fill="#005F61" cx="2327.1" cy="3898.5" r="114.5"/>
		<circle id="_x3C_Path_x3E__25_" fill="#005F61" cx="2327.1" cy="2966.5" r="719.5"/>
		<circle id="_x3C_Path_x3E__26_" fill="#005F61" cx="1941.1" cy="3570.5" r="491.9"/>
		<circle id="_x3C_Path_x3E__3_" fill="#005F61" cx="2735.1" cy="3570.5" r="491.9"/>
		<circle id="_x3C_Path_x3E__39_" fill="#005F61" cx="2721.1" cy="4178.5" r="532.9"/>
		<circle id="_x3C_Path_x3E__1_" fill="#005F61" cx="1924.1" cy="4178.5" r="532.9"/>
		<circle id="_x3C_Path_x3E__17_" fill="#005F61" cx="2326.1" cy="1919.5" r="86.9"/>
		<circle id="_x3C_Path_x3E__18_" fill="#005F61" cx="2326.1" cy="1608.5" r="59.5"/>
		<circle id="_x3C_Path_x3E__5_" fill="#005F61" cx="2186.1" cy="1741.5" r="59.5"/>
		<circle id="_x3C_Path_x3E__7_" fill="#005F61" cx="2467.1" cy="1741.5" r="59.5"/>
		<circle id="_x3C_Path_x3E__11_" fill="#005F61" cx="2537.1" cy="2325.5" r="257.5"/>
	</g>
	<g id="TERMINAL-AWAKE-class:terminalBlink_2_">
		<circle fill="#FFFF00" cx="2625" cy="3693.7" r="36"/>
		<circle fill="#FFFF00" cx="1838" cy="3092.7" r="36"/>
		<circle fill="#FFFF00" cx="3028" cy="4508.7" r="36"/>
	</g>
	<g id="SHIPLIGHTS-AWAKE">
		<circle fill="#FFFF00" cx="2936" cy="2760" r="80.9"/>
		<circle fill="#FFFF00" cx="1715" cy="2760" r="80.9"/>
		<circle id="PARAMS-class:electricalShort_3_" fill="#FFFF9F" cx="2968" cy="2171" r="43"/>
		<circle id="PARAMS-class:electricalShort_2_" fill="#FFD34A" cx="2826" cy="2171" r="80.9"/>
		<circle id="PARAMS-class:electricalShort_1_" fill="#FFFFFF" cx="1991" cy="2157" r="52"/>
		<circle id="PARAMS-class:electricalShort" fill="#FFFF00" cx="1807.6" cy="2193.4" r="58.4"/>
		<circle id="PARAMS-class:claytonStorage" fill="#FFFF00" cx="1683" cy="2171" r="80.9"/>
		<circle id="PARAMS-class:cargoOffice_1_" fill="#FFFF00" cx="1788" cy="2980" r="111"/>
		<circle id="PARAMS-class:cargoOffice_2_" fill="#FFFF00" cx="1788" cy="3095" r="111"/>
		<circle id="PARAMS-class:radiation_1_" fill="#9EFF00" cx="2649" cy="4359" r="211"/>
		<circle id="PARAMS-class:radiation_2_" fill="#9EFF00" cx="3114" cy="4409" r="211"/>
		<circle id="PARAMS-class:radiation" fill="#9EFF00" cx="2849" cy="4418" r="68"/>
	</g>
</g>
<g id="WALLS_2_">
	<g id="NORMAL">
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2346,1574 2386,1574 2424,1535 
			2424,1416 2386,1378 2268,1378 		"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2268,1378 2230,1417 2230,1534 
			2269,1574 2308,1574 		"/>
		<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="2280" y1="1643" x2="2280" y2="1574"/>
		<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="2374" y1="1574" x2="2374" y2="1643"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2426,1723 2426,1681 2388,1643 		"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2349,1843 2387,1843 2426,1804 
			2426,1761 		"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2225,1766 2225,1804 2264,1843 
			2304,1843 		"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2308,1643 2265,1643 2225,1682 
			2225,1721 		"/>
		<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="2388" y1="1643" x2="2346" y2="1643"/>
		<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="2216" y1="1787" x2="2225" y2="1787"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2280,1961 2280,1996 2160,1996 
			2160,1787 2179,1787 		"/>
		<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="2280" y1="1843" x2="2280" y2="1921"/>
		<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="2438" y1="1787" x2="2426" y2="1787"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2374,1961 2374,1996 2492,1996 
			2492,1787 2475,1787 		"/>
		<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="2374" y1="1843" x2="2374" y2="1921"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="3046,2576 3046,2345 2585,2345 		"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2858,2711 3046,2711 3046,2616 		"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2585,2560 2585,2711 2794,2711 		"/>
		<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="2585" y1="2308" x2="2585" y2="2491"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2638,2091 2585,2091 2585,2266 		"/>
		<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="2781" y1="2091" x2="2731" y2="2091"/>
		<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="2923" y1="2091" x2="2874" y2="2091"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2426,1700 2585,1700 2585,1996 
			3109,1996 3109,2091 3017,2091 		"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1610,2576 1610,2346 2067,2346 		"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1806,2711 1610,2711 1610,2617 		"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2067,2306 2067,2711 1853,2711 		"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2225,1700 2067,1700 2067,1996 
			1543,1996 1543,2091 1638,2091 1638,2110 1617,2110 1617,2241 1747,2241 1747,2110 1731,2110 1731,2091 1781,2091 1781,2110 
			1765,2110 1765,2241 1898,2241 1898,2110 1874,2110 1874,2091 1923,2091 1923,2110 1904,2110 1904,2241 2034,2241 2034,2110 
			2017,2110 2017,2091 2067,2091 2067,2267 		"/>
		<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="1709" y1="2091" x2="1731" y2="2091"/>
		<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="1638.1" y1="2091" x2="1658" y2="2091"/>
		<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="1852" y1="2091" x2="1874" y2="2091"/>
		<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="1781.1" y1="2091" x2="1801" y2="2091"/>
		<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="1995" y1="2091" x2="2017" y2="2091"/>
		<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="1923.1" y1="2091" x2="1944" y2="2091"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2923,2091 2923,2110 2904,2110 
			2904,2241 3034,2241 3034,2110 3017,2110 3017,2091 		"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2781,2091 2781,2110 2765,2110 
			2765,2241 2898,2241 2898,2110 2874,2110 2874,2091 		"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2638,2091 2638,2110 2617,2110 
			2617,2241 2747,2241 2747,2110 2731,2110 2731,2091 		"/>
		<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="2708" y1="2091" x2="2731" y2="2091"/>
		<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="2637.7" y1="2091" x2="2657.6" y2="2091"/>
		<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="2851" y1="2091" x2="2874" y2="2091"/>
		<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="2781" y1="2091" x2="2800" y2="2091"/>
		<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="2994" y1="2091" x2="3017" y2="2091"/>
		<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="2923" y1="2091" x2="2945" y2="2091"/>
		<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="2300" y1="2116" x2="2280" y2="2116"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2492,2332 2492,2091 2374,2091 
			2374,2116 2354,2116 		"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2160,2375 2160,2711 2492,2711 
			2492,2373 		"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2280,2116 2280,2091 2160,2091 
			2160,2332 		"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2280,2116 2267,2116 2229,2155 
			2229,2274 2267,2311 2385,2311 2423,2273 2423,2155 2386,2116 2374,2116 		"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2260,2383 2220,2422 2220,2545 
			2260,2583 2395,2583 2434,2545 2434,2424 2392,2383 		"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2373.8,1971 2486,1971 2486,1787 		"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2167,1787 2167,1971 2280,1971 		"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2374,1912 2426,1912 2426,1804 		"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2225,1804 2225,1912 2280,1912 		"/>
		<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="2160" y1="2323" x2="2492" y2="2323"/>
		<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="2160" y1="2383" x2="2492" y2="2383"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2585,2317 3157,2317 3157,2566 
			3046,2566 		"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2585,2257 3217,2257 3217,2566 		"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="3217,2566 3298,2566 3298,3154 
			3233,3154 3233,3691 3032,3691 3001,3691 3001,3675.1 		"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="3045.8,2627 3239,2627 3239,2825 
			2870,2825 2870,2803 2882,2803 2882,2809 2976,2809 2976,2711 		"/>
		<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="2882" y1="2735" x2="2882" y2="2711"/>
		<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="2882" y1="2803" x2="2882" y2="2778"/>
		<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="2870" y1="2837" x2="2870" y2="2825"/>
		<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="2870" y1="2884" x2="2870" y2="2874"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1712,2994 1712,2923 1783,2923 
			1783,2804 1759,2804 1759,2798 1667,2798 1667,2712 		"/>
		<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="1712" y1="3100" x2="1712" y2="3037"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2304,3626 2281,3626 2281,3354 
			1712,3354 1712,3142 		"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2870,2884 2870,3132 2986,3132 
			2986,3354 2371,3354 2371,3626 2351,3626 		"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1766,2736 1766,2716 1762,2716 
			1762,2711.1 		"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1759,2798 1766,2798 1766,2781 		"/>
		<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="1813" y1="2923" x2="1783" y2="2923"/>
		<path fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" d="M1713,3154"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2067,2257 1436,2257 1436,2568 
			1356,2568 1356,3046 1712,3046 		"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1712,2988 1413,2988 1413,2626 
			1610,2626 		"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1610,2568 1495,2568 1495,2316 
			2067,2316 		"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1712,3092 1419,3092 1419,3693 
			1660,3693 1660,3681 		"/>
		<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="2303" y1="3794" x2="2267" y2="3794"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2356,3996 2389,3996 2428,3956 
			2428,3834 2388,3794 2352,3794 		"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2267,3794 2228,3835 2228,3956 
			2268,3996 2300.1,3996 		"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2790,4393 2790,4279 2509,4279 
			2509,4506 2546,4521 2559,4560 2733,4560 2749,4519 2790,4505 2790,4446 		"/>
		<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="2917" y1="4393" x2="2917" y2="4371"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="3076,4278 3105,4278 3122,4282 
			3129,4279 3171,4279 3177,4283 3179,4295 3181,4329 3177,4339 3177,4358 3180,4365 3180,4394 3178,4400 3178,4417 3181,4424 
			3180,4455 3176,4465 3179,4485 3180,4540 2922,4540 2917,4538 2917,4446 		"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2790,4371 2917,4371 2917,4355 
			2924,4338 2920,4335 2920,4333 2918,4330 2918,4291 2923,4281 2931,4282 2938,4277 2978,4277 2989,4273 2997,4278 3021,4278 		"/>
		<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="2790" y1="4463" x2="2917" y2="4463"/>
		<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="2067" y1="2711" x2="2087" y2="2734"/>
		<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="2160" y1="2711" x2="2137" y2="2734"/>
		<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="2492" y1="2711" x2="2512" y2="2734"/>
		<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="2585" y1="2711" x2="2562" y2="2734"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="3180,4152 3180,4241 3093,4241 
			3093,4278 		"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1473,4152 1473,4241 3004,4241 
			3004,4278 		"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="8" stroke-miterlimit="10" points="1712,3152 1866,3152 1866,2923 
			1846,2923 		"/>
	</g>
	<g id="INVISIBLE">
		<polyline fill="none" stroke="#00FFFF" stroke-width="2" stroke-miterlimit="10" points="1852,2923 1852,2782 1969,2782 
			1969,3201 1801,3198 1767,3198 1767,3230 2303,3230 2303,3330 2281,3354 		"/>
		<polyline fill="none" stroke="#00FFFF" stroke-width="2" stroke-miterlimit="10" points="1998,2782 1998,2947 2303,2947 
			2303,2782 1998,2782 		"/>
		<polyline fill="none" stroke="#00FFFF" stroke-width="2" stroke-miterlimit="10" points="1998,2975 1998,3201 2303,3201 
			2303,2975 1998,2975 		"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="8" stroke-miterlimit="10" points="2870,2884 3239,2884 3239,3093 
			3173,3093 3173,3633 3001,3633 3001,3642 		"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="8" stroke-miterlimit="10" points="1660,3648 1660,3634 1479,3634 
			1479,3152 1712,3152 		"/>
		<polyline fill="none" stroke="#00FFFF" stroke-width="2" stroke-miterlimit="10" points="2352,2782 2352,2947 2677,2947 
			2677,2782 2352,2782 		"/>
		<polyline fill="none" stroke="#00FFFF" stroke-width="2" stroke-miterlimit="10" points="2352,2975 2352,3201 2677,3201 
			2677,2975 2352,2975 		"/>
		<polyline fill="none" stroke="#00FFFF" stroke-width="2" stroke-miterlimit="10" points="2870.3,2953 2801,2953 2801,2782 
			2704,2782 2704,3201 2872,3198 2904,3198 2904,3230 2871,3230 2352,3230 2352,3330 2371,3354 		"/>
		<polyline fill="none" stroke="#00FFFF" stroke-width="2" stroke-miterlimit="10" points="2371.1,3626 3001,3626 3001,3633 		"/>
		<polyline fill="none" stroke="#00FFFF" stroke-width="2" stroke-miterlimit="10" points="1660,3634 1660,3626 2280.7,3626 		"/>
		<polyline fill="none" stroke="#00FFFF" stroke-width="2" stroke-miterlimit="10" points="1660,3693 1660,3714 1910,3714 
			1910,4152 1473,4152 		"/>
		<polyline fill="none" stroke="#00FFFF" stroke-width="2" stroke-miterlimit="10" points="3180,4152 2743,4152 2743,3714 
			3001,3714 3001,3691 		"/>
		<polyline fill="none" stroke="#00FFFF" stroke-width="2" stroke-miterlimit="10" points="2371,3996 2371,4122 2395,4122 
			2395,4152 2656,4152 2656,3714 2388,3714 2388,3745 2359,3745 2359,3794 		"/>
		<polyline fill="none" stroke="#00FFFF" stroke-width="2" stroke-miterlimit="10" points="2284,3794 2284,3747 2273,3747 
			2273,3714 1997,3714 1997,4152 2259,4152 2259,4122 2284,4122 2284,3996 		"/>
	</g>
	<g id="ETHEREAL_1_">
		<polyline fill="none" stroke="#FF5522" stroke-width="2" stroke-miterlimit="10" points="3179,4485 3233,4391 3435,3783 
			3444,2606 3403,2590 3384,2458 3389,2182 3345,2166 3334,2067 3359,1990 3111,1990 3111,1535 2464,1535 2464,1413 2410,1359.5 		
			"/>
		<polyline fill="none" stroke="#FF5522" stroke-width="2" stroke-miterlimit="10" points="2324,5664 1917,5664 1739,5105 
			1739,4933 1553,4667 1415,4391 1213,3783 1204,2606 1245,2590 1264,2458 1259,2182 1303,2166 1314,2067 1289,1990 1537,1990 
			1537,1535 2184,1535 2184,1407 2238,1359.5 2410,1359.5 		"/>
		<polyline fill="none" stroke="#FF5522" stroke-width="2" stroke-miterlimit="10" points="2324,5664 2731,5664 2909,5105 
			2909,4933 3095,4667 3156,4540 		"/>
		<polyline fill="none" stroke="#FF5522" stroke-width="2" stroke-miterlimit="10" points="1415,4391 1401.5,4622.5 1268.2,4622.5 
			1217.2,4571.5 1217.2,4071.2 1121,4189.4 1115.6,4833.2 1042.5,5684.4 774.9,5684.4 795.3,5291 612.6,5291 633.1,5672.5 
			296.7,5672.5 129,3778.8 141.9,3647.7 162.3,3452.1 225.7,3247.9 258,3199.6 255.8,3174.8 321.4,3106 319.2,3008.2 460,2923.3 
			485.8,2915.8 492.3,2835.2 564.3,2789 829.7,2789 896.4,2834.1 934,2933 1072.6,3011.5 1084.4,3552.1 1211,3552.1 		"/>
		<polyline fill="none" stroke="#FF5522" stroke-width="2" stroke-miterlimit="10" points="3233,4391 3246.5,4622.5 3379.8,4622.5 
			3430.8,4571.5 3430.8,4071.2 3527,4189.4 3532.4,4833.2 3605.5,5684.4 3873.1,5684.4 3852.7,5291 4035.4,5291 4014.9,5672.5 
			4351.3,5672.5 4519,3778.8 4506.1,3647.7 4485.7,3452.1 4422.3,3247.9 4390,3199.6 4392.2,3174.8 4326.6,3106 4328.8,3008.2 
			4188,2923.3 4162.2,2915.8 4155.7,2835.2 4083.7,2789 3818.3,2789 3751.6,2834.1 3714,2933 3575.4,3011.5 3563.6,3552.1 
			3437,3552.1 		"/>
		<line fill="none" stroke="#FF5522" stroke-width="2" stroke-miterlimit="10" x1="1473" y1="4152" x2="1336" y2="4152"/>
		<line fill="none" stroke="#FF5522" stroke-width="2" stroke-miterlimit="10" x1="3312" y1="4152" x2="3180" y2="4152"/>
	</g>
</g>
<g id="DOORS_2_">
	<g id="NORMAL_1_">
		<line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="2308" y1="1574" x2="2346" y2="1574"/>
		<line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="2308" y1="1643" x2="2346" y2="1643"/>
		<line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="2304" y1="1843" x2="2349" y2="1843"/>
		<line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="2300" y1="2116" x2="2354" y2="2116"/>
		<line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="2800" y1="2091" x2="2851" y2="2091"/>
		<line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="2658" y1="2091" x2="2708" y2="2091"/>
		<line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="2945" y1="2091" x2="2994" y2="2091"/>
		<line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="1801" y1="2091" x2="1852" y2="2091"/>
		<line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="1944" y1="2091" x2="1995" y2="2091"/>
		<line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="1806" y1="2711" x2="1853" y2="2711"/>
		<line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="1766" y1="2736" x2="1766" y2="2781"/>
		<line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="1813" y1="2923" x2="1846" y2="2923"/>
		<line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="2087" y1="2734" x2="2137" y2="2734"/>
		<line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="2512" y1="2734" x2="2562" y2="2734"/>
		<line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="2794" y1="2711" x2="2858" y2="2711"/>
		<line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="2882" y1="2735" x2="2882" y2="2778"/>
		<line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="2304" y1="3626" x2="2351" y2="3626"/>
		<line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="2303" y1="3794" x2="2352" y2="3794"/>
		<line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="2300" y1="3996" x2="2356" y2="3996"/>
		<line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="3021" y1="4278" x2="3076" y2="4278"/>
		<line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="2917" y1="4393" x2="2917" y2="4446"/>
		<line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="2790" y1="4393" x2="2790" y2="4446"/>
		<line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="2225" y1="1721" x2="2225" y2="1766"/>
		<line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="2426" y1="1723" x2="2426" y2="1761"/>
		<line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="2280" y1="1996" x2="2374" y2="1996"/>
		<line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="2067" y1="2091" x2="2160" y2="2091"/>
		<line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="2492" y1="2091" x2="2585" y2="2091"/>
		<line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="2585" y1="2491" x2="2585" y2="2560"/>
	</g>
	<g id="VENTS">
		<line fill="none" stroke="#FF00FF" stroke-width="4" stroke-miterlimit="10" x1="2179" y1="1787" x2="2216" y2="1787"/>
		<line fill="none" stroke="#FF00FF" stroke-width="4" stroke-miterlimit="10" x1="2280" y1="1921" x2="2280" y2="1961"/>
		<line fill="none" stroke="#FF00FF" stroke-width="4" stroke-miterlimit="10" x1="2067" y1="2267" x2="2067" y2="2306"/>
		<line fill="none" stroke="#FF00FF" stroke-width="4" stroke-miterlimit="10" x1="1610" y1="2576" x2="1610" y2="2617"/>
		<line fill="none" stroke="#FF00FF" stroke-width="4" stroke-miterlimit="10" x1="1712" y1="3100" x2="1712" y2="3142"/>
		<line fill="none" stroke="#FF00FF" stroke-width="4" stroke-miterlimit="10" x1="1712" y1="2994" x2="1712" y2="3037"/>
		<line fill="none" stroke="#FF00FF" stroke-width="4" stroke-miterlimit="10" x1="1660" y1="3648" x2="1660" y2="3681"/>
		<line fill="none" stroke="#FF00FF" stroke-width="4" stroke-miterlimit="10" x1="2492" y1="2332" x2="2492" y2="2373"/>
		<line fill="none" stroke="#FF00FF" stroke-width="4" stroke-miterlimit="10" x1="2438" y1="1787" x2="2475" y2="1787"/>
		<line fill="none" stroke="#FF00FF" stroke-width="8" stroke-miterlimit="10" x1="2160" y1="2332" x2="2160" y2="2375"/>
		<line fill="none" stroke="#FF00FF" stroke-width="8" stroke-miterlimit="10" x1="2585" y1="2266" x2="2585" y2="2308"/>
		<line fill="none" stroke="#FF00FF" stroke-width="8" stroke-miterlimit="10" x1="3046" y1="2576" x2="3046" y2="2616"/>
		<line fill="none" stroke="#FF00FF" stroke-width="8" stroke-miterlimit="10" x1="2870" y1="2837" x2="2870" y2="2874"/>
		<line fill="none" stroke="#FF00FF" stroke-width="8" stroke-miterlimit="10" x1="3001" y1="3642" x2="3001" y2="3675"/>
		<line fill="none" stroke="#FF00FF" stroke-width="8" stroke-miterlimit="10" x1="2374" y1="1921" x2="2374" y2="1961"/>
	</g>
	<g id="NORMAL-LOCKED">
		<line fill="none" stroke="#888888" stroke-width="2" stroke-miterlimit="10" x1="1658" y1="2091" x2="1709" y2="2091"/>
	</g>
</g>`,
  "USCSS Cronus - Deck D": `
  <g id="LIGHTS_1_">
	<g id="EXTERIOR-class:exterior_1_">
		<circle id="PARAMS-class:cronusLogo_1_" cx="962.3" cy="753" r="1199"/>
		<circle id="PARAMS-class:aftEngines_4_" cx="539" cy="3738" r="2186"/>
		<circle id="PARAMS-class:aftEngines_3_" cx="4050" cy="3738" r="2186"/>
		<circle id="PARAMS-class:still_3_" cx="2326" cy="4855" r="1677"/>
		<circle id="PARAMS-class:foreEngines_3_" cx="961" cy="2687" r="1412"/>
		<circle id="PARAMS-class:foreEngines_2_" cx="3663" cy="2687" r="1412"/>
		<circle id="PARAMS-class:deckLogo_1_" cx="3095.3" cy="1048" r="380"/>
		<circle id="PARAMS-class:wireframe_1_" cx="3662.3" cy="852" r="1073"/>
	</g>
	<g id="SHIPLIGHTS-AMBER-class:amberLights_5_">
		<circle fill="#005F61" cx="1617.8" cy="2422.7" r="92.7"/>
		<circle fill="#005F61" cx="2337.8" cy="2633.7" r="1107.7"/>
		<circle fill="#005F61" cx="3039.8" cy="2422.7" r="92.7"/>
		<circle fill="#005F61" cx="3039.8" cy="3189.7" r="92.7"/>
		<circle fill="#005F61" cx="1613.8" cy="3189.7" r="92.7"/>
		<circle fill="#005F61" cx="1860.8" cy="3587.7" r="190.7"/>
		<circle fill="#005F61" cx="2815.8" cy="3587.7" r="190.7"/>
		<circle fill="#005F61" cx="2202.8" cy="3587.7" r="190.7"/>
		<circle fill="#005F61" cx="2453.8" cy="3535.7" r="190.7"/>
	</g>
	<g id="SHIPLIGHTS-AWAKE">
		<circle fill="#FF0000" cx="1467.8" cy="2422.7" r="54.2"/>
		<circle fill="#FF0000" cx="1467.8" cy="3186.7" r="54.2"/>
		<circle fill="#FF0000" cx="3206.1" cy="3186.7" r="54.2"/>
		<circle fill="#FF0000" cx="3206.1" cy="2422.7" r="54.2"/>
		<circle id="PARAMS-t:g" fill="#FFFF00" cx="1715" cy="2760" r="80.9"/>
		<circle id="PARAMS-t:g_1_" fill="#FFFF00" cx="2926" cy="2760" r="80.9"/>
	</g>
</g>
<g id="DOORS_2_">
	<g id="NORMAL_1_">
		<line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="2724" y1="3440" x2="2774" y2="3440"/>
		<line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="2232" y1="3440" x2="2281" y2="3440"/>
		<line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="1853" y1="3440" x2="1903" y2="3440"/>
		<line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="1688" y1="3166" x2="1688" y2="3218"/>
		<line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="2977" y1="2398" x2="2977" y2="2452"/>
		<line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="2977" y1="3152" x2="2977" y2="3221"/>
		<line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="1688" y1="2397" x2="1688" y2="2450"/>
	</g>
	<g id="VENTS">
		<line fill="none" stroke="#FF00FF" stroke-width="8" stroke-miterlimit="10" x1="2977" y1="2572" x2="2977" y2="2607"/>
		<line fill="none" stroke="#FF00FF" stroke-width="8" stroke-miterlimit="10" x1="2977" y1="3012" x2="2977" y2="3049"/>
		<line fill="none" stroke="#FF00FF" stroke-width="8" stroke-miterlimit="10" x1="2977" y1="3280" x2="2977" y2="3309"/>
		<line fill="none" stroke="#FF00FF" stroke-width="8" stroke-miterlimit="10" x1="2977" y1="3379" x2="2977" y2="3414"/>
		<line fill="none" stroke="#FF00FF" stroke-width="4" stroke-miterlimit="10" x1="2015" y1="3440" x2="2050" y2="3440"/>
		<line fill="none" stroke="#FF00FF" stroke-width="4" stroke-miterlimit="10" x1="2607" y1="3440" x2="2634" y2="3440"/>
		<line fill="none" stroke="#FF00FF" stroke-width="4" stroke-miterlimit="10" x1="1688" y1="3415" x2="1688" y2="3383"/>
		<line fill="none" stroke="#FF00FF" stroke-width="4" stroke-miterlimit="10" x1="1688" y1="3278" x2="1688" y2="3312"/>
		<line fill="none" stroke="#FF00FF" stroke-width="4" stroke-miterlimit="10" x1="1688" y1="3016" x2="1688" y2="3042"/>
		<line fill="none" stroke="#FF00FF" stroke-width="4" stroke-miterlimit="10" x1="1688" y1="2578" x2="1688" y2="2601"/>
	</g>
</g>
<g id="WALLS_2_">
	<g id="NORMAL">
		<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="1688" y1="2397" x2="1686" y2="1875"/>
		<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="1688" y1="2578" x2="1688" y2="2450"/>
		<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="1688" y1="3016" x2="1688" y2="2601"/>
		<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="1688" y1="3166" x2="1688" y2="3042"/>
		<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="1688" y1="3278" x2="1688" y2="3218"/>
		<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="1688" y1="3383" x2="1688" y2="3312"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1853,3440 1688,3440 1688,3415 		"/>
		<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="2015" y1="3440" x2="1903" y2="3440"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2977,3440 2977,3647 2642,3647 
			2642,3440.3 		"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2232,3440 2050,3440 2050,3647 
			2604,3647 2604,3440.1 		"/>
		<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="2607" y1="3440" x2="2281" y2="3440"/>
		<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="2724" y1="3440" x2="2634" y2="3440"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2977,3414 2977,3440 2774,3440 		"/>
		<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="2977" y1="3309" x2="2977" y2="3379"/>
		<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="2977" y1="3221" x2="2977" y2="3280"/>
		<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="2977" y1="3048" x2="2977" y2="3152"/>
		<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="2977" y1="2606" x2="2977" y2="3013"/>
		<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="2977" y1="2452" x2="2977" y2="2573"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1686,1875 2977,1875 2977,2398 		"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1688,3440 1688,3647 2015,3647 
			2015,3440 		"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1687.8,3275.4 1340,3275.4 1340,3365 
			1391,3365 1391,3834 3265,3834 3265,3365 3316,3365 3316,3278 2977.1,3278 		"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="3261,3312 3282,3312 3282,3331 
			3261,3331 3261,3312 		"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2977,3312 3229,3312 3229,3379 
			2977,3379 		"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1688,3417 1428,3417 1428,3798 
			2015,3798 2015,3647 		"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2050,3647 2050,3798 2604,3798 
			2604,3647 		"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2977,3416 3229,3416 3229,3798 
			2642,3798 2642,3647 		"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1688,3381 1428,3381 1428,3313 
			1688,3313 		"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1392,3313 1374,3313 1374,3331 
			1392,3331 1392,3313 		"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2977,3149 3230,3150 3230,3230 
			2977,3230 		"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2977,3012 3281,3012 3281,2607 
			2977,2607 		"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2977,2572 3316,2572 3316,3049 
			2977,3049 		"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2977,2386 3214,2386 3214,2464 
			2977,2464 		"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1688,3151 1442,3151 1442,3230 
			1688,3230 		"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1688,3011 1376,3011 1376,2607 
			1688,2607 		"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1688,2571 1340,2571 1340,3047 
			1688,3047 		"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1688,2388 1440,2388 1440,2464 
			1687.9,2464 		"/>
	</g>
	<g id="INVISIBLE">
		<line fill="none" stroke="#00FFFF" stroke-width="2" stroke-miterlimit="10" x1="1770" y1="2275" x2="1770" y2="3087"/>
		<polyline fill="none" stroke="#00FFFF" stroke-width="2" stroke-miterlimit="10" points="1855,2982 1855,3103 2790,3103 
			2790,2981 		"/>
		<line fill="none" stroke="#00FFFF" stroke-width="2" stroke-miterlimit="10" x1="2872" y1="3085" x2="2872" y2="2275"/>
		<polyline fill="none" stroke="#00FFFF" stroke-width="2" stroke-miterlimit="10" points="1996,2428 1996,2762 2098,2874 
			2565,2874 2667,2767 2667,2429 2568,2318 2095,2318 1996,2428 		"/>
	</g>
	<g id="TERRAIN">
		<polygon fill="none" stroke="#00FF00" stroke-width="2" stroke-miterlimit="10" points="1823,2167 1835,2124 2063,2005 2089,2005 
			2148,2113 2132,2138 1909,2259 1862,2243 		"/>
		<polygon fill="none" stroke="#00FF00" stroke-width="2" stroke-miterlimit="10" points="2357,2195 2366,2132 2403,2073 2494,1954 
			2507,1951 2698,2097 2738,2176 2681,2252 2595,2236 2525,2182 2511,2234 2429,2257 2392,2209 2377,2214 2359,2204 		"/>
	</g>
	<g id="ETHEREAL">
		<polyline fill="none" stroke="#FF5522" stroke-width="2" stroke-miterlimit="10" points="1041,4289 1036,4888 968,5680 719,5680 
			738,5314 568,5314 587,5669 274,5669 118,3907 130,3785 149,3603 208,3413 238,3368 236,3345 297,3281 295,3190 426,3111 
			450,3104 456,3029 523,2986 770,2986 832,3028 867,3120 996,3193 1007,3696 1041,4289 		"/>
		<polyline fill="none" stroke="#FF5522" stroke-width="2" stroke-miterlimit="10" points="3619,4289 3624,4888 3692,5680 
			3941,5680 3922,5314 4092,5314 4073,5669 4386,5669 4542,3907 4530,3785 4511,3603 4452,3413 4422,3368 4424,3345 4363,3281 
			4365,3190 4234,3111 4210,3104 4204,3029 4137,2986 3890,2986 3828,3028 3793,3120 3664,3193 3653,3696 3619,4289 		"/>
		<polyline fill="none" stroke="#FF5522" stroke-width="2" stroke-miterlimit="10" points="3046,2463.5 3046,2522 3366,2522 
			3366,3150 3230,3150 		"/>
		<polyline fill="none" stroke="#FF5522" stroke-width="2" stroke-miterlimit="10" points="1617,2387.5 1617,1852 1646,1823 
			3016,1823 3046,1851 3046,2385.9 		"/>
		<polyline fill="none" stroke="#FF5522" stroke-width="2" stroke-miterlimit="10" points="1617,2464 1617,2521 1293,2521 
			1293,3151 1442,3151 		"/>
		<polyline fill="none" stroke="#FF5522" stroke-width="2" stroke-miterlimit="10" points="1442,3230 1293,3230 1293,3889 
			3366,3889 3366,3230 3230,3230 		"/>
	</g>
</g>
`,
  "USCSS Cronus - Exterior": `
  <g id="LIGHTS_1_">
	<g id="EXTERIOR-class:exterior_1_">
		<circle id="PARAMS-class:cronusLogo_1_" cx="962.3" cy="753" r="1199"/>
		<circle id="PARAMS-class:aftEngines_4_" cx="539" cy="3738" r="2186"/>
		<circle id="PARAMS-class:aftEngines_3_" cx="4050" cy="3738" r="2186"/>
		<circle id="PARAMS-class:aftEngines_5_" cx="1301" cy="5016" r="1525"/>
		<circle id="PARAMS-class:aftEngines" cx="3358" cy="5016" r="1525"/>
		<circle id="PARAMS-class:still_5_" cx="2350" cy="4248" r="953"/>
		<circle id="PARAMS-class:foreEngines_2_" cx="3335" cy="2638" r="1412"/>
		<circle id="PARAMS-class:foreEngines_3_" cx="1247" cy="2638" r="1412"/>
		<circle id="PARAMS-class:still_2_" cx="2332" cy="1161" r="501"/>
		<circle id="PARAMS-class:still_4_" cx="2332" cy="377" r="415"/>
		<circle id="PARAMS-class:deckLogo_1_" cx="3095.3" cy="1048" r="380"/>
		<circle id="PARAMS-class:wireframe_1_" cx="3662.3" cy="852" r="1073"/>
	</g>
</g>
<g id="WALLS_2_">
	<g id="INVISIBLE">
		<line fill="#FFFFFF" stroke="#00FFFF" stroke-width="2" stroke-miterlimit="10" x1="1415" y1="4391" x2="1321" y2="4005"/>
		<line fill="#FFFFFF" stroke="#00FFFF" stroke-width="2" stroke-miterlimit="10" x1="3233" y1="4391" x2="3327" y2="4005"/>
		<polyline fill="none" stroke="#00FFFF" stroke-width="2" stroke-miterlimit="10" points="1110,3696 1110,1800 1247,1418 
			1392,1418 1441,1510 1654,1510 1688,1444 2124,1444 2124,1397 2206,1397 2206,1332 1869,1236 1872,782 2154,119 2279,19 2375,19 
			2501,130 2778,788 2778,1236 2446,1337 2446,1398 2513,1398 2530,1441 2975,1441 2975,1506 3206,1506 3260,1431 		"/>
		<polyline fill="none" stroke="#00FFFF" stroke-width="2" stroke-miterlimit="10" points="3538,3696 3538,1824 3418,1431 
			3260,1431 		"/>
	</g>
	<g id="NORMAL">
		<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="1321" y1="4005" x2="1326" y2="3897"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1326,3897 1301,3787 1256,3696 
			1110,3696 		"/>
		<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="3327" y1="4005" x2="3322" y2="3897"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="3322,3897 3347,3787 3392,3696 
			3538,3696 		"/>
		<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="1415" y1="4391" x2="3233" y2="4391"/>
	</g>
	<g id="ETHEREAL">
		<polyline fill="none" stroke="#FF5522" stroke-width="2" stroke-miterlimit="10" points="1321,4005 1306,4049 1245,4074 
			1245,4661 1239,4692 1115,4692 1067.5,4644.5 1067.5,4179 978,4289 973,4888 905,5680 656,5680 675,5314 505,5314 524,5669 
			211,5669 55,3907 67,3785 86,3603 145,3413 175,3368 173,3345 234,3281 232,3190 363,3111 387,3104 393,3029 460,2986 707,2986 
			769,3028 804,3120 933,3193 944,3696 1110,3696 		"/>
		<polyline fill="none" stroke="#FF5522" stroke-width="2" stroke-miterlimit="10" points="3327,4005 3342,4049 3403,4074 
			3403,4661 3409,4692 3533,4692 3580.5,4644.5 3580.5,4179 3670,4289 3675,4888 3743,5680 3992,5680 3973,5314 4143,5314 
			4124,5669 4437,5669 4593,3907 4581,3785 4562,3603 4503,3413 4473,3368 4475,3345 4414,3281 4416,3190 4285,3111 4261,3104 
			4255,3029 4188,2986 3941,2986 3879,3028 3844,3120 3715,3193 3704,3696 3538,3696 		"/>
		<polyline fill="none" stroke="#FF5522" stroke-width="2" stroke-miterlimit="10" points="2324,5664 1917,5664 1739,5105 
			1739,4933 1553,4667 1415,4391 		"/>
		<polyline fill="none" stroke="#FF5522" stroke-width="2" stroke-miterlimit="10" points="2324,5664 2731,5664 2909,5105 
			2909,4933 3095,4667 3233,4391 		"/>
	</g>
</g>

  `
};
/* eslint-enable no-tabs */
// #endregion

const getTintAlpha = (intensity) => intensity ** 2.2; // Convert 'intensity' in Light Settings Dialogue to 'tintAlpha' in AmbientLight data schema.
const getIntensity = (tintAlpha) => tintAlpha ** (1 / 2.2); // Convert 'tintAlpha' to 'intensity'.

const LIGHTS = {
  /*
      1) KEYS MATCHING THOSE IN '<AMBIENTLIGHT>.data' --> VALUES ARE APPLIED AS MULTIPLIERS TO SVG OUTPUT

      2) IMPORTANT KEYS & THEIR FUNCTIONALITY:
        - 'bright' / 'dim' --> How much of the SVG-derived radius should each light type extend to:
                                Set to '1' for full, or '0' to disable that type of light.
                              Can use numbers larger than one to scale the SVG radius, if default values are too small
                              I honestly have no idea what happen if you stick a negative in here :P
        - 'mult_<key>' --> Apply a multiplier to the target (numeric) value. Multipliers stack multiplicatively.
                           Each multiplier is applied to its target once, then removed from what will become the update data schema object
        - 'intensity' --> NOT A MULTIPLIER: It's the default "Intensity" of light sources, as shown in its Foundry Settings dialogue.
                            It's *stored* as 'tintAlpha', which you have to convert to, but I've tried to make things as seamless as
                               possible --- hopefully you can just forget 'tintAlpha' exists

      */
  mult_bright: 1,
  mult_dim: 1,
  bright: 1,
  dim: 1,
  mult_radius: 1.7,
  intensity: 0.4,
  angle: 360
};

const LIGHTCLASSES = {/* Initial values for light settings, corresponding to first mode (if any are set in lightMaster.mjs) */
  amberLights: {
    t: "g",
    intensity: 0.6,
    mult_bright: 1,
    mult_dim: 1,
    tintColor: "#005F61",
    lightAnimation: {
      type: "SecretFireSmoke Patch",
      speed: 10,
      intensity: 1
    },
    hidden: false
  },
  awakeLights: {
    t: "g",
    mult_bright: 1,
    mult_dim: 0,
    intensity: 0.4,
    hidden: true
  },
  cryoSleep: {
    tintColor: "#ffbb00",
    intensity: 0.5,
    mult_bright: 1,
    mult_dim: 1,
    lightAnimation: {
      type: "pulse",
      speed: 1,
      intensity: 8
    }
  },
  muthurSleep: {
    tintColor: "#ffbb00",
    intensity: 0.5,
    t: "g",
    mult_bright: 1,
    mult_dim: 1,
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
    intensity: 0.45,
    lightAnimation: {
      type: "chroma",
      intensity: 10,
      speed: 5
    },
    hidden: true
  },
  electricalShort: {
    lightAnimation: {
      type: "BlitzElectric Fault",
      speed: 2,
      intensity: 6
    }
  },
  escapePod: {},
  corporateQuarters: {},
  radiation: {
    intensity: 0.6,
    mult_bright: 1,
    mult_dim: 1,
    lightAnimation: {
      type: "ghost",
      speed: 2,
      intensity: 8
    },
    hidden: false
  },
  airScrubbers: {
    t: "g",
    intensity: 0.6,
    mult_bright: 0,
    mult_dim: 1,
    lightAnimation: {
      type: "SecretFireSmoke Patch",
      speed: 10,
      intensity: 1
    },
    hidden: false
  },
  exterior: {
    t: "g",
    bright: 1,
    dim: 1,
    lightAnimation: {
      type: "BlitzElectric Fault",
      speed: 5,
      intensity: 4
    },
    hidden: false
  },
  cronusLogo: {
    angle: 160,
    rotation: 180,
    lightAnimation: {
      type: "BlitzElectric Fault",
      speed: 2,
      intensity: 6
    }
  },
  still: {
    lightAnimation: {
      type: null
    }
  },
  deckLogo: {
    lightAnimation: {
      type: "BlitzElectric Fault",
      speed: 2,
      intensity: 6
    }
  },
  wireframe: {
    angle: 160,
    rotation: 180,
    lightAnimation: {
      type: "BlitzElectric Fault",
      speed: 2,
      intensity: 6
    }
  },
  aftEngines: {
    lightAnimation: {
      type: "BlitzElectric Fault",
      speed: 10,
      intensity: 3
    }
  }
};

const CONFIG = {
  get "LIGHTS"() {
    return Object.assign(
      {
        get intensity() { return getIntensity(this.tintAlpha) },
        set intensity(i) { this.tintAlpha = getTintAlpha(i) }
      },
      LIGHTS
    );
  },
  "class": (className) => LIGHTCLASSES[className] ?? false
};

export default async (svgXML, isClearingExistingLights = false, isClearingExistingWalls = true) => {
  console.log(`Received SVG data reference '${svgXML}'`);
  const {scene} = canvas;
  if (typeof svgXML === "string" && svgXML in SVGDATA) {
    svgXML = SVGDATA[svgXML];
  }
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
          "#FF9911": {move: 0, sense: 1, sound: 0, door: 0}, // Light Orange = VisOnly Wall
          "#223399": {move: 1, sense: 1, sound: 1, door: 1}, // Purple = Normal Door
          "#FF00FF": {move: 1, sense: 1, sound: 0, door: 2}, // Magenta = Secret Door (No Sound Blocking)
          // "#8800FF": {move: 1, sense: 1, sound: 0, door: 2, dir: 2}, // Bright Purple = Secret Door, Block UP or RIGHT
          // "#FF0088": {move: 1, sense: 1, sound: 0, door: 2, dir: 1}, // Hot Pink = Secret Door, Block DOWN or LEFT
          "#774422": {move: 1, sense: 0, sound: 0, door: 2}, // Brown = Invisible Door
          "#888888": {move: 1, sense: 1, sound: 1, door: 1, ds: 2} // Grey = Locked Normal Door
        }[dataLine.stroke] || {}, {
          4: {dir: 1}, // 4 pixel width = Block DOWN or LEFT
          8: {dir: 2}  // 8 pixel width = Block UP or RIGHT
        }[dataLine["stroke-width"]] || {});

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
    const getRadius = (radius) => (parseInt(radius) / canvas.scene.data.grid) * CONFIG.LIGHTS.mult_radius;
    const lightParseFunc = (xmlLine, classParams = {}) => {
      try {
        classParams = {...classParams};
        const circLights = [];

                // Convert XML circle string to Javascript object.
        const [, layerName, tintColor, x, y, radius, group] = xmlLine.match(/(?:id="([^"]+)" )?(?:fill="(#.{6})" )?cx="([.\d]+)" cy="([.\d]+)" r="([.\d]+)"(?: group="([^"]+)")?/);

        const circLightData = Object.assign(CONFIG.LIGHTS, classParams);
        Object.assign(circLightData, {
          x: parseInt(x),
          y: parseInt(y),
          bright: getRadius(radius) * circLightData.bright * circLightData.mult_bright,
          dim: getRadius(radius) * circLightData.dim * circLightData.mult_dim
        });
        delete circLightData.mult_bright;
        delete circLightData.mult_dim;
        if (tintColor) {
          circLightData.tintColor = tintColor;
        }
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
              const classData = {...LIGHTCLASSES[parsedParams.class] || {}};
              delete parsedParams.class;
              Object.assign(parsedParams, classData);
            }
            Object.assign(circLightData, parsedParams);
          }
        }
        delete circLightData.intensity;
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