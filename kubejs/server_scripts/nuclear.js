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

    // add missing uranium recipes to Extreme Reactors fluidizer blocks
    // https://github.com/ZeroNoRyouki/ExtremeReactors2/issues/201
    e.replaceInput(
        [
            { 'input': 'bigreactors:fluidizercasing' },
            { 'output': 'bigreactors:fluidizercasing' },
        ],
        'bigreactors:yellorium_ingot',
        '#c:ingots/uranium'
    );
});