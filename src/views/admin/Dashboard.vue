<template>
    <div class="about">
        <AdminMenu/>
        <div class="container-fluid">
            <div class="row mt-3">
                <div class="col-md-3">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">Total Customer</h5>
                            <h6 class="card-subtitle mb-2 text-muted">100</h6>
                        </div>
                    </div>
                </div>

                <div class="col-md-3">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">Total Order Amount</h5>
                            <h6 class="card-subtitle mb-2 text-muted">10000</h6>
                        </div>
                    </div>
                </div>

                <div class="col-md-3">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">New Orders</h5>
                            <h6 class="card-subtitle mb-2 text-muted">50</h6>
                        </div>
                    </div>
                </div>

                <div class="col-md-3">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">Total Order Count</h5>
                            <h6 class="card-subtitle mb-2 text-muted">100</h6>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import AdminMenu from "@/components/AdminMenu";

export default {
    name: 'Dashboard',
    components: {
        AdminMenu
    },
    data() {
        return {}
    }
}
</script>
