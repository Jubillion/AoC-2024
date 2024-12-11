let input = await Bun.file("./input.txt").text(),
	found = [],
	sum = 0,
	sum2 = 0;
input = input.split("\n").map((a) => a.split("").map((b) => parseInt(b)));

const getPathsFrom = (i, j) => {
	[
		input[i][j + 1],
		input[i][j - 1],
		input[i + 1] ? input[i + 1][j] : 0,
		input[i - 1] ? input[i - 1][j] : 0,
	].forEach((char2, k) => {
		if (char2 == input[i][j] + 1) {
			if (char2 == 9) {
				found.push([
					i + (k == 2 ? 1 : k == 3 ? -1 : 0),
					j + (k == 0 ? 1 : k == 1 ? -1 : 0),
				]);
				sum2++;
			}
			getPathsFrom(
				i + (k == 2 ? 1 : k == 3 ? -1 : 0),
				j + (k == 0 ? 1 : k == 1 ? -1 : 0)
			);
		}
	});
};
input.forEach((line, i) =>
	line.forEach((char, j) => {
		if (char == 0) {
			getPathsFrom(i, j);
			sum += found
				.map((a) => a.toString())
				.filter((a, b, c) => c.indexOf(a) == b).length;
			found = [];
		}
	})
);

// Part 1
console.log(sum);

// Part 2
console.log(sum2);