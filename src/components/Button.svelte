<script lang="ts">
	import type { Snippet } from 'svelte';

	const {className, type, onclick, children}: {className: string, type: 'button' | 'submit', onclick?: () => void, children: Snippet} = $props();
</script>

<button class={className} {type} {onclick} >
	{@render children()}
</button>

<style>

    button {
        border: solid 2px var(--secondary);
        background-color: white;
        color: var(--secondary);
        padding: 0 12px;
        font-size: 1.2em;
        height: 2.3em;
        position: relative;
        box-shadow: 5px 5px 0 var(--main);
        z-index: 2;
        border-radius: 5px;
    }


    button:hover {
        cursor: pointer;
    }

    button:before {
        content: '';
        width: 0;
        height: 0;
        bottom: 0px;
        right: 0px;
        position: absolute;
        z-index: -1;
        background: var(--main);
        transition: width .3s, height .3s;
        border-top-left-radius: 5px;
    }


    button:hover:before{
        width: calc(100% - 3px);
        height: calc(100% - 3px);
    }


    /***** Variations *******/

    button.primary:before {
        width: calc(100% - 4px);
        height: calc(100% - 4px);
    }

    button.primary:hover:before {
        width: 0;
        height: 0;
    }

    button.tertiary {
        border-color: transparent;
        transition: border-color .2s;
    }

    button.tertiary:hover {
        border-color: var(--secondary)
    }


</style>