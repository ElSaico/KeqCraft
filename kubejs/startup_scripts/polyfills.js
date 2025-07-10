global.flatMap = (self, cb) => {
    const result = [];
    for (let i = 0; i < self.length; ++i) {
        let item = cb(self[i], i, self);
        if (!Array.isArray(item)) {
            item = [item];
        }
        for (let j = 0; j < item.length; ++j) {
            result.push(item[j]);
        }
    }
    return result;
}