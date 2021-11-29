$(document).ready(()=>{
    
    $(".LYAF-preview-list").each(function () {
        $(this).magnificPopup({
          delegate: ".LYAF-aaaa",
          type: "image",
          gallery: {
            enabled: true,
          },
        });
      });

    $(".LYAF-preview-list .LYAF-image-preview #size").each(async (i,v) => {
        const url = $(v)[0].dataset.url
        $(v).html(await getSize(url))
    })

    $(".edit-btn").click(function(){
        const id = this.dataset.id
        const quantity = this.dataset.value
        const color = this.dataset.color
        const size = this.dataset.size
        $(".edit-modal .modal-title").html('Cập nhật số lượng')
        $(".edit-modal #title").html(`Cập nhật số lượng sản phẩm <b>${id}</b> với màu <b>${color}</b>, size <b>${size}</b>`)
        $(".edit-modal .confirm-update").attr("data-id", id)
        $(".edit-modal .value-update").val(quantity)
        $(".edit-modal").modal("show")
    })

    $(".edit-modal .confirm-update").click(function(){
        const id = this.dataset.id
        const quantity = Number.parseInt($(".edit-modal .value-update").val())
        const formData = new FormData()
        if (id && quantity > 0){
            fetch(window.location.origin + '/api/product/updateQuantity', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({id, quantity})
            }).then(data=>data.json())
            .then(data=>{
              if (data.code === 200){
                $(`.sub-${id} .quantity #value`).html(quantity)
                $(".edit-modal").modal("hide")
                showToast("Cập nhật số lượng", "Cập nhật thành công", "success")
              }else if (data.code===404){
                showToast("Cập nhật số lượng", "Không tìm thấy sản phẩm", "error")
              }else{
                showToast("Cập nhật số lượng", data.message, "error")
              }
            }).catch(e=>{
                showToast("Cập nhật số lượng", "Lỗi rồi", "error")
            })
        }else{
            showToast("Cập nhật số lượng", "Vui lòng nhập số lượng hợp lệ", "warning")
        }
    })

    $(".name-edit-btn").click(function(){
      const id = this.dataset.id
      $(".name-edit-modal .modal-title").html('Cập nhật tên sản phẩm')
      $(".name-edit-modal #title").html(`Bạn muốn cập nhật tên sản phẩm <b>${id}</b>`)
      $(".name-edit-modal .confirm-update").attr("data-id", id)
      $(".name-edit-modal").modal("show")
    })

    $(".name-edit-modal .confirm-update").click(function(){
      const id = this.dataset.id
      const name = $(".name-edit-modal .value-update").val()

      if (id && name){
          fetch(window.location.origin + '/api/product/updateName', {
              method: "POST",
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({id, name})
          }).then(data=>data.json())
          .then(data=>{
            if (data.code === 200){
              $(`#nameeee`).val(name)
              $(".name-edit-modal").modal("hide")
              showToast("Cập nhật tên", "Cập nhật tên thành công", "success")
            }else if (data.code===404){
              showToast("Cập nhật tên", "Không tìm thấy sản phẩm", "error")
            }else{
              showToast("Cập nhật tên", data.message, "error")
            }
          }).catch(e=>{
              showToast("Cập nhật tên", "Lỗi rồi", "error")
          })
      }else{
          showToast("Cập nhật tên", "Vui lòng tên hợp lệ", "warning")
      }
  })

  $(".price-edit-btn").click(function(){
    const id = this.dataset.id
    $(".price-edit-modal .modal-title").html('Cập nhật giá sản phẩm')
    $(".price-edit-modal #title").html(`Bạn muốn cập nhật giá sản phẩm <b>${id}</b>`)
    $(".price-edit-modal .confirm-update").attr("data-id", id)
    $(".price-edit-modal").modal("show")
  })

  $(".price-edit-modal .confirm-update").click(function(){
    const id = this.dataset.id
    const price = Number.parseInt($(".price-edit-modal .value-update").val())

    if (id && price > 0){
        fetch(window.location.origin + '/api/product/updatePrice', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id, price})
        }).then(data=>data.json())
        .then(data=>{
          if (data.code === 200){
            $(`#priceeee`).val((price*1000).toLocaleString('it-IT'))
            $(".price-edit-modal").modal("hide")
            showToast("Cập nhật giá", "Cập nhật giá thành công", "success")
          }else if (data.code===404){
            showToast("Cập nhật giá", "Không tìm thấy sản phẩm", "error")
          }else{
            showToast("Cập nhật giá", data.message, "error")
          }
        }).catch(e=>{
            showToast("Cập nhật giá", "Lỗi rồi", "error")
        })
    }else{
        showToast("Cập nhật giá", "Vui lòng giá hợp lệ", "warning")
    }
  })

  $(".sale-edit-btn").click(function(){
    const id = this.dataset.id
    $(".sale-edit-modal .modal-title").html('Cập nhật giảm giá sản phẩm')
    $(".sale-edit-modal #title").html(`Bạn muốn cập nhật giảm giá sản phẩm <b>${id}</b>`)
    $(".sale-edit-modal .confirm-update").attr("data-id", id)
    $(".sale-edit-modal").modal("show")
  })

  $(".sale-edit-modal .confirm-update").click(function(){
    const id = this.dataset.id
    const price = Number.parseInt($(".price-edit-modal .value-update").val())

    if (id && price > 0){
        fetch(window.location.origin + '/api/product/updatePrice', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id, price})
        }).then(data=>data.json())
        .then(data=>{
          if (data.code === 200){
            $(`#priceeee`).val((price*1000).toLocaleString('it-IT'))
            $(".price-edit-modal").modal("hide")
            showToast("Cập nhật giá", "Cập nhật giá thành công", "success")
          }else if (data.code===404){
            showToast("Cập nhật giá", "Không tìm thấy sản phẩm", "error")
          }else{
            showToast("Cập nhật giá", data.message, "error")
          }
        }).catch(e=>{
            showToast("Cập nhật giá", "Lỗi rồi", "error")
        })
    }else{
        showToast("Cập nhật giá", "Vui lòng giá hợp lệ", "warning")
    }
  })
})

const getSize = async (url)=> {
    const file = await urlToObject(url)
    return humanFileSize(file.size, "");
}
/**
 * Format bytes as human-readable text.
 *
 * @param bytes Number of bytes.
 * @param si True to use metric (SI) units, aka powers of 1000. False to use
 *           binary (IEC), aka powers of 1024.
 * @param dp Number of decimal places to display.
 *
 * @return Formatted string.
 */
 function humanFileSize(bytes, si = true, dp = 1) {
    const thresh = si ? 1000 : 1024;
  
    if (Math.abs(bytes) < thresh) {
      return bytes + " B";
    }
  
    const units = si
      ? ["kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
      : ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"];
    let u = -1;
    const r = 10 ** dp;
  
    do {
      bytes /= thresh;
      ++u;
    } while (
      Math.round(Math.abs(bytes) * r) / r >= thresh &&
      u < units.length - 1
    );
  
    return bytes.toFixed(dp) + " " + units[u];
  }
  
  /**
   * Convert url to File.
   *
   * @param an url.
   *
   * @return An File object.
   */
  const urlToObject = async (url, name) => {
    const response = await fetch(url);
    // here image is url/location of image
    const blob = await response.blob();
    const file = new File([blob], name, { type: blob.type });
    return file;
  };