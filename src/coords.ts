const old_point = [
    [64.9, -99.2],
    [-15.2, -44.3],
    [1.5, -47.8],
];
const new_point = [
    [58.5, -88.6],
    [-61.7003, -6.8555],
    [-46.8, -11.5],
];

const ax = (new_point[0][0] - new_point[1][0]) / (old_point[0][0] - old_point[1][0]);
const bx = new_point[0][0] - old_point[0][0] * ax;

const ay = (new_point[0][1] - new_point[1][1]) / (old_point[0][1] - old_point[1][1]);
const by = new_point[0][1] - ay * old_point[0][1];

const convert = true;

export function convertCoords(x: number, y: number): [number, number] {
    if (convert)
        return [ax * x + bx - 135.5, ay * y + by];
    return [x, y];
}