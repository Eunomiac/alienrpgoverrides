const RE = {
    get F() { return game.alienrpgoverrides },
    set F(v) { game.alienrpgoverrides = v }
};

const Cycle = (arr, curIndex, deltaIndex = 1) => {
    curIndex += deltaIndex;
    while (curIndex >= arr.length) {
        curIndex -= arr.length;
    }
    while (curIndex < 0) {
        curIndex += arr.length;
    }
    return arr[curIndex];
};

export {RE, Cycle};