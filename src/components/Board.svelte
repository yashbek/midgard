<script>
    import boardImg from '$lib/images/board.png';
    import attackingPiece from '$lib/images/attacking.png';
    import defendingPiece from '$lib/images/defending.png';
    import kingPiece from '$lib/images/king.png';

    let xtransform = 101
    let ytransform = 101.3

    let boardSize = 11;
    let board = Array(boardSize).fill(null).map(() => 
        Array(boardSize).fill(null)
    );
    let buttons = []
    let SelectedSqr = [];

    let initialBlackPieces = [
        [0,3],[0,4],[0,5],[0,6],[0,7],[1,5],
        [3,0],[4,0],[5,0],[6,0],[7,0],[5,1],
        [10,3],[10,4],[10,5],[10,6],[10,7],[9,5],
        [3,10],[4,10],[5,10],[6,10],[7,10],[5,9],
    ]

    let initialWhitePieces = [
        [3,5],[4,5],[4,4],
        [5,3],[5,4],[6,4],
        [7,5],[6,5],[6,6],
        [5,7],[5,6],[4,6],
    ]

    function isTupleInList(list, [row, col]) {
        return list.some(([r, c]) => r === row && c === col);
    }

    function placeStone(row, col, color) {
        if (board[row][col] === null) {
            board[row][col] = color;
            board = [...board];
        }
    }

    function selectSqr(row, col) {
        buttons.forEach((btn, i) => {
            btn.classList.remove('hover-status');
        })
        SelectedSqr = buttons[row * 11 + col]
        for (let i = 0; i < 11; i++){
            let btn = buttons[i * 11 + col];
            if (btn.classList.contains('occupied')){
                continue
            }
            btn.classList.add('hover-status');
        }
        for (let j = 0; j < 11; j++){
            let btn = buttons[row * 11 + j];
            if (btn.classList.contains('occupied')){
                continue
            }
            btn.classList.add('hover-status');
        }
    }

    function highlightRowCol(row, col) {
        buttons.forEach((btn, i) => {
        const btnRow = Math.floor(i / 11);
        const btnCol = i % 11;
        console.log(row, col, buttons[row * 11 + col])

        if (btnRow === row || btnCol === col) {
            btn.classList.add('bg-gray-200');
        } else {
            btn.classList.remove('bg-gray-200');
        }
    });
    
  }
</script>
<div class="relative rounded-lg shadow-xl p-4 w-full max-w-screen-lg mx-auto min-h-0">
    <div class="relative inline-block">
        <img 
            src={boardImg} 
            alt="" 
            class="h-full max-h-[calc(100vh-4rem)] object-contain"
        />
        <rect class="piece" style="background-image: url({kingPiece}); transform: translate({5*xtransform}%, {5*ytransform}%)"></rect>
        {#each initialBlackPieces as row}
            <rect class="piece" style="background-image: url({attackingPiece}); transform: translate({row[0]*xtransform}%, {row[1]*ytransform}%)"></rect>
        {/each}
        {#each initialWhitePieces as row}
            <rect class="piece" style="background-image: url({defendingPiece}); transform: translate({row[0]*xtransform}%, {row[1]*ytransform}%)"></rect>
        {/each}

    </div>
</div>



<!-- <div class="relative rounded-lg shadow-xl p-4" style="width: {boardWidth}px; height: {boardHeight}px;">

    <div class="absolute inset-0">
        
            
    {#each positions as row}
        {#each positions as col}
            {#if isTupleInList(initialBlackPieces, [row, col])}
                {placeStone(row, col, 'black')}
            {:else if isTupleInList(initialWhitePieces, [row, col])}
                {placeStone(row, col, 'white')}
            {/if}


            
            <button class="relative border-r border-b border-black/70" bind:this={buttons[row * 11 + col]} on:click={() => {selectSqr(row, col)}}>
                {#if row == 5 && col == 5}
                    <div class="occupied cursor-pointer absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full shadow-md transition-all duration-150 bg-slate-500 border border-gray-300"></div>
                {:else if board[row][col]}
                    <div class="occupied cursor-pointer absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-7 h-7 rounded-full shadow-md transition-all duration-150 {board[row][col] === 'black' ? 'bg-black' : 'bg-white border border-gray-300'}"></div>
                {/if}
            </button>
        {/each}
    {/each}
    </div>
</div> -->