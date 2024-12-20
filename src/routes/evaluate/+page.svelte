<script>
    import { onMount } from 'svelte';
    import axios from 'axios';
    import { Sword, Crown, Clock, User } from 'lucide-svelte';
    import { sharedEmail } from '$lib/stores/auth';
    import { goto } from '$app/navigation'

    let matches = [];
    let loading = true;
    let error = null;

    onMount(async () => {
        try {
            const response = await axios.post('http://localhost:8082/matches',
                {
                    email: $sharedEmail, 
                },
                {
                    headers: {
                        'authorization': `Bearer ${sessionStorage.getItem('authToken')}`
                    }
                });
            matches = response.data;
            loading = false;
        } catch (err) {
            error = "Failed to load match history";
            loading = false;
        }
    });

    function formatDate(dateStr) {
        return new Date(dateStr).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    }

    function getGameResult(match) {
        if (match.winner === '') return 'Incomplete';
        else if (match.winner === 'w' && match.player_white === $sharedEmail) return 'Won';
        else if (match.winner === 'b' && match.player_black === $sharedEmail) return 'Won';
        else if (match.winner === 'draw') return 'Draw';
        return 'Lost';
    }

    function getGameColor(match) {
        return match.player_white === $sharedEmail ? 'White' : 'Black';
    }
</script>

<div class="flex-1 bg-neutral-900 p-8 overflow-y-auto">
    <div class="max-w-4xl mx-auto">
        <h1 class="text-4xl font-bold mb-8 text-amber-100/90">Match History</h1>

        {#if loading}
            <div class="flex justify-center items-center h-64">
                <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-200"></div>
            </div>
        {:else if error}
            <div class="text-red-400 text-center p-4 bg-red-900/10 rounded-lg">
                {error}
            </div>
        {:else if matches.length === 0}
            <div class="text-center py-12 bg-stone-950 rounded-xl border border-amber-900/30">
                <h2 class="text-xl text-stone-300">No matches played yet</h2>
                <p class="text-stone-400 mt-2">Your game history will appear here</p>
            </div>
        {:else}
            <div class="space-y-4">
                {#each matches as match}
                <!-- svelte-ignore a11y_click_events_have_key_events -->

                    <div class="bg-stone-950 rounded-xl border border-amber-900/30 p-6 hover:border-amber-800/50 transition-allcursor-pointer"
                    on:click={() => goto(`/evaluate/${match.id}`)}
                    role="button"
                    tabindex="0">
                        <div class="flex justify-between items-start">
                            <div>
                                <div class="flex items-center gap-3 mb-2">
                                    {#if getGameResult(match) === 'Incomplete'}
                                        <div class="w-5 h-5 rounded-full border-2 border-stone-400"></div>
                                        <span class="text-red-400 font-bold">Incomplete</span>
                                    {:else if getGameResult(match) === 'Won'}
                                        <Crown class="w-5 h-5 text-amber-400" />
                                        <span class="text-amber-400 font-bold">Victory</span>
                                    {:else if getGameResult(match) === 'Lost'}
                                        <Sword class="w-5 h-5 text-stone-400" />
                                        <span class="text-stone-400 font-bold">Defeat</span>
                                    {:else}
                                        <div class="w-5 h-5 rounded-full border-2 border-stone-400"></div>
                                        <span class="text-stone-400 font-bold">Draw</span>
                                    {/if}
                                </div>
                                
                                <div class="flex items-center gap-2 text-stone-300">
                                    <User class="w-4 h-4" />
                                    <span>Opponent: {match.player_white === $sharedEmail ? match.player_black : match.player_white}</span>
                                </div>
                            </div>

                            <div class="text-right">
                                <div class="text-stone-400 mb-1 flex items-center justify-end gap-2">
                                    <Clock class="w-4 h-4" />
                                    <span>{formatDate(match.created_at)}</span>
                                </div>
                                <div class="text-stone-300 text-sm">
                                    Played as {getGameColor(match)}
                                </div>
                            </div>
                        </div>

                        <div class="mt-4 pt-4 border-t border-amber-900/10 text-stone-400 text-sm">
                            {#if match.moves}
                                <div>Moves played: {match.moves.length}</div>
                            {/if}
                            {#if match.duration}
                                <div>Game duration: {Math.floor(match.duration / 60)}m {match.duration % 60}s</div>
                            {/if}
                        </div>
                    </div>
                {/each}
            </div>
        {/if}
    </div>
</div>