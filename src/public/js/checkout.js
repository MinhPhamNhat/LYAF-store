$(document).ready(()=>{
    $(".payment-option .radio-selection").change(function(){
        $(".payment-option .payment-desc").hide()
        $(this).parent().parent().find(".payment-desc").show()
    })

    $(".pick-a-profile").click(()=>{
        $(".select-profile-modal").modal("show")
    })
})