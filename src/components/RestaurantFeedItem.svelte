<script>
    export let category;
    export let name;
    export let image;
    export let price;

</script>

<a href="/generic_menu">
    <div class="text-center font-bold rounded-md flex flex-col items-center w-[20vw] h-[40vh] py-10 shadow-md my-5 duration-[0.2s] hover:bg-[#266DD3]/40">
        <div class="text-xl break-normal px-10">{name}</div>
        <img src={image} alt="Not available" class="z-0 h-[20vh] object-contain opacity-80 rounded-md scale-[0.8]">
        <div class="text-xl">{price}</div>
    
    </div>
</a>