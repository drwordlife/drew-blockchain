const Blockchain = require('./index');
const Block = require('./block');

describe('Blockchain', () => {
	let bc, bc2;

	beforeEach(() => {
		bc = new Blockchain();
		bc2 = new Blockchain();
	})

	it('starts with genesis block', () => {
		expect(bc.chain[0]).toEqual(Block.genesis());
	});

	it('adds new block', () => {
		const data = 'test';
		bc.addBlock(data);
		expect(bc.chain[bc.chain.length-1].data).toEqual(data);
	})

	it('validates valid chain', () => {
		bc2.addBlock('foo');
		expect(bc.isValid(bc2.chain)).toBe(true);
	})

	it('invalidates chain with corrupt genesis block', () => {
		bc2.chain[0].data = "corrupt";
		expect(bc.isValid(bc2.chain)).toBe(false);	
	})

	it('invalidates corrupt chain', () => {
		bc2.addBlock('foo');
		bc2.chain[1] = 'corrupted foo';
		expect(bc.isValid(bc2.chain)).toBe(false);	
	})

	it('replaces chain with valid new chain', () => {
		bc2.addBlock('bar');
		bc.replaceChain(bc2.chain);

		expect(bc.chain).toEqual(bc2.chain);	
	})

	it('does not replace chain with shorter chain', () => {
		bc.addBlock('bar');
		bc.replaceChain(bc2.chain);

		expect(bc.chain).not.toEqual(bc2.chain);	
	})

	it('does not replace chain with corrupt chain', () => {
		bc2.addBlock('foo');
		bc2.chain[1] = 'corrupted foo';
		bc.replaceChain(bc2.chain);

		expect(bc.chain).not.toEqual(bc2.chain);	
	})
})
