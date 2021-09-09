// #region ▮▮▮▮▮▮▮[IMPORTS]▮▮▮▮▮▮▮ ~
import {RE} from "./utils.mjs";
import {alienrpgItemSheet} from "../../../systems/alienrpg/module/item/item-sheet.js";
// #endregion ▮▮▮▮[IMPORTS]▮▮▮▮

// #region ████████ SHEET OVERRIDES: Overriding Item Sheet with Subclass Extension ████████ ~
const sheetTemplates = {
    item: "modules/alienrpgoverrides/html/item/item-sheet.html"
};
class alienrpgoverridesItemSheet extends alienrpgItemSheet {
    get template() { return sheetTemplates.item }
}
// #endregion ▄▄▄▄▄ SHEET OVERRIDES ▄▄▄▄▄

// #region ▮▮▮▮▮▮▮[EXPORTS]▮▮▮▮▮▮▮ ~
const templates = Object.values(sheetTemplates);
export {templates};

export default (() => ({
    "~setup": () => {
        console.log("██████ SETTING UP ITEM SHEET OVERRIDES ... ██████");
        Items.unregisterSheet("alienrpg", alienrpgItemSheet);
        Items.registerSheet("alienrpg", alienrpgItemSheet, {
            types: ["weapon", "armor", "talent", "skill-stunts", "agenda", "specialty"],
            makeDefault: false
        });
        Items.registerSheet("alienrpg", alienrpgoverridesItemSheet, {
            types: ["item"],
            makeDefault: true
        });
        console.log("██████ ITEM SHEET OVERRIDING COMPLETE █████████");
    }
}))();
// #endregion ▮▮▮▮[EXPORTS]▮▮▮▮