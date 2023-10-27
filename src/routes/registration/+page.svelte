<script>
    let email = ""
    let username = ""
    let password = ""
    let confirmPassword = ""

    const register = () => {
        return
    }
    const signIn = () => {
        window.location.href = '/';
        return
    }

</script>

<div class="flex flex-col bg-white grow p-5 text-center items-center">
    <div class="shadow-md w-[50%] px-40 py-10 rounded-md">

    
    <div class="text-5xl p-5 overscroll-none font-bold">
        Create Account
    </div>
    <div class="flex flex-col text-left text-black py-10 text-left justify-center mx-auto gap-y-8">
        <!-- <div class="text-4xl pb-2">Email</div> -->
        <input bind:value={email} type="text" placeholder="Email" class="w-full text-black text-2xl p-2 rounded-md shadow-md">
        <!-- <div class="text-4xl pb-2">Username</div> -->
        <input bind:value={username} type="text" placeholder="Username" class="w-full text-black text-2xl p-2 rounded-md shadow-md">
        <!-- <div class="text-4xl pb-2">Password</div> -->
        <input bind:value={password} type="text" placeholder="Password" class="w-full text-black text-2xl p-2 rounded-md shadow-md">
        <input bind:value={confirmPassword} type="text" placeholder="Confirm Password" class="w-full text-black text-2xl p-2 rounded-md shadow-md">
    </div>
    <div class="flex justify-center">
        <button on:click={register} class="p-5 rounded-md font-bold shadow-md active:scale-[0.97]" style="margin-right: 5px">
            Register
        </button>
        <button on:click={signIn} class="p-5 rounded-md font-bold shadow-md active:scale-[0.97]" style="margin-left: 10px">
            Sign-In
        </button>
    </div>
    </div>
</div>
