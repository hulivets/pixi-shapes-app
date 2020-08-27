export const getElementById = (id) => {
    return document.getElementById(id)
};

export const getRandomColor = () => {
    return Math.random() * 0xFFFFFF
};

export const getRandomPos = (min, max) => {
    return Math.random() * (max - min) + min
};

export const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

export const getPolygonArea = (paths = []) => {
    const posX = paths.filter((x, index) => index % 2 === 0).concat(paths[0]);
    const posY = paths.filter((y, index) => index % 2 !== 0).concat(paths[1]);

    const sumX = posX.reduce((total, current, index) => {
        if (index === posX.length - 1) return total;
        return total + (current * posY[index + 1]);
    }, 0);

    const sumY = posY.reduce((total, current, index) => {
        if (index === posY.length - 1) return total;
        return total + (current * posX[index + 1]);
    }, 0)

    return Math.abs(sumX - sumY);
}

export const getShapesArea = (shapes = []) => {
    return shapes.reduce((total, current) => {
        return total + current.area;
    }, 0)
};
