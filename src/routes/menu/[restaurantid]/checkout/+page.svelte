<script> 
    import Navbar from "/src/components/Navbar.svelte";
    import { userid } from "/src/store.js";
    import { onMount } from 'svelte';
    import { page } from '$app/stores';
    let restaurantid = $page.params.restaurantid;
    let order = []
    let subtotal = 0
    let finalTotal = 0
    let orderid = 0

    onMount(() => {
        
        // Verify user
        const unsubscribe = userid.subscribe((value) => {
            console.log(value);
            if (value == 0) {
                window.location.href = '/'
            }

            let user_id = value
            console.log("userid: " + user_id)
            console.log("restaurant_id: " + restaurantid)
            let xhr = new XMLHttpRequest();
            xhr.open('GET', `http://127.0.0.1:8000/loadCart/${user_id}/${restaurantid}`, false); // false makes it synchronous
            xhr.send();
            if (xhr.status === 200) {
                //console.log('added to cart:', JSON.parse(xhr.responseText));
                let results = JSON.parse(xhr.responseText)
                if (results.length > 0) {
                    order = results
                    subtotal = 0
                    for (let i = 0; i < order.length; i++) {
                        subtotal += order[i].price
                        orderid = order[i].order_id
                        console.log(order[i])
                    }
                    finalTotal = Math.round((subtotal*1.13).toFixed(3) * 100)/100 // a bit of math to get rounded to nearest cent

                }
            } else {
                console.log('Failed to fetch:', xhr.status);
            }
        });

        const clearStorage = () => {
            localStorage.clear();
        };

        window.addEventListener('beforeunload', clearStorage);

        // Cleanup the event listener when the component is destroyed
        return () => {
            window.removeEventListener('beforeunload', clearStorage);
        };

        

        
    })
// Record the payment
function paymentHandler() {
    const unsubscribe = userid.subscribe((value) => {
        let user_id = value
        let xhr = new XMLHttpRequest();
        xhr.open('GET', `http://127.0.0.1:8000/payAndPlaceOrder/${user_id}/${restaurantid}/${orderid}`, false); // false makes it synchronous
        xhr.send();
        if (xhr.status === 200) {
            //console.log('added to cart:', JSON.parse(xhr.responseText));
            let results = JSON.parse(xhr.responseText)
            
        } else {
            console.log('Failed to fetch:', xhr.status);
        }
    });
    window.location.href = "/orders"
}
</script>
<div class="overflow-x-hidden">
<Navbar></Navbar>
<div class="flex flex-col items-center my-10">
    <div class="text-5xl font-bold mb-10">Review Your Order.</div>
    <div class="flex flex-col divide-y w-[50vw] items-center rounded-md shadow-xl bg-gradient-to-b from-white to-gray-100 p-20">

        {#each order as item}
        <div class="flex flex-row p-4 text-2xl w-full bg-white">
            <div class="mr-auto">{item.name}</div>
            <div class="ml-auto font-bold">${item.price}</div>
        </div>
        {/each}
        <div class="flex flex-row gap-x-2 w-full p-4">
            <div class="font-bold text-2xl ml-auto">Subtotal: </div>
            <div class="font-bold text-2xl">${subtotal} </div>
        </div>
        <div class="flex flex-row gap-x-2 w-full p-4">
            <div class="font-bold text-2xl ml-auto">Total: </div>
            <div class="font-bold text-2xl">${finalTotal} </div>
        </div>
        <a href="/menu/{restaurantid}" class="place-self-end bg-white rounded-md shadow-md text-xl p-5"><button>Back to menu</button></a>
    </div>  
    
    <div class="text-5xl font-bold mb-10 mt-40">Make Payment.</div>
    <div class="flex flex-col rounded-md shadow-md p-20 w-[30vw] gap-4">
        <input type="text" class="shadow-md shadow-gray-400 rounded-md ml-auto text-xl p-5 w-full" placeholder="Cardholder Name">
        <input type="text" class="shadow-md shadow-gray-400 rounded-md ml-auto text-xl p-5 w-full" placeholder="Card Number">
        <div class="flex flex-row gap-4">
            <input type="text" class="shadow-md shadow-gray-400 rounded-md ml-auto text-xl p-5 w-full" placeholder="CCV">
            <input type="text" class="shadow-md shadow-gray-400 rounded-md ml-auto text-xl p-5 w-full" placeholder="Expiry Date">
        </div>
        <button on:click={paymentHandler} class="bg-[#266DD3] text-white font-bold text-xl rounded-md px-10 py-5">Pay & Place Order</button>
    </div>
</div>
</div>
