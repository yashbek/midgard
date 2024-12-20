<script>
  import { onMount } from 'svelte';
  import Board from '$lib/components/Board.svelte';
  import Panel from '$lib/components/Panel.svelte';
  import { page } from '$app/stores';
  import axios from 'axios';
  import { isLoggedIn, sharedEmail } from '$lib/stores/auth';
  import { goto } from '$app/navigation';

  const gameId = $page.params.gameid;

  let boardWidth;
  let boardHeight;

  function updateBoardSize() {
    const screenWidth = window.innerWidth;
    boardWidth = Math.floor(screenWidth * 0.5);
    boardHeight = boardWidth;
  }

  const ws = new WebSocket(`ws://localhost:8082/ws?email=${$sharedEmail}`);
    
  ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data)
  };

  onMount(() => {
    updateBoardSize();
    window.addEventListener('resize', updateBoardSize);
    return () => window.removeEventListener('resize', updateBoardSize);
  });


  let boardSize = 11;
  let currentPlayer = 'black';
  let board = Array(boardSize).fill(null).map(() => 
    Array(boardSize).fill(null)
  );

  const positions = Array(boardSize).fill(null).map((_, i) => i);
</script>

  <main class="flex-1 p-4">
    <div class="flex flex-wrap flex-row items-center gap-1 w-full mx-auto min-h-0 ">
      <Board {ws}, {gameId}/> 
    </div>
  </main>

<style lang="postcss">
    :global(html) {
      background-color: theme(colors.black);
    }
  </style>
