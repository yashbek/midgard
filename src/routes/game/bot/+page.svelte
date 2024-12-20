<script>
    import { onMount } from 'svelte';
    import BotBoard from '$lib/components/BotBoard.svelte';
    import Panel from '$lib/components/Panel.svelte';
    import { page } from '$app/stores';
    import axios from 'axios';
    import { isLoggedIn, sharedEmail } from '$lib/stores/auth';
    import { goto } from '$app/navigation';
  
    let boardWidth;
    let boardHeight;
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
  
    function updateBoardSize() {
      const screenWidth = window.innerWidth;
      boardWidth = Math.floor(screenWidth * 0.5);
      boardHeight = boardWidth;
    }
  
  
    let boardSize = 11;
    let currentPlayer = 'black';
    let board = Array(boardSize).fill(null).map(() => 
      Array(boardSize).fill(null)
    );
  
    const positions = Array(boardSize).fill(null).map((_, i) => i);
  </script>
  
    <main class="flex-1 p-4">
      <div class="flex flex-wrap flex-row items-center gap-1 w-full mx-auto min-h-0 ">
        <BotBoard {ws}/> 
      </div>
    </main>
  
  <style lang="postcss">
      :global(html) {
        background-color: theme(colors.black);
      }
    </style>
  