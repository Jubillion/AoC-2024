let input = await Bun.file("./input.txt").text(), possible = [];
input = input
	.split("\n")
	.map((a) => a.split(": "))
    .map((a) => [a[0], a[1].split(" ")])
    .map(a => [parseInt(a[0]), a[1].map(b => parseInt(b))]);

// Part 1
possible = input.filter((equation) => {
    let [test, nums] = equation, operations = [];
    for (let i = 0; i < 2 ** (nums.length - 1); i++) {
        operations = [];
        i.toString(2).padStart(nums.length - 1, "0").split("").map(a => parseInt(a)).forEach((operation, j) => {
            operations.push((operation ? "+" : "*") + nums[j + 1].toString());
        });
        operations = [nums[0]].concat(operations);
        if (operations.reduce((a, b, i) => i > 0 ? eval(a.toString() + b) : a) == test) return true;
    }
    return false;
});
console.log(possible.reduce((a, b) => a + b[0], 0));

// Part 2
possible = input.filter((equation) => {
    let [test, nums] = equation, operations = [];
    for (let i = 0; i < 3 ** (nums.length - 1); i++) {
        operations = [];
        i.toString(3).padStart(nums.length - 1, "0").split("").map(a => parseInt(a)).forEach((operation, j) => {
            operations.push((operation ? operation == 1 ? "+" : "" : "*") + nums[j + 1].toString());
        });
        operations = [nums[0]].concat(operations);
        if (operations.reduce((a, b, i) => i > 0 ? eval(a.toString() + b) : a) == test) return true;
    }
    return false;
});
console.log(possible.reduce((a, b) => a + b[0], 0));