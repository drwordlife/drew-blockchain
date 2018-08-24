const Block = require('./block');

const block = new Block('a','b','c','d');
const fooBlock = Block.mine(Block.genesis(), 'foo')
console.log(fooBlock.toString())

