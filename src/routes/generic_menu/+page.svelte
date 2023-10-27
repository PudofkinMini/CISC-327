<script>
    import Navbar from "../../components/Navbar.svelte"
    import MenuItem from "../../components/MenuItem.svelte"
    import ViewCart from "../../components/ViewCart.svelte"

    // Load generic menu info into menu items
    let menuItems = [];
    let cart = [];
    let itemCount = 0;
    let nextItemId = 0;

    for (let i=0; i < 40; i++) {
        let newItem = {
            id: `${i}`,
            name: `Item ${i}`,
            price: i + 0.99,
            calories: 100 + i,
            image: "https://picsum.photos/300"
        }
        menuItems.push(newItem)
        console.log("menu item pushed")
    }

    // Function to add a particular item to a cart and give it an in-cart id
    const addToCart = (item) => {
        item.cartID = nextItemId;
        cart.push(item)
        itemCount = cart.length;
        console.log(cart);
        nextItemId++;
        return
    }

    
    let showCart = false;
    let viewCartClass = "p-5 bg-[#266DD3] text-white font-bold duration-300 h-[60vh] z-[50] fixed top-[10vh] left-[100vw] rounded-md w-[25vw] overflow-y-scroll"
    const viewCartHandler = () => {
        if (!showCart) {
            viewCartClass = "p-5 bg-[#266DD3] text-white font-bold duration-300 h-[60vh] z-[50] fixed top-[10vh] -translate-x-[26vw] left-[100vw] rounded-md w-[25vw] overflow-y-scroll"
        }
        else {
            viewCartClass = "p-5 bg-[#266DD3] text-white font-bold duration-300 h-[60vh] z-[50] fixed top-[10vh] left-[100vw] rounded-md w-[25vw] overflow-y-scroll"
        }
        showCart = !showCart
    }
</script>

<div class="overflow-x-hidden no-scrollbar text-center relative items-center gap-8">
    <Navbar></Navbar>
    {#key itemCount}
    <ViewCart bind:itemCount={itemCount} bind:cart={cart} className={viewCartClass}></ViewCart>
    {/key}
    <div class="text-6xl font-bold py-10">Pick your items.</div>
    <button on:click={viewCartHandler} class="active:scale-[0.95] fixed bottom-10 right-0 w-[25vw] h-[15vh] rounded-md bg-[#266DD3] text-white text-4xl z-[20]"><b>View 🛒</b> ({itemCount})</button>
    <div class="grid grid-cols-7 place-items-center align-center max-w-[100vw] no-scrollbar">
        {#each menuItems as item}
            <button item={item} on:click={() => {
                itemCount++;
                addToCart(item);
                return
            }} class="active:scale-[0.95]">
                <MenuItem id={item.id} name={item.name} price={item.price} image={item.image} calories={item.calories}></MenuItem>
            </button>
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
    background: #344055;
    border-radius: 5px;
}
 
/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
    background: #555;
}
</style>