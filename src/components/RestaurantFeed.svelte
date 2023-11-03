<script>
    import RestaurantFeedItem from "./RestaurantFeedItem.svelte";
    import { onMount } from 'svelte';
    export let category;
    export let price;
    export let nameFilter;

    let c = 0;
    let restaurantFeeds = [];
    //Here we would send an http request to backend to properly fill this category
    
    async function loadRestaurants() {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', `http://127.0.0.1:8000/loadRestaurants/${category}`, false); // false makes it synchronous
        xhr.send();

        if (xhr.status === 200) {
            console.log('Data received:', JSON.parse(xhr.responseText));
            restaurantFeeds = JSON.parse(xhr.responseText);
        } else {
            console.log('Failed to fetch:', xhr.status);
        }
    }
    onMount(loadRestaurants);
    

    
    
</script>
<div class="w-[100vw] h-[60vh] shadow-md my-6  px-3 overflow-none bg-gradient-to-b from-white to-gray-100">
    <span class="text-3xl font-bold px-8 py-4 rounded-md text-center">{category}</span>
    <div class="flex flex-row gap-10 justify-spread group relative px-20 overflow-scroll overflow-y-hidden">
        <!-- <button class="w-16 bg-[#888098] text-4xl px-4 rounded-md absolute left-0 h-full z-10 opacity-80"> ⇦ </button> -->
        {#each restaurantFeeds as item}
            {#if (price == "Any" || item.price == price)}  
            <RestaurantFeedItem id={item.id} category={item.category} price={item.price} name="{item.name}" image="https://picsum.photos/300"></RestaurantFeedItem>
            {/if}
        {/each}
        <!-- <button class="w-16 bg-[#888098] text-4xl absolute right-0 h-full opacity-80 hover:text-white"> ⇨ </button> -->
    </div>
</div>      

<style>
    /* width */
::-webkit-scrollbar {
    width: 10px;
    height:10px;
}
 
/* Track */
::-webkit-scrollbar-track {
    background: transparent;
    border-radius: 5px;
}
 
/* Handle */
::-webkit-scrollbar-thumb {
    background: black;
    border-radius: 5px;
}
 
/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
    background: #555;
}
</style>
