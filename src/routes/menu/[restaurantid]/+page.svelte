<script>
    import Navbar from "/src/components/Navbar.svelte"
    import MenuItem from "/src/components/MenuItem.svelte"
    import ViewCart from "/src/components/ViewCart.svelte"
    import { onMount } from 'svelte'
    import { page } from '$app/stores';
    import { userid } from "/src/store.js";
    let restaurantid = $page.params.restaurantid;
    // Load generic menu info into menu items
    let menuItems = [];
    let cart = [];
    let itemCount = 0;
    let nextItemId = 0;

    // Get userid
    


    // Populate menuItems with restaurant's menu items
    function loadMenu() {
        // Load in menu items
        let xhr = new XMLHttpRequest();
        xhr.open('GET', `http://127.0.0.1:8000/loadMenu/${restaurantid}`, false); // false makes it synchronous
        xhr.send();

        if (xhr.status === 200) {
            console.log('Data received:', JSON.parse(xhr.responseText));
            menuItems = JSON.parse(xhr.responseText);
        } else {
            console.log('Failed to fetch:', xhr.status);
        }
        // Verify that user is logged in
        const unsubscribe = userid.subscribe((value) => {
            console.log(value);
            if (value == 0) {
                window.location.href = '/'
                return
            }

            // Load in pre-existing cart (if applicable)
            let user_id = value
            console.log("userid: " + user_id)
            console.log("restaurant_id: " + restaurantid)
            let xhr = new XMLHttpRequest();
            xhr.open('GET', `http://127.0.0.1:8000/loadCart/${user_id}/${restaurantid}`, false); // false makes it synchronous
            xhr.send();
            if (xhr.status === 200) {
                console.log('added to cart:', JSON.parse(xhr.responseText));
                let results = JSON.parse(xhr.responseText)
                if (results.length > 0) {
                    cart = results
                    console.log(cart)
                    itemCount = cart.length;
                }
            } else {
                console.log('Failed to fetch:', xhr.status);
            }
        });

        
        
    }
    onMount(loadMenu);


    function addToCart_db(menu_item_id) {
        const unsubscribe = userid.subscribe((value) => {
        let user_id = value
        console.log("userid: " + user_id)
        console.log("restaurant_id: " + restaurantid)
        console.log("menu_item_id: " + menu_item_id)
        let xhr = new XMLHttpRequest();
        xhr.open('GET', `http://127.0.0.1:8000/addToCart/${user_id}/${restaurantid}/${menu_item_id}`, false); // false makes it synchronous
        xhr.send();
        
        if (xhr.status === 200) {
            console.log('Data received:', JSON.parse(xhr.responseText));
            return JSON.parse(xhr.responseText).id
        } else {
            console.log('Failed to fetch:', xhr.status);
        }

        });
        
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
                item.cartID = addToCart_db(item.id);
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