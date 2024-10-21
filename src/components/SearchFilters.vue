<template>
  <div class="filters-container">
    <!-- Rango de Precio -->
    <div class="price-filter">
      <h4>Rango de precio</h4>
      <input type="range" id="price-range" min="0" max="100" value="50" />
      <div class="price-inputs">
        <input type="number" placeholder="Precio Min" v-model="priceMin" />
        <input type="number" placeholder="Precio Max" v-model="priceMax" />
      </div>

      <ul class="price-options">
        <li>
          <input
            type="radio"
            id="all-prices"
            value="all"
            v-model="selectedPriceRange"
          />
          <label for="all-prices">Todos los precios</label>
        </li>
        <li v-for="(range, index) in priceRanges" :key="index">
          <input
            type="radio"
            :id="'price-' + index"
            :value="range"
            v-model="selectedPriceRange"
          />
          <label :for="'price-' + index">{{ range }}</label>
        </li>
      </ul>
    </div>
    <hr />
    <!-- Calificación -->
    <div class="rating-filter">
      <h4>Calificación</h4>
      <ul class="rating-options">
        <li>
          <input
            type="radio"
            id="all-ratings"
            value="all"
            v-model="selectedRating"
          />
          <label for="all-ratings">Todas las calificaciones</label>
        </li>
        <li v-for="(rating, index) in ratingOptions" :key="index">
          <input
            type="radio"
            :id="'rating-' + index"
            :value="rating"
            v-model="selectedRating"
          />
          <label :for="'rating-' + index">{{ rating }}</label>
        </li>
      </ul>
    </div>
    <hr />
  </div>
</template>

<script>
export default {
  data() {
    return {
      priceMin: null,
      priceMax: null,
      selectedPriceRange: "all",
      priceRanges: [
        "Menos de $100",
        "Menos de $200",
        "Menos de $300",
        "Menos de $400",
        "Menos de $500",
      ],
      selectedRating: "all",
      ratingOptions: ["4 estrellas o más", "3 estrellas o más"],
    };
  },
};
</script>


<style scoped>
.filters-container {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
}

h4 {
  margin-bottom: 20px;
  font-size: 18px;
  font-weight: bold;
}

.price-inputs {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
}

.price-inputs input {
  width: 40%;
  padding: 10px;
  border-radius: 12px;
  border: 1px solid #ccc;
  text-align: left;
  font-size: 14px;
  color: #807f7f;
}

.price-inputs input::placeholder {
  color: #dfdfdf;
}

.price-options,
.rating-options {
  list-style: none;
  padding: 0;
  margin: 0;
}

.price-options li,
.rating-options li {
  margin-bottom: 10px;
  display: flex;
  align-items: center;
}

input[type="radio"] {
  margin-right: 10px;
  accent-color: #adff00;
  transform: scale(1.2);
}

label {
  font-size: 14px;
  color: #333;
  cursor: pointer;
  font-weight: 500;
}

.rating-filter {
  margin-top: 20px;
}

.rating-filter h4,
.price-filter h4 {
  color: #333;
  font-size: 16px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
}

.rating-options li {
  display: flex;
  align-items: center;
}

.price-options li {
  display: flex;
  align-items: center;
}

.filters-container hr {
  border: none;
  border-top: 1px solid #e0e0e0;
  margin: 10px 0;
}

input[type="range"]{
  -webkit-appearance:none;
  width:100%;
  height:5px;
  background: rgb(207, 207, 207);
  background-position:center;
  background-repeat:no-repeat;
  margin-bottom: 15px;
}

input[type="range"]::-webkit-slider-thumb{
  -webkit-appearance:none;
  width:20px;
  height:20px;
  border-radius: 100%;
  background: #FFF;
  position:relative;
  border: 3px solid #adff00;
  z-index:3;
  cursor: pointer;
}
</style>
