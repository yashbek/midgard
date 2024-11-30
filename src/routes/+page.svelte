<script>
  import { Menu, Clock, RotateCcw, Settings, Users } from 'lucide-svelte';
  import { onMount } from 'svelte';
  import Board from '$lib/components/Board.svelte';
  import Panel from '$lib/components/Panel.svelte';
  import { createClient } from "@connectrpc/connect";
  import { createConnectTransport } from "@connectrpc/connect-web";
  import { MainService } from "$lib/y2m/api/main/v1/server_pb";
  let currentColor = "";

  let boardWidth;
  let boardHeight;

  function updateBoardSize() {
    const screenWidth = window.innerWidth;
    boardWidth = Math.floor(screenWidth * 0.5);
    boardHeight = boardWidth;
  }

  onMount(() => {
    updateBoardSize();
    window.addEventListener('resize', updateBoardSize);
    return () => window.removeEventListener('resize', updateBoardSize);
  });


  // Board state
  let boardSize = 11;
  let currentPlayer = 'black';
  let board = Array(boardSize).fill(null).map(() => 
    Array(boardSize).fill(null)
  );

  // Calculate grid positions
  const positions = Array(boardSize).fill(null).map((_, i) => i);

  // Navigation items
  const navItems = [
    { icon: Users, label: 'Play', action: () => console.log('Players clicked') },
    { icon: Clock, label: 'Solve', action: () => console.log('Timer clicked') },
    { icon: Settings, label: 'News', action: () => console.log('Settings clicked') },
    { icon: Settings, label: 'Login', action: () => console.log('Login clicked') },
  ];

  function resetGame() {
    board = Array(boardSize).fill(null).map(() => Array(boardSize).fill(null));
    currentPlayer = 'black';
  }
</script>

<div class="flex min-h-screen bg-amber-950">
  <!-- Navigation Sidebar -->
  <nav class="w-48 bg-orange-200 shadow-lg flex flex-col items-center py-6">
    <div class="hover:bg-gray-100 cursor-pointer transition-colors items-center font-extrabold w-full text-xl min-h-12 gap-1 p-4">
      <b>Lake Of Nine</b>
    </div> 


    {#each navItems as item}
      <button 
        on:click={item.action}
        class="hover:bg-gray-100 cursor-pointer transition-colors items-center w-full flex gap-1 p-4"
      >
        <svelte:component this={item.icon} size={24} />
        <span class="text-s">{item.label}</span>
      </button>
    {/each}

    <button 
      class="p-3 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors flex flex-col items-center gap-1 mt-auto"
      on:click={resetGame}
    >
      <RotateCcw size={24} />
      <span class="text-xs">Reset</span>
    </button>
  </nav>

  <!-- Main Content -->
  <main class="flex-1 p-4">
    <div class="flex flex-wrap flex-row items-center gap-1 w-full max-w-screen-lg mx-auto min-h-0 ">
       <Board />
       <!-- svelte-ignore a11y_consider_explicit_label -->
       
          <Panel />
      
    </div>
  </main>

</div>
<style lang="postcss">
    :global(html) {
      background-color: theme(colors.black);
    }
  </style>
