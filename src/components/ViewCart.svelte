<script>
    import { orders, userid } from "/src/store.js"
    import { page } from '$app/stores';
    let restaurantid = $page.params.restaurantid;
    export let cart;
    export let itemCount;
    export let className;

    let totalPrice = 0
    for (let i=0; i < cart.length; i++) {
        console.log(cart[0][i])
        totalPrice += cart[i].price;
    }
    console.log(totalPrice)

    const checkOutHandler = () => {
        //orders.set(cart)
        //userid.set(0)
        window.location.href = `/menu/${restaurantid}/checkout`
    }
</script>


<div class={className}>
    <div class="text-3xl">Cart Items</div>
    {#if cart.length > 0}
    <button on:click={checkOutHandler} class="bg-black rounded-md px-5 py-2 mt-5 w-full">Check Out</button>
    {/if}
    <div class="flex flex-col text-left p-5 overflow-y-scroll text-white divide-y">
        {#each cart as item}
            <div class="flex flex-row">
                <div class="text-lg text-white"><b>{item.name}</b> • ${item.price}</div>
                <button class="ml-auto text-red-400" 
                on:click={() => { 
                    for (let i=0; i < cart.length; i++) {
                        if (cart[i].id === item.id) {
                            cart.splice(i, 1)
                            itemCount = cart.length;

                            // Remove item from cart in db
                            let xhr = new XMLHttpRequest();
                            xhr.open('GET', `http://127.0.0.1:8000/removeFromCart/${item.id}`, false); // false makes it synchronous
                            xhr.send();
                            if (xhr.status === 200) {
                                //console.log('removed from cart:', JSON.parse(xhr.responseText));
                                //let results = JSON.parse(xhr.responseText)
                            } else {
                                console.log('Failed to fetch:', xhr.status);
                            }

                            break;
                        }
                        // console.log()
                    }
                }}>Remove</button>
            </div>
        {/each}  
        <div class="">Sub-Total: ${Math.round(totalPrice * 100)/100}</div>
    </div>
    {#if cart.length > 9}
    <button on:click={checkOutHandler} class="bg-black rounded-md px-5 py-2 mt-5 w-full">Check Out</button>
    {/if}
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