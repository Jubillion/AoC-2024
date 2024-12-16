let input = await Bun.file("./input.txt").text(),
	original = input,
	instructions = [],
	sum = 0;
[input, instructions] = input.split("\n\n");
original = input.split("\n").map((a) => a.split(""));
input = input.split("\n").map((a) => a.split(""));
instructions = instructions
	.split("\n")
	.join("")
	.split("")
	.map(
		(a) =>
			[
				[-1, 0],
				[0, 1],
				[1, 0],
				[0, -1],
			]["^>v<".indexOf(a)]
	);

// Part 1
const moveFrom = (pos, dir) => {
	let char = input[pos[0]][pos[1]];
	if (char == ".") return true;
	if (char == "#") return false;
	if (moveFrom([pos[0] + dir[0], pos[1] + dir[1]], dir)) {
		input[pos[0] + dir[0]][pos[1] + dir[1]] = input[pos[0]][pos[1]];
		input[pos[0]][pos[1]] = ".";
		return true;
	} else {
		return false;
	}
};
instructions.forEach((dir) => {
	let y = input.findIndex((a) => a.includes("@"));
	let x = input[y].indexOf("@");
	moveFrom([y, x], dir);
});
input.forEach((a, i) =>
	a.forEach((b, j) => (b == "O" ? (sum += 100 * i + j) : 0))
);
console.log(sum);

// Part 2
const moveFrom2Check = (pos, dir, override = false) => {
		let char = original[pos[0]][pos[1]];
		if (char == ".") return true;
		if (char == "#") return false;
		//console.log(char, dir)
		if ((char == "]" && dir[1] == -1) || (char == "[" && dir[1] == 1))
			return moveFrom2Check([pos[0] + dir[0], pos[1] + dir[1]], dir, true);
		if (char == "[" && !override) {
			if (!moveFrom2Check([pos[0], pos[1] + 1], dir, true)) return false;
		}
		if (char == "]" && !override) {
			if (!moveFrom2Check([pos[0], pos[1] - 1], dir, true)) return false;
		}
		return moveFrom2Check([pos[0] + dir[0], pos[1] + dir[1]], dir);
	},
	moveFrom2 = (pos, dir, checked = false, override = false) => {
		if (!checked) if (!moveFrom2Check(pos, dir)) return;
		if (original[pos[0]][pos[1]] == ".") return;
		if (original[pos[0]][pos[1]] == "[" && !override)
			moveFrom2([pos[0], pos[1] + 1], dir, true, true);
		if (original[pos[0]][pos[1]] == "]" && !override)
			moveFrom2([pos[0], pos[1] - 1], dir, true, true);
		moveFrom2([pos[0] + dir[0], pos[1] + dir[1]], dir, true);
		original[pos[0] + dir[0]][pos[1] + dir[1]] = original[pos[0]][pos[1]];
		original[pos[0]][pos[1]] = ".";
	};
original = original.map((a) =>
	a
		.map((b) => (b == "O" ? "[]" : b == "@" ? "@." : b + b))
		.join("")
		.split("")
);
sum = 0;
instructions.forEach((dir) => {
	let y = original.findIndex((a) => a.includes("@"));
	let x = original[y].indexOf("@");
	moveFrom2([y, x], dir);
});
original.forEach((a, i) =>
	a.forEach((b, j) => (b == "[" ? (sum += 100 * i + j) : 0))
);
console.log(sum);
