import {Filter} from "../Filter.js"


var G_currentInput = {
    name: "",
    desc: "",
    price: null,
    category: null,
    productID: null,
    color: null,
    size: null,
    images: null,
    thumbnails: null,
  };
  
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
  
  const myProducts = [
    {
      id: "ANS1001",
      name: "Áo Sơmi",
      thumbnail: "ATNS1002-1.jpg",
      category: {
        name: "Áo",
        categoryID: "A",
        child: {
          name: "Áo Sơ mi",
          categoryID: "ASM",
          parent: "A",
        },
      },
      size: [
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
      ],
      color: [
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
      ],
      price: 200,
      quantity: 200,
      rate: 3,
    },
    {
      id: "ANS1001",
      name: "Áo thun",
      thumbnail: "ATNS1003-1.jpg",
      category: {
        name: "Áo",
        categoryID: "A",
        child: {
          name: "Áo Thun",
          categoryID: "AT",
          parent: "A",
        },
      },
      size: [
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
      ],
      color: [
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
          name: "Camo xanh",
          colorID: "CXA",
          colorImage: "color-camo-blue.jpg",
        },
      ],
      price: 250,
      quantity: 500,
      rate: 4.5,
    },
  ];
  
  const parseToElements = (obj) => {
    var check = `<input id='list-product-check' type='checkbox'>`;
    var productDetail = `<div id="list-product-detail">
                          <img id="list-product-thumbail" src='./img/${
                            obj.thumbnail
                          }'>
                          <div id="list-product-info">
                              <span id="list-product-name">${obj.name}</span>
                              <span id="list-product-size">${obj.size
                                .map((_) => _.name)
                                .toString()}</span>
                          </div>
                        </div>`;
    var id = obj.id;
    var categories =
      obj.category.name +
      (obj.category.child ? ", " + obj.category.child.name : "");
    var color = `<div id="color-wrapper">
                  ${obj.color
                    .map(
                      (_) =>
                        `<img title='${_.name}' id='list-product-color' src='./img/${_.colorImage}'>`
                    )
                    .join(" ")}
                </div>`;
    var price = `${obj.price}.000 VNĐ`;
    var quantity = `${obj.quantity} Cái`;
    var rateStar = [];
    for (var i = 0; i < 5; i++) {
      if (obj.rate - i >= 1) {
        rateStar.push('<span><i class="fas fa-star"></i></span>');
      } else if (obj.rate - i > 0 && obj.rate - i < 1) {
        rateStar.push('<span><i class="fas fa-star-half-alt"></i></span>');
      } else {
        rateStar.push('<span><i class="far fa-star"></i></span>');
      }
    }
    var rate = ` <div id='list-product-rating'>
                  <div id="rating-star">
                    ${rateStar.map((_) => _).join(" ")}
                  </div>
                  <div id="rating-value">
                    <span>${obj.rate}/5</span>
                  </div>
                </div>`;
    var action = ` <div id="list-product-action">
                    <div class="btn-group dropup">
                      <button type="button" class="btn btn-outline-secondary">
                        Edit
                      </button>
                      <button type="button" class="btn btn-secondary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      </button>
                      <div class="dropdown-menu">
                        <a class="dropdown-item" href="#">Remove</a>
                        <a class="dropdown-item" href="#">Detail</a>
                        <a class="dropdown-item" href="#">Something else here</a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="#">Separated link</a>
                      </div>
                    </div>
                  </div>`;
    return {
      check,
      productDetail,
      id,
      categories,
      color,
      price,
      quantity,
      rate,
      action,
    };
  };
  
  const productList = myProducts.map((_) => parseToElements(_));
  

$(document).ready(()=>{
  var filters = new Filter("aaaa",{
    data:[{
        property: "id",
        title: "ID",
        type: "text"
    },{
        property: "name",
        title: "Name",
        type: "text"
    },{
        property: "price",
        title: "Price",
        type: "number"
    },{
        property: "category",
        title: "Category",
        type: "category"
    },{
        property: "color",
        title: "Color",
        type: "category"
    },{
        property: "quantity",
        title: "Stock",
        type: "number"
    },{
        property: "rate",
        title: "Rate",
        type: "number"
    },{
        property: "size",
        title: "Size",
        type: "category"
    }],
    submit: function() {
      console.log(this.tags)
      $(".LYAF-product-list .LYAF-table-loading").show()
      setTimeout(() => {
        $(".LYAF-product-list .LYAF-table-loading").hide()
      }, 300);
    }, sizeList, colorList, categoryList})

  // DATATABLE
  if ($("#LYAF-list")[0]) {
    var columns = [
      {
        title: "Check",
        data: "check",
      },
      {
        title: "Product Details",
        data: "productDetail",
      },
      {
        title: "ID",
        data: "id",
      },
      {
        title: "Categories",
        data: "categories",
      },
      {
        title: "Color",
        data: "color",
      },
      {
        title: "Price",
        data: "price",
      },
      {
        title: "Stock",
        data: "quantity",
      },
      {
        title: "Rate",
        data: "rate",
      },
      {
        title: "Action",
        data: "action",
      },
    ];

    var t = $("#LYAF-list").DataTable({
      responsive: true,
      data: productList,
      columns,
      columnDefs: [{ orderable: false, targets: 0 }],
    });

    $("#LYAF-list #list-product-color").hover(
      function (e) {
        if (!$(".LYAF-popup-info").is(":visible")) {
          $(".LYAF-popup-info").append(`<img src='${$(this).attr("src")}'>`);
          $(".LYAF-popup-info").css("left", e.pageX + "px");
          $(".LYAF-popup-info").css("top", e.pageY + "px");
          $(".LYAF-popup-info").show();
        }
      },
      function () {
        if ($(".LYAF-popup-info").is(":visible")) {
          $(".LYAF-popup-info img").remove();
          $(".LYAF-popup-info").hide();
        }
      }
    );
      var tableTrs = $(`.LYAF-product-list #LYAF-list tbody tr`)
      tableTrs.each(function() {
        var tds = $(this).find(`td:not([style*="display: none"])`)
        if (tds.length === 1){
          tds.css("border-radius","20px")
        }else{
          $(tds[0]).css("border-radius","20px 0 0 20px")
          $(tds[tds.length-1]).css("border-radius", "0 20px 20px 0")
        }
      })
  }
})