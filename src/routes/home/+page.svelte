<script> 
    import Navbar from "../../components/Navbar.svelte";
    import RestaurantFeedItem from "../../components/RestaurantFeedItem.svelte";
    import RestaurantFeed from "../../components/RestaurantFeed.svelte";
    let searchValue = ""
    let categoryValue = "Any"
    let priceValue = "Any"

    const searchBtnHandler = () => {
        console.log(searchValue)
        console.log(categoryValue)
        console.log(priceValue)
    }


    // Here we load all of the categories available for the filter

    // Here we load all of the restaurants for each of the filtered categories
    let categoriesList = ["Italian", "Chinese", "Indian", 
                          "Mexican", "Sushi", "Korean", "Caribbean",
                          "Fast Food", "Comfort Food"]

</script>

<div class="h-[100vh] relative overflow-x-hidden no-scrollbar">
    <Navbar></Navbar>
    <!-- <RestaurantFeedItem category="funniness"></RestaurantFeedItem> -->
    <form class="w-full flex flex-row p-5 gap-4 items-center">
        <input bind:value={searchValue} type="text" placeholder="Search restaurants" class="p-3 h-16 text-2xl rounded-md shadow-md">
        <button on:click={searchBtnHandler} type="submit" class="font-bold text-2xl bg-[#266DD3] h-16 px-5 rounded-md text-white active:scale-[0.95] mr-auto hover:shadow-lg">Search</button>
        <div class="text-2xl font-bold">Category:</div>
        <select bind:value={categoryValue} name="categories" id="" placeholder="Category" class="text-left w-fit h-16 px-5 hover:shadow-lg text-2xl rounded-md shadow-md">
            <option value="Any" class="text-xl"></option>
            <option value="Italian" class="text-xl">Italian</option>
            <option value="Chinese" class="text-xl">Chinese</option>
            <option value="Indian" class="text-xl">Indian</option>
            <option value="Mexican" class="text-xl">Mexican</option>
            <option value="Sushi" class="text-xl">Sushi</option>
            <option value="Korean" class="text-xl">Korean</option>
            <option value="Caribbean" class="text-xl">Caribbean</option>
            <option value="Fast Food" class="text-xl">Fast Food</option>
            <option value="Comfort Food" class="text-xl">Comfort Food</option>
        </select>
        <div class="text-2xl font-bold ml-10">Price:</div>
        <select bind:value={priceValue} name="price" id="" placeholder="Price" class="text-left w-fit h-16 px-5 text-2xl rounded-md shadow-md hover:shadow-lg">
            <option value="Any" class="text-xl"></option>
            <option value="$" class="text-xl">$</option>
            <option value="$$" class="text-xl">$$</option>
            <option value="$$$" class="text-xl">$$$</option>
        </select>
    </form>
    <div class="flex flex-col gap-y-10">
        {#each categoriesList as cat}
            {#if (cat == categoryValue || categoryValue == "Any")}
                <RestaurantFeed price={priceValue} category={cat} bind:nameFilter={searchValue}></RestaurantFeed>
            {/if}
        {/each}
    </div>

</div>

<style>
    /* Hide scrollbar for Chrome, Safari and Opera */
.no-scrollbar::-webkit-scrollbar {
    display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.no-scrollbar {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
}

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