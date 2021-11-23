
module.exports = {
    indexSum: (index,n) =>{ return index + n},
    manyEqTo: (options) => {
        console.log(options.hash)
        return (options.hash.val1 === options.hash.key ||  options.hash.val2 === options.hash.key) ? options.fn(this) : options.inverse(this)
    }
}