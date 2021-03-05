<template>
  <nav aria-label="Page navigation">
    <ul class="pagination justify-content-center">
      <li class="page-item" :class="{ disabled: !hasPrev }">
        <a
          class="page-link"
          href="#"
          aria-label="Previous"
          @click="getPage(current - 1)"
        >
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li
        v-for="n in pages"
        :key="n"
        class="page-item"
        :class="{ active: current === n }"
      >
        <a class="page-link" href="#" @click="getPage(n)">{{ n }}</a>
      </li>
      <li class="page-item" :class="{ disabled: !hasNext }">
        <a
          class="page-link"
          href="#"
          aria-label="Next"
          @click="getPage(current + 1)"
        >
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "Pagination",
  props: ["pages", "current", "hasPrev", "hasNext"],
  methods: {
    getPage(page) {
      this.$emit("getPage", page);
    },
  },
};
</script>