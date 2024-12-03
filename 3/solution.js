let input = await Bun.file("./input.txt").text();

// Part 1
input = input
	.split("mul(")
	.slice(1)
	.map((a) => a.split(")")[0])
	.map((a) => a.split(","))
	.filter(
		(cmd) =>
			cmd.every((n) => /[0-9]+/.exec(n)[0] == n && n.length < 4) &&
			cmd.length == 2
	)
	.map((cmd) => cmd.map((n) => parseInt(n)));

console.log(
	input.reduce((acc, cmd) => {
		return acc + cmd[0] * cmd[1];
	}, 0)
);

// Part 2
input = await Bun.file("./input.txt").text();
input = input
	.split("don't()")
	.map((a, i) =>
		i > 0 ? a.split("do()").slice(1).join("") : a.split("do()").join("")
	)
	.join("")
	.split("mul(")
	.slice(1)
	.map((a) => a.split(")")[0])
	.map((a) => a.split(","))
	.filter(
		(cmd) =>
			cmd.every((n) => /[0-9]+/.exec(n)[0] == n && n.length < 4) &&
			cmd.length == 2
	)
	.map((cmd) => cmd.map((n) => parseInt(n)));

console.log(
	input.reduce((acc, cmd) => {
		return acc + cmd[0] * cmd[1];
	}, 0)
);
