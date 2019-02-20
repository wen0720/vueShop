<template>
    <div class="col-md-2 d-none d-md-block bg-light sidebar">
        <nav>
            <div class="sidebar-sticky">
                <h6
                    class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted"
                >
                    <span>管理員</span>
                    <a class="d-flex align-items-center text-muted" href="#">
                        <span data-feather="plus-circle"></span>
                    </a>
                </h6>
                <ul class="nav flex-column mb-2">
                    <li class="nav-item">              
                        <router-link to="/admin" class="nav-link">
                            產品列表  
                        </router-link>        
                    </li>
                    <li class="nav-item">
                        <router-link to="/admin/coupon" class="nav-link">
                            折價券列表  
                        </router-link>        
                    </li>
                    <li class="nav-item">
                        <router-link to="/admin/order" class="nav-link">
                            訂單列表  
                        </router-link>                    
                    </li>
                </ul>
            </div>
        </nav>
    </div>
</template>

<script>
export default {
    name: 'siebar_admin'
}
</script>