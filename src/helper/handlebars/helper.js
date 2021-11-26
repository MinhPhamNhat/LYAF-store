
module.exports = {
    equals: (options) =>{ return options.hash.val1 === options.hash.val2 ? options.fn(this) : options.inverse(this) },
    notEquals: (options) =>{ return options.hash.val1 !== options.hash.val2 ? options.fn(this) : options.inverse(this) },
    manyEqTo: (options) => {
        return (options.hash.val1 === options.hash.key ||  options.hash.val2 === options.hash.key) ? options.fn(this) : options.inverse(this)
    },
    getThumbnails: (option) => {
        return `<a href="/product/detail/${option.hash.id}"><img src="${option.hash.images[0]}" id="main-thumbnail"></a><a href="/product/detail/${option.hash.id}"><img src="${option.hash.images[1]}" id="second-thumbnail"></a>`
    },
    getData: (option)=>{
        return option.hash.data[option.hash.indx]
    },
    getSize: (option)=>{
        var size = []
        option.hash.subProduct.forEach(_ => {
            if (!size.includes(_.sizeId)){
                size.push(_.sizeId)
            }
        })
        var result = ''
        size.forEach( (item) => {
            result += option.fn(item);
          });
          return result;
    },
    getColor: (option)=>{
        var color = []
        option.hash.subProduct.forEach(_ => {
            if (!color.includes(_.colorId)){
                color.push(_.colorId)
            }
        })
        var result = ''
        color.forEach( (item) => {
            result += option.fn(item);
          });
          return result;
    },
    ratingStar: (option)=>{
        var rateStar = ''
        const val = option.hash.value
        for (var i = 0; i < 5; i++) {
            if (val - i >= 1) {
                rateStar += '<span><i class="fas fa-star"></i></span>';
            } else if (val - i > 0 && val - i < 1) {
                rateStar +=  '<span><i class="fas fa-star-half-alt"></i></span>';
            } else {
                rateStar += '<span><i class="far fa-star"></i></span>';
            }
        }
        return rateStar
    },
    priceFormat: (option)=>{
        var price = option.hash.price*1000
        price = price.toLocaleString('it-IT');
        return price
    },
    
    saleFormat: (option)=>{
        var price = option.hash.price - option.hash.sale * option.hash.price
        price = (price*1000).toLocaleString('it-IT');
        return price
    }
}