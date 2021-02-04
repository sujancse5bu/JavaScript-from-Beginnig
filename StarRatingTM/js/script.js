const ratings = {
    sony: 4.7,
    samsung: 3.4,
    vizio: 2.3,
    panasonic: 3.6,
    phillips: 4.1
},
      starsTotal = 5


document.addEventListener('DOMContentLoaded', getRatings)

const productSelect = document.getElementById('product-select')
const ratingControl = document.getElementById('rating-control')

// Init product
let product;

productSelect.addEventListener('change', () => {
    
});

function getRatings() {
    for (let rating in ratings) {
        const starPercentage = (ratings[rating] / starsTotal) * 100
        
        const starPercentageRounded = `${Math.round(starPercentage / 10) * 10}%`
        
        
        document.querySelector(`.${rating} .stars-inner`).style.width = starPercentageRounded
        console.log(starPercentageRounded);
    }
}
      


    

