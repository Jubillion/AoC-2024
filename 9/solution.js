let input = await Bun.file("./input.txt").text();
class Block {
	id = 0;
	pos = 0;
	constructor(id, pos, length = 1) {
		this.id = id;
		this.pos = pos;
		this.length = length;
	}
	static available = [];
	static blocks = [];
	static files = [];
	static freeChunks = [];
	static pos = 0;
	static id = 0;
	static compressedLength = 0;
}
input.split("").forEach((c, i) => {
    if (i % 2 == 0) {
        Block.files.push(new Block(Block.id, Block.pos, parseInt(c)));
		for (let j = 0; j < parseInt(c); j++) {
			Block.blocks.push(new Block(Block.id, Block.pos));
			Block.pos++;
			Block.compressedLength++;
		}
		Block.id++;
    } else {
        Block.freeChunks.push(new Block(Block.id, Block.pos, parseInt(c)));
		for (let j = 0; j < parseInt(c); j++) {
			Block.available.push(Block.pos);
			Block.pos++;
		}
	}
});

// Part 1
Block.blocks = Block.blocks.reverse();
Block.available = Block.available.reverse();
Block.blocks.forEach((block) => {
	if (block.pos >= Block.compressedLength) {
		block.pos = Block.available.pop();
	}
});
console.log(Block.blocks.reduce((acc, block) => acc + block.id * block.pos, 0));

// Part 2
Block.files = Block.files.reverse();
Block.files.forEach((file) => {
    Block.freeChunks.find((chunk) => {
        if (chunk.length >= file.length && chunk.pos < file.pos) {
            Block.freeChunks.push(Object.assign({}, file));
			file.pos = chunk.pos;
			chunk.pos += file.length;
            chunk.length -= file.length;
            Block.freeChunks = Block.freeChunks.filter((c) => c.length > 0).sort((a, b) => a.pos - b.pos);
            return true;
        }
    });
});
console.log(
	Block.files.reduce((acc, file) => {
		for(let i = file.pos; i < file.pos + file.length; i++) {
            acc += file.id * i;
        }
        return acc;
	}, 0)
);
