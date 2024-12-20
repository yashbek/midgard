<script>
  import { GhostIcon, Monitor, Loader2 } from 'lucide-svelte'; 
  import axios from 'axios';
  import { isLoggedIn, sharedEmail } from '$lib/stores/auth';
  import { goto } from '$app/navigation';

  let isQueuing = false; 

  export const isLoggedInC = () => {
      return typeof window !== 'undefined' && sessionStorage.getItem('authToken') !== null;
  }

  const playVsBot = () => {
    alert("Temporarily Disabled")
  }

  const connectToMatchmaking = () => {
      if (!isLoggedInC()){
          console.error('NOT LOGGED IN');
          alert("You must be logged in to queue up")
          return
      }

      isQueuing = true; 
      const ws = new WebSocket(`ws://localhost:8082/ws?email=${$sharedEmail}`);
      
      ws.onmessage = (event) => {
          const data = JSON.parse(event.data);
          console.log("YEAH")
          if (data.type === 'match_found') {
              isQueuing = false; 
              goto(`/game/${data.game_id}`);
          }
      };

      ws.onerror = () => {
          isQueuing = false;
      };

      ws.onclose = () => {
          isQueuing = false;
      };
      
      const queueUp = async () => {
          try {
              const response = await axios.post(
                  'http://localhost:8082/queueup',
                  { $sharedEmail },
                  {
                      headers: {
                          'authorization': `Bearer ${ sessionStorage.getItem('authToken')}`
                      }
                  }
              );
          } catch (error) {
              console.error('Failed to queue up:', error);
              isQueuing = false;
          }
      };
      
      queueUp();
  };
</script>

<div class="bg-stone-900 min-h-fit p-8 text-stone-100">
  <div class="max-w-3xl mx-auto text-center">
      <h1 class="text-5xl font-bold mb-8 text-stone-200">
          HNEFATAFL <br />
      </h1>
      
      <div class="space-y-4">
          <button 
              class="w-full {isQueuing ? 
                  'bg-stone-700 hover:bg-stone-600' : 
                  'bg-stone-800 hover:bg-stone-700'} 
                  rounded-xl p-6 flex items-center transition-colors"
              on:click={connectToMatchmaking}
              disabled={isQueuing}
          >
              <div class="bg-stone-600/20 p-3 rounded-lg">
                  {#if isQueuing}
                      <Loader2 class="w-12 h-12 text-stone-300 animate-spin" />
                  {:else}
                      <div class="w-12 h-12 bg-stone-300 rounded-full"></div>
                  {/if}
              </div>
              <div class="ml-6 text-left">
                  <div class="text-3xl font-bold text-stone-200">
                      {#if isQueuing}
                          Finding Match...
                      {:else}
                          Play Online
                      {/if}
                  </div>
              </div>
          </button>

          <button class="w-full bg-stone-800 hover:bg-stone-700 rounded-xl p-6 flex items-center transition-colors" on:click={playVsBot}>
              <div class="bg-stone-600/20 p-3 rounded-lg">
                  <Monitor class="w-12 h-12 text-stone-300" />
              </div>
              <div class="ml-6 text-left">
                  <div class="text-3xl font-bold text-stone-200">Play Bots</div>
              </div>
          </button>
      </div>
  </div>
</div>