<script>
  import "../app.css";
  import boardImg from '$lib/images/board.png';
</script>

<div class="flex-1 bg-neutral-900 p-8 overflow-y-auto">
    <div class="max-w-4xl mx-auto">
        <div class="text-center mb-12">
            <h1 class="text-6xl font-bold text-amber-100/90 mb-4">Hnefatafl</h1>
            <p class="text-xl text-stone-300/80 italic">The Viking Game of Kings</p>
        </div>

        <div class="mb-16">
            <img 
                src={boardImg} 
                alt="Hnefatafl game board" 
                class="w-full max-w-2xl mx-auto rounded-lg shadow-2xl border border-amber-900/30"
            />
        </div>

        <!-- Rules Section -->
        <div class="space-y-8 text-stone-200/90">
            <section class="bg-stone-950 p-8 rounded-xl border border-amber-900/30">
                <h2 class="text-3xl font-bold text-amber-100/90 mb-6">How to Play</h2>
                
                <div class="space-y-6">
                    <div>
                        <h3 class="text-xl font-semibold text-amber-200/80 mb-3">The Objective</h3>
                        <p class="leading-relaxed">
                            Hnefatafl is an ancient Norse board game of strategy between two uneven forces. The defending player (white pieces) must help their king escape to one of the corner squares, while the attacking player (black pieces) aims to capture the king before it can escape.
                        </p>
                    </div>

                    <div>
                        <h3 class="text-xl font-semibold text-amber-200/80 mb-3">Moving Pieces</h3>
                        <p class="leading-relaxed">
                            All pieces, including the king, move any number of empty squares horizontally or vertically, similar to a rook in chess. Only the king may occupy the corner squares and the central throne square (though other pieces may pass through the throne).
                        </p>
                    </div>

                    <div>
                        <h3 class="text-xl font-semibold text-amber-200/80 mb-3">Capturing Pieces</h3>
                        <ul class="space-y-3 leading-relaxed">
                            <li>• Pieces are captured by "sandwiching" them between two opposing pieces horizontally or vertically.</li>
                            <li>• The king must be surrounded on all four sides by attackers, or on three sides if against the board's edge.</li>
                            <li>• A piece may safely move between two enemy pieces.</li>
                            <li>• Multiple pieces can be captured in a single move.</li>
                            <li>• The corner squares and central throne act as hostile squares for capture purposes.</li>
                        </ul>
                    </div>

                    <div>
                        <h3 class="text-xl font-semibold text-amber-200/80 mb-3">Winning the Game</h3>
                        <p class="leading-relaxed">
                            The defenders win if the king reaches any corner square. The attackers win by capturing the king before it can escape. If a player cannot make a legal move on their turn, they lose the game.
                        </p>
                    </div>

                    <div class="bg-amber-900/10 p-6 rounded-lg border border-amber-800/20">
                        <h3 class="text-xl font-semibold text-amber-200/80 mb-3">Strategic Tips</h3>
                        <ul class="space-y-3 leading-relaxed">
                            <li>• Defenders should plan escape routes and maintain a protective formation around the king.</li>
                            <li>• Attackers should focus on controlling key squares and gradually tightening their formation.</li>
                            <li>• The throne can be used strategically as a safe haven or to assist in captures.</li>
                            <li>• Early game piece positioning is crucial for both sides.</li>
                        </ul>
                    </div>
                </div>
            </section>

            <section class="bg-stone-950 p-8 rounded-xl border border-amber-900/30">
                <h2 class="text-3xl font-bold text-amber-100/90 mb-6">Historical Background</h2>
                <p class="leading-relaxed">
                    Hnefatafl was the most popular board game in medieval Scandinavia before chess gained prominence. Archaeological findings of game pieces span from Britain to Ukraine, demonstrating the game's widespread appeal during the Viking Age. The game's name roughly translates to "King's Table," reflecting its theme of kingship and strategy.
                </p>
            </section>
        </div>
    </div>
</div>