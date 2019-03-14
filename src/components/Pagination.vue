<template>
    <div>
        <ul class="pagination">
            <li class="page-item" :class="{disabled: !pagination.has_pre}">
              <a @click.prevent="getPagination(pagination.current_page -1)" class="page-link" href="#" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>

            <li v-for="page in pagination.total_pages" :key="page" class="page-item" :class="{active: page === pagination.current_page}">
              <a @click.prevent="getPagination(page)" class="page-link" href="#">{{ page }}</a>
            </li>

            <li class="page-item" :class="{disabled: !pagination.has_next}">
              <a @click.prevent="getPagination( pagination.current_page + 1 )" class="page-link" href="#" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'pagination',
  computed: {
    ...mapState({
      pagination: state => state.storeBasic.pagination
    })
  },
  methods: {
    getPagination (page) {
      console.log(page)
      this.$emit('changePage-getPagination', { page }) // { page } 意思就是 { page: page }
    }
  },
  created () {
    console.log('pagination', this.pagination)
  }
}
</script>

<style lang="scss" scoped>

</style>
