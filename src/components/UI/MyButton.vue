<template>
    <button class="btn">
        <slot></slot>
    </button>
</template>

<script>
export default {
    name: 'MyButton'
}
</script>

<style>
.btn {
    align-self: flex-end;
    padding: 10px 15px;
    color: teal;
    border: 1px solid teal;
}
</style>