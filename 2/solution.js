let input = await Bun.file("./input.txt").text(), reports = [], unsafe = [];
input.split("\n").forEach((report) => {
    report = report.split(" ");
    reports.push(report.map((a) => parseInt(a)));
});
reports = reports.map((report) => report.map((lvl, i) =>
    i > 0 ?
        lvl - report[i - 1] : 0
).slice(1));

// Part 1
unsafe = reports.filter((report) => {
    if (report[0] > 0) return report.some((lvl) => lvl < 1 || lvl > 3);
    if (report[0] < 0) return report.some((lvl) => lvl > -1 || lvl < -3);
    return true;
});
console.log(1000 - unsafe.length)

// Part 2
unsafe = unsafe.filter((report) => report.every((_, i) => {
    let newReport = [...report];
    let v2 = newReport[i];
    newReport.splice(i, 1);
    if(i < newReport.length - 1) newReport[i] += v2;
    if (newReport[0] > 0) return newReport.some((lvl) => lvl < 1 || lvl > 3);
    if (newReport[0] < 0) return newReport.some((lvl) => lvl > -1 || lvl < -3)
    return true;
}) && ((report) => {
    if (report[0] > 0) return report.some((lvl) => lvl < 1 || lvl > 3);
    if (report[0] < 0) return report.some((lvl) => lvl > -1 || lvl < -3);
    return true;
})(report.slice(1)));
console.log(1000 - unsafe.length);