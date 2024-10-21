import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/views/HomePage.vue';
import ProductSearchResults from '@/views/ProductSearchResults.vue';
import ProductDetail from '@/views/ProductDetail.vue';
import ShoppingCartSummary from '@/views/ShoppingCartSummary.vue';

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage,
  },
  {
    path: '/search-results',
    name: 'ProductSearchResults',
    component: ProductSearchResults,
  },
  {
    path: '/product/:id',
    name: 'ProductDetail',
    component: ProductDetail,
    props: true,
  },
  {
    path: '/summary-cart',
    name: 'ShoppingCartSummary',
    component: ShoppingCartSummary,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
