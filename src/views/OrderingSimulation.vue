<template>
  <div class="container">
    <Sorting />
    <ProductsList class="mt-5" />
  </div>
</template>

<script>
import Sorting from "@/components/Sorting";
import ProductsList from "@/components/ProductsList";

export default {
  name: "OrderingSimulation",
  components: {
    Sorting,
    ProductsList,
  },
};
</script>

<style lang="scss">
</style>