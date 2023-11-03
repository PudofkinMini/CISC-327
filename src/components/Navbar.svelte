<script>
    import { userid } from "/src/store.js";
    import { onMount } from 'svelte';

    onMount(() => {
        const unsubscribe = userid.subscribe((value) => {
            console.log('value:' + value);
            if (value == 0) {
                //window.location.href = '/'
            }
        });
    })
</script>


<div class="w-[100vw] h-[15vh] font-bold flex flex-row text-black shadow-md text-3xl justify-center items-center px-5">
    <a class="mr-auto hover:scale-[1.05]" href="/home"><div class="mr-auto hover:scale-[1.05]">Food Delivery App</div></a>
    <div class="flex flex-row gap-5 p-5">
        <a href="/home"><div class="hover:scale-[1.05]">Home</div></a>
        <a href="/profile"><div class="hover:scale-[1.05]">Profile</div></a>
        <a href="/orders"><div class="hover:scale-[1.05]">Orders</div></a>
    </div>
</div>