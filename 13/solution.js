let input = await Bun.file("./input.txt").text(),
	equations = [],
	cost = 0;
equations = input
	.split("\n\n")
	.map((a) => a.split("Button A: X+"))
	.map((a) => a[1].split("\nButton B: X+"))
	.map((a) => [a[0], a[1].split("\nPrize: X=")])
	.map((a) =>
		a[0]
			.split(", Y+")
			.concat(a[1][0].split(", Y+"))
			.concat(a[1][1].split(", Y="))
	);

// Part 1
equations.forEach((eq) => {
	let [ax, ay, bx, by, px, py] = eq.map((a) => parseInt(a));
	let b = (ax * py - ay * px) / (ax * by - ay * bx);
	let a = (px - bx * b) / ax;
	if (!isNaN(a) && Number.isInteger(a) && Number.isInteger(b))
		cost += 3 * a + b;
});
console.log(cost);

// Part 2
cost = 0;
equations.forEach((eq) => {
	let [ax, ay, bx, by, px, py] = eq.map((a) => parseInt(a));
	px += 10e12;
	py += 10e12;
	let b = (ax * py - ay * px) / (ax * by - ay * bx);
	let a = (px - bx * b) / ax;
	if (!isNaN(a) && Number.isInteger(a) && Number.isInteger(b))
		cost += 3 * a + b;
});
console.log(cost);
