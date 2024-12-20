<script>
    import boardImg from '$lib/images/board.png';
    import attackingPiece from '$lib/images/attacking.png';
    import defendingPiece from '$lib/images/defending.png';
    import kingPiece from '$lib/images/king.png';
    import { Square } from 'lucide-svelte';
    import { onMount } from 'svelte';

    export let ws;
    export let gameId;
    
    let color = 'w';
    let turn = "w";

    if (ws) {
        ws.onmessage = function(event) {
            const message = JSON.parse(event.data);
            
            switch(message.type) {
                case "move_update":
                    handleMoveUpdate(message.content);
                    break;
                case "game_end":
                    handleGameEnd(message.content.winner);
                    break;
            }
        };
    }

    function handleMoveUpdate(moveData) {
        const pieceIndex = pieces.findIndex(([row, col, type]) => 
            row === moveData.from.row && 
            col === moveData.from.col && 
            type === moveData.from.piece
        );
        
        if (pieceIndex !== -1) {
            pieces[pieceIndex] = [
                moveData.to.row,
                moveData.to.col,
                pieces[pieceIndex][2]
            ];
            
            const capturedPieces = checkCaptures(moveData.to.row, moveData.to.col, pieces[pieceIndex][2]);
            
            capturedPieces.sort((a, b) => b - a).forEach(index => {
                pieces.splice(index, 1);
            });
            
            pieces = [...pieces];
            
            turn = (turn === 'w') ? 'b' : 'w';
        }
    }

    let xtransform = 101;
    let ytransform = 101.3;

    let boardSize = 11;
    let board = Array(boardSize).fill(null).map(() => 
        Array(boardSize).fill(null)
    );
    
    let highlightedSquares;
    $: highlightedSquares = [];
    let selectedPiece = null;

    
    let pieces = [
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

    
    function findPiece(type) {
        if (type == 'k') return kingPiece;
        else if (type == 'w') return defendingPiece;
        else if (type == 'b') return attackingPiece;
    }

    function handlePieceClick(piece) {
    if (selectedPiece !== piece && turn === 'w' && (piece[2] === 'w' || piece[2] === 'k')) {
        selectedPiece = piece;
        const [row, col, p] = piece;
        
        highlightedSquares = [
            [row + 1, col, p],
            [row - 1, col, p],
            [row, col + 1, p],
            [row, col - 1, p] 
        ].filter(([r, c, p]) => {
            return r >= 0 && r < 11 && c >= 0 && c < 11 && !pieces.some(([pr, pc]) => pr === r && pc === c);
        });
    } else {
        selectedPiece = null;
        highlightedSquares = [];
    }
    }

    
    function isCornerSquare(row, col) {
        return (row === 0 && col === 0) || 
               (row === 0 && col === 10) || 
               (row === 10 && col === 0) || 
               (row === 10 && col === 10);
    }

    

    function handleSquareClick(row, col) {
        if (turn !== 'w' || !selectedPiece || 
            !highlightedSquares.some(([r, c]) => r === row && c === col)) {
            return;
        }

        const pieceIndex = pieces.findIndex(([r, c]) => 
            r === selectedPiece[0] && c === selectedPiece[1]
        );
        
        if (pieceIndex !== -1) {
            const moveData = {
                type: "move",
                content: {
                    id: gameId,
                    from: {
                        row: selectedPiece[0],
                        col: selectedPiece[1],
                        piece: pieces[pieceIndex][2]
                    },
                    to: {
                        row: row,
                        col: col
                    }
                }
            };

            pieces[pieceIndex] = [row, col, pieces[pieceIndex][2]];
            
            if (pieces[pieceIndex][2] === 'k' && isCornerSquare(row, col)) {
                handleGameEnd('w');
                return;
            }
            
            const capturedPieces = checkCaptures(row, col, pieces[pieceIndex][2]);
            
            capturedPieces.sort((a, b) => b - a).forEach(index => {
                let deleteData = {
                    type: "move",
                    content: {
                        id: gameId,
                        from: {
                            row: pieces.at(index)[0],
                            col: pieces.at(index)[1],
                            piece: pieces[pieceIndex][2]
                        },
                        to: {
                            row: -1,
                            col: -1
                        }
                    }
                };
                pieces.splice(index, 1);
                ws.send(JSON.stringify(deleteData));
            });
            
            pieces = [...pieces];
            ws.send(JSON.stringify(moveData));
            
            
            const botMoveRequest = {
                type: "bot_move",
                content: {
                    id: gameId,
                    pieces: pieces
                }
            };
            ws.send(JSON.stringify(botMoveRequest));
            
            selectedPiece = null;
            highlightedSquares = [];
            turn = 'b';
        }
    }

    function handleGameEnd(winner) {
        alert(`Game Over! ${winner === 'w' ? 'You win!' : 'Bot wins!'}`);
        window.location.href = '/play';
    }
</script>

<!-- Reuse the template from Board.svelte -->
<div class="relative rounded-lg shadow-xl p-4 max-w-screen-lg mx-auto min-h-0">
    <div class="relative inline-block">
        <img 
            src={boardImg} 
            alt="" 
            class="h-full max-h-[calc(100vh-4rem)] object-contain"
            style="user-drag: none;  
                    user-select: none;
                    -moz-user-select: none;
                    -webkit-user-drag: none;
                    -webkit-user-select: none;
                    -ms-user-select: none;"
        />

        {#each pieces as row}
            <!-- svelte-ignore a11y_no_static_element_interactions -->
            <!-- svelte-ignore a11y_click_events_have_key_events -->
            <rect 
                class="piece" 
                style="background-image: url({findPiece(row[2])}); transform: translate({row[0]*xtransform}%, {row[1]*ytransform}%)" 
                class:selected={selectedPiece && selectedPiece[0] === row && selectedPiece[1] === col}  
                on:click|stopPropagation={() => handlePieceClick(row)}
            />
        {/each}

        {#if highlightedSquares.length != 0}
            {#each highlightedSquares as square}
                <!-- svelte-ignore a11y_click_events_have_key_events -->
                <!-- svelte-ignore a11y_no_static_element_interactions -->
                <rect 
                    class="piece bg-yellow-950 opacity-10" 
                    style="transform: translate({square[0]*xtransform}%, {square[1]*ytransform}%); border-radius: 50%" 
                    on:click={() => {handleSquareClick(square[0], square[1])}}
                />
            {/each}
        {/if}
    </div>
</div>