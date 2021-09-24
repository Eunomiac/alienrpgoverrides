(async () => {
  const hostile = false;
  const label = "GM";
  const reRoll = true;

  let template = `
        <form>
            <div class="form-group">
                <label>How Many Base Die?</label>
                <input type="text" id="fr1Data" value=1>
            </div>
            <div class="form-group">
                <label>How Many Stress Dice?</label>
                <input type="text" id="fr2Data" value=0>
            </div>
    
            <div class="form-group">
                <label>GM Only</label>
                <input type="checkbox" id="fblind" value="true" checked>
            </div>
    
        </form>`,

      buttons = {};
      // if (game.tables.entities.length > 0) {
  buttons = {
    draw: {
      icon: '<i class="fas fa-check"></i>',
      label: "Roll",
      callback: async (html) => {
            // const tableId = html.find('#tableSelect')[0].value
            // const table = game.tables.get(tableId);
        const r1Data = parseInt(html.find("#fr1Data")[0].value || 0);
        const r2Data = parseInt(html.find("#fr2Data")[0].value || 0);
        const blind = html.find("#fblind")[0].checked;

        await game.alienrpg.yze.yzeRoll(hostile, blind, reRoll, label, r1Data, "Black", r2Data, "Stress");
      }
    },
    cancel: {
      icon: '<i class="fas fa-times"></i>',
      label: "Cancel"
    }
  };

  new Dialog({
    "title": "Roll YZE Dice",
    "content": template,
    "buttons": buttons,
    "default": "draw"
  }).render(true);
})();

(async () => {
  let options = "";

  game.tables.contents.forEach((t) => {
    if (t.folder && t.folder.name === "Alien Creature Tables" && t.folder.name != null) {
      options = options.concat(`<option value="${t.data._id}">${t.data.name}</option>`);
    }
  });
  let template = `
                      <form>
                          <div class="form-group">
                              <label>Select Table</label>
                              <select id="tableSelect">${options}</select>
                          </div>
                          <div class="form-group">
                              <label>How Many?</label>
                              <input type="text" id="inputNbr" value=1>
                          </div>
                      </form>`,

      buttons = {};
  if (game.tables.entities.length > 0) {
    buttons = {
      draw: {
        icon: '<i class="fas fa-check"></i>',
        label: "Draw",
        callback: async (html) => {
          const tableId = html.find("#tableSelect")[0].value;
          const table = game.tables.get(tableId);
          const drawNumber = parseInt(html.find("#inputNbr")[0].value || 0);
          for (let i = 0; i < drawNumber; i++) {
            await table.draw({rollMode: CONFIG.Dice.rollModes.gmroll});
          }
        }
      },
      cancel: {
        icon: '<i class="fas fa-times"></i>',
        label: "Cancel"
      }
    };
  } else {
    template = '<div style="text-align: center">There are no tables to draw from!</div><br>';
    buttons = {
      draw: {
        icon: '<i class="fas fa-check"></i>',
        label: "OK"
      }
    };
  }

  new Dialog({
    "title": "Draw multiple RollTable entries",
    "content": template,
    "buttons": buttons,
    "default": "draw"
  }).render(true);
})();