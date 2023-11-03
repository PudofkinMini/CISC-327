<script> 
    import Navbar from "../../components/Navbar.svelte";
    import { userid } from "/src/store.js";
    import { onMount } from 'svelte';

    onMount(() => {
        
        const unsubscribe = userid.subscribe((value) => {
            console.log(value);
            if (value == 0) {
                window.location.href = '/'
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

    
</script>


<div class="overflow-x-hidden shadow-md">
    <Navbar></Navbar>
</div>
<div class="flex flex-col items-center">
    <div class="text-6xl font-bold mt-20">Your Orders.</div>
</div>