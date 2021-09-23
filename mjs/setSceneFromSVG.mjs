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
  "USCSS Cronus - Deck B": `
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
  EVASuitStorage: {

  },
  showers: {

  },
  examinationRoom: {

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
          "#8800FF": {move: 1, sense: 1, sound: 0, door: 2, dir: 2}, // Bright Purple = Secret Door, Block UP or RIGHT
          "#FF0088": {move: 1, sense: 1, sound: 0, door: 2, dir: 1}, // Hot Pink = Secret Door, Block DOWN or LEFT
          "#774422": {move: 1, sense: 0, sound: 0, door: 2}, // Brown = Invisible Door
          "#888888": {move: 1, sense: 1, sound: 1, door: 1, ds: 2} // Grey = Locked Normal Door
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