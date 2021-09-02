const RE = {
    get F() { return game.alienrpgoverrides },
    set F(v) { game.alienrpgoverrides = v }
};
const getUserChar = () => RE.F.players[game.user.name]?.char;
const isUserChar = (actor) => RE.F.players[game.user.name]?.actor.name === actor.name;

export {RE, getUserChar, isUserChar};