ServerEvents.tags('fluid', e => {
    // allow PneumaticCraft fuels on stock IE/CC&A recipes
    e.add('c:biodiesel', 'pneumaticcraft:biodiesel');
    e.add('c:ethanol', 'pneumaticcraft:ethanol');
});

ServerEvents.recipes(e => {
    // adjust PneumaticCraft fuel recipes to use the same tags as IE/CC&A
    const PNC_FUEL_ADJUST = [
        { type: 'fuel_quality', tags: ['ethanol', 'biodiesel'] },
        { type: 'thermo_plant', tags: ['biodiesel'] },
        { type: 'fluid_mixer', tags: ['ethanol'] },
    ];
    for (const criteria of PNC_FUEL_ADJUST) {
        e.forEachRecipe({ type: `pneumaticcraft:${criteria.type}` }, recipe => {
            const data = recipe.json.toString();
            for (const tag of criteria.tags) {
                if (data.indexOf(`c:fuels/${tag}`) >= 0) {
                    e.custom(data.replace(`c:fuels/${tag}`, `c:${tag}`)).id(recipe.getId());
                }
            }
        });
    }

    // allow high-cetane biodiesel on PneumaticCraft
    e.custom({
        type: "pneumaticcraft:fuel_quality",
        air_per_bucket: 1100000,
        burn_rate: 0.8,
        fluid: {
            tag: "c:high_power_biodiesel"
        }
    });

    // allow diesel (not biodiesel) on Immersive Engineering
    e.custom({
	    type: "immersiveengineering:generator_fuel",
	    burnTime: 250,
	    fluidTag: "c:fuels/diesel"
    });

    // allow more fuels for the Blaze Burner using CC&A's Straw
    // diesel is equivalent to biodiesel as in PnC, high-cetane biodiesel is 10% more efficient
    // as in IE, and the values for PnC fuels were obtained by fitting a linear formula on the
    // recipes for fuels in common (ethanol, biodiesel, crude oil)
    // for reference: burnTime = 0.0238367*air_per_bucket - 8489.8*burn_rate + 6955.1
    const CCAA_FUELS = [
        { fluid_tag: 'c:fuels/diesel', burnTime: 24000 },
        { fluid_tag: 'c:high_power_biodiesel', burnTime: 26400 },
        { fluid_tag: 'c:fuels/kerosene', burnTime: 24750 },
        { fluid_tag: 'c:fuels/gasoline', burnTime: 30000 },
        { fluid_tag: 'c:fuels/lpg', burnTime: 39250 },
    ];
    for (const fuel of CCAA_FUELS) {
        e.custom({
            type: "createaddition:liquid_burning",
            burnTime: fuel.burnTime,
            input: {
                type: "fluid_tag",
                amount: 1000,
                fluid_tag: fuel.fluid_tag
            }
        });
    }
});