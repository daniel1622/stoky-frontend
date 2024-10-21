<template>
  <div>
    <!-- Reutilizando el Navbar ya creado -->
    <div><NavbarPage /></div>

    <div v-if="product">
      <div class="product-detail">
        <div class="product-content">
          <!-- Sección de imágenes del producto -->
          <div class="image-slider">
            <!-- Barra de miniaturas -->
            <div class="thumbnail-container">
              <img
                v-for="(thumb, index) in product.thumbnails"
                :key="index"
                :src="thumb"
                class="thumbnail"
                :class="{ active: thumb === selectedImage }"
                @click="selectImage(index)"
              />
            </div>

            <!-- Imagen principal -->
            <img :src="selectedImage" alt="Product image" class="main-image" />
          </div>

          <!-- Card con el detalle del producto -->
          <div class="product-info-card">
            <!-- Título del producto -->
            <h2 class="product-title">{{ product.title }}</h2>

            <!-- Descripción corta -->
            <p class="product-description">{{ product.description }}</p>

            <!-- Calificación con estrellas -->
            <div class="rating">
              <span
                v-for="n in 5"
                :key="n"
                class="star"
                :class="{ filled: n <= product.rating }"
                >★</span
              >
            </div>

            <!-- Opciones: Color y Especificación -->
            <div class="product-options">
              <!-- Opción de Color -->
              <div class="option expandable" @click="toggleColor">
                <label>Color</label>
                <span class="toggle-icon" :class="{ open: showColor }">›</span>
              </div>
              <div v-show="showColor" class="option-content">
                <select v-model="selectedColor" class="custom-select">
                  <option v-for="color in product.colors" :key="color">
                    {{ color }}
                  </option>
                </select>
              </div>
              <hr class="separator" />
              <!-- Opción de Especificación -->
              <div class="option expandable" @click="toggleSpecification">
                <label>Specification (length * width)</label>
                <span class="toggle-icon" :class="{ open: showSpecification }"
                  >›</span
                >
              </div>
              <div v-show="showSpecification" class="option-content">
                <select v-model="selectedSpecification" class="custom-select">
                  <option v-for="spec in product.specifications" :key="spec">
                    {{ spec }}
                  </option>
                </select>
              </div>
            </div>

            <!-- Inventario y precio unitario -->
            <p class="inventory">1 - {{ product.inventory }} piezas</p>
            <p class="price-unit">{{ formatPrice(product.price) }} USD</p>

            <div class="quantity-selector">
              <button
                @click="decreaseQuantity"
                style="border-radius: 5px 0 0 5px"
              >
                -
              </button>
              <input type="number" v-model="quantity" min="1" />
              <button
                @click="increaseQuantity"
                style="border-radius: 0 5px 5px 0"
              >
                +
              </button>
            </div>

            <div class="price-total-section">
              <p class="price-total">
                Total:
                <span class="price-total-usd"
                  >${{ formatPrice(totalPrice) }} USD</span
                >
                <br /><br />
                <span class="price-total-cop"
                  >${{ formatCOP(totalPrice) }} COP</span
                >
              </p>
            </div>

            <!-- Botón "Agregar al contenedor" -->
            <div class="button-section">
              <button class="add-to-container" @click="handleAddToCart">
                Agregar al contenedor <i class="fa fa-ship"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Características del producto -->
      <div class="product-features">
        <h3>Características del producto</h3>

        <!-- Tablas de características -->
        <div class="features-tables">
          <table class="features-table">
            <tr>
              <th>Material</th>
              <th>Packing quantity</th>
            </tr>
            <tr>
              <td>{{ product.material }}</td>
              <td>{{ product.packingQuantity }}</td>
            </tr>
          </table>

          <table class="features-table">
            <tr>
              <th>Origin</th>
              <th>Scalable</th>
            </tr>
            <tr>
              <td>{{ product.origin }}</td>
              <td>{{ product.scalable ? "Yes" : "No" }}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>

    <p v-else>Loading...</p>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import axios from 'axios';
import NavbarPage from "@/components/NavbarPage.vue";

export default {
  components: {
    NavbarPage,
  },
  props: ["id"],
  data() {
    return {
      product: null,
      selectedImage: "https://via.placeholder.com/600x600",
      selectedColor: "Red",
      selectedSpecification: "S - 10cm",
      expanded: false,
      quantity: 1,
      showColor: false,
      showSpecification: false,
    };
  },
  mounted() {
    this.fetchProductDetails();
  },
  methods: {
    async fetchProductDetails() {
      try {
        const apiBaseUrl = process.env.VUE_APP_API_BASE_URL;

        const response = await axios.get(`${apiBaseUrl}/api/products/${this.id}`);
        this.product = response.data;

        if (this.product.thumbnails && this.product.thumbnails.length > 0) {
          this.selectedImage = this.product.thumbnails[0];
        }
      } catch (error) {
        console.error("Error al cargar los detalles del producto", error);
      }
    },
    formatPrice(value) {
      return value.toFixed(2);
    },
    formatCOP(value) {
      const conversionRate = 4220;
      return (value * conversionRate).toFixed(0);
    },
    decreaseQuantity() {
      if (this.quantity > 1) this.quantity--;
    },
    increaseQuantity() {
      this.quantity++;
    },
    toggleColor() {
      console.log("Color toggle clicked");
      this.showColor = !this.showColor;
    },
    toggleSpecification() {
      console.log("Specification toggle clicked");
      this.showSpecification = !this.showSpecification;
    },
    selectImage(index) {
      this.selectedImage = this.product.thumbnails[index];
    },
    ...mapActions(["addToCart"]),
    handleAddToCart() {
      this.addToCart({
        ...this.product,
      });
    },
  },
  computed: {
    totalPrice() {
      return this.product.price * this.quantity;
    },
  },
};
</script>

<style src="../assets/styles/ProductDetail.css"></style>
