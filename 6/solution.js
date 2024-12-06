let input = await Bun.file("./input.txt").text(),
	visited = [],
	direction = [-1, 0];

// Part 1
input = input.split("\n").map((a) => a.split(""));
input.forEach((a, y) =>
	a.forEach((b, x) => (visited = b == "^" ? [[y, x, direction]] : visited))
);

while (input[visited[visited.length - 1][0] + direction[0]]) {
	switch (
		input[visited[visited.length - 1][0] + direction[0]][
			visited[visited.length - 1][1] + direction[1]
		]
	) {
		case "#":
			direction = [direction[1], -direction[0]];
			break;
		case undefined:
			direction = [1e3, 0];
			break;
		default:
			visited.push([
				visited[visited.length - 1][0] + direction[0],
				visited[visited.length - 1][1] + direction[1],
				direction,
			]);
	}
}
visited.forEach((a) => (input[a[0]][a[1]] = "X"));
input = input.map((a) => a.join("")).join("\n");
console.log(input);
console.log(input.split("").filter((a) => a == "X").length);

// Part 2
input = await Bun.file("./input.txt").text();
visited = visited.filter((location, i) => {
	let visitedNew = [],
		inputNew = input.split("\n").map((a) => a.split(""));
	direction = [-1, 0];
	inputNew.forEach((a, y) =>
		a.forEach(
			(b, x) => (visitedNew = b == "^" ? [[y, x, direction]] : visitedNew)
		)
	);
	inputNew[location[0]][location[1]] = "#";
	if (i > 0) {
		while (inputNew[visitedNew[visitedNew.length - 1][0] + direction[0]]) {
			switch (
				inputNew[visitedNew[visitedNew.length - 1][0] + direction[0]][
					visitedNew[visitedNew.length - 1][1] + direction[1]
				]
			) {
				case "#":
					direction = [direction[1], -direction[0]];
					break;
				case undefined:
					direction = [1e3, 0];
					break;
				default:
					visitedNew.push([
						visitedNew[visitedNew.length - 1][0] + direction[0],
						visitedNew[visitedNew.length - 1][1] + direction[1],
						direction,
					]);
					if (
						visitedNew.some((v, i) => {
							if (i == visitedNew.length - 1) return false;
							if (
								v[0] == visitedNew[visitedNew.length - 1][0] &&
								v[1] == visitedNew[visitedNew.length - 1][1] &&
								v[2][0] == visitedNew[visitedNew.length - 1][2][0] &&
								v[2][1] == visitedNew[visitedNew.length - 1][2][1]
							)
								return true;
						})
					)
						return true;
			}
		}
		return false;
	} else return false;
});
input = input.split("");
visited.forEach((a) => (input[a[0]][a[1]] = "O"));
input = input.map().join("");
console.log(input);
console.log(input.split("").filter((a) => a == "O").length);
