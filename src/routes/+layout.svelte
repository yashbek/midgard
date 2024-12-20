
<script>
  import "../app.css";
  import { Menu, Clock, DraftingCompass, Newspaper, Users, KeyRound, LogOut } from 'lucide-svelte';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import { isLoggedIn, sharedUsername } from '$lib/stores/auth';

  let username = $sharedUsername != "" ? $sharedUsername : "Back"
    
  const handleLogout = () => {
    sessionStorage.removeItem('authToken');
    window.location.reload();
  }

  let baseNavItems = [
    { icon: Users, label: 'Play', action: () => goto('/play') },
    { icon: DraftingCompass, label: 'Evaluate', action: () => goto('/evaluate') },
    { icon: Newspaper, label: 'News', action: () => goto('/news') },
  ];

  $: navItems = $isLoggedIn 
    ? baseNavItems 
    : [...baseNavItems, { icon: KeyRound, label: 'Login', action: () => goto('/auth') }];

    onMount(() => {
      checkAuthStatus();

      window.addEventListener('storage', checkAuthStatus);
    
      return () => {
        window.removeEventListener('storage', checkAuthStatus);
     };
     
  });

  function checkAuthStatus() {
    if (typeof window !== 'undefined') {
      $isLoggedIn = sessionStorage.getItem('authToken') !== null;
    }
  }

</script>
  <main>
  <div class="flex min-h-screen bg-amber-950">
    <!-- Navigation Sidebar -->
    <nav class="w-48 bg-orange-200 shadow-lg flex flex-col items-center py-6">
      <button on:click={() => goto("/")} class="hover:bg-gray-100 cursor-pointer transition-colors items-center font-extrabold w-full text-xl min-h-12 gap-1 p-4">
        <b>Lake Of Nine</b>
      </button> 
  
  
      {#each navItems as item}
        <button 
          on:click={item.action}
          class="hover:bg-gray-100 cursor-pointer transition-colors items-center w-full flex gap-1 p-4"
        >
          <svelte:component this={item.icon} size={24} />
          <span class="text-s">{item.label}</span>
        </button>
      {/each}
      {#if $isLoggedIn}
        <rect 
          class="transition-colors items-center w-full flex gap-1 p-4"
        >
          <span class="text-s">Welcome {username}!</span>
        </rect>

        <button 
          class="p-3 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors flex flex-col items-center gap-1 mt-auto"
          on:click={handleLogout}
        >
          <LogOut size={24} />
          <span class="text-xs">Signout</span>
        </button>
      {/if}
  
      
    </nav>  
    <slot />
  </div>
</main>