<script>
    import { page } from '$app/stores';
    import { onMount } from 'svelte';
    import axios from 'axios';
    import boardImg from '$lib/images/board.png';
    import attackingPiece from '$lib/images/attacking.png';
    import defendingPiece from '$lib/images/defending.png';
    import kingPiece from '$lib/images/king.png';
    import { ArrowLeft, ArrowRight, ChevronLeft } from 'lucide-svelte';
    import { goto } from '$app/navigation';

    const gameId = $page.params.gameid;
    let gameData;
    let currentMoveIndex = 0;
    let pieces = [];
    let evaluation = 0;
    
    const xtransform = 101;
    const ytransform = 101.3;

    function findPiece(type) {
        if (type == 'k') return kingPiece;
        else if (type == 'w') return defendingPiece;
        else if (type == 'b') return attackingPiece;
    }

    let initialPieces = [
        [0,3,'b'],[0,4,'b'],[0,5,'b'],[0,6,'b'],[0,7,'b'],[1,5,'b'],
        [3,0,'b'],[4,0,'b'],[5,0,'b'],[6,0,'b'],[7,0,'b'],[5,1,'b'],
        [10,3,'b'],[10,4,'b'],[10,5,'b'],[10,6,'b'],[10,7,'b'],[9,5,'b'],
        [3,10,'b'],[4,10,'b'],[5,10,'b'],[6,10,'b'],[7,10,'b'],[5,9,'b'],
        [3,5,'w'],[4,5,'w'],[4,4,'w'],
        [5,3,'w'],[5,4,'w'],[6,4,'w'],
        [7,5,'w'],[6,5,'w'],[6,6,'w'],
        [5,7,'w'],[5,6,'w'],[4,6,'w'],
        [5,5,'k']
    ];

    async function fetchGameData() {
        try {
            const response = await axios.get(`http://localhost:8082/game?id=${gameId}`, {
                headers: {
                    'authorization': `Bearer ${sessionStorage.getItem('authToken')}`
                }
            });
            gameData = response.data;
            console.log(gameData)
            pieces = [...initialPieces];
            await evaluatePosition();
        } catch (err) {
            console.error('Failed to load game:', err);
        }
    }

    async function evaluatePosition() {
        try {
            const response = await axios.post('http://localhost:8082/evaluate', {
                pieces: pieces
            }, {
                headers: {
                    'authorization': `Bearer ${sessionStorage.getItem('authToken')}`
                }
            });
            evaluation = 472 + response.data.evaluation;
        } catch (err) {
            console.error('Failed to evaluate position:', err);
        }
    }

    function applyMove(move) {
        const pieceIndex = pieces.findIndex(([row, col]) => 
            row === move.From.X && col === move.From.Y
        );
        
        if (pieceIndex !== -1) {
            if (move.To.X === -1 && move.To.Y === -1) {
                pieces.splice(pieceIndex, 1);
            } else {
                pieces[pieceIndex] = [move.To.X, move.To.Y, pieces[pieceIndex][2]];
            }
            pieces = [...pieces];
        }
    }

    async function goToMove(index) {
        if (index < 0 || !gameData || index > gameData.moves.moves.length) return;
        
        pieces = [...initialPieces];
        for (let i = 0; i <= index; i++) {
            applyMove(gameData.moves.moves[i]);
        }
        currentMoveIndex = index;
        await evaluatePosition();
    }

    onMount(fetchGameData);
</script>

<div class="flex-1 bg-neutral-900 p-8 overflow-y-auto">
    <div class="max-w-6xl mx-auto">
        <button 
            class="mb-8 text-amber-100/90 hover:text-amber-200/90 flex items-center gap-2"
            on:click={() => goto('/evaluate')}
        >
            <ChevronLeft />
            Back to Match History
        </button>

        <div class="grid grid-cols-3 gap-8">
            <!-- Board View -->
            <div class="col-span-2">
                <div class="relative rounded-lg shadow-xl p-4 bg-stone-950 border border-amber-900/30">
                    <div class="relative inline-block">
                        <img 
                            src={boardImg} 
                            alt="" 
                            class="h-full max-h-[calc(100vh-16rem)] object-contain"
                            style="user-drag: none; user-select: none;"
                        />

                        {#each pieces as piece}
                            <rect 
                                class="piece" 
                                style="background-image: url({findPiece(piece[2])}); 
                                       transform: translate({piece[0]*xtransform}%, {piece[1]*ytransform}%)"
                            />
                        {/each}
                    </div>
                </div>
            </div>

            <div class="space-y-6">
                <div class="bg-stone-950 p-6 rounded-xl border border-amber-900/30">
                    <h2 class="text-xl font-bold text-amber-100/90 mb-4">Position Evaluation</h2>
                    <div class="text-2xl text-stone-300">
                        {evaluation > 0 ? '+' : ''}{evaluation.toFixed(2)}
                    </div>
                    <div class="text-stone-400 text-sm mt-2">
                        {evaluation > 0 ? 'Advantage White' : 'Advantage Black'}
                    </div>
                </div>

                <div class="bg-stone-950 p-6 rounded-xl border border-amber-900/30">
                    <h2 class="text-xl font-bold text-amber-100/90 mb-4">Move Navigation</h2>
                    <div class="flex items-center justify-center gap-4">
                        <button 
                            class="p-2 hover:bg-stone-800 rounded-lg transition-colors"
                            on:click={() => goToMove(currentMoveIndex - 1)}
                            disabled={currentMoveIndex === 0}
                        >
                            <ArrowLeft class="w-6 h-6 text-amber-100/90" />
                        </button>
                        
                        <span class="text-stone-300">
                            Move {currentMoveIndex + 1} / {gameData?.moves.moves?.length || 0}
                        </span>

                        <button 
                            class="p-2 hover:bg-stone-800 rounded-lg transition-colors"
                            on:click={() => goToMove(currentMoveIndex + 1)}
                            disabled={!gameData || currentMoveIndex === gameData.moves.moves.length - 1}
                        >
                            <ArrowRight class="w-6 h-6 text-amber-100/90" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>