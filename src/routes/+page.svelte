<script>
    let username = ""
    let password = ""

    const login = () => {
        console.log("logged in")
        return
    }

</script>

<div class="flex flex-col p-5 w-[100%] items-center">
    <div class="flex flex-col items-center shadow-md w-[40%] rounded-md p-10">
    <div class="text-5xl font-bold text-black p-5 overscroll-none">
        Log In
    </div>
    <div class="flex flex-col text-left gap-y-8 text-white  py-10 items-center justify-center mx-auto">
        <!-- <div class="text-4xl pb-2">Username</div> -->
        <input bind:value={username} type="text" placeholder="Username/Email" class="w-full text-black text-2xl p-2 rounded-md shadow-md">
        <!-- <div class="text-4xl pb-2 pt-10">Password</div> -->
        <input bind:value={password} type="text" placeholder="Password" class="w-full text-black text-2xl p-2 rounded-md shadow-md">
    </div>
    <a href="/home">
        <button on:click={login} class="mx-auto p-5 rounded-md text-black font-bold shadow-md active:scale-[0.97]">
            Log In
        </button>
    </a>
    </div>
        
</div>
