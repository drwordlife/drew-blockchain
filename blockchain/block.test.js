const Block = require('./block');

describe('Block', () => {
	let data, lastBlock, block;

	beforeEach(() => {
		data = 'test-data';
		lastBlock = Block.genesis();
		block = Block.mine(lastBlock, data);
	})

	it('sets `data` to match input given', () => {
		expect(block.data).toEqual(data);
	});

	it('sets `lastHash` to match hash of last block', () => {
		expect(block.lastHash).toEqual(lastBlock.hash);
	})
})