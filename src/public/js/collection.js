var G_star_id = 5
$(document).ready(()=>{
    setStar(G_star_id)
    var slider = document.querySelector('.price-selecter');
    fetch(window.location.origin + '/api/product/getMinMax')
    .then(data=>data.json())
    .then(data=>{
        const range = data[0]
        noUiSlider.create(slider, {
            start: [range.minPrice, range.maxPrice],
            tooltips: {to: function(val){
                return Math.floor(val).toLocaleString('it-IT') + ".000đ";
            }},
            range: {
                'min': range.minPrice,
                'max': range.maxPrice
            }
        });
    })

    $(".collection-search").click(()=>{ 
        const keyword = $(".LYAF-collection-filter #keyword").val()
        const isNew = $(".LYAF-collection-filter #condition-checkbox").is(':checked')
        const isSale = $(".LYAF-collection-filter #condition-checkbox2").is(':checked')
        const price = slider.noUiSlider.get()
        const priceFrom = price[0]
        const priceTo = price[1]
        const rating = G_star_id
        fetch(window.location.origin + '/api/product/search?' + new URLSearchParams({keyword, isNew, isSale, priceFrom, priceTo, rating, page: 1}))
        .then(data=>data.json())
        .then(data=>{
            if (data.code ===200){
                const products = data.data
                $(".LYAF-collection-products-wrapper .LYAF-products-container .LYAF-product-component").remove()
                products.forEach(p => {
                    $(".LYAF-collection-products-wrapper .LYAF-products-container").append(`
                        <div class="LYAF-product-component">
                            <div class="LYAF-product-thumbnails">
                                <a href="/product/detail/${p._id}"><img src="${p.images[0]}" alt="" id="main-thumbnail"></a>
                                <a href="/product/detail/${p._id}"><img src="${p.images[1]}" alt="" id="second-thumbnail"></a>
                            </div>
                            <div class="LYAF-product-info">
                                <div id="price">
                                ${p.isSale?`
                                    <span id="true-price">${saleFormat(p.price, p.sale)}<span id="currency">đ</span></span>
                                    <span id="sale-price">${priceFormat(p.price)}<span id="currency">đ</span></span>
                                `:`
                                    <span id="true-price">${priceFormat(p.price)}<span id="currency">đ</span></span>
                                `}
                                </div>
                                <div id="name"><a href="/product/detail/${p._id}">${p.name}</a></div>
                                <div id="category">${p.categoryId.parentId?`<a href="#" id="parent">${p.categoryId.parentId.name}</a>, `:''}<a href="#" id="child">${p.categoryId.name}</a></div>
                                <div id="rating">
                                    <div class="rating-stars">
                                        <span><i class="fas fa-star"></i></span>
                                        <span><i class="fas fa-star"></i></span>
                                        <span><i class="fas fa-star"></i></span>
                                        <span><i class="fas fa-star"></i></span>
                                        <span><i class="fas fa-star-half-alt"></i></span>
                                    </div>
                                    <div class="rating-value">
                                        ${p.rating}/5
                                    </div>
                                </div>
                            </div>
                        </div>
                    `)
                })
            }
        })
    })
    $(".LYAF-collection-filter #rating span").click(function(){
        const id = this.dataset.id
        G_star_id = id
        console.log(G_star_id)
    })

    $(".LYAF-collection-filter #rating span").hover(function(){
        const id = this.dataset.id
        setStar(id)
    }, function(){
        setStar(G_star_id)
    })
})

function setStar(id){
    $(`.LYAF-collection-filter #rating span .fa-star`).remove()
    for (var i = 1; i <= 5 ; i++){
        $(`.LYAF-collection-filter #rating .star-${i}`).append(`
            <i class="${i<=id?'fas':''} fa-star fa-sm text-primary far start-${i}" title="" data-toggle="tooltip" data-original-title="${i}" data-id="${i}"></i>
        `)
    }
}

function priceFormat (price){
    var _price = price*1000
    _price = _price.toLocaleString('it-IT');
    return _price
}
function saleFormat (price, sale){
    var _price = price - sale * price
    _price = (_price*1000).toLocaleString('it-IT');
    return _price
}