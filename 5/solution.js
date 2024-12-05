let input = await Bun.file("./input.txt").text(),
	[rules, updates] = input.split("\n\n"),
	valid = [],
	newValid = [];
rules = rules
	.split("\n")
	.map((rule) => rule.split("|").map((a) => parseInt(a)));
updates = updates
	.split("\n")
	.map((rule) => rule.split(",").map((a) => parseInt(a)));

// Part 1
valid = updates.filter(
	(update) =>
		!rules.some(
			(rule) =>
				update.includes(rule[0]) &&
				update.includes(rule[1]) &&
				update.indexOf(rule[0]) > update.indexOf(rule[1])
		)
);
console.log(valid.reduce((a, b) => a + b[b.length / 2 - 0.5], 0));

// Part 2
newValid = updates.filter((update) =>
	rules.some(
		(rule) =>
			update.includes(rule[0]) &&
			update.includes(rule[1]) &&
			update.indexOf(rule[0]) > update.indexOf(rule[1])
	)
);
newValid.forEach((update) => {
	do {
		rules
			.filter(
				(rule) =>
					update.includes(rule[0]) &&
					update.includes(rule[1]) &&
					update.indexOf(rule[0]) > update.indexOf(rule[1])
			)
			.forEach((rule) => {
				update[update.indexOf(rule[0])] = rule[1];
				update[update.indexOf(rule[1])] = rule[0];
			});
	} while (
		rules.some(
			(rule) =>
				update.includes(rule[0]) &&
				update.includes(rule[1]) &&
				update.indexOf(rule[0]) > update.indexOf(rule[1])
		)
	);
});
console.log(newValid.reduce((a, b) => a + b[b.length / 2 - 0.5], 0));
