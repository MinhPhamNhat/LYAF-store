$(document).ready(()=>{
    $(".payment-option .radio-selection").change(function(){
        $(".payment-option .payment-desc").hide()
        console.log($(this).find(".payment-desc"))
        $(this).find(".payment-desc").show()
    })
})