const Block = require('./block');

class Blockchain {
	constructor() {
		this.chain = [Block.genesis()];
	}

	addBlock(data) {
		const block = Block.mine(this.chain[this.chain.length-1], data);
		this.chain.push(block);
		return block;
	}

	isValid(chain) {
		if (JSON.stringify(chain[0]) != JSON.stringify(Block.genesis()))
			return false;

		for (let i=1; i<chain.length; i++) {
			const block = chain[i];
			const lastBlock = chain[i-1];

			if (block.lastHash !== lastBlock.hash ||
				block.hash !== Block.hash(block.timestamp, block.lastHash, block.data))
				return false;	
		}

		return true;
	}

	replaceChain(newChain) {
		if (newChain.length <= this.chain.length) {
			console.log('received chain is not longer than current chain');
			return;
		} else if (!this.isValid(newChain)) {
			console.log('received chain is not a valid chain');
			return;	
		}

		console.log('Replacing blockchain with new chain');
		this.chain = newChain;
	}
}

module.exports = Blockchain;