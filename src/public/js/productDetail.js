const detail__img_main = document.querySelector('.detail__img--main img');
const detail__info_color_item = document.querySelectorAll('.detail__info--color-detail-item');
const detail__info_color_item_p = document.querySelectorAll('.detail__info--color-item-p');
const detail__info_size_item = document.querySelectorAll('.detail__info--size-item');
for ( let i of detail__info_color_item){
    i.addEventListener("click",() => {
        for ( let i of detail__info_color_item){
                i.classList.remove('detail__info--color-detail-item-hover');
        }
        i.classList.add('detail__info--color-detail-item-hover');
        detail__img_main.src = `../img/ANS1001-${i.id}.jpg`;
    });
}

for ( let i of detail__info_size_item){
    i.addEventListener("click",() => {
        for ( let i of detail__info_size_item){
                i.classList.remove('detail__info--size-item-hover');
        }
        i.classList.add('detail__info--size-item-hover');
    });
}