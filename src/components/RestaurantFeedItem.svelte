<script>
    export let id;
    export let category;
    export let name;
    export let image;
    export let price;

</script>

<a href="/menu/{id}">
    <div class="text-center font-bold rounded-md flex flex-col items-center w-[20vw] h-[40vh] py-10 shadow-md my-10 duration-[0.2s] hover:shadow-xl hover:translate-y-[5px]">
        <div class="text-xl break-normal px-10">{name}</div>
        <img src={image} alt="Not available" class="z-0 h-[20vh] object-contain opacity-80 rounded-md scale-[0.8]">
        <div class="text-xl">{price}</div>
    
    </div>
</a>