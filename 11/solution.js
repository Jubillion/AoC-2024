let input = await Bun.file("./input.txt").text(),
	rocks = {},
	rocksNew = {};
input = input.split(" ");
input.forEach((rock) => (rocks[rock] = ++rocks[+rock] || 1));

// Part 1
for (let i = 0; i < 25; i++) {
	console.log(`${i + 1}: ${input.length}`);
	input.forEach((rock, j) => {
		if (rock[0] == "0") {
			rock = parseInt(rock).toString();
			if (rock == "0") return (input[j] = "1");
		}
		if (rock.length % 2 == 0) {
			input = input
				.slice(0, j)
				.concat([[rock.slice(0, rock.length / 2), rock.slice(rock.length / 2)]])
				.concat(input.slice(j + 1));
		} else {
			input[j] = (parseInt(rock) * 2024).toString();
		}
	});
	input = input
		.map((a) => (Array.isArray(a) ? a.join(" ") : a))
		.join(" ")
		.split(" ");
}
console.log(input.length);

// Part 2 (credit to RealStr1ke for this method)
for (let i = 0; i < 75; i++) {
	for (let rock in rocks) {
		if (rock == "0") {
			rocksNew["1"] = (rocksNew["1"] ?? 0) + rocks["0"];
			continue;
		}
		if (rock.length % 2 == 0) {
			rocksNew[parseInt(rock.slice(0, rock.length / 2)).toString()] =
				(rocksNew[parseInt(rock.slice(0, rock.length / 2)).toString()] ?? 0) +
				rocks[rock];
			rocksNew[parseInt(rock.slice(rock.length / 2)).toString()] =
				(rocksNew[parseInt(rock.slice(rock.length / 2)).toString()] ?? 0) +
				rocks[rock];
		} else {
			rocksNew[(parseInt(rock) * 2024).toString()] = rocks[rock];
		}
	}
	rocks = Object.assign({}, rocksNew);
	rocksNew = {};
}
console.log(Object.values(rocks).reduce((a, b) => a + b));
