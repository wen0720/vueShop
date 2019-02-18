<template>
    <div>
        <ul class="pagination">
            <li class="page-item" :class="{disabled: !paginationInfo.has_pre}">
              <a @click.prevent="getProducts(paginationInfo.current_page -1)" class="page-link" href="#" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>

            <li v-for="page in paginationInfo.total_pages" :key="page" class="page-item" :class="{active: page === paginationInfo.current_page}">
              <a @click.prevent="getProducts(page)" class="page-link" href="#">{{ page }}</a>
            </li>

            <li class="page-item" :class="{disabled: !paginationInfo.has_next}">
              <a @click.prevent="getProducts( paginationInfo.current_page + 1 )" class="page-link" href="#" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
    </div>
</template>

<script>
export default {
    name: 'pagination',    
    props: ['paginationInfo'],
    methods: {
        getProducts(page){
            console.log(page)
            this.$emit('changePage-getProduct', page)
        }
    }
}
</script>

<style lang="scss" scoped>
    
</style>