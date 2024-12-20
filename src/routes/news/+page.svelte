<script>
    import { onMount } from 'svelte';
    import { ExternalLink } from 'lucide-svelte';
    import axios from 'axios';
    import PH1Img from '$lib/images/placeholder1.png';
    import PH2Img from '$lib/images/placeholder2.png';

    let news = [
        {
            title: "Ancient Board Game Championships Features Hnefatafl",
            description: "The annual Viking Games Festival showcases traditional Norse board games, with Hnefatafl taking center stage in this year's competition.",
            imageUrl: PH1Img,
            url: "#",
            date: "2024-03-15"
        },
        {
            title: "New Archaeological Find Reveals Complete Hnefatafl Set",
            description: "Archaeologists in Northern Scotland have uncovered a perfectly preserved Hnefatafl board game set, dating back to the 9th century.",
            imageUrl: PH2Img,
            url: "#",
            date: "2024-03-10"
        },
    ]; // defaults
    let loading = true;
    let error = null;

    const fetchNews = async () => {
        try {
            const response = await axios.get('http://localhost:8082/news');
            if (response.data) {
                news = response.data;
            }
        } catch (err) {
            error = 'Failed to load news';
        } finally {
            loading = false;
        }
    }

    onMount(fetchNews);
    loading = false;
</script>

<div class="p-8 bg-neutral-900 flex-1 min-h-screen">
    <div class="max-w-6xl mx-auto">
        <h1 class="text-4xl font-bold mb-8 text-amber-100/90">Latest Hnefatafl News</h1>
        
        {#if loading}
            <div class="flex justify-center items-center h-64">
                <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-200"></div>
            </div>
        {:else if error}
            <div class="text-red-400 text-center p-4">
                {error}
            </div>
        {:else}
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {#each news as article}
                    <a href={article.url} target="_blank" rel="noopener noreferrer" 
                       class="group bg-stone-950 rounded-xl overflow-hidden border border-amber-900/30 hover:border-amber-800/50 transition-all duration-300">
                        <div class="aspect-video overflow-hidden">
                            <img 
                                src={article.imageUrl} 
                                alt={article.title}
                                class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                        <div class="p-6">
                            <div class="flex items-start justify-between">
                                <h2 class="text-xl font-bold text-amber-100/90 mb-2 group-hover:text-amber-200/90 transition-colors">
                                    {article.title}
                                </h2>
                                <ExternalLink class="w-5 h-5 text-amber-500/50 group-hover:text-amber-400/80 transition-colors flex-shrink-0 mt-1" />
                            </div>
                            <p class="text-stone-300/80 text-sm mb-4">
                                {article.description}
                            </p>
                            <time class="text-xs text-stone-400/60">
                                {new Date(article.date).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </time>
                        </div>
                    </a>
                {/each}
            </div>
        {/if}
    </div>
</div>