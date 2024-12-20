<script>
  import { onMount } from 'svelte';
  import Board from '$lib/components/Board.svelte';
  import Panel from '$lib/components/Panel.svelte';

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


  let boardSize = 11;
  let currentPlayer = 'black';
  let board = Array(boardSize).fill(null).map(() => 
    Array(boardSize).fill(null)
  );

  const positions = Array(boardSize).fill(null).map((_, i) => i);
</script>

  <main class="flex-1 p-4">
    <div class="flex flex-wrap flex-row items-center gap-1 w-full mx-auto min-h-0 ">
      <Board />
      <Panel />      
    </div>
  </main>

<style lang="postcss">
    :global(html) {
      background-color: theme(colors.black);
    }
  </style>
