<script> 
    import Navbar from "../../components/Navbar.svelte";
    import { userid } from "/src/store.js";
    import { onMount } from 'svelte';
    let orders = []
    let curr_user_id

    function loadOrders() {
        orders = []
        let xhr = new XMLHttpRequest();
        xhr.open('GET', `http://127.0.0.1:8000/loadOrders/${curr_user_id}`, false); // false makes it synchronous
        xhr.send();
        if (xhr.status === 200) {
            console.log('Data received:', JSON.parse(xhr.responseText));
            orders = JSON.parse(xhr.responseText);
        } else {
            console.log('Failed to fetch:', xhr.status);
        }
    }

    onMount(() => {
        
        const unsubscribe = userid.subscribe((value) => {
            console.log(value);
            curr_user_id = value
            if (value == 0) {
                window.location.href = '/'
            }
        });

        const clearStorage = () => {
            localStorage.clear();
        };

        window.addEventListener('beforeunload', clearStorage);

        loadOrders()

        



        // Cleanup the event listener when the component is destroyed
        return () => {
            window.removeEventListener('beforeunload', clearStorage);
        };

        
        


    })

    
</script>


<div class="overflow-x-hidden shadow-md">
    <Navbar></Navbar>
</div>
<div class="flex flex-col items-center">
    <div class="text-6xl font-bold mt-20">Your Orders.</div>
</div>

<!-- Orders being built -->
<div class="text-3xl font-bold p-3">Orders being built.</div>
<div class="flex flex-row gap-5 p-10 overflow-scroll overflow-y-hidden">
    {#each orders as order}
        {#if order.status == 'building'}
            <a href="/menu/{order.restaurant_id}">
                <div class="p-5 rounded-md flex flex-col shadow-md text-center items-center hover:shadow-xl hover:scaler[1.02] duration-200">
                    <div class="text-lg">id: {order.id}</div>
                    <div class="text-lg">{order.name}</div>
                    <div class="text-lg">{order.bag_size} items</div>
                    <div class="text-lg">Total: ${Math.round(order.total * 100)/100}</div>
                </div>
            </a>
        {/if}
        
    {/each}
</div>

<!-- Orders being delivered -->
<div class="text-3xl font-bold p-3">Orders being delivered.</div>
<div class="flex flex-row gap-5 p-10 overflow-scroll overflow-y-hidden">
    {#each orders as order}
        {#if order.status == 'out for delivery'}
            <div class="p-5 rounded-md flex flex-col shadow-md text-center items-center hover:shadow-xl hover:scaler[1.02] duration-200">
                <div class="text-lg">id: {order.id}</div>
                <div class="text-lg">{order.name}</div>
                <div class="text-lg">{order.bag_size} items</div>
                <div class="text-lg">Total: ${Math.round(order.total * 100)/100}</div>
                <button class="bg-black text-white p-2 mt-5 rounded-md"
                on:click={() => {
                    let xhr2 = new XMLHttpRequest();
                    xhr2.open('GET', `http://127.0.0.1:8000/confirmDelivery/${curr_user_id}/${order.id}`, false); // false makes it synchronous
                    xhr2.send();
                    if (xhr2.status === 200) {
                        console.log('Data received:', JSON.parse(xhr2.responseText));
                        orders = JSON.parse(xhr2.responseText);
                    } else {
                        console.log('Failed to fetch:', xhr2.status);
                    }
                    loadOrders()
                }}>Confirm Delivery</button>
            </div>
        {/if}
        
    {/each}
</div>

<!-- Past Orders -->
<div class="text-3xl font-bold p-3">Past Orders.</div>
<div class="flex flex-row gap-5 p-10 overflow-scroll overflow-y-hidden">
    {#each orders as order}
        {#if order.status == 'completed'}
            <div class="p-5 rounded-md flex flex-col shadow-md text-center items-center hover:shadow-xl hover:scaler[1.02] duration-200">
                <div class="text-lg">id: {order.id}</div>
                <div class="text-lg">{order.name}</div>
                <div class="text-lg">{order.bag_size} items</div>
                <div class="text-lg">Total: ${Math.round(order.total * 100)/100}</div>
            </div>
        {/if}
        
    {/each}
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
