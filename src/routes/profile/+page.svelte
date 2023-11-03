<script>
  import Navbar from "../../components/Navbar.svelte";

    let user = {
      name: 'John Doe',
      telephone: '+1234567890',
      favoriteRestaurants: ['Restaurant A', 'Restaurant B', 'Restaurant C'],
      pastOrders: [
        {
          restaurant: 'Restaurant A',
          orderDate: '2023-10-01',
          totalAmount: 35.99,
        },
        {
          restaurant: 'Restaurant B',
          orderDate: '2023-09-25',
          totalAmount: 22.50,
        },
        {
          restaurant: 'Restaurant C',
          orderDate: '2023-09-15',
          totalAmount: 42.75,
        },
      ],
    };
  </script>


<div class="overflow-x-hidden">
  <Navbar></Navbar>
  <div class="p-4 max-w-lg mx-auto">
    <div class="bg-white shadow-md rounded-lg p-6">
      <div class="text-center">
        <div class="w-24 h-24 rounded-full mx-auto">
            
        </div>
        <img src="https://picsum.photos/200" alt="User Photo" class="w-24 h-24 rounded-full mx-auto">
        <h1 class="text-2xl mt-2 font-semibold">{user.name}</h1>
        <p class="text-gray-600 mt-2">{user.telephone}</p>
      </div>
  
      <div class="mt-6">
        <h2 class="text-xl font-semibold">Favorite Restaurants</h2>
        <ul class="list-disc list-inside mt-2">
          {#each user.favoriteRestaurants as restaurant}
            <li>{restaurant}</li>
          {/each}
        </ul>
      </div>
  
      <div class="mt-6">
        <h2 class="text-xl font-semibold">Past Orders</h2>
        <ul class="mt-2">
          {#each user.pastOrders as order}
            <li class="border-t border-gray-200 py-2">
              <p><span class="font-semibold">Restaurant:</span> {order.restaurant}</p>
              <p><span class="font-semibold">Order Date:</span> {order.orderDate}</p>
              <p><span class="font-semibold">Total Amount:</span> ${order.totalAmount.toFixed(2)}</p>
            </li>
          {/each}
        </ul>
      </div>
    </div>
  </div>
</div>