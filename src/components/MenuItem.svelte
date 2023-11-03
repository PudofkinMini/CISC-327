<script>
    export let id;
    export let name;
    export let price;
    export let image;
    export let calories;
</script>


<div class="group hover:shadow-xl hover:translate-y-[5px] duration-[0.3s] w-[11vw] border-1 border-black rounded-md items-center align-items-center text-center my-10 p-5 relative flex flex-col shadow-md">
    <button class="text-center flex flex-col justify-center items-center">
    <div class="absolute top-1/3 font-bold invisible group-hover:visible text-white z-10 text-xl">Add to 🛒</div>
    
        <img src="https://picsum.photos/300" alt="" class="bg-[#344055] object-fit rounded-md group-hover:brightness-50 mb-5">
    </button>
    <div class="text-black font-bold"><b>{name}</b> • ${price}</div>
    <!-- <div class="font-bold text-black">${price}</div> -->
    <div class="text-black">{calories} Cal</div>
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