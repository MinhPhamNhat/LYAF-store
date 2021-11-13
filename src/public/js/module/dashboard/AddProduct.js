const colorList = [
  {
    name: "Đỏ",
    colorID: "R",
    colorImage: "color-red.jpg",
  },
  {
    name: "Đen",
    colorID: "B",
    colorImage: "color-black.jpg",
  },
  {
    name: "Camo rêu",
    colorID: "CR",
    colorImage: "color-camo-green.jpg",
  },
  {
    name: "Camo xám",
    colorID: "CX",
    colorImage: "color-camo-grey.jpg",
  },
  {
    name: "Caro đen",
    colorID: "CRB",
    colorImage: "color-caro-black.jpg",
  },
  {
    name: "Caro vàng",
    colorID: "CRY",
    colorImage: "color-caro-yellow.jpg",
  },
  {
    name: "Camo xanh",
    colorID: "CXA",
    colorImage: "color-camo-blue.jpg",
  },
];

const sizeList = [
  {
    name: "XXS",
    sizeID: "XXS",
    desc: "Rất rất nhỏ",
  },
  {
    name: "XS",
    sizeID: "XS",
    desc: "Rất nhỏ",
  },
  {
    name: "S",
    sizeID: "S",
    desc: "Nhỏ",
  },
  {
    name: "M",
    sizeID: "M",
    desc: "Trung bình",
  },
  {
    name: "L",
    sizeID: "L",
    desc: "Lớn",
  },
  {
    name: "XL",
    sizeID: "XL",
    desc: "Rất lớn",
  },
  {
    name: "XXL",
    sizeID: "XXL",
    desc: "Rất rất lớn",
  },
];

const categoryList = [
  {
    name: "Áo",
    categoryID: "A",
    child: ["AT", "ASM", "AK", "AH", "AL", "AP"],
  },
  {
    name: "Áo Thun",
    categoryID: "AT",
    parent: "A",
  },
  {
    name: "Áo Sơ mi",
    categoryID: "ASM",
    parent: "A",
  },
  {
    name: "Áo khoác",
    categoryID: "AK",
    parent: "A",
  },
  {
    name: "Áo Hoodie",
    categoryID: "AH",
    parent: "A",
  },
  {
    name: "Áo len",
    categoryID: "AL",
    parent: "A",
  },
  {
    name: "Áo polo",
    categoryID: "AP",
    parent: "A",
  },
  {
    name: "Quần",
    categoryID: "Q",
    child: ["QJ", "QT", "QS"],
  },
  {
    name: "Quần jean",
    categoryID: "QJ",
    parent: "Q",
  },
  {
    name: "Quần tây",
    categoryID: "QT",
    parent: "Q",
  },
  {
    name: "Quần short",
    categoryID: "QS",
    parent: "Q",
  },
  {
    name: "Giày, dép",
    categoryID: "GD",
    child: ["GS","GT","DK"],
  },
  {
    name: "Giày sandal",
    categoryID: "GS",
    parent: "GD",
  },
  {
    name: "Giày thể thao",
    categoryID: "GT",
    parent: "GD",
  },
  {
    name: "Dép kẹp",
    categoryID: "DK",
    parent: "GD",
  },
];

$(document).ready(()=>{
    
  if ($(".color-selecter")) {
    colorList.forEach((_) =>
      $(".color-selecter").append(
        `<option value="${_.colorID}" data-image="../img/${_.colorImage}">${_.name}</option>`
      )
    );
  }
  if ($(".size-selecter")) {
    sizeList.forEach((_) =>
      $(".size-selecter").append(
        `<option value="${_.sizeID}">${_.name} - ${_.desc}</option>`
      )
    );
  }

  // LC_SELECT
  if ($(".LYAF-selecter")[0])
    new lc_select(".LYAF-selecter", {
      enable_search: true,
      min_for_search: 7,
      autofocus_search: false,
      wrap_width: "100%",
      pre_placeh_opt: false,
      max_opts: false,
      on_change: null,
      labels: [
        "search options",
        "add options",
        "Select options ..",
        ".. no matching options ..",
      ],
    });


  if ($(".LYAF-advanced-select")[0]) {
    // categoryList.forEach((_) =>
    //   $(".LYAF-advanced-select").append(`
    //         <div class="LYAF-advanced-option" data-action="to" data-id="${_.categoryID}">${_.name}</div>
    //     `)
    // );

    // $("#cancel-option").click(() => {
    //   $(".LYAF-select-category").hide(100);
    // });

    // $(document).on(
    //   "click",
    //   ".LYAF-category-selected .product-category span",
    //   function () {
    //     var categoryParent = categoryList.find(
    //       (_) => _.categoryID === this.dataset.parent
    //     );
    //     if (categoryParent) {
    //       $(".LYAF-advanced-option").remove();
    //       categoryParent.child.forEach((_) =>
    //         $(".LYAF-advanced-select").append(`
    //                 <div class="LYAF-advanced-option" data-parent="${categoryParent.categoryID}" data-id="${_.categoryID}">${_.name}</div>
    //             `)
    //       );
    //     } else {
    //       $(".LYAF-advanced-option").remove();
    //       categoryList.forEach((_) =>
    //         $(".LYAF-advanced-select").append(`
    //                 <div class="LYAF-advanced-option" data-id="${_.categoryID}">${_.name}</div>
    //             `)
    //       );
    //     }
    //     if (!$(".LYAF-select-category").is(":visible")) {
    //       $(".LYAF-select-category").show(100);
    //     }
    //   }
    // );

    $(document).on("click", ".LYAF-advanced-option", function () {
      // var category = this.dataset;
      // if (category.parent) {
      //   var currentCategory = categoryList.find(
      //     (_) => _.categoryID === category.parent
      //   );
      //   currentCategory = currentCategory.child.find(
      //     (_) => _.categoryID === category.id
      //   );
      // } else {
      //   var currentCategory = categoryList.find(
      //     (_) => _.categoryID === category.id
      //   );
      // }
      // if (currentCategory.child) {
      //   $(".LYAF-advanced-option").remove();
      //   currentCategory.child.forEach((_) =>
      //     $(".LYAF-advanced-select").append(`
      //               <div class="LYAF-advanced-option" data-parent="${currentCategory.categoryID}" data-id="${_.categoryID}">${_.name}</div>
      //           `)
      //   );
      //   $(".LYAF-category-selected .product-category span").remove();
      // } else {
      //   $(".LYAF-select-category").hide(100);
      // }
      // if ($(".LYAF-category-selected .product-category span").length > 1) {
      //   $(".LYAF-category-selected .product-category span")[
      //     $(".LYAF-category-selected .product-category span").length - 1
      //   ].remove();
      // }
      // $(
      //   `<span ${category.parent ? `data-parent="${category.parent}"` : ""}> ${
      //     currentCategory.name
      //   } <i class="fas fa-chevron-right"></i></span>`
      // ).insertBefore(".LYAF-category-selected .product-category .product-name");
      // $(".product-id").text(`${currentCategory.categoryID} -`);
    });
  }

  $(".LYAF-product-name input").on("input", () => {
    $(".product-name").html($(".LYAF-product-name input").val());
  });

  if ($(".LYAF-preview-list")[0]) {
    var drake = dragula([document.querySelector(".LYAF-preview-list")], {
      revertOnSpill: false,
      moves: function (el, container, handle) {
        // return !(
        //   $(handle).hasClass("remove-image-btn") ||
        //   $(handle).hasClass("fa-trash") ||
        //   $(handle).hasClass("$@da@#") ||
        //   $(handle).hasClass("LYAF-image-preview-edit") ||
        //   $(handle).hasClass("dropdown-toggle") || 
        //   $(handle).hasClass("dropdown-menu") ||
        //   $(handle).hasClass("dropdown-item") ||
        //   $(handle).hasClass("form-check-label")||
        //   $(handle).hasClass("fa-ellipsis-h")
        // );
        return $(handle).hasClass("$@da@#")
      },
    });

    drake.on("drop", function (el, target, source, sibling) {
      $(".LYAF-preview-container .info").html(
        `${$(".LYAF-preview-list .LYAF-image-preview").length} images`
      );
      $(".LYAF-remove-container .info").html(
        `${$(".LYAF-remove-list .LYAF-image-preview").length} images`
      );
    });

    var scroll = autoScroll(
      [
        window,
        document.querySelector(".LYAF-preview-list"),
        // document.querySelector('.LYAF-remove-list'),
      ],
      {
        margin: 100,
        maxSpeed: 6,
        scrollWhenOutside: true,
        autoScroll: function () {
          return this.down && drake.dragging;
        },
      }
    );

    $(document).on("click", ".LYAF-preview-list .LYAF-image-preview .LYAF-image-preview-edit .dropdown-menu", (e) => {
      e.stopPropagation();
    });

    $(".LYAF-preview-list").each(function () {
      $(this).magnificPopup({
        delegate: ".LYAF-aaaa",
        type: "image",
        gallery: {
          enabled: true,
        },
      });
    });
  }

  tinymce.init({
    height: "300",
    selector: "textarea",
    plugins:
      "advlist autolink lists link image charmap print preview hr anchor pagebreak",
    toolbar_mode: "floating",
  });

  $(".LYAF-thumbnail .thumbnail-upload-holder").magnificPopup({
    delegate: "a",
    type: "image",
  });

  $(".LYAF-dasboard-body .LYAF-dashboard-block i").hover(
    function () {
      if (!$(this).parent().find(".LYAF-tooltip").is(":visible"))
        $(this).parent().find(".LYAF-tooltip").fadeIn(200);
    },
    function () {
      if ($(this).parent().find(".LYAF-tooltip").is(":visible"))
        $(this).parent().find(".LYAF-tooltip").fadeOut(200);
    }
  );

  $(".image-upload").change(function () {
    var files = $(".image-upload")[0].files;
    for (var f of files) {
      var indx = $(".LYAF-image-preview").length+1
      if (f) {
        var size = humanFileSize(f.size)
        $(".LYAF-preview-list").prepend(`
            <div class="LYAF-image-preview preview-${indx}">
                
                <a class="LYAF-aaaa" href="${URL.createObjectURL(f)}">
                  <img src="${URL.createObjectURL(f)}" class="$@da@# " height="auto" width="100">
                </a>
                <span class="image-info font-weight-bold">
                  <span class="LYAF-asssA">
                    <span><i class="fas fa-star"></i></span>
                    <span><img src="../img/color-black.jpg" height="25" width="25"></span>
                  </span>
                  <span id="name">${f.name}</span>
                  <span id="size">${size}</span>
                  
                </span>
                <div class="LYAF-image-preview-edit dropdown show">
                  <a class="dropdown-toggle" href="javascript:void(0)" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i class="fas fa-ellipsis-h"></i>
                  </a>
                  <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                    <div class="form-group form-check">
                      <input type="checkbox" class="form-check-input" id="set-thumnail">
                      <label class="form-check-label" data-id="${indx}" for="set-thumnail">Set as thumbnail <span id="number">0/2</span></label>
                    </div>
                    <hr>
                    <a class="dropdown-item" href="javascript:void(0)">Set as color thumbnail</a>
                    <a class="dropdown-item crop-image" data-id="${indx}" href="javascript:void(0)">Crop image</a>
                  </div>
                </div>
                <span class="remove-image-btn"><i class="fa fa-trash"></i></span>
            </div>
        `);
      }
    }
    $(".LYAF-preview-container .info").html(
      `${$(".LYAF-preview-list .LYAF-image-preview").length} images`
    );
    $(".image-upload").val(null);
  });


  var cropper = new Cropper($(`.LYAF-cropper-image #cropper-image`)[0],{
    viewMode: 1, // 0, 1, 2, 3
    initialAspectRatio: 1,
    aspectRatio: 1,
    autoCropArea: 1,
    zoomable: false,
    minCropBoxWidth: 100,
    minCropBoxHeight: 100,
    ready: function(){
       console.log($(`.LYAF-cropper-image #cropper-image`)[0].cropper.getCroppedCanvas().toDataURL("image/png"))
    }
 })

  $(document).on('click', ".LYAF-image-preview .crop-image", function(){
    var id = this.dataset.id
    var src = $(`.preview-${id} .LYAF-aaaa img`).attr("src")
    cropper.replace(src)
  })

















  $(document).on("click", ".LYAF-preview-list .remove-image-btn", function () {
    $(this).parent().remove();
    $(".LYAF-preview-container .info").html(
      `${$(".LYAF-preview-list .LYAF-image-preview").length} images`
    );
  });

  $(".remove-image").click(() => {
    $(".LYAF-remove-container .LYAF-image-preview").remove();
    $(".LYAF-remove-container .info").html(
      `${$(".LYAF-remove-list .LYAF-image-preview").length} images`
    );
  });

  $(document).on("click", ".remove-image-btn", function () {
    $(this).parent().find(".image-name");
  });

  $(".thumbnail-upload-holder input").change(function () {
    var currentParent = $(this).parent();
    var file = currentParent.find("input")[0].files[0];
    currentParent.find("p").hide();
    currentParent.find("input").hide();
    currentParent.find("#thumbnail-preview")[0].src = URL.createObjectURL(file);
    currentParent.find("a").attr("href", URL.createObjectURL(file));
    currentParent.find("#thumbnail-preview")[0].onload = function () {
      URL.revokeObjectURL(currentParent.find("#thumbnail-preview")[0].src); // free memory
    };
    currentParent.find("#thumbnail-preview").show();
    currentParent.find(".remove-thumbnail").show();
  });

  $(".LYAF-thumbnail .LYAF-thumbnail-input .remove-thumbnail").click(
    function () {
      var currentParent = $(this).parent();
      currentParent.find("p").show();
      currentParent.find("input").show();
      currentParent.find("#thumbnail-preview").hide();
      currentParent.find("a").attr("href", null);
      currentParent.find(".remove-thumbnail").hide();
      currentParent.find("#thumbnail-preview")[0].src = "";
      currentParent.find("input").val(null);
    }
  );
})

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
 function humanFileSize(bytes, si=true, dp=1) {
  const thresh = si ? 1000 : 1024;

  if (Math.abs(bytes) < thresh) {
    return bytes + ' B';
  }

  const units = si 
    ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'] 
    : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
  let u = -1;
  const r = 10**dp;

  do {
    bytes /= thresh;
    ++u;
  } while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1);


  return bytes.toFixed(dp) + ' ' + units[u];
}

/**
 * Extract input to json data.
 * 
 * @return JSON.
 */
 function extractData() {
   var title = $(".LYAF-block-content .LYAF-product-name input").val()
   var description = tinyMCE.get("desc").getContent()
  return {title, description};
}

/**
 * Convert url to File.
 * 
 * @param an url.
 * 
 * @return An File object.
 */
 const urlToObject = async(image)=> {
  const response = await fetch(image);
  // here image is url/location of image
  const blob = await response.blob();
  const file = new File([blob], 'image.jpg', {type: blob.type});
  return file
}