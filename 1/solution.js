let input = await Bun.file("./input.txt").text(), a = [], b = [], sum = 0;
input.split("\n").forEach((line) => {
    line = line.split("   ");
    a.push(line[0]);
    b.push(line[1]);
});
a.sort();
b.sort();
a.forEach((num, i) => {
    sum += Math.abs(parseInt(num) - parseInt(b[i]))
});
console.log(sum);