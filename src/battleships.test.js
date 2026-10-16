const {ship} = require('./battleships');
const {isUniq} = require('./battleships');

//test tile pair value[0] for undefined
//test tile pair value[0] if value ranges from >=1 && <= 10
//test if board tiles amounts to 100


//test if shipTiles are unique

test('checks if ship tiles are unique', () => {
    expect(isUniq(ship.uniqTile)).toBe(true);
});


//break