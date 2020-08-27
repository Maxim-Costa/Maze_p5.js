let SIZE = 25;
let PLATE = [];
let START = [0, 0];
let POTENTIAL = ['1,0', '0,1'];
let Xsize = 40, Ysize = 40;
let CONTINUER = true
function setup() {
    createCanvas(Ysize * SIZE * 2, Xsize * SIZE * 2);

    for (let y = 0; y <= Ysize; y++) {
        PLATE.push([])
        for (let x = 0; x <= Xsize; x++) {
            PLATE[y].push(random([1, 2, 3, 4, 5, 6, 7, 8, 9]));
        }
    }

    PLATE[0][0] = 10.2

    plateDrawing()
}

function getColor(v, y, x) {
    if (v === 0) return [0, 0, 0]
    if (v === 10.2) return [255, 255, 255]
    if (POTENTIAL.includes(y.toString() + ',' + x.toString())) return [41, 230, 54]
    return [120, 120, 120]
}

function plateDrawing() {
    PLATE.map((y, indexY) => {
        y.map((x, indexX) => {
            const color = getColor(x, indexY, indexX)
            fill(color[0], color[1], color[2]);
            stroke(0, 0, 0);
            square(indexX * SIZE, indexY * SIZE, SIZE);
        })
    })
}

function getFinalColor(v, y, x) {
    if (v === 10.2) return [255, 255, 255]
    return [0, 0, 0]
}

function plateFinalDrawing() {
    PLATE.map((y, indexY) => {
        y.map((x, indexX) => {
            const color = getFinalColor(x, indexY, indexX)
            fill(color[0], color[1], color[2]);
            stroke(color[0], color[1], color[2]);
            square(indexX * SIZE, indexY * SIZE, SIZE);
        })
    })
}

function countLink(v) {
    let link = 0;
    const y = v[0], x = v[1];
    const po = [[y, x + 1], [y, x - 1], [y - 1, x], [y + 1, x]];
    po.map((v) => {
        if (v[0] >= 0 && v[1] >= 0 && v[0] <= Ysize && v[1] <= Ysize) {
            if (PLATE[v[0]][v[1]] === 10.2) {
                link += 1;
            }
        }
    })
    return link;
}

function draw() {
    if (CONTINUER) {
        if (POTENTIAL.length > 0) {

            const choiceNB = random(POTENTIAL);
            const choice = choiceNB.split(',');
            const y = parseInt(choice[0]), x = parseInt(choice[1]);
            POTENTIAL = POTENTIAL.filter(pos => pos !== choiceNB);

            PLATE[y][x] = 10.2;

            let newPo = [[y, x + 1], [y, x - 1], [y - 1, x], [y + 1, x]];
            newPo.map((v, index) => {
                if (v[0] >= 0 && v[1] >= 0 && v[0] <= Ysize && v[1] <= Xsize) {
                    if (PLATE[v[0]][v[1]] !== 10.2 && PLATE[v[0]][v[1]] !== 0) {
                        POTENTIAL.push(v[0].toString() + ',' + v[1].toString())
                    }
                }
            })

            tmpPo = []
            POTENTIAL.map((v) => {
                const Po = v.split(',');
                const y = parseInt(Po[0]), x = parseInt(Po[1]);
                if (countLink([y, x]) <= 1) {
                    tmpPo.push(v)
                } else {
                    PLATE[y][x] = 0
                }
            })

            POTENTIAL = tmpPo

        } else {

            for (let y = 0; y <= Ysize; y++) {
                for (let x = 0; x <= Xsize; x++) {
                    if (PLATE[y][x] >= 1 && PLATE[y][x] <= 9) {
                        PLATE[y][x] = 0
                        POTENTIAL = [];
                    }
                }
            }

            CONTINUER = false
        }
        plateDrawing();
    } else {
        plateFinalDrawing();
    }
}