let input = await Bun.file("./input.txt").text(),
	antinodes = [];

// Part 1
input
	.split("")
	.filter((a, i) => input.indexOf(a) === i && ![".", "\n"].includes(a))
	.forEach((char) => {
		let locations = [];
		let grid = input
			.split("")
			.map((a) => ([char, "\n"].includes(a) ? a : "."))
			.join("")
			.split("\n")
			.map((a) => a.split(""));
		grid.forEach((line, i) =>
			line.forEach((a, j) => {
				if (a == char) locations.push([i, j]);
			})
		);
		locations.forEach((location, i) =>
			locations.forEach((other, j) => {
				if (j != i) {
					let k = location[0] - other[0],
						h = location[1] - other[1];
					if (grid[location[0] + k])
						if (grid[location[0] + k][location[1] + h])
							grid[location[0] + k][location[1] + h] = "#";
					if (grid[other[0] - k])
						if (grid[other[0] - k][other[1] - h])
							grid[other[0] - k][other[1] - h] = "#";
					grid.forEach((a, i) =>
						a.forEach((b, j) => (b == "#" ? antinodes.push([i, j]) : 0))
					);
				}
			})
		);
		console.log(grid.map((a) => a.join("")).join("\n") + "\n");
	});
console.log(
	antinodes.map((a) => a.toString()).filter((a, i, an) => an.indexOf(a) == i).length
);

// Part 2
antinodes = [];
input
	.split("")
	.filter((a, i) => input.indexOf(a) === i && ![".", "\n"].includes(a))
	.forEach((char) => {
		let locations = [];
		let grid = input
			.split("")
			.map((a) => ([char, "\n"].includes(a) ? a : "."))
			.join("")
			.split("\n")
			.map((a) => a.split(""));
		grid.forEach((line, i) =>
			line.forEach((a, j) => {
				if (a == char) locations.push([i, j]);
			})
		);
        if (locations.length > 1) {
            locations.forEach((location, i) =>
                locations.forEach((other, j) => {
                    if (j != i) {
                        let k = location[0] - other[0],
                            h = location[1] - other[1];
                        for (let l = 1; grid[location[0] + k * l]; l++)
                            if (grid[location[0] + k * l][location[1] + h * l])
                                grid[location[0] + k * l][location[1] + h * l] = "#";
                        for (let l = 1; grid[other[0] - k * l]; l++)
                            if (grid[other[0] - k * l][other[1] - h * l])
                                grid[other[0] - k * l][other[1] - h * l] = "#";
                        grid.forEach((a, i) =>
                            a.forEach((b, j) => (b == "#" ? antinodes.push([i, j]) : 0))
                        );
                    }
                })
            );
            antinodes.push(...locations);
        }
		console.log(grid.map((a) => a.join("")).join("\n") + "\n");
	});
console.log(
	antinodes.map((a) => a.toString()).filter((a, i, an) => an.indexOf(a) == i).length
);