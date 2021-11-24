
module.exports = {
    equals: (options) =>{ return options.hash.val1 === options.hash.val2 ? options.fn(this) : options.inverse(this) },
    notEquals: (options) =>{ return options.hash.val1 !== options.hash.val2 ? options.fn(this) : options.inverse(this) },
    manyEqTo: (options) => {
        return (options.hash.val1 === options.hash.key ||  options.hash.val2 === options.hash.key) ? options.fn(this) : options.inverse(this)
    },
    getThumbnails: (option) => {
        return `<img src="${option.hash.images[0]}" alt="" id="main-thumbnail"><img src="${option.hash.images[1]}" alt="" id="second-thumbnail">`
    },
    getData: (option)=>{
        return option.hash.data[option.hash.index]
    }
}