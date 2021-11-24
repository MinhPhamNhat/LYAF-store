
$(document).ready(()=>{
    $('.xzoom, .xzoom-gallery').xzoom({
        position: 'lens', 
        sourceClass: 'xzoom-hidden',
        defaultScale: -0.5,
    });

    $(document).on('click', ".LYAF-infor-detail #color #item", function(){
        if (!$(this).hasClass("selected")){
            $(".LYAF-infor-detail #color #item").removeClass("selected")
            $(this).addClass("selected")
        }
        const id = this.dataset.id
    })

    $(document).on('click', ".LYAF-infor-detail #size #item", function(){
        if (!$(this).hasClass("selected")){
            $(".LYAF-infor-detail #size #item").removeClass("selected")
            $(this).addClass("selected")
        }
        const id = this.dataset.id
    })
})