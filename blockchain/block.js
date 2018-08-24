const SHA256 = require('crypto-js/sha256');

class Block {
    constructor(timestamp, lastHash, hash, data) {
        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.hash = hash
        this.data = data
    }

    toString() {
        return `Block -
          Timestamp: ${this.timestamp}
          Last Hash: ${this.lastHash.substring(0, 10)}
          Hash     : ${this.hash.substring(0, 10)}
          Data     : ${this.data}`;
    }

    static genesis() {
        return new this('Genesis time', '----------', '12AB34CD56', [])
    }

    static mine(lastBlock, data) {
        const timeStamp = Date.now();
        const lastHash = lastBlock.hash;
        const hash = Block.hash(timeStamp, lastHash, data);

        return new this(timeStamp, lastHash, hash, data);
    }

    static hash(timestamp, lastHash, data) {
        return SHA256(`${timestamp}${lastHash}${data}`).toString();
    }
}

module.exports = Block;