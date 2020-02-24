<template>
    <button
            @click="$emit('click')"
            class="flex-1 h-10 bg-transparent hover:bg-blue-700 text-black-500 font-semibold hover:text-white py-2 px-4 hover:border-transparent outline-none focus:outline-none">
        <slot></slot>
    </button>
</template>
