<template>
  <div class="scs-summary-view">
    <NavbarPage />

    <!-- Contenedor principal para productos e información de importación -->
    <div v-if="cart && cart.length > 0" class="scs-summary-content">
      <!-- Sección de productos agregados al carrito -->
      <div class="scs-products-section">
        <h2>Productos</h2>
        <div class="scs-products-list">
          <!-- Recorre cada producto en el carrito -->
          <div
            v-for="product in cart"
            :key="product.id"
            class="scs-product-card"
          >
            <!-- Parte izquierda con imagen del producto -->
            <img
              :src="product.image"
              alt="Product Image"
              class="scs-product-image"
            />

            <!-- Parte central con detalles del producto -->
            <div class="scs-product-details">
              <h3>{{ product.title }}</h3>
              <p class="scs-product-total">
                Total: {{ formatPrice(product.price * product.quantity) }} USD
              </p>
              <p class="scs-product-code">{{ product.code }}</p>
              <div class="scs-quantity-selector">
                <button @click="decreaseQuantity(product)">-</button>
                <input type="number" v-model="product.quantity" />
                <button @click="increaseQuantity(product)">+</button>
              </div>
            </div>

            <!-- Parte derecha con la información de precios -->
            <div class="scs-product-pricing">
              <p>
                Precio sugerido:
                <input
                  v-model="product.suggestedPrice"
                  type="number"
                  class="scs-suggested-price-input"
                />
              </p>
              <p>Costo por und.: ${{ product.unitCost }}</p>
              <p>Margen por und.: ${{ product.marginPerUnit }}</p>
              <p>Porcentaje margen: {{ product.marginPercentage }}%</p>
            </div>
          </div>

          <!-- Botones al final de la lista de productos -->
          <div class="scs-buttons-container">
            <button class="scs-add-product-button">
              Agrega un producto <i class="fa fa-ship" style="margin-left:10px;"></i>
            </button>

            <button class="scs-add-custom-product-button">
              Agrega un producto propio <i class="fa fa-anchor" style="margin-left:10px;"></i>
            </button>
          </div>
        </div>
      </div>

      <!-- Sección de resumen de importación -->
      <div class="scs-import-summary-section">
        <h2>Datos de importación</h2>
        <div class="scs-summary-card">
          <h3>Ganancia esperada</h3>
          <p>Costo de importación: {{ formatPrice(totalImportCost) }} USD</p>
          <p>Valor de venta: {{ formatPrice(totalSalesValue) }} USD</p>
          <p>
            Utilidad general:
            {{ formatPrice(totalSalesValue - totalImportCost) }} USD
          </p>
        </div>
        <div class="scs-summary-card">
          <h3>Costos de importación</h3>
          <p>Costo total del flete: {{ formatPrice(361) }} USD</p>
          <!-- Otros costos de importación -->
        </div>
        <div class="scs-summary-card">
          <h3>Contenedor</h3>
          <p>Capacidad usada: {{ containerUsage }}%</p>
        </div>
        <div class="scs-summary-card">
          <h3>Tiempo estimado</h3>
          <p>{{ estimatedTime }} meses</p>
        </div>
        <div class="scs-summary-card">
          <h3>Costo total estimado</h3>
          <p>{{ formatPrice(totalEstimatedCost) }} USD</p>
          <button class="scs-import-now-btn">Importar ahora</button>
        </div>
      </div>
    </div>

    <!-- Si no hay productos en el carrito -->
    <div v-else>
      <p>No hay productos en el carrito.</p>
    </div>
  </div>
</template>

<script>
import NavbarPage from "@/components/NavbarPage.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "ShoppingCartSummary",
  components: {
    NavbarPage,
  },
  computed: {
    ...mapGetters([
      "cart",
      "totalImportCost",
      "totalSalesValue",
      "containerUsage",
      "estimatedTime",
      "totalEstimatedCost",
    ]),
  },
  methods: {
    ...mapActions(["updateQuantity"]),

    formatPrice(value) {
      return value.toFixed(2);
    },
    decreaseQuantity(product) {
      if (product.quantity > 1) {
        this.updateQuantity({
          productId: product.id,
          quantity: product.quantity - 1,
        });
      }
    },
    increaseQuantity(product) {
      this.updateQuantity({
        productId: product.id,
        quantity: product.quantity + 1,
      });
    },
  },
};
</script>

<style src="../assets/styles/ShoppingCartSummary.css"></style>