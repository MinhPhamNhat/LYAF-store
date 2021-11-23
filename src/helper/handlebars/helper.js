
module.exports = {
    indexSum: (index,n) =>{ return index + n},
    manyEqTo: (options) => {
        return (options.hash.val1 === options.hash.key ||  options.hash.val2 === options.hash.key) ? options.fn(this) : options.inverse(this)
    }
}