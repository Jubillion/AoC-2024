let input = await Bun.file("./input.txt").text(),
	regionStart = 0,
	regionCoords = {},
	regionChar = "",
	cost = 0,
	startCoord = [0, 0],
	sides = 0,
	cost2 = 0;
input = input.split("\n").map((a) => a.split(""));
const navigateFrom = (i, j) => {
	let dirs = [
		input[i - 1] ? input[i - 1][j] : "#",
		input[i][j + 1],
		input[i][j - 1],
		input[i + 1] ? input[i + 1][j] : "#",
	];
	input[i][j] = ".";
	dirs = dirs.map((char, k) => {
		if (char == regionChar) {
			navigateFrom(
				i + (k == 3 ? 1 : 0) - (k == 0 ? 1 : 0),
				j + (k == 1 ? 1 : 0) - (k == 2 ? 1 : 0)
			);
		}
		return [regionChar, "."].includes(char);
	});
	if (!Object.keys(regionCoords).includes(`${i},${j}`))
		dirs.forEach((dir, k) => {
			if (
				dir &&
				dirs[[2, 0, 3, 1][k]] &&
				![regionChar, "."].includes(
					input[i + k.toString(2).padStart(2, "0")[0] * 2 - 1]
						? input[i + k.toString(2).padStart(2, "0")[0] * 2 - 1][
								j + k.toString(2).padStart(2, "0")[1] * 2 - 1
						  ]
						: "#"
				)
			) {
				sides++;
			}
			if (!dir && !dirs[[2, 0, 3, 1][k]]) {
				sides++;
			}
		});
	regionCoords[`${i},${j}`] = dirs.reduce((a, b) => a + (b ? 0 : 1), 0);
};
while (regionStart != -1) {
	startCoord = [
		[
			(regionStart - (regionStart % input[0].length)) / input[0].length,
			regionStart % input[0].length,
		],
	];
	regionChar = input[startCoord[0][0]][startCoord[0][1]];
	navigateFrom(startCoord[0][0], startCoord[0][1]);
	regionStart = input
		.map((a) => a.join(""))
		.join("")
		.split("")
		.findIndex((a) => !["#", "."].includes(a));
	input = input.map((a) => a.map((b) => (b == "." ? "#" : b)));
	cost +=
		Object.keys(regionCoords).length *
		Object.values(regionCoords).reduce((a, b) => a + b, 0);
	cost2 +=
		sides *
		Object.keys(regionCoords).length;
	regionCoords = {};
	sides = 0;
}

//Part 1
console.log(cost);

// Part 2
console.log(cost2);
