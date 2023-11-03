<script>
    let username = ""
    let password = ""
    import { userid } from "/src/store.js"

    async function login() {
        if (username == '' || password == '') {
            return
        }
        try {
        const response = await fetch(`http://127.0.0.1:8000/login/${username}/${password}`);
        if (response.ok) {
            const data = await response.json();
            console.log('Data received:', data);
            userid.set(parseInt(data.userid))
            const unsubscribe = userid.subscribe((value) => {
	            console.log(value);
                if (value) {
                    window.location.href = '/home'
                }
            });
            // Do whatever you want with the data here
            
            
        } else {
            console.log('Failed to fetch:', response.status);
            // Handle the failure case
            alert("Could not connect to database server. Please try again.")
        }
        } catch (error) {
            console.error('Error:', error);
            // Handle errors
            alert("An error has occured, please try again.")
        }
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
    <a href="/">
        <button on:click={login} class="mx-auto p-5 rounded-md text-black font-bold shadow-md active:scale-[0.97]">
            Log In
        </button>
    </a>
    <a href="/registration" class="text-left mt-5 hover:text-[#266DD3]">Don't have an account? Create one here.</a>
    </div>
        
</div>
