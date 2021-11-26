var G_star_id = 0
$(document).ready(()=>{
    var slider = document.querySelector('.price-selecter');
    console.log(slider)
    noUiSlider.create(slider, {
        start: [20, 80],
        tooltips: {to: function(val){
            return Math.floor(val).toLocaleString('it-IT') + ".000đ";
        }},
        range: {
            'min': 0,
            'max': 100
        }
    });

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