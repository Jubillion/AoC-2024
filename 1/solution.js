let input = await Bun.file("./input.txt").text(), a = [], b = [], sum = 0;
input.split("\n").forEach((line) => {
    line = line.split("   ");
    a.push(line[0]);
    b.push(line[1]);
});
a.sort();
b.sort();
a.map(parseInt);
b.map(parseInt);

// Part 1
a.forEach((num, i) => {
    sum += Math.abs(num - b[i]);
});
console.log(sum);

// Part 2
sum = 0;
a.forEach((num) => {
    let n = 0;
    b.forEach((num2) => num == num2 ? n++ : 0);
    sum += num * n;
});
console.log(sum);