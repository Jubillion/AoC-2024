let input = await Bun.file("./input.txt").text(),
	count = 0;
input = input.split("\n").map((line) => line.split(""));

// Part 1
input.forEach((line, iLine) =>
	line.forEach((char, iChar) => {
		if (char == "X") {
			if (
				line[iChar + 1] == "M" &&
				line[iChar + 2] == "A" &&
				line[iChar + 3] == "S"
			)
				count++;
			if (
				line[iChar - 1] == "M" &&
				line[iChar - 2] == "A" &&
				line[iChar - 3] == "S"
			)
				count++;
			if (input[iLine - 3])
				if (
					input[iLine - 1][iChar] == "M" &&
					input[iLine - 2][iChar] == "A" &&
					input[iLine - 3][iChar] == "S"
				)
					count++;
			if (input[iLine + 3])
				if (
					input[iLine + 1][iChar] == "M" &&
					input[iLine + 2][iChar] == "A" &&
					input[iLine + 3][iChar] == "S"
				)
					count++;
			if (input[iLine - 3])
				if (
					input[iLine - 1][iChar - 1] == "M" &&
					input[iLine - 2][iChar - 2] == "A" &&
					input[iLine - 3][iChar - 3] == "S"
				)
					count++;
			if (input[iLine + 3])
				if (
					input[iLine + 1][iChar + 1] == "M" &&
					input[iLine + 2][iChar + 2] == "A" &&
					input[iLine + 3][iChar + 3] == "S"
				)
					count++;
			if (input[iLine - 3])
				if (
					input[iLine - 1][iChar + 1] == "M" &&
					input[iLine - 2][iChar + 2] == "A" &&
					input[iLine - 3][iChar + 3] == "S"
				)
					count++;
			if (input[iLine + 3])
				if (
					input[iLine + 1][iChar - 1] == "M" &&
					input[iLine + 2][iChar - 2] == "A" &&
					input[iLine + 3][iChar - 3] == "S"
				)
					count++;
		}
	})
);
console.log(count);

// Part 2
count = 0;
input.forEach((line, iLine) =>
	line.forEach((char, iChar) => {
		if (
			char == "A" &&
			iChar > 0 &&
			iChar < line.length - 1 &&
			iLine > 0 &&
			iLine < input.length - 1
		) {
			switch (input[iLine - 1][iChar - 1]) {
				case "M":
					if (input[iLine + 1][iChar + 1] == "S") {
						switch (input[iLine - 1][iChar + 1]) {
							case "M":
								if (input[iLine + 1][iChar - 1] == "S") count++;
								break;
							case "S":
								if (input[iLine + 1][iChar - 1] == "M") count++;
						}
					}
					break;
				case "S":
					if (input[iLine + 1][iChar + 1] == "M") {
						switch (input[iLine - 1][iChar + 1]) {
							case "M":
								if (input[iLine + 1][iChar - 1] == "S") count++;
								break;
							case "S":
								if (input[iLine + 1][iChar - 1] == "M") count++;
						}
					}
			}
		}
	})
);
console.log(count);