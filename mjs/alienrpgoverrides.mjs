// #region ▒░▒░▒░▒[IMPORTS] Importing Modules ▒░▒░▒░▒ ~
/*DEVCODE*/
// #region ░░░░░░░[GMPREP]░░░░ Setup & Design Functions for Scenario Creation ░░░░░░░ ~
import setSceneFromSVG from "./setSceneFromSVG.mjs";
// #endregion ░░░░[GMPREP]░░░░
/*!DEVCODE*/
// #region ░░░░░░░[UTILITIES]░░░░ Utility Functions ░░░░░░░ ~
import {RE} from "./utils.mjs";
// #endregion ░░░░[UTILITIES]░░░░
// #region ░░░░░░░[SCRIPTS]░░░░ Companion Script Hooks & Templates for Registration & Preloading ░░░░░░░ ~
import viewMasterHooks from "./viewMaster.mjs";
import combatMasterHooks from "./combatMaster.mjs";
import renderMasterHooks, {
    templates as renderMasterTemplates
} from "./renderMaster.mjs";
import lightMasterHooks from "./lightMaster.mjs";
import charMasterHooks, {
    templates as charMasterTemplates,
    assignActor
} from "./charMaster.mjs";
import itemMasterHooks, {
    templates as itemMasterTemplates
} from "./itemMaster.mjs";
// #endregion ░░░░[SCRIPTS]░░░░
// #endregion ▒▒▒▒[IMPORTS]▒▒▒▒

/*DEVCODE*/
// #region SVGDATA ~
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
    <?xml version="1.0" encoding="utf-8"?>
<!-- Generator: Adobe Illustrator 25.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg version="1.1" baseProfile="tiny" id="CRONUS-A"
     xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 3500 4500"
     overflow="visible" xml:space="preserve">
<image width="3500" height="4500" xlink:href="775EF858.jpg" >
</image>
<g id="LIGHTS">
    <g id="SHIPLIGHTS-AWAKE-class:awakeAmber" display="none">
        <g display="inline">
            <circle fill="#FF8800" cx="1571" cy="1584" r="223"/>
        </g>
        <g display="inline">
            <circle fill="#FF8800" cx="1906" cy="1584" r="223"/>
        </g>
        <g display="inline">
            <circle fill="#FF8800" cx="1571" cy="2127" r="128"/>
        </g>
        <g display="inline">
            <circle fill="#FF8800" cx="1160" cy="2528" r="85"/>
        </g>
        <g display="inline">
            <circle fill="#FF8800" cx="1565" cy="1943" r="85"/>
        </g>
        <g display="inline">
            <circle fill="#FF8800" cx="1910" cy="1943" r="85"/>
        </g>
        <g display="inline">
            <circle fill="#FF8800" cx="1655" cy="1824" r="113"/>
        </g>
        <g display="inline">
            <circle fill="#FF8800" cx="1825" cy="1824" r="113"/>
        </g>
        <g display="inline">
            <circle fill="#FFFF00" cx="1157" cy="2418" r="60"/>
        </g>
        <g display="inline">
            <circle fill="#FFFF00" cx="1155" cy="2642" r="60"/>
        </g>
        <g display="inline">
            <circle fill="#FF8800" cx="2311" cy="2528" r="85"/>
        </g>
        <g display="inline">
            <circle fill="#FFFF00" cx="2308" cy="2418" r="60"/>
        </g>
        <g display="inline">
            <circle fill="#FFFF00" cx="2306" cy="2642" r="60"/>
        </g>
        <g display="inline">
            <circle fill="#FF8800" cx="1739" cy="2343" r="128"/>
        </g>
        <g display="inline">
            <circle fill="#FF8800" cx="1739" cy="2065" r="160"/>
        </g>
        <g display="inline">
            <circle fill="#FF8800" cx="1568" cy="2342" r="128"/>
        </g>
        <g display="inline">
            <circle fill="#FF8800" cx="1737" cy="3281" r="128"/>
        </g>
        <g display="inline">
            <circle fill="#00FFFF" cx="1662" cy="3097" r="97"/>
        </g>
        <g display="inline">
            <circle fill="#00FFFF" cx="1796" cy="3097" r="97"/>
        </g>
        <g display="inline">
            <circle fill="#FF8800" cx="1911" cy="2342" r="128"/>
        </g>
        <g display="inline">
            <circle fill="#FF8800" cx="1414" cy="2532" r="171"/>
        </g>
        <g display="inline">
            <circle fill="#FF8800" cx="2050" cy="2532" r="171"/>
        </g>
        <g display="inline">
            <circle fill="#FF8800" cx="1739" cy="2532" r="171"/>
        </g>
        <g display="inline">
            <circle fill="#FF8800" cx="1911" cy="2705" r="175"/>
        </g>
        <g display="inline">
            <circle fill="#FF8800" cx="1558" cy="2705" r="175"/>
        </g>
        <g display="inline">
            <circle fill="#FF8800" cx="1736" cy="2895" r="175"/>
        </g>
        <g display="inline">
            <circle fill="#FF0000" cx="1413" cy="3348" r="108"/>
        </g>
        <g display="inline">
            <circle fill="#FF0000" cx="2064" cy="3348" r="108"/>
        </g>
        <g display="inline">
            <circle fill="#FFFFFF" cx="1553" cy="3204" r="202"/>
        </g>
        <g display="inline">
            <circle fill="#FFFFFF" cx="1916" cy="3204" r="202"/>
        </g>
        <g display="inline">
            <circle fill="#FFFFFF" cx="2014" cy="3050" r="56"/>
        </g>
        <g display="inline">
            <circle fill="#FFFFFF" cx="2014" cy="3151" r="56"/>
        </g>
        <g display="inline">
            <circle fill="#FFFFFF" cx="2014" cy="3251" r="56"/>
        </g>
        <g display="inline">
            <circle fill="#FFFFFF" cx="1457" cy="3050" r="56"/>
        </g>
        <g display="inline">
            <circle fill="#FFFFFF" cx="1457" cy="3151" r="56"/>
        </g>
        <g display="inline">
            <circle fill="#FFFFFF" cx="1457" cy="3251" r="56"/>
        </g>
        <g display="inline">
            <circle fill="#FF8800" cx="1904" cy="2127" r="128"/>
        </g>
        <g display="inline">
            <circle fill="#FFFF00" cx="1735" cy="1112" r="128"/>
        </g>
        <g display="inline">
            <circle fill="#FF8800" cx="1738" cy="1369" r="113"/>
        </g>
        <g display="inline">
            <circle fill="#FF8800" cx="1738" cy="1279" r="45"/>
        </g>
        <g display="inline">
            <circle fill="#FF8800" cx="1738" cy="1584" r="215"/>
        </g>
    </g>
    <g id="SHIPLIGHTS-SLEEPING-class:dimAmber" display="none">
        <g display="inline">
            <circle fill="#FF8800" cx="1571" cy="1584" r="223"/>
        </g>
        <g display="inline">
            <circle fill="#FF8800" cx="1906" cy="1584" r="223"/>
        </g>
        <g display="inline">
            <circle fill="#FF8800" cx="1571" cy="2127" r="128"/>
        </g>
        <g display="inline">
            <circle fill="#FF8800" cx="1160" cy="2528" r="85"/>
        </g>
        <g display="inline">
            <circle fill="#FF8800" cx="1565" cy="1943" r="85"/>
        </g>
        <g display="inline">
            <circle fill="#FF8800" cx="1910" cy="1943" r="85"/>
        </g>
        <g display="inline">
            <circle fill="#FF8800" cx="1655" cy="1824" r="113"/>
        </g>
        <g display="inline">
            <circle fill="#FF8800" cx="1825" cy="1824" r="113"/>
        </g>
        <g display="inline">
            <circle fill="#FF8800" cx="1157" cy="2418" r="60"/>
        </g>
        <g display="inline">
            <circle fill="#FF8800" cx="1155" cy="2642" r="60"/>
        </g>
        <g display="inline">
            <circle fill="#FF8800" cx="2311" cy="2528" r="85"/>
        </g>
        <g display="inline">
            <circle fill="#FF8800" cx="2308" cy="2418" r="60"/>
        </g>
        <g display="inline">
            <circle fill="#FF8800" cx="2306" cy="2642" r="60"/>
        </g>
        <g display="inline">
            <circle fill="#FF8800" cx="1739" cy="2343" r="128"/>
        </g>
        <g display="inline">
            <circle fill="#FF8800" cx="1739" cy="2065" r="160"/>
        </g>
        <g display="inline">
            <circle fill="#FF8800" cx="1568" cy="2342" r="128"/>
        </g>
        <g display="inline">
            <circle fill="#FF8800" cx="1737" cy="3281" r="128"/>
        </g>
        <g display="inline">
            <circle fill="#FF8800" cx="1662" cy="3097" r="97"/>
        </g>
        <g display="inline">
            <circle fill="#FF8800" cx="1796" cy="3097" r="97"/>
        </g>
        <g display="inline">
            <circle fill="#FF8800" cx="1911" cy="2342" r="128"/>
        </g>
        <g display="inline">
            <circle fill="#FF8800" cx="1414" cy="2532" r="171"/>
        </g>
        <g display="inline">
            <circle fill="#FF8800" cx="2050" cy="2532" r="171"/>
        </g>
        <g display="inline">
            <circle fill="#FF8800" cx="1739" cy="2532" r="171"/>
        </g>
        <g display="inline">
            <circle fill="#FF8800" cx="1911" cy="2705" r="175"/>
        </g>
        <g display="inline">
            <circle fill="#FF8800" cx="1558" cy="2705" r="175"/>
        </g>
        <g display="inline">
            <circle fill="#FF8800" cx="1736" cy="2895" r="175"/>
        </g>
        <g display="inline">
            <circle fill="#FF8800" cx="1413" cy="3348" r="108"/>
        </g>
        <g display="inline">
            <circle fill="#FF8800" cx="2064" cy="3348" r="108"/>
        </g>
        <g display="inline">
            <circle fill="#FF8800" cx="1553" cy="3204" r="202"/>
        </g>
        <g display="inline">
            <circle fill="#FF8800" cx="1916" cy="3204" r="202"/>
        </g>
        <g display="inline">
            <circle fill="#FF8800" cx="2014" cy="3050" r="56"/>
        </g>
        <g display="inline">
            <circle fill="#FF8800" cx="2014" cy="3151" r="56"/>
        </g>
        <g display="inline">
            <circle fill="#FF8800" cx="2014" cy="3251" r="56"/>
        </g>
        <g display="inline">
            <circle fill="#FF8800" cx="1457" cy="3050" r="56"/>
        </g>
        <g display="inline">
            <circle fill="#FF8800" cx="1457" cy="3151" r="56"/>
        </g>
        <g display="inline">
            <circle fill="#FF8800" cx="1457" cy="3251" r="56"/>
        </g>
        <g display="inline">
            <circle fill="#FF8800" cx="1904" cy="2127" r="128"/>
        </g>
        <g display="inline">
            <circle fill="#FF8800" cx="1735" cy="1112" r="128"/>
        </g>
        <g display="inline">
            <circle fill="#FF8800" cx="1738" cy="1369" r="113"/>
        </g>
        <g display="inline">
            <circle fill="#FF8800" cx="1738" cy="1279" r="45"/>
        </g>
        <g display="inline">
            <circle fill="#FF8800" cx="1738" cy="1584" r="215"/>
        </g>
    </g>
    <g id="COLDSMOKE-class:coldSmoke">
        <g id="PARAMS-class:coldSmoke_22_">
            <circle fill="#005F61" cx="1571" cy="1584" r="223"/>
        </g>
        <g id="PARAMS-class:coldSmoke_21_">
            <circle fill="#005F61" cx="1571" cy="2020" r="223"/>
        </g>
        <g id="PARAMS-class:coldSmoke_20_">
            <circle fill="#005F61" cx="1906" cy="1584" r="223"/>
        </g>
        <g id="PARAMS-class:coldSmoke_19_">
            <circle fill="#005F61" cx="1739" cy="1824" r="181"/>
        </g>
        <g id="PARAMS-class:coldSmoke_18_">
            <circle fill="#005F61" cx="2311" cy="2528" r="113"/>
        </g>
        <g id="PARAMS-class:coldSmoke_17_">
            <circle fill="#005F61" cx="1149" cy="2528" r="113"/>
        </g>
        <g id="PARAMS-class:coldSmoke_16_">
            <circle fill="#005F61" cx="1739" cy="2343" r="128"/>
        </g>
        <g id="PARAMS-class:coldSmoke_15_">
            <circle fill="#005F61" cx="1739" cy="2065" r="160"/>
        </g>
        <g id="PARAMS-class:coldSmoke_14_">
            <circle fill="#005F61" cx="1568" cy="2342" r="187"/>
        </g>
        <g id="PARAMS-class:coldSmoke_13_">
            <circle fill="#005F61" cx="1903" cy="2020" r="223"/>
        </g>
        <g id="PARAMS-class:coldSmoke_12_">
            <circle fill="#005F61" cx="1900" cy="2342" r="187"/>
        </g>
        <g id="PARAMS-class:coldSmoke_11_">
            <circle fill="#005F61" cx="1737" cy="3087" r="166"/>
        </g>
        <g id="PARAMS-class:coldSmoke_10_">
            <circle fill="#005F61" cx="1737" cy="3290" r="166"/>
        </g>
        <g id="PARAMS-class:coldSmoke_9_">
            <circle fill="#005F61" cx="1495" cy="2532" r="283"/>
        </g>
        <g id="PARAMS-class:coldSmoke_8_">
            <circle fill="#005F61" cx="1989" cy="2532" r="283"/>
        </g>
        <g id="PARAMS-class:coldSmoke_7_">
            <circle fill="#005F61" cx="1558" cy="2705" r="231"/>
        </g>
        <g id="PARAMS-class:coldSmoke_6_">
            <circle fill="#005F61" cx="1915" cy="2705" r="231"/>
        </g>
        <g id="PARAMS-class:coldSmoke_5_">
            <circle fill="#005F61" cx="1734" cy="2888" r="231"/>
        </g>
        <g id="PARAMS-class:coldSmoke_4_">
            <circle fill="#005F61" cx="1939" cy="3199" r="231"/>
        </g>
        <g id="PARAMS-class:coldSmoke_3_">
            <circle fill="#005F61" cx="1553" cy="3199" r="231"/>
        </g>
        <g id="PARAMS-class:coldSmoke_2_">
            <circle fill="#005F61" cx="1735" cy="1112" r="198"/>
        </g>
        <g id="PARAMS-class:coldSmoke_1_">
            <circle fill="#005F61" cx="1738" cy="1369" r="162"/>
        </g>
        <g id="PARAMS-class:coldSmoke">
            <circle fill="#005F61" cx="1738" cy="1584" r="215"/>
        </g>
    </g>
    <g id="MUTHUR-AWAKE" display="none">
        <g id="PARAMS-class:terminalBlink" display="inline">
            <circle fill="#FFFF00" cx="1736" cy="1048" r="52"/>
        </g>
        <g id="PARAMS-class:muthurChroma" display="inline">
            <circle fill="#FF00FF" cx="1736" cy="1048" r="52"/>
        </g>
    </g>
    <g id="TERMINAL-AWAKE-class:terminalBlink" display="none">
        <g display="inline">
            <circle fill="#FFFF00" cx="1334" cy="2576" r="52"/>
        </g>
    </g>
    <g id="MUTHUR-SLEEPING-class:muthurSleep" display="none">
        <g id="MUTHUR_SLEEPING" display="inline">
            <circle fill="#FFFF00" cx="1736" cy="1048" r="76"/>
        </g>
    </g>
    <g id="CRYO-SLEEPING-class:cryoSleep" display="none">
        <g display="inline">
            <circle fill="#FFFF00" cx="1560" cy="2705" r="174"/>
        </g>
        <g display="inline">
            <circle fill="#FFFF00" cx="1920" cy="2705" r="174"/>
        </g>
        <g display="inline">
            <circle fill="#FFFF00" cx="1731" cy="2887" r="174"/>
        </g>
    </g>
    <g id="EXTERIOR" display="none">
        <g id="FileTab-PARAMS-class:extArcUp" display="inline">
            <circle cx="2970.58" cy="286.42" r="459.42"/>
        </g>
        <g id="ShipLabel-PARAMS-class:extArcUp" display="inline">
            <circle cx="340" cy="799" r="1120"/>
        </g>
        <g id="PARAMS-class:exterior_3_" display="inline">
            <circle cx="626" cy="4011.49" r="626"/>
        </g>
        <g id="PARAMS-class:exterior_2_" display="inline">
            <circle cx="1728" cy="4079" r="626"/>
        </g>
        <g id="PARAMS-class:exterior_1_" display="inline">
            <circle cx="2748" cy="4052" r="626"/>
        </g>
        <g id="PARAMS-class:exterior" display="inline">
            <circle cx="2567.42" cy="1132.58" r="289.58"/>
        </g>
        <g id="LateralView-PARAMS-class:extArcUp" display="inline">
            <circle cx="2597.58" cy="859.58" r="417.58"/>
        </g>
        <g id="Legend-PARAMS-class:legend" display="inline">
            <circle fill="#FFFF00" cx="2558.58" cy="1736.42" r="556.42"/>
        </g>
    </g>
</g>
<g id="DOORS_2_">
    <g id="SECRET">
        <g id="INVISIBLE">
            <line fill="none" stroke="#774422" stroke-width="2" stroke-miterlimit="10" x1="1602" y1="2189" x2="1602" y2="2212"/>
            <line fill="none" stroke="#774422" stroke-width="2" stroke-miterlimit="10" x1="1875" y1="2189" x2="1875" y2="2212"/>
            <line fill="none" stroke="#774422" stroke-width="2" stroke-miterlimit="10" x1="1360" y1="2580" x2="1400" y2="2580"/>
        </g>
        <line fill="none" stroke="#FF00FF" stroke-width="2" stroke-miterlimit="10" x1="1640" y1="1657" x2="1660" y2="1677"/>
        <line fill="none" stroke="#FF00FF" stroke-width="2" stroke-miterlimit="10" x1="1805" y1="1959" x2="1825" y2="1979"/>
        <line fill="none" stroke="#FF00FF" stroke-width="2" stroke-miterlimit="10" x1="1805" y1="1848" x2="1825" y2="1848"/>
        <line fill="none" stroke="#FF00FF" stroke-width="2" stroke-miterlimit="10" x1="1640" y1="1800" x2="1660" y2="1800"/>
        <line fill="none" stroke="#FF00FF" stroke-width="2" stroke-miterlimit="10" x1="1726" y1="2222" x2="1750" y2="2222"/>
        <line fill="none" stroke="#FF00FF" stroke-width="2" stroke-miterlimit="10" x1="1726" y1="2183" x2="1750" y2="2183"/>
        <line fill="none" stroke="#FF00FF" stroke-width="2" stroke-miterlimit="10" x1="1532" y1="2100" x2="1532" y2="2140"/>
        <line fill="none" stroke="#FF00FF" stroke-width="2" stroke-miterlimit="10" x1="1532" y1="1559" x2="1532" y2="1599"/>
        <line fill="none" stroke="#FF00FF" stroke-width="2" stroke-miterlimit="10" x1="1441" y1="2691" x2="1441" y2="2719"/>
        <line fill="none" stroke="#FF00FF" stroke-width="2" stroke-miterlimit="10" x1="1545" y1="2827" x2="1570" y2="2827"/>
        <line fill="none" stroke="#FF00FF" stroke-width="2" stroke-miterlimit="10" x1="1618" y1="2877" x2="1618" y2="2912"/>
        <line fill="none" stroke="#FF00FF" stroke-width="2" stroke-miterlimit="10" x1="1345" y1="3336" x2="1345" y2="3369"/>
        <line fill="none" stroke="#FF00FF" stroke-width="2" stroke-miterlimit="10" x1="2360" y1="2520" x2="2360" y2="2543"/>
        <line fill="none" stroke="#FF00FF" stroke-width="2" stroke-miterlimit="10" x1="2024" y1="2481" x2="2070" y2="2481"/>
        <line fill="none" stroke="#FF00FF" stroke-width="2" stroke-miterlimit="10" x1="1942" y1="2102" x2="1942" y2="2141"/>
        <line fill="none" stroke="#FF00FF" stroke-width="2" stroke-miterlimit="10" x1="2033" y1="2690" x2="2033" y2="2718"/>
        <line fill="none" stroke="#FF00FF" stroke-width="2" stroke-miterlimit="10" x1="2110" y1="2579" x2="2083" y2="2579"/>
        <line fill="none" stroke="#FF00FF" stroke-width="2" stroke-miterlimit="10" x1="2123" y1="3336" x2="2123" y2="3371"/>
        <line fill="none" stroke="#FF00FF" stroke-width="2" stroke-miterlimit="10" x1="1940" y1="1561" x2="1940" y2="1601"/>
        <line fill="none" stroke="#FF00FF" stroke-width="2" stroke-miterlimit="10" x1="1923" y1="2826" x2="1898" y2="2826"/>
        <line fill="none" stroke="#FF00FF" stroke-width="2" stroke-miterlimit="10" x1="1859" y1="2876" x2="1859" y2="2912"/>
        <line fill="none" stroke="#FF00FF" stroke-width="2" stroke-miterlimit="10" x1="1400" y1="2480" x2="1451" y2="2480"/>
        <line fill="none" stroke="#FF00FF" stroke-width="2" stroke-miterlimit="10" x1="1104" y1="2520" x2="1104" y2="2543"/>
    </g>
    <g id="NORMAL">
        <line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="1704" y1="1451" x2="1771" y2="1451"/>
        <line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="1704" y1="1788" x2="1771" y2="1788"/>
        <line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="1705" y1="2588" x2="1772" y2="2588"/>
        <line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="1540" y1="2474" x2="1595" y2="2474"/>
        <line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="1881" y1="2474" x2="1935" y2="2474"/>
        <line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="1882" y1="1864" x2="1933" y2="1864"/>
        <line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="1543" y1="1864" x2="1594" y2="1864"/>
        <line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="1543" y1="1788" x2="1599" y2="1788"/>
        <line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="1878" y1="1788" x2="1933" y2="1788"/>
        <line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="1705" y1="2758" x2="1772" y2="2758"/>
        <line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="1705" y1="3011" x2="1772" y2="3011"/>
        <line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="1705" y1="1862" x2="1771" y2="1862"/>
        <line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="1705" y1="1926" x2="1771" y2="1926"/>
        <line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="1705" y1="3151" x2="1771" y2="3151"/>
        <line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="1704" y1="1320" x2="1772" y2="1320"/>
        <line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="1704" y1="1239" x2="1772" y2="1239"/>
        <line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="1245" y1="2497" x2="1245" y2="2562"/>
        <line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="2221" y1="2497" x2="2221" y2="2562"/>
        <line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="1784" y1="2674" x2="1784" y2="2739"/>
        <line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="1692" y1="2674" x2="1692" y2="2739"/>
        <line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="1126" y1="2473" x2="1184" y2="2473"/>
        <line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="1126" y1="2587" x2="1183" y2="2587"/>
        <line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="2281" y1="2472" x2="2335" y2="2472"/>
        <line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="2282" y1="2587" x2="2336" y2="2587"/>
        <line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="1515" y1="3023" x2="1515" y2="3076"/>
        <line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="1515" y1="3123" x2="1515" y2="3174"/>
        <line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="1515" y1="3223" x2="1515" y2="3275"/>
        <line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="1515" y1="3325" x2="1515" y2="3377"/>
        <line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="1954" y1="3025" x2="1954" y2="3075"/>
        <line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="1954" y1="3123" x2="1954" y2="3175"/>
        <line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="1954" y1="3223" x2="1954" y2="3275"/>
        <line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="1954" y1="3325" x2="1954" y2="3377"/>
        <line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="1595" y1="3108" x2="1595" y2="3043"/>
        <line fill="none" stroke="#223399" stroke-width="2" stroke-miterlimit="10" x1="1878" y1="3107" x2="1878" y2="3043"/>
    </g>
</g>
<g id="WALLS_1_">
    <g id="ETHEREAL">
        <line fill="none" stroke="#FF5522" stroke-width="2" stroke-miterlimit="10" x1="1639" y1="2189" x2="1639" y2="2212"/>
        <line fill="none" stroke="#FF5522" stroke-width="2" stroke-miterlimit="10" x1="1837" y1="2189" x2="1837" y2="2212"/>
        <line fill="none" stroke="#FF5522" stroke-width="2" stroke-miterlimit="10" x1="1360" y1="2620" x2="1400" y2="2620"/>
    </g>
    <g id="INVISIBLE_1_">
        <polyline fill="none" stroke="#00FFFF" stroke-width="2" stroke-miterlimit="10" points="1595,3108 1669,3181 1661,3189         "/>
        <line fill="none" stroke="#00FFFF" stroke-width="2" stroke-miterlimit="10" x1="1878" y1="3107" x2="1805" y2="3180"/>
        <line fill="none" stroke="#00FFFF" stroke-width="2" stroke-miterlimit="10" x1="1602" y1="2212" x2="1602" y2="2251"/>
        <line fill="none" stroke="#00FFFF" stroke-width="2" stroke-miterlimit="10" x1="1875" y1="2162" x2="1875" y2="2189"/>
        <polyline fill="none" stroke="#00FFFF" stroke-width="2" stroke-miterlimit="10" points="1360,2620 1360,2580 1290,2580         "/>
        <polyline fill="none" stroke="#00FFFF" stroke-width="2" stroke-miterlimit="10" points="1473,2580 1400,2580 1400,2620         "/>
        <line fill="none" stroke="#00FFFF" stroke-width="2" stroke-miterlimit="10" x1="1669" y1="3181" x2="1683" y2="3167"/>
        <line fill="none" stroke="#00FFFF" stroke-width="2" stroke-miterlimit="10" x1="1793" y1="3167" x2="1814" y2="3189"/>
        <line fill="none" stroke="#00FFFF" stroke-width="2" stroke-miterlimit="10" x1="1602" y1="2163" x2="1602" y2="2189"/>
        <line fill="none" stroke="#00FFFF" stroke-width="2" stroke-miterlimit="10" x1="1875" y1="2250" x2="1875" y2="2212"/>
    </g>
    <g id="NORMAL_1_">
        <polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1704,1704 1687,1704 1660,1677 
            1660,1800         "/>
        <polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1607,1559 1616,1559 1616,1534 
            1688,1463 1703,1463 1703,1439 1621,1439 1607,1454 1607,1780 1599,1780 1599,1795 1615,1795 1624,1800         "/>
        <polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1607,1647 1630,1647 1640,1657 
            1640,1800         "/>
        <polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1858,1559 1858,1534 1786,1463 
            1771,1463 1771,1439 1853,1439 1867,1453 1867,1559         "/>
        <polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1867,1647 1867,1780 1878,1780 
            1878,1795 1859,1795 1850,1800 1772,1800 1772,1704 1787,1704 1845,1647         "/>
        <line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="1867" y1="1559" x2="1867" y2="1647"/>
        <line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="1858" y1="1559" x2="1867" y2="1559"/>
        <path fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" d="M1772,2222"/>
        <path fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" d="M1705,2222"/>
        <path fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" d="M1772,2183"/>
        <path fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" d="M1705,2183"/>
        <line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="1705" y1="2462" x2="1772" y2="2462"/>
        <path fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" d="M2033,2690"/>
        <line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="1681" y1="2759" x2="1681" y2="2739"/>
        <polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1441,2691 1441,2657.1 1511.28,2587 
            1611.47,2587 1681,2656.35 1681,2674         "/>
        <polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1441,2719 1441,2757 1510,2827 
            1545,2827         "/>
        <polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1681,2759 1613,2827 1570,2827         "/>
        <polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1793,2739 1793,2753 1866,2826 
            1898,2826         "/>
        <polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1793,2674 1793,2654 1865,2584 
            1965,2584 2033,2653 2033,2690         "/>
        <polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1618,2912 1618,2936 1688,3005 
            1705,3005 1705,3016 1610,3017 1601,3027 1601,3043 1590,3043 1590,3005 1523,3005 1523,3023 1508,3023 1508,3005 1401,3005 
            1401,3094 1508,3094 1508,3076 1523,3076 1523,3123 1508,3123 1508,3105 1401,3105 1401,3194 1508,3194 1508,3174 1523,3174 
            1523,3223 1508,3223 1508,3205 1401,3205 1401,3295 1508,3295 1508,3275 1523,3275 1523,3325 1508,3325 1508,3304 1345,3304 
            1345,3336         "/>
        <polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1859,2912 1859,2933 1788,3005 
            1772,3005 1772,3016 1862,3016 1870,3024 1870,3043 1881,3043 1881,3004 1947,3004 1947,3025 1960,3025 1960,3004 2068,3004 
            2068,3094 1960,3094 1960,3075 1947,3075 1947,3123 1960,3123 1960,3104 2068,3104 2068,3195 1960,3195 1960,3175 1947,3175 
            1947,3223 1960,3223 1960,3204 2067,3204 2067,3295 1960,3295 1960,3275 1947,3275 1947,3325 1960,3325 1960,3303 2123,3303 
            2123,3336         "/>
        <polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1345,3369 1345,3401 1508,3401 
            1508,3377 1523,3377 1523,3401 1590,3401 1590,3108 1595,3108 1595,3189 1661,3189 1618,3232 1618,3332 1688,3402 1788,3402 
            1858,3332 1858,3233 1814,3189 1878,3189.5 1878,3107 1881,3107 1881,3400 1949,3400 1949,3377 1960,3377 1960,3400 2123,3400 
            2123,3371         "/>
        <polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1771,2766 1787,2766 1859,2836 
            1859,2876         "/>
        <polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1704,2766 1687,2766 1618,2834 
            1618,2877         "/>
        <polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1532,2463 1540,2463 1540,2480 
            1451,2480         "/>
        <polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1532,2100 1532,1874 1543,1874 
            1543,1780 1532,1780 1532,1599         "/>
        <polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1126,2481 1126,2467 1104,2467 
            1104,2370 1208,2370 1208,2466 1184,2466 1184,2480 1232,2480 1232,2497 1259,2497 1259,2480 1400,2480         "/>
        <polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1290,2580 1259,2580 1259,2562 
            1230,2562 1230,2579 1183,2579 1183,2596 1206,2596 1206,2691 1104,2691 1104,2596 1126,2596 1126,2580 1104,2580         "/>
        <polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1681,2674 1705,2674 1705,2580 
            1473,2580         "/>
        <line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="1772" y1="2674" x2="1793" y2="2674"/>
        <line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="1771" y1="2739" x2="1793" y2="2739"/>
        <line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="1771" y1="2766" x2="1771" y2="2739"/>
        <line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="1681" y1="2739" x2="1704" y2="2739"/>
        <line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="1704" y1="2766" x2="1704" y2="2739"/>
        <polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1705,1848 1619,1848 1606,1857 
            1595,1857 1595,1874 1602,1874 1602,2163 1639,2163 1639,2189         "/>
        <polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1595,2480 1595,2463 1602,2463 
            1602,2250 1639,2250 1639,2212         "/>
        <line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="1705" y1="1848" x2="1705" y2="1943"/>
        <polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1683,3167 1688,3162 1705,3162 
            1705,3138 1683,3138         "/>
        <polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1793,3167 1788,3162 1771,3162 
            1771,3138 1793,3138         "/>
        <line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="1683" y1="3138" x2="1683" y2="3167"/>
        <line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="1793" y1="3138" x2="1793" y2="3167"/>
        <path fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" d="M1771,1848"/>
        <polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1595,2480 1881,2480 1881,2466 
            1875,2460 1875,2250 1837,2250 1837,2212         "/>
        <path fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" d="M1858,2012"/>
        <polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1789,1943 1771,1943 1771,1848 
            1805,1848         "/>
        <polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1705,1943 1688,1943 1619,2014 
            1619,2114 1688,2183 1726,2183         "/>
        <polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1750,2183 1789,2183 1858,2114 
            1858,2012         "/>
        <polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1726,2222 1687,2222 1619,2290 
            1619,2391 1689,2462 1705,2462         "/>
        <polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1772,2462 1789,2462 1859,2392 
            1859,2293 1789,2222 1750,2222         "/>
        <polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2371,1491 2371,1968 2380,1986 
            2396,1999 2415,2004 2701,2004 2720,2000 2738,1985 2746,1967 2746,1488 2739,1471 2723,1457 2705,1451 2411,1451 2392,1458 
            2378,1472         "/>
        <line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="2377" y1="1472" x2="2370" y2="1491"/>
        <line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="1845" y1="1647" x2="1867" y2="1647"/>
        <polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1532,1559 1400,1559 1400,2100 
            1259,2100 1061,2340 1061,2719 1280,2719 1280,3321 1345,3369         "/>
        <polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1532,1599 1439,1599 1439,2100 
            1533,2100         "/>
        <polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1533,2140 1280,2140 1206,2231 
            1451,2480         "/>
        <line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="1360" y1="2620" x2="1290" y2="2620"/>
        <line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="1290" y1="2620" x2="1290" y2="2580"/>
        <polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1104,2691 1360,2691 1360,2619         "/>
        <polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1400,2480 1179,2258 1104,2346         "/>
        <polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1473,2620 1400,2620 1400,2691 
            1441,2691         "/>
        <line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="1473" y1="2620" x2="1473" y2="2580"/>
        <line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="1104" y1="2580" x2="1104" y2="2543"/>
        <polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1104,2520 1104,2481 1126,2481         "/>
        <line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="1104" y1="2580" x2="1104" y2="2596"/>
        <line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="1104" y1="2467" x2="1104" y2="2481"/>
        <line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="1104" y1="2370" x2="1104" y2="2346"/>
        <polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1441,2719 1320,2719 1320,2877 
            1545,2877 1545,2827         "/>
        <polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1570,2827 1570,2877 1618,2877         "/>
        <polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1618,2912 1320,2912 1320,3300 
            1345,3336         "/>
        <polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1859,2912 2148,2912 2148,3300 
            2123,3336         "/>
        <polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2033,2718 2148,2718 2148,2876 
            1923,2876 1923,2826         "/>
        <polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1898,2826 1898,2876 1859,2876         "/>
        <polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2032,2690 2083,2690 2083,2579         "/>
        <polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2110,2579 2110,2690 2258,2690         "/>
        <line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="1532" y1="2140" x2="1532" y2="2463"/>
        <polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1772,2674 1772,2579 2083,2579         "/>
        <polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2360,2580 2336,2580 2336,2595 
            2360,2595 2360,2690 2258,2690 2258,2595 2282,2595 2282,2579 2234,2579 2234,2563 2208,2563 2208,2579 2110,2579         "/>
        <polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2360,2520 2360,2480 2335,2480 
            2335,2464 2360,2464 2360,2368 2258,2368 2258,2465 2281,2465 2281,2481 2234,2481 2234,2498 2209,2498 2209,2481 2070,2481         "/>
        <polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2024,2481 1935,2481 1935,2464 
            1942,2460 1942,2141         "/>
        <polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1942,2102 1942,1873 1933,1873 
            1933,1780 1940,1780 1940,1601         "/>
        <polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1942,2141 2195,2141 2269,2232 
            2024,2481         "/>
        <polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1940,1561 1940,1410 1923,1379 
            1848,1379 1848,1334 1772,1334 1772,1229.5 1786.5,1229.5 1857,1159 1857,1060 1787,990 1685,990 1616,1059 1616,1159 1686,1229 
            1704,1229 1704,1335 1625,1335 1625,1380 1549,1380 1532,1411 1532,1559         "/>
        <polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1923,2826 1964,2826 2033,2753 
            2033,2718         "/>
        <polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="109,235 182.5,161.5 2562,161.5 
            2645.75,77.75 3313,77.75 3392.62,157.38 3392.62,3477 3316.31,3553.31 1183,3553.31 1103.34,3473.66 192,3473.66 109,3390 
            109,235         "/>
        <polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="109,3620 192.5,3536.5 1067,3536.5 
            1150.25,3619.75 3321,3619.75 3393.12,3691.88 3393.12,4333 3313.56,4412.56 189,4412.56 109,4332 109,3620         "/>
        <polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1940,1561 2067,1561 2067,2102 
            2208,2102 2408,2342 2408,2718 2187,2718 2187,3323 2123,3371         "/>
        <polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1942,2102 2028,2102 2028,1601 
            1940,1601         "/>
        <polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2070,2481 2291,2259 2360,2340         "/>
        <line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="2360" y1="2368" x2="2360" y2="2340"/>
        <line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="2360" y1="2464" x2="2360" y2="2480"/>
        <line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="2360" y1="2580" x2="2360" y2="2595"/>
        <line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="2360" y1="2543" x2="2360" y2="2580"/>
        <line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="1688" y1="2183" x2="1639" y2="2189"/>
        <line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="1687" y1="2222" x2="1639" y2="2212"/>
        <line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="1789" y1="2183" x2="1837" y2="2189"/>
        <line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="1789" y1="2222" x2="1837" y2="2212"/>
        <polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1825,1848 1857,1848 1871,1857 
            1882,1857 1882,1873 1875,1873 1875,2162 1837,2162 1837,2189         "/>
        <polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1858,2012 1825,1979 1825,1848         "/>
        <line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="1624" y1="1800" x2="1640" y2="1800"/>
        <polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1660,1800 1704,1800 1704,1704         "/>
        <polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1789,1943 1805,1959 1805,1848         "/>
    </g>
</g>
</svg>

    `,
    "USCSS Cronus - Deck B": `
    <?xml version="1.0" encoding="utf-8"?>
<!-- Generator: Adobe Illustrator 25.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg version="1.0" id="CRONUS-B" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 3500 4500" enable-background="new 0 0 3500 4500" xml:space="preserve">
<image display="none" overflow="visible" width="3500" height="4500" xlink:href="5DB3BFFA.jpg" >
</image>
<g id="DOORS">
	<g id="SECRET_1_">
		<line fill="none" stroke="#FF00FF" stroke-width="2" stroke-miterlimit="10" x1="1412" y1="830" x2="1412" y2="851"/>
		<line fill="none" stroke="#FF00FF" stroke-width="2" stroke-miterlimit="10" x1="2068" y1="830" x2="2068" y2="851"/>
		<line fill="none" stroke="#FF00FF" stroke-width="2" stroke-miterlimit="10" x1="1655" y1="1302" x2="1673" y2="1302"/>
		<line fill="none" stroke="#FF00FF" stroke-width="2" stroke-miterlimit="10" x1="1655" y1="1334" x2="1673" y2="1334"/>
		<line fill="none" stroke="#FF00FF" stroke-width="2" stroke-miterlimit="10" x1="1570" y1="1177" x2="1590" y2="1177"/>
		<line fill="none" stroke="#FF00FF" stroke-width="2" stroke-miterlimit="10" x1="1881" y1="1177" x2="1901" y2="1177"/>
		<line fill="none" stroke="#FF00FF" stroke-width="2" stroke-miterlimit="10" x1="1798" y1="1302" x2="1816" y2="1302"/>
		<line fill="none" stroke="#FF00FF" stroke-width="2" stroke-miterlimit="10" x1="1798" y1="1334" x2="1816" y2="1334"/>
		<line fill="none" stroke="#FF00FF" stroke-width="2" stroke-miterlimit="10" x1="1812" y1="1849" x2="1834" y2="1849"/>
		<line fill="none" stroke="#FF00FF" stroke-width="2" stroke-miterlimit="10" x1="1858" y1="2056" x2="1858" y2="2070"/>
		<line fill="none" stroke="#FF00FF" stroke-width="2" stroke-miterlimit="10" x1="1875" y1="2070" x2="1875" y2="2056"/>
		<line fill="none" stroke="#FF00FF" stroke-width="2" stroke-miterlimit="10" x1="2207" y1="2309" x2="2207" y2="2335"/>
		<line fill="none" stroke="#FF00FF" stroke-width="2" stroke-miterlimit="10" x1="2232" y1="2580" x2="2259" y2="2580"/>
		<line fill="none" stroke="#FF00FF" stroke-width="2" stroke-miterlimit="10" x1="2210" y1="2756" x2="2210" y2="2779"/>
		<line fill="none" stroke="#FF00FF" stroke-width="2" stroke-miterlimit="10" x1="2164" y1="3422" x2="2193" y2="3422"/>
		<line fill="none" stroke="#FF00FF" stroke-width="2" stroke-miterlimit="10" x1="1998" y1="3202" x2="2014" y2="3186"/>
		<line fill="none" stroke="#FF00FF" stroke-width="2" stroke-miterlimit="10" x1="1821" y1="3192" x2="1805" y2="3176"/>
		<line fill="none" stroke="#FF00FF" stroke-width="2" stroke-miterlimit="10" x1="1521" y1="3100" x2="1521" y2="3127"/>
		<line fill="none" stroke="#FF00FF" stroke-width="2" stroke-miterlimit="10" x1="1421" y1="3100" x2="1421" y2="3127"/>
		<line fill="none" stroke="#FF00FF" stroke-width="2" stroke-miterlimit="10" x1="1353" y1="3100" x2="1353" y2="3127"/>
		<line fill="none" stroke="#FF00FF" stroke-width="2" stroke-miterlimit="10" x1="1278" y1="3421" x2="1302" y2="3421"/>
		<line fill="none" stroke="#FF00FF" stroke-width="2" stroke-miterlimit="10" x1="1266" y1="3270" x2="1266" y2="3289"/>
		<line fill="none" stroke="#FF00FF" stroke-width="2" stroke-miterlimit="10" x1="1266" y1="2932" x2="1266" y2="2951"/>
		<line fill="none" stroke="#FF00FF" stroke-width="2" stroke-miterlimit="10" x1="1258" y1="2736" x2="1258" y2="2761"/>
		<line fill="none" stroke="#FF00FF" stroke-width="2" stroke-miterlimit="10" x1="1231" y1="2580" x2="1212" y2="2580"/>
		<line fill="none" stroke="#FF00FF" stroke-width="2" stroke-miterlimit="10" x1="1231" y1="2481" x2="1213" y2="2481"/>
		<line fill="none" stroke="#FF00FF" stroke-width="2" stroke-miterlimit="10" x1="1533" y1="2327" x2="1533" y2="2352"/>
		<line fill="none" stroke="#FF00FF" stroke-width="2" stroke-miterlimit="10" x1="1533" y1="1978" x2="1533" y2="2001"/>
		<line fill="none" stroke="#FF00FF" stroke-width="2" stroke-miterlimit="10" x1="2360" y1="2503" x2="2360" y2="2529"/>
		<line fill="none" stroke="#FF00FF" stroke-width="2" stroke-miterlimit="10" x1="1926" y1="3162" x2="1911" y2="3162"/>
		<line fill="none" stroke="#FF00FF" stroke-width="2" stroke-miterlimit="10" x1="1919" y1="3145" x2="1904" y2="3145"/>
		<g id="INVISIBLE_4_">
			<line fill="none" stroke="#774422" stroke-width="2" stroke-miterlimit="10" x1="2226" y1="1857" x2="2248" y2="1857"/>
			<line fill="none" stroke="#774422" stroke-width="2" stroke-miterlimit="10" x1="1603" y1="2182" x2="1603" y2="2221"/>
			<line fill="none" stroke="#774422" stroke-width="2" stroke-miterlimit="10" x1="1875" y1="2182" x2="1875" y2="2221"/>
		</g>
	</g>
	<g id="NORMAL_5_">
		<line fill="none" stroke="#223399" stroke-width="6" stroke-miterlimit="10" x1="1225" y1="1865" x2="1283" y2="1865"/>
		<line fill="none" stroke="#223399" stroke-width="6" stroke-miterlimit="10" x1="1332" y1="1865" x2="1388" y2="1865"/>
		<line fill="none" stroke="#223399" stroke-width="6" stroke-miterlimit="10" x1="1440" y1="1865" x2="1496" y2="1865"/>
		<line fill="none" stroke="#223399" stroke-width="6" stroke-miterlimit="10" x1="1543" y1="1865" x2="1595" y2="1865"/>
		<line fill="none" stroke="#223399" stroke-width="6" stroke-miterlimit="10" x1="1225" y1="1676" x2="1283" y2="1676"/>
		<line fill="none" stroke="#223399" stroke-width="6" stroke-miterlimit="10" x1="1332" y1="1676" x2="1388" y2="1676"/>
		<line fill="none" stroke="#223399" stroke-width="6" stroke-miterlimit="10" x1="1440" y1="1676" x2="1496" y2="1676"/>
		<line fill="none" stroke="#223399" stroke-width="6" stroke-miterlimit="10" x1="1225" y1="1788" x2="1283" y2="1788"/>
		<line fill="none" stroke="#223399" stroke-width="6" stroke-miterlimit="10" x1="1332" y1="1788" x2="1388" y2="1788"/>
		<line fill="none" stroke="#223399" stroke-width="6" stroke-miterlimit="10" x1="1440" y1="1788" x2="1496" y2="1788"/>
		<line fill="none" stroke="#223399" stroke-width="6" stroke-miterlimit="10" x1="1543" y1="1788" x2="1598" y2="1788"/>
		<line fill="none" stroke="#223399" stroke-width="6" stroke-miterlimit="10" x1="1525" y1="2148" x2="1525" y2="2216"/>
		<line fill="none" stroke="#223399" stroke-width="6" stroke-miterlimit="10" x1="1316" y1="2132" x2="1316" y2="2193"/>
		<line fill="none" stroke="#223399" stroke-width="6" stroke-miterlimit="10" x1="1703" y1="1788" x2="1772" y2="1788"/>
		<line fill="none" stroke="#223399" stroke-width="6" stroke-miterlimit="10" x1="1703" y1="1862" x2="1773" y2="1862"/>
		<line fill="none" stroke="#223399" stroke-width="6" stroke-miterlimit="10" x1="1703" y1="1926" x2="1773" y2="1926"/>
		<line fill="none" stroke="#223399" stroke-width="6" stroke-miterlimit="10" x1="1877" y1="1788" x2="1931" y2="1788"/>
		<line fill="none" stroke="#223399" stroke-width="6" stroke-miterlimit="10" x1="1880" y1="1865" x2="1934" y2="1865"/>
		<line fill="none" stroke="#223399" stroke-width="6" stroke-miterlimit="10" x1="2059" y1="1865" x2="2115" y2="1865"/>
		<line fill="none" stroke="#223399" stroke-width="6" stroke-miterlimit="10" x1="1976" y1="1675" x2="2032" y2="1675"/>
		<line fill="none" stroke="#223399" stroke-width="6" stroke-miterlimit="10" x1="2084" y1="1675" x2="2139" y2="1675"/>
		<line fill="none" stroke="#223399" stroke-width="6" stroke-miterlimit="10" x1="2190" y1="1675" x2="2245" y2="1675"/>
		<line fill="none" stroke="#223399" stroke-width="6" stroke-miterlimit="10" x1="1998" y1="1490" x2="2056" y2="1490"/>
		<line fill="none" stroke="#223399" stroke-width="6" stroke-miterlimit="10" x1="2147" y1="1490" x2="2205" y2="1490"/>
		<line fill="none" stroke="#223399" stroke-width="6" stroke-miterlimit="10" x1="1948" y1="1510" x2="1948" y2="1577"/>
		<line fill="none" stroke="#223399" stroke-width="6" stroke-miterlimit="10" x1="1857" y1="1510" x2="1857" y2="1576"/>
		<line fill="none" stroke="#223399" stroke-width="6" stroke-miterlimit="10" x1="1616" y1="1510" x2="1616" y2="1576"/>
		<line fill="none" stroke="#223399" stroke-width="6" stroke-miterlimit="10" x1="1525" y1="1510" x2="1525" y2="1576"/>
		<line fill="none" stroke="#223399" stroke-width="6" stroke-miterlimit="10" x1="1422" y1="1489" x2="1481" y2="1489"/>
		<line fill="none" stroke="#223399" stroke-width="6" stroke-miterlimit="10" x1="1331" y1="1489" x2="1273" y2="1489"/>
		<line fill="none" stroke="#223399" stroke-width="6" stroke-miterlimit="10" x1="1954" y1="2031" x2="1954" y2="2097"/>
		<line fill="none" stroke="#223399" stroke-width="6" stroke-miterlimit="10" x1="1954" y1="2308" x2="1954" y2="2374"/>
		<line fill="none" stroke="#223399" stroke-width="6" stroke-miterlimit="10" x1="1881" y1="2475" x2="1934" y2="2475"/>
		<line fill="none" stroke="#223399" stroke-width="6" stroke-miterlimit="10" x1="1595" y1="2475" x2="1541" y2="2475"/>
		<line fill="none" stroke="#223399" stroke-width="6" stroke-miterlimit="10" x1="1419" y1="2472" x2="1351" y2="2472"/>
		<line fill="none" stroke="#223399" stroke-width="6" stroke-miterlimit="10" x1="1126" y1="2473" x2="1183" y2="2473"/>
		<line fill="none" stroke="#223399" stroke-width="6" stroke-miterlimit="10" x1="1127" y1="2586" x2="1184" y2="2586"/>
		<line fill="none" stroke="#223399" stroke-width="6" stroke-miterlimit="10" x1="1245" y1="2498" x2="1245" y2="2564"/>
		<line fill="none" stroke="#223399" stroke-width="6" stroke-miterlimit="10" x1="1351" y1="2587" x2="1420" y2="2587"/>
		<line fill="none" stroke="#223399" stroke-width="6" stroke-miterlimit="10" x1="1704" y1="2587" x2="1770" y2="2587"/>
		<line fill="none" stroke="#223399" stroke-width="6" stroke-miterlimit="10" x1="2052" y1="2587" x2="2120" y2="2587"/>
		<line fill="none" stroke="#223399" stroke-width="6" stroke-miterlimit="10" x1="2220" y1="2498" x2="2220" y2="2564"/>
		<line fill="none" stroke="#223399" stroke-width="6" stroke-miterlimit="10" x1="2281" y1="2472" x2="2337" y2="2472"/>
		<line fill="none" stroke="#223399" stroke-width="6" stroke-miterlimit="10" x1="2281" y1="2587" x2="2337" y2="2587"/>
		<line fill="none" stroke="#223399" stroke-width="6" stroke-miterlimit="10" x1="1531" y1="2813" x2="1596" y2="2813"/>
		<line fill="none" stroke="#223399" stroke-width="6" stroke-miterlimit="10" x1="1531" y1="3067" x2="1595" y2="3067"/>
		<line fill="none" stroke="#223399" stroke-width="6" stroke-miterlimit="10" x1="1421" y1="3068" x2="1353" y2="3068"/>
		<line fill="none" stroke="#223399" stroke-width="6" stroke-miterlimit="10" x1="1513" y1="2907" x2="1513" y2="2975"/>
		<line fill="none" stroke="#223399" stroke-width="6" stroke-miterlimit="10" x1="1353" y1="3153" x2="1421" y2="3153"/>
		<line fill="none" stroke="#223399" stroke-width="6" stroke-miterlimit="10" x1="1532" y1="3154" x2="1595" y2="3154"/>
		<line fill="none" stroke="#223399" stroke-width="6" stroke-miterlimit="10" x1="1708" y1="3154" x2="1774" y2="3154"/>
		<line fill="none" stroke="#223399" stroke-width="6" stroke-miterlimit="10" x1="1533" y1="3413" x2="1596" y2="3413"/>
		<line fill="none" stroke="#223399" stroke-width="6" stroke-miterlimit="10" x1="1958" y1="3247" x2="1958" y2="3314"/>
		<line fill="none" stroke="#223399" stroke-width="6" stroke-miterlimit="10" x1="2055" y1="3154" x2="2123" y2="3154"/>
		<line fill="none" stroke="#223399" stroke-width="6" stroke-miterlimit="10" x1="2055" y1="3067" x2="2124" y2="3067"/>
		<line fill="none" stroke="#223399" stroke-width="6" stroke-miterlimit="10" x1="1700" y1="1317" x2="1773" y2="1317"/>
		<line fill="none" stroke="#223399" stroke-width="6" stroke-miterlimit="10" x1="1701" y1="1449" x2="1774" y2="1449"/>
	</g>
</g>
<g id="WALLS_2_">
	<g id="ETHEREAL_1_">
		<line fill="none" stroke="#FF5522" stroke-width="2" stroke-miterlimit="10" x1="1837" y1="2182" x2="1837" y2="2221"/>
		<line fill="none" stroke="#FF5522" stroke-width="2" stroke-miterlimit="10" x1="1858" y1="2162" x2="1875" y2="2162"/>
		<line fill="none" stroke="#FF5522" stroke-width="2" stroke-miterlimit="10" x1="1637" y1="2221" x2="1637" y2="2182"/>
		<line fill="none" stroke="#FF5522" stroke-width="2" stroke-miterlimit="10" x1="2226" y1="1872" x2="2248" y2="1872"/>
	</g>
	<g id="INVISIBLE_3_">
		<line fill="none" stroke="#00FFFF" stroke-width="2" stroke-miterlimit="10" x1="1257" y1="1418" x2="1346" y2="1418"/>
		<line fill="none" stroke="#00FFFF" stroke-width="2" stroke-miterlimit="10" x1="1409" y1="1418" x2="1495" y2="1418"/>
		<polyline fill="none" stroke="#00FFFF" stroke-width="2" stroke-miterlimit="10" points="1774,1778 1845,1778 1845,1699 		"/>
		<line fill="none" stroke="#00FFFF" stroke-width="2" stroke-miterlimit="10" x1="1982" y1="1415" x2="2068" y2="1415"/>
		<line fill="none" stroke="#00FFFF" stroke-width="2" stroke-miterlimit="10" x1="2132" y1="1415" x2="2217" y2="1415"/>
		<line fill="none" stroke="#00FFFF" stroke-width="2" stroke-miterlimit="10" x1="1976" y1="2003" x2="2028" y2="1952"/>
		<line fill="none" stroke="#00FFFF" stroke-width="2" stroke-miterlimit="10" x1="2145" y1="1952" x2="2201" y2="2008"/>
		<line fill="none" stroke="#00FFFF" stroke-width="2" stroke-miterlimit="10" x1="1351" y1="2805" x2="1258" y2="2805"/>
		<line fill="none" stroke="#00FFFF" stroke-width="2" stroke-miterlimit="10" x1="1419" y1="2805" x2="1507" y2="2805"/>
		<line fill="none" stroke="#00FFFF" stroke-width="2" stroke-miterlimit="10" x1="1868" y1="2806" x2="1957" y2="2806"/>
		<line fill="none" stroke="#00FFFF" stroke-width="2" stroke-miterlimit="10" x1="1632" y1="3000" x2="1684" y2="3052"/>
		<line fill="none" stroke="#00FFFF" stroke-width="2" stroke-miterlimit="10" x1="1277" y1="3002" x2="1328" y2="3053"/>
		<line fill="none" stroke="#00FFFF" stroke-width="2" stroke-miterlimit="10" x1="1632" y1="3342" x2="1677" y2="3387"/>
		<line fill="none" stroke="#00FFFF" stroke-width="2" stroke-miterlimit="10" x1="2158" y1="3381" x2="2194" y2="3347"/>
		<line fill="none" stroke="#00FFFF" stroke-width="2" stroke-miterlimit="10" x1="1875" y1="2182" x2="1875" y2="2163"/>
		<polyline fill="none" stroke="#00FFFF" stroke-width="2" stroke-miterlimit="10" points="1875,2251 1875,2221 1837,2221 		"/>
		<polyline fill="none" stroke="#00FFFF" stroke-width="2" stroke-miterlimit="10" points="1637,2182 1603,2182 1603,2162 		"/>
		<polyline fill="none" stroke="#00FFFF" stroke-width="2" stroke-miterlimit="10" points="1603,2252 1603,2221 1637,2221 		"/>
		<polyline fill="none" stroke="#00FFFF" stroke-width="2" stroke-miterlimit="10" points="2187,1857 2226,1857 2226,1872 		"/>
		<polyline fill="none" stroke="#00FFFF" stroke-width="2" stroke-miterlimit="10" points="2248,1872 2248,1857 2274,1857 		"/>
	</g>
	<g id="NORMAL_4_">
		<polyline fill="none" stroke="#FFFF00" stroke-width="6" stroke-miterlimit="10" points="785,707 785,1373 794,1396 814,1412 
			845,1414 1112,1414 1139,1406 1155,1390 1160,1367 1160,710 1150,686 1128,670 1105,669 835,669 814,673 793,687 785,707 		"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="6" stroke-miterlimit="10" points="101,262 173.5,185.5 2553,185.5 
			2633.75,104.75 3306,104.75 3385.62,184.38 3385.62,4337 3308.31,4414.31 186,4414.31 100.84,4329.16 100.84,262 		"/>
		<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="1837" y1="2182" x2="1788" y2="2182"/>
		<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="1686" y1="2182" x2="1637" y2="2182"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1858,2015 1858,1958 1812,1914 
			1812,1849 		"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1834,1849 1834,1902 1875,1943 		"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1704,2580 1609,2580 1601,2587 
			1595,2596 1595,2702 1604,2712 1617,2717 1855,2717 1867,2711 1871,2701 1871,2596 1864,2584 1847,2580 1770,2580 1770,2596 
			1856,2596 1856,2702 1611,2702 1611,2595 1704,2595 1704,2580 		"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1266,2932 1266,2891 1336,2821 		"/>
		<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="1351" y1="2821" x2="1419" y2="2821"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1266,2951 1266,2991 1277,3002 
			1277,3053 1328,3053 1337,3062 1353,3062 1353,3100 		"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1421,3100 1421,3062 1437,3062 
			1507,2992 1507,2975 1521,2975 1521,3057 1531,3057 1531,3073 1521,3073 1521,3100 		"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1421,3127 1421,3161 1437,3161 
			1506.5,3230.5 1506.5,3333 1437.75,3401.75 1337,3401.75 1266.12,3330.88 1266.12,3289 		"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1266,3270 1266,3232 1337,3161 
			1353,3161 1353,3127 		"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1302,3421 1533,3421 1533,3405 
			1521,3405 1521,3163 1532,3163 1532,3146 1521,3146 1521,3127 		"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1821,3192 1861,3232 1861,3333 
			1792.5,3401.5 1691,3401.5 1677,3387 1632,3387.25 1632,3342 1621,3331 1621,3232 1690,3163 1708,3163 1708,3145 1595,3145 
			1595,3163 1606,3163 1606,3405 1596,3405 1596,3421 1606,3421 1606,3675 1875,3675 1875,3422 2164,3422 		"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2193,3422 2224,3422 2247,3486 
			2261,3538 2269,3599 2265,3650 2257,3686 2118,3862 2118,3952 2002,4262 1471,4262 1356,3954 1356,3862 1222,3694 1208,3645 
			1208,3582 1221,3503 1242,3443 1254,3421 1278,3421 		"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1692,3421 1791,3421 1860,3490 
			1860,3593 1791.5,3661.5 1690,3661.5 1621.25,3592.75 1621.25,3492 1692,3421 		"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1949,3314 1969,3314 1969,3333 
			2038,3402 		"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2209,3145 2123,3145 2123,3162 
			2139,3162 2208.5,3231.5 		"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1625,1334 1609,1334 1609,1277 
			1570,1277 1570,1217 1412,1217 1339,1191 1339,908 1390,830 1412,830 		"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1412,851 1405,851 1378,916 1378,1167 
			1412,1191 1570,1191 1570,1177 		"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1590,1177 1590,1191 1590,1260 
			1609,1260 		"/>
		<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="1673" y1="1302" x2="1673" y2="1334"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1846,1334 1862,1334 1862,1277 
			1901,1277 1901,1217 2059,1217 2132,1191 2132,908 2081,830 2068,830 		"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2068,851 2093,916 2093,1167 2059,1191 
			1901,1191 1901,1177 		"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1881,1177 1881,1191 1881,1260 
			1862,1260 		"/>
		<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="1798" y1="1302" x2="1798" y2="1334"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1533,1978 1193,1978 1193,2009 
			1171,2036 1134,2106 1134,2327 1065,2327 		"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1533,2352 1231,2352 1231,2481 		"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1213,2481 1213,2352 1104,2352 
			1104,2369 		"/>
		<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="1104" y1="2465" x2="1104" y2="2481"/>
		<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="1104" y1="2580" x2="1104" y2="2598"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1104,2692 1104,2736 1229,2736 
			1229,2677 1212,2657 1212,2580 		"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1065,2327 1065,2761 1229,2761 
			1229,3384 1278,3421 		"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1533,2327 1172,2327 1172,2121 
			1201,2026 		"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1533,2001 1209,2001 1209,2008 		"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1302,3421 1252,3378 1252,3289 
			1266,3289 		"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1266,3270 1252,3270 1252,3127 
			1353,3127 		"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1353,3100 1252,3100 1252,2951 
			1266,2951 		"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1266,2932 1252,2932 1252,2761 
			1258,2761 		"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1258,2736 1252,2736 1252,2667 
			1231,2651 1231,2580 		"/>
		<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="1421" y1="3100" x2="1521" y2="3100"/>
		<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="1521" y1="3127" x2="1421" y2="3127"/>
		<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="1805" y1="3176" x2="1836" y2="3145"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2014,3186 2038,3162 2055,3162 
			2055,3145 1919,3145 		"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1949,3247 1949,3171 1943,3162 
			1926,3162 		"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1949,3314 1949,3394 1943,3402 
			1893,3402 1884,3394 1884,3171 1891,3162 1911,3162 		"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1904,3145 1774,3145 1774,3163 
			1792,3163 1805,3176 		"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1821,3192 1845,3162 1891,3162 		"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1943,3162 1971,3162 1998,3202 
			1969,3230 1969,3247 1949,3247 		"/>
		<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="2014" y1="3186" x2="1981" y2="3145"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2248,1872 2248,2235 2392,2334 
			2392,2788 2257,2788 2257,3054 2242,3073 2242,3354 2193,3422 		"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2207,2335 2293,2335 2309,2312 
			2360,2343 2360,2369 		"/>
		<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="2360" y1="2464" x2="2360" y2="2481"/>
		<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="2360" y1="2580" x2="2360" y2="2595"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2360,2689 2360,2751 2259,2751 
			2259,2689 		"/>
		<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="2259" y1="2595" x2="2259" y2="2580"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2232,2580 2232,2751 2210,2751 		"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2210,2788 2232,2788 2232,3030 
			2209,3051 2209,3332 2194,3347 2194,3381 2158,3381 2137,3402 2038,3402 		"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2164,3422 2195,3382 2209,3332 		"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2226,1872 2226,2252 2279,2291 
			2268,2309 2207,2309 		"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1837,2221 1837,2251 1875,2251 
			1875,2463 1881,2463 1881,2481 1867,2481 1859,2485 1618,2485 1609,2481 1595,2481 1595,2465 1603,2465 1603,2252 1637,2252 
			1637,2221 1688,2221 		"/>
		<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="1788" y1="2221" x2="1837" y2="2221"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1703,1943 1703,1849 1619,1849 
			1607,1857 1595,1857 1595,1872 1603,1875 1603,2162 1637,2162 1637,2182 		"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1533,2001 1533,2148 1517,2148 
			1517,2008 1209,2008 1209,2018 1201,2025 1201,2102 1324,2102 1324,2132 1306,2132 1306,2120 1201,2120 1201,2317 1306,2317 
			1306,2193 1324,2193 1324,2317 1517,2317 1517,2216 1533,2216 1533,2327 		"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1533,2352 1533,2465 1541,2465 
			1541,2481 1419,2481 1419,2465 1515,2465 1515,2363 1258,2363 1258,2465 1351,2465 1351,2481 1258,2481 1258,2498 1231,2498 
			1231,2481 		"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1213,2481 1183,2481 1183,2465 
			1205,2465 1205,2369 1104,2369 1104,2465 1126,2465 1126,2481 1104,2481 1104,2580 1127,2580 1127,2597 1104,2597 1104,2692 
			1207,2692 1207,2597 1184,2597 1184,2580 1212,2580 		"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1231,2580 1231,2564 1258,2564 
			1258,2580 1351,2580 1351,2595 1262,2595 1262,2702 1507,2702 1507,2595 1420,2595 1420,2580 1506,2580 1516,2585 1523,2596 
			1523,2702 1516,2712 1502,2717 1258,2717 1258,2736 		"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1258,2761 1258,2821 1351,2821 
			1351,2805 1419,2805 1419,2821 1437,2821 1507,2891 1507,2907 1521,2907 1521,2821 1531,2821 1531,2805 1507,2805 1507,2821 
			1437,2821 		"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1773,1943 1773,1849 1812,1849 		"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1283,1668 1283,1684 1303,1684 
			1303,1780 1283,1780 1283,1796 1332,1796 1332,1780 1314,1780 1314,1684 1332,1684 1332,1668 1282,1668 		"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1440,1668 1440,1684 1418,1684 
			1418,1780 1440,1780 1440,1796 1388,1796 1388,1780 1407,1780 1407,1684 1388,1684 1388,1668 1439,1668 		"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1496,1668 1496,1684 1516,1684 
			1516,1780 1496,1780 1496,1796 1543,1796 1543,1780 1533,1780 1533,1576 1516,1576 1516,1668 1496,1668 		"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1834,1849 1857,1849 1868,1857 
			1880,1857 1880,1872 1875,1872 1875,2056 		"/>
		<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="1875" y1="2070" x2="1875" y2="2163"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1945,2031 1965,2031 1965,2014 
			1976,2003 1976,1952 2028,1952 2036,1944 2138,1944 2145,1952 2201,1952 2201,2008 2207,2014 2207,2309 		"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2207,2335 2207,2392 2137,2462 
			2037,2462 1966.5,2391.5 1966.5,2374 1942,2374 1942,2463 1934,2463 1934,2481 2208,2481 2208,2498 2234,2498 2234,2481 
			2281,2481 2281,2464 2258,2464 2258,2369 2360,2369 2360,2464 2337,2464 2337,2481 2360,2481 2360,2503 		"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2360,2529 2360,2580 2337,2580 
			2337,2595 2360,2595 2360,2689 2259,2689 2259,2595 2281,2595 2281,2580 2259,2580 		"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2232,2580 2232,2564 2209,2564 
			2209,2580 2120,2580 2120,2595 2202,2595 2202,2703 1964,2703 1964,2595 2052,2595 2052,2580 1966,2580 1955,2586 1950,2596 
			1950,2704 1956,2712 1968,2717 2210,2717 2210,2756 		"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2210,2779 2210,2806 1957,2806 
			1957,2821 1868,2821 1868,2806 1596,2806 1596,2821 1607,2821 1607,3057 1595,3057 1595,3073 2055,3073 2055,3060 1692,3060 
			1684,3052 1632,3052 1632,3000 1622,2990 1622,2890 1691,2821 1868,2821 		"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2209,3073 2124,3073 2124,3060 
			2139,3060 2209,2990 2209,2891 2139,2821 1957,2821 		"/>
		<polyline fill="none" stroke="#FFFF00" stroke-miterlimit="10" points="1945,2097 1965,2097 1965,2308 1945,2308 1945,2097 		"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1703,2221 1688,2221 1619,2290 
			1619,2390 1686,2460 1788,2460 1858,2390 1858,2348 		"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1858,2348 1858,2293 1788,2221 
			1703,2221 		"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1703,1943 1688,1943 1619,2012 
			1619,2112 1686,2182 1788,2182 1858,2112 1858,2070 		"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1858,2056 1858,2015 1788,1943 
			1773,1943 		"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1945,2031 1945,1872 1934,1872 
			1934,1857 2059,1857 2059,1872 1974,1872 1966,1880 1966,1918 1974,1925 2199,1925 2207,1917 2207,1880 2199,1872 2115,1872 
			2115,1857 2187,1857 2187,1872 		"/>
		<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="2199" y1="1872" x2="2226" y2="1872"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2248,1872 2274,1872 2274,1784 
			2186,1784 2186,1794 1931,1794 1931,1779 1940,1779 1940,1577 1956,1577 1956,1667 1976,1667 1976,1685 1956,1685 1956,1779 
			2053,1779 2053,1685 2032,1685 2032,1667 2084,1667 2084,1685 2065,1685 2065,1779 2158,1779 2158,1685 2139,1685 2139,1667 
			2190,1667 2190,1685 2170,1685 2170,1779 2266,1779 2266,1685 2245,1685 2245,1667 2266,1667 2266,1520 2256,1497 2205,1497 
			2205,1480 2250,1480 2226,1415 2217,1415 2217,1395 2132,1395 2132,1415 2104,1415 2104,1480 2147,1480 2147,1497 2056,1497 
			2056,1480 2088,1480 2088,1415 2068,1415 2068,1395 1982,1395 1982,1415 1956,1415 1956,1480 1998,1480 1998,1497 1956,1497 
			1956,1510 1939,1510 1939,1416 1923,1380 1847,1380 1847,1334 1816,1334 		"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1798,1334 1773,1334 1773,1302 
			1798,1302 		"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1816,1302 1847,1302 1847,1260 
			1863,1260 1863,1199 1881,1177 		"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1901,1177 2002,1177 2029,1164 
			2051,1140 2068,1085 2068,851 		"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1570,1177 1476,1177 1445,1161 
			1424,1135 1412,1094 1412,851 		"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="2068,830 2068,728 1886,352 1778,275 
			1696,274 1587,352 1412,715 1412,830 		"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1590,1177 1609,1194 1609,1260 
			1625,1260 1625,1302 1655,1302 		"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1673,1302 1700,1302 1700,1334 
			1673,1334 		"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1655,1334 1625,1334 1625,1381 
			1549,1381 1533,1414 1533,1510 1516,1510 1516,1498 1481,1498 1481,1480 1516,1480 1516,1418 1495,1418 1495,1395 1409,1395 
			1409,1418 1388,1418 1388,1480 1422,1480 1422,1498 1331,1498 1331,1480 1375,1480 1375,1418 1346,1418 1346,1395 1257,1395 
			1257,1418 1246,1418 1218,1480 1273,1480 1273,1498 1215,1498 1207,1513 1207,1668 1225,1668 1225,1684 1207,1684 1207,1780 
			1225,1780 1225,1796 1207,1796 1207,1857 1225,1857 1225,1875 1207,1875 1207,1970 1302,1970 1302,1875 1283,1875 1283,1857 
			1332,1857 1332,1875 1315,1875 1315,1970 1406,1970 1406,1875 1388,1875 1388,1857 1440,1857 1440,1875 1418,1875 1418,1970 
			1517,1970 1517,1875 1496,1875 1496,1857 1543,1857 1543,1875 1533,1875 1533,1978 		"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1701,1438 1701,1459 1630,1459 
			1630,1510 1607,1510 1607,1449 1618,1438 1701,1438 		"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1607,1576 1630,1576 1630,1778 
			1703,1778 1703,1800 1625,1800 1615,1794 1598,1794 1598,1779 1607,1779 1607,1576 		"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1774,1438 1774,1459 1845,1459 
			1845,1510 1868,1510 1868,1449 1857,1438 1774,1438 		"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1868,1576 1868,1779 1877,1779 
			1877,1794 1860,1794 1850,1800 1772,1800 1772,1778 1774,1778 1774,1787 1858,1787 1858,1699 1845,1699 1845,1576 		"/>
		<line fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" x1="1868" y1="1576" x2="1845" y2="1576"/>
		<polyline fill="none" stroke="#FFFF00" stroke-width="2" stroke-miterlimit="10" points="1837,2182 1837,2162 1858,2162 
			1858,2112 		"/>
	</g>
	<g id="VISONLY">
		<polyline fill="none" stroke="#FF9911" stroke-width="2" stroke-miterlimit="10" points="1502,520 1619,656 1852,657 1974,514 		
			"/>
		<polyline fill="none" stroke="#FF9911" stroke-width="2" stroke-miterlimit="10" points="1623,776 1637,762 1834,762 1846,777 
			1846,1038 1835,1050 1780,1050 1780,1008 1697,1008 1697,1050 1635,1050 1623,1038 1623,776 		"/>
	</g>
</g>
<g id="LIGHTS">
	<g id="SHIPLIGHTS-AWAKE-class:awakeAmber">
		<g>
			<circle fill="#FFFF58" cx="1319.18" cy="2418" r="79.18"/>
		</g>
		<g>
			<circle fill="#FFFF58" cx="1456.82" cy="2418" r="79.18"/>
		</g>
		<g>
			<circle fill="#FFFF00" cx="1738" cy="2649" r="103"/>
		</g>
		<g>
			<circle fill="#FFFF00" cx="1391" cy="2649" r="103"/>
		</g>
		<g>
			<circle fill="#FFFF00" cx="2085" cy="2649" r="103"/>
		</g>
		<g>
			<circle fill="#FFFF00" cx="1154" cy="2420" r="60"/>
		</g>
		<g>
			<circle fill="#FFFF00" cx="1154" cy="2642" r="60"/>
		</g>
		<g>
			<circle fill="#FFFF00" cx="2307" cy="2420" r="60"/>
		</g>
		<g>
			<circle fill="#FFFF00" cx="2307" cy="2642" r="60"/>
		</g>
		<g>
			<circle fill="#FF8800" cx="2311" cy="2526" r="85"/>
		</g>
		<g>
			<circle fill="#FF8800" cx="1148" cy="2526" r="85"/>
		</g>
		<g>
			<circle fill="#FFFFFF" cx="2088" cy="2109" r="202"/>
		</g>
		<g>
			<circle fill="#0AFFA2" cx="1735" cy="473" r="257"/>
		</g>
		<g>
			<circle fill="#FF0000" cx="1527" cy="710" r="165"/>
		</g>
		<g>
			<circle fill="#FF0000" cx="1948" cy="710" r="165"/>
		</g>
		<g>
			<circle fill="#FFFF00" cx="1527" cy="1014" r="165"/>
		</g>
		<g>
			<circle fill="#00FF00" cx="1948" cy="1014" r="165"/>
		</g>
		<g>
			<circle fill="#00FFFF" cx="1735" cy="910" r="220"/>
		</g>
		<g>
			<circle fill="#FFFFFF" cx="1735" cy="1079" r="103"/>
		</g>
		<g>
			<circle fill="#FF8800" cx="1735" cy="1222" r="145"/>
		</g>
		<g>
			<circle fill="#FF8800" cx="1735" cy="1408" r="145"/>
		</g>
		<g>
			<circle fill="#FF8800" cx="1569" cy="1582" r="169"/>
		</g>
		<g>
			<circle fill="#FF8800" cx="1739" cy="1814" r="169"/>
		</g>
		<g>
			<circle fill="#FF8800" cx="1568" cy="2067" r="169"/>
		</g>
		<g>
			<circle fill="#FFFF45" cx="1301" cy="2057" r="89"/>
		</g>
		<g>
			<circle fill="#FF8800" cx="1383" cy="3113" r="73"/>
		</g>
		<g>
			<circle fill="#FF8800" cx="1560" cy="2934" r="169"/>
		</g>
		<g>
			<circle fill="#FF8800" cx="1560" cy="3280" r="169"/>
		</g>
		<g>
			<circle fill="#FF8800" cx="1739" cy="3278" r="142"/>
		</g>
		<g>
			<circle fill="#FF8800" cx="1568" cy="2353" r="169"/>
		</g>
		<g>
			<circle fill="#FF8800" cx="1912" cy="2067" r="169"/>
		</g>
		<g>
			<circle fill="#FF8800" cx="1736" cy="2058" r="169"/>
		</g>
		<g>
			<circle fill="#FF8800" cx="1912" cy="2353" r="169"/>
		</g>
		<g>
			<circle fill="#FF8800" cx="1454" cy="2546" r="245"/>
		</g>
		<g>
			<circle fill="#FF8800" cx="1623" cy="2776" r="245"/>
		</g>
		<g>
			<circle fill="#FF8800" cx="1869" cy="3116" r="329"/>
		</g>
		<g>
			<circle fill="#FF8800" cx="2007" cy="2764" r="245"/>
		</g>
		<g>
			<circle fill="#FF8800" cx="1998" cy="2546" r="245"/>
		</g>
		<g>
			<circle fill="#00FFFF" cx="1390" cy="2945" r="150"/>
		</g>
		<g>
			<circle fill="#00FFFF" cx="1386" cy="3282" r="155"/>
		</g>
		<g>
			<circle fill="#00FF83" cx="1762" cy="2943" r="150"/>
		</g>
		<g>
			<circle fill="#00FF83" cx="2055" cy="2952" r="150"/>
		</g>
		<g>
			<circle fill="#00FF83" cx="2091" cy="3278" r="150"/>
		</g>
		<g>
			<circle fill="#FF8800" cx="1387" cy="1826" r="169"/>
		</g>
		<g>
			<circle fill="#FF8800" cx="2088" cy="1826" r="169"/>
		</g>
		<g>
			<circle fill="#FFFFFF" cx="2165" cy="1902" r="58"/>
		</g>
		<g>
			<circle fill="#FFFFFF" cx="1911" cy="3351" r="58"/>
		</g>
		<g>
			<circle fill="#FFFFFF" cx="2015" cy="1899" r="58"/>
		</g>
		<g>
			<circle fill="#FFFFFF" cx="1918" cy="3220" r="58"/>
		</g>
		<g>
			<circle fill="#FF0000" cx="1364" cy="1582" r="169"/>
		</g>
		<g>
			<circle fill="#FF8800" cx="2109" cy="1582" r="169"/>
		</g>
		<g>
			<circle fill="#FF8800" cx="1900" cy="1582" r="169"/>
		</g>
		<g>
			<circle fill="#FF8800" cx="1735" cy="1614" r="189"/>
		</g>
		<g>
			<circle fill="#FFFF45" cx="1417" cy="2067" r="89"/>
		</g>
		<g>
			<circle fill="#FFFF45" cx="1421" cy="2244" r="89"/>
		</g>
		<g>
			<circle fill="#FFFF45" cx="1250" cy="2221" r="89"/>
		</g>
	</g>
	<g id="REACTORCORE-class:reactorCore">
		<g>
			<circle fill="#A8FF83" cx="1742" cy="3544" r="150"/>
		</g>
	</g>
	<g id="AIRSCRUBBERS">
		<g id="PARAMS-class:coldSmoke_23_">
			<circle fill="#005F61" cx="1739" cy="2341.39" r="128"/>
		</g>
		<g id="PARAMS-class:dimAmber">
			<circle fill="#FF8800" cx="1738.2" cy="2340" r="128"/>
		</g>
	</g>
	<g id="ARMORY-class:armory">
		<g>
			<circle fill="#FF0000" cx="1255" cy="1734" r="75"/>
		</g>
		<g>
			<circle fill="#FF0000" cx="1360" cy="1734" r="75"/>
		</g>
		<g>
			<circle fill="#FF0000" cx="1468" cy="1734" r="75"/>
		</g>
	</g>
	<g id="ESCAPE_PODS-class:escapePods">
		<g>
			<circle fill="#FF0000" cx="1302" cy="1436" r="75"/>
		</g>
		<g>
			<circle fill="#FF0000" cx="1457" cy="1436" r="75"/>
		</g>
		<g>
			<circle fill="#FF0000" cx="2029" cy="1436" r="75"/>
		</g>
		<g>
			<circle fill="#FF0000" cx="2179" cy="1436" r="75"/>
		</g>
	</g>
	<g id="EVA_SUITS-class:evaSuits">
		<g>
			<circle fill="#FF0000" cx="2004" cy="1734" r="75"/>
		</g>
		<g>
			<circle fill="#FF0000" cx="2109" cy="1734" r="75"/>
		</g>
		<g>
			<circle fill="#FF0000" cx="2217" cy="1734" r="75"/>
		</g>
	</g>
	<g id="TERMINAL-AWAKE-class:terminalBlink">
		<g>
			<circle fill="#FFFF00" cx="1909" cy="2776" r="52"/>
		</g>
		<g>
			<circle fill="#FFFF00" cx="2152" cy="1993" r="52"/>
		</g>
		<g>
			<circle fill="#FFFF00" cx="1737" cy="1051" r="52"/>
		</g>
		<g>
			<circle fill="#FFFF00" cx="1658" cy="424" r="52"/>
		</g>
		<g>
			<circle fill="#FFFF00" cx="1736" cy="341" r="52"/>
		</g>
		<g>
			<circle fill="#FFFF00" cx="1499" cy="671" r="52"/>
		</g>
		<g>
			<circle fill="#FFFF00" cx="1977" cy="671" r="52"/>
		</g>
		<g>
			<circle fill="#FFFF00" cx="2022" cy="1036" r="52"/>
		</g>
		<g>
			<circle fill="#FFFF00" cx="1454" cy="1036" r="52"/>
		</g>
		<g>
			<circle fill="#FFFF00" cx="1820" cy="420" r="52"/>
		</g>
	</g>
	<g id="EXTERIOR">
		<g id="FileTab-PARAMS-class:extArcUp_1_">
			<circle fill="#0000FF" cx="2960.58" cy="358.58" r="459.42"/>
		</g>
		<g id="ShipLabel-PARAMS-class:extArcUp_1_">
			<circle fill="#0000FF" cx="772.95" cy="687" r="1120"/>
		</g>
		<g id="PARAMS-class:exterior_11_">
			<ellipse fill="#0000FF" cx="801.5" cy="3783" rx="908.5" ry="881"/>
		</g>
		<g id="PARAMS-class:exterior_4_">
			<circle fill="#0000FF" cx="2562.58" cy="1135.58" r="289.58"/>
		</g>
		<g id="PARAMS-class:exterior_3_">
			<ellipse fill="#0000FF" cx="2679.5" cy="3775" rx="908.5" ry="881"/>
		</g>
		<g id="LateralView-PARAMS-class:extArcUp_1_">
			<circle fill="#0000FF" cx="2575.42" cy="858.42" r="417.58"/>
		</g>
	</g>
	<g id="LEGEND">
		<g id="Legend-PARAMS-class:legend_1_">
			<circle fill="#FFFF00" cx="982.58" cy="1033.58" r="556.42"/>
		</g>
	</g>
	<g id="SCIENCE-MODULE">
		<g id="scimod">
			<circle fill="#91FF4A" cx="1567.5" cy="3867.5" r="561.5"/>
		</g>
		<g id="scimod_1_">
			<circle fill="#91FF4A" cx="1877.5" cy="3867.5" r="561.5"/>
		</g>
	</g>
</g>
</svg>
    `
};
// #endregion
/*!DEVCODE*/
/*~
    Update Command with the missing [6].
    Update the talents that let people push twice with a warning about clicking the multi-push box.

~*/
// Register Hooks from imported scripts
[
    viewMasterHooks,
    combatMasterHooks,
    renderMasterHooks,
    lightMasterHooks,
    charMasterHooks,
    itemMasterHooks
].forEach((hooks) => Object.entries(hooks) // Namespace each hook with a prefix, unless hook begins with tilde ('~')
    .forEach(([hook, func]) => Hooks.on(`ARPGO_${hook}`.replace(/(ARPGO_)?~/, ""), func)));

// #region ████████ ON INIT: On-Initialization Hook ████████ ~
Hooks.once("init", async () => {
    console.log("██████ INITIALIZING ALIEN RPG OVERRIDES ... ██████");
    /*DEVCODE*/
    // CONFIG.debug.hooks = true;
    window.RE = RE;
    /*!DEVCODE*/
    game.socket.on("module.alienrpgoverrides", (data) => Hooks.call(...[data].flat()));
    RE.F = {
        /*DEVCODE*/
        setSVG: (isKillingLights = false, isKillingWalls = true) => setSceneFromSVG(SVGDATA[canvas.scene.name], isKillingLights, isKillingWalls),
        /*!DEVCODE*/
        scenes: {
            "Alien: Chariot of the Gods": {isResettingViewOnActivate: true, isLandingPage: true},
            "USCSS Montero - Deck A": {isResettingViewOnActivate: true, ship: "Montero", deck: 1},
            "USCSS Cronus - Exterior": {isResettingViewOnActivate: true, ship: "Cronus", deck: 0},
            "USCSS Cronus - Deck A": {isResettingViewOnActivate: true, ship: "Cronus", deck: 1},
            "USCSS Cronus - Deck B": {isResettingViewOnActivate: true, ship: "Cronus", deck: 2},
            "USCSS Cronus - Deck C": {isResettingViewOnActivate: true, ship: "Cronus", deck: 3},
            "USCSS Cronus - Deck D": {isResettingViewOnActivate: true, ship: "Cronus", deck: 4}
        },
        call: (hook, ...args) => {
            game.socket.emit("module.alienrpgoverrides", [`ARPGO_${hook}`, ...args]);
        },
        callGM: (hook, ...args) => {
            Hooks.call(`ARPGO_${hook}`, ...args);
            RE.F.call(hook, ...args);
        },
        combats: {},
        setLights: (...args) => RE.F.callGM("setLights", ...args),
        setSounds: (...args) => RE.F.callGM("setSounds", ...args),
        assignActor,
        toggleLights: (...args) => RE.F.callGM("toggleLights", ...args),
        toggleDarkness: () => RE.F.call("toggleDarkness"),
        resetSceneView: () => RE.F.call("forceView", "initial"),
        preloadBirth: () => RE.F.callGM("preloadSplashElement", "bloodbursterBirth"),
        loadBirth: () => RE.F.callGM("renderSplashElement", "bloodbursterBirth"),
        closeBirth: () => RE.F.callGM("closeSplashElement", "bloodbursterBirth"),
        preloadDeviation: () => RE.F.callGM("preloadSplashElement", "deviationAlert"),
        loadDeviation: () => RE.F.callGM("renderSplashElement", "deviationAlert"),
        closeDeviation: () => RE.F.callGM("closeSplashElement", "deviationAlert")
    };
    loadTemplates([
        ...renderMasterTemplates,
        ...charMasterTemplates,
        ...itemMasterTemplates
    ]);
    Handlebars.registerHelper({
        mergeDicePools: (actorData) => {
            const {attributes, skills} = actorData;
            for (const [attrName, attrData] of Object.entries(attributes)) {
                actorData.attributes[attrName] = {
                    ...attrData,
                    hasNegMod: attrData.value > attrData.mod,
                    hasPosMod: attrData.value < attrData.mod,
                    floorTotal: Math.max(attrData.mod, 0)
                };
            }
            for (const [skillName, skillData] of Object.entries(skills)) {
                actorData.skills[skillName] = {
                    ...skillData,
                    atrVal: attributes[skillData.ability].value,
                    hasNegMod: skillData.value + attributes[skillData.ability].value > skillData.mod,
                    hasPosMod: skillData.value + attributes[skillData.ability].value < skillData.mod,
                    floorTotal: Math.max(skillData.mod, 0)
                };
            }
        },
        includeAllCrits: (actorData, critList) => actorData.items.filter((item) => item.type === "critical-injury")
    });
    console.log("██████ OVERRIDES INITIALIZATION COMPLETE █████████");
});
Hooks.on("ready", () => {
    if (RE.F.scenes[canvas.scene.name]?.isLandingPage) {
        game.user.character?.sheet?.close(true).then(() => {
            game.user.character?.sheet?.render(true, {left: 100, top: 50});
        });
    }
});
// #endregion ▄▄▄▄▄ ON INIT ▄▄▄▄▄

export default RE;