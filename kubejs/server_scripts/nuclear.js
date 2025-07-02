ServerEvents.recipes(e => {
    // allow synthesis of Plutonium and Polonium from Extreme Reactors' Blutonium
    // this eliminates the need of Mekanism Generators for a lot of top-tier stuff
    // based on https://github.com/Fenris42/Kubejs_Polonium_Recipe
	e.custom({
		type: 'mekanism:oxidizing',
		input: {
			item: 'bigreactors:blutonium_ingot',
            count: 1
		},
		output: {
            id: 'mekanism:plutonium',
            amount: 1000
        }
	});
	e.custom({
		type: 'mekanism:centrifuging',
		input: {
            chemical: 'mekanism:plutonium', // maybe change to liquid blutonium?
            amount: 10
        },
		output: {
            id: 'mekanism:polonium',
            amount: 1
        }
	});
});

/*
RecipeViewerEvents.removeEntriesCompletely('item', e => {
    // there's no equivalent uranium bucket so we must explicitly remove this
    e.remove('bigreactors:yellorium_bucket');
});

RecipeViewerEvents.removeEntriesCompletely('fluid', e => {
    // remove liquid yellorium as Almost Unified still lacks fluid support
    // https://github.com/AlmostReliable/almostunified/issues/106
    e.remove('bigreactors:yellorium');
    e.remove('bigreactors:yellorium_flowing');
});
*/
