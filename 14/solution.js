let input = await Bun.file("./input.txt").text(),
	tree = 0;
input = input
	.split("\n")
	.map((a) =>
		a
			.slice(2)
			.split(" v=")
			.map((b) => b.split(",").map((c) => parseInt(c)))
	)
	.map((a) => ({ pos: a[0], vel: a[1] }));

// Part 1
input.forEach((a) => {
	a.pos[0] = (((a.pos[0] + a.vel[0] * 100) % 101) + 101) % 101;
	a.pos[1] = (((a.pos[1] + a.vel[1] * 100) % 103) + 103) % 103;
});
console.log(
	input.filter((a) => a.pos[0] < 50 && a.pos[1] < 51).length *
		input.filter((a) => a.pos[0] > 50 && a.pos[1] < 51).length *
		input.filter((a) => a.pos[0] < 50 && a.pos[1] > 51).length *
		input.filter((a) => a.pos[0] > 50 && a.pos[1] > 51).length
);

// Part 2
input.forEach((a) => {
	a.pos[0] = (((a.pos[0] - a.vel[0] * 100) % 101) + 101) % 101;
	a.pos[1] = (((a.pos[1] - a.vel[1] * 100) % 103) + 103) % 103;
});
for(let i = 1; tree == 0; i++) {
	input.forEach((a) => {
		a.pos[0] = (((a.pos[0] + a.vel[0]) % 101) + 101) % 101;
		a.pos[1] = (((a.pos[1] + a.vel[1]) % 103) + 103) % 103;
	});
	input.map((a) => a.pos.toString()).every((a, j, arr) => arr.indexOf(a) == j)
		? (tree = i)
		: 0;
}
console.log(tree);