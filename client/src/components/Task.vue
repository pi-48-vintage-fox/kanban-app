<template>
    <div class="card draggable shadow-sm" draggable="true">
        <div class="card-body p-2">
            <div class="card-title">
                <i class="fas fa-trash float-right"></i>
                <a href="#" class="lead font-weight-light">E-commerce </a>
            </div>
                <p>
                    Program
                </p>
                <button class="btn btn-primary btn-sm">View</button>
        </div>
    </div>
</template>

<script>
export default {
    name:'task',
    props : ["tasks"],
}
</script>

<style>

</style>