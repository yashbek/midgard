<script>
    import { Monitor } from 'lucide-svelte';

    async function callPing() {
    try {
    const response = await fetch('http://localhost:8082/pingme');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error:', error);
  }
  }
  </script>
  
  <div class="bg-zinc-800 min-h-screen p-8 text-white">
    <div class="max-w-3xl mx-auto text-center">
      <h1 class="text-5xl font-bold mb-8">
        Play Chess Online<br />
        on the #1 Site!
      </h1>
      
      <div class="flex justify-between mb-16">
        <div class="text-2xl">
          <span class="text-white">15,185,395</span>
          <span class="text-gray-400"> Games Today</span>
        </div>
        <div class="text-2xl">
          <span class="text-white">136,966</span>
          <span class="text-gray-400"> Playing Now</span>
        </div>
      </div>
  
      <div class="space-y-4">
        <button class="w-full bg-green-600 hover:bg-green-700 rounded-xl p-6 flex items-center">
          <div class="bg-white/10 p-3 rounded-lg">
            <div class="w-12 h-12 bg-white rounded-full"></div>
          </div>
          <div class="ml-6 text-left">
            <div class="text-3xl font-bold">Play Online</div>
            <div class="text-xl text-gray-200">Play with someone at your level</div>
          </div>
        </button>
  
        <button class="w-full bg-zinc-700 hover:bg-zinc-600 rounded-xl p-6 flex items-center"  on:click={ () => callPing()}>
          <div class="bg-white/10 p-3 rounded-lg">
            <Monitor class="w-12 h-12 text-white" />
          </div>
          <div class="ml-6 text-left">
            <div class="text-3xl font-bold">Play Bots</div>
            <div class="text-xl text-gray-200">Play vs customizable training bots</div>
          </div>
        </button>
      </div>
    </div>
  </div>
  