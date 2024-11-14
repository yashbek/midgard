<!-- <div class="bg-orange-900 w-screen h-1/6 text-wrap">
    <button class="bg-white h-1/6">Play</button>
    <button class="bg-white h-1/6">Analyze</button>
    <button class="bg-white h-1/6">Feed</button>
    <button class="bg-white h-1/6">Activity</button>
    <input/>
    <button class="bg-white h-1/6">Login</button>
</div> -->

<script>
  import { Menu, Clock, RotateCcw, Settings, Users } from 'lucide-svelte';
  import { onMount } from 'svelte';
  import Board from '../components/Board.svelte';

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
  <nav class="w-1/12 bg-orange-200 shadow-lg flex flex-col items-center py-6 gap-8">
    <!-- Logo/Menu -->
    <div class="p-3 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors">
      <Menu size={32} />
    </div>

    <!-- Nav Items -->
    {#each navItems as item}
      <button 
        on:click={item.action}
        class="p-3 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors flex flex-col items-center gap-1"
      >
        <svelte:component this={item.icon} size={24} />
        <span class="text-s">{item.label}</span>
      </button>
    {/each}

    <!-- Reset Button -->
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
    <div class="flex flex-col items-center gap-4">
       <Board />
       <div class="bg-white w-16 h-16"></div>
    </div>
  </main>

</div>
<style lang="postcss">
    :global(html) {
      background-color: theme(colors.black);
    }
  </style>
