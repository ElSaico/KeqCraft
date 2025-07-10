ServerEvents.recipes(e =>{
	e.custom({
        type: 'create:mixing',
        ingredients: [
            { item: 'minecraft:flint' }
        ],
        results: [
            { id: 'minecraft:gunpowder', chance: 0.0625 } // 1/16
        ]
    });
	e.custom({
        type: 'create:deploying',
        ingredients: [
            { item: 'minecraft:iron_ingot' },
            { item: 'minecraft:copper_ingot' }
        ],
        results: [
            { id: 'pointblank:gunmetal_ingot' }
        ]
    });

    const POINT_BLANK_AMMO = ['ammo9mm', 'ammo45acp', 'ammo46', 'ammo357', 'ammo57', 'ammo50ae', 'ammo545', 'ammo556',
        'ammo68', 'ammo762', 'ammo762x51', 'ammo338lapua', 'ammo50bmg', 'ammo12gauge', 'ammolasercharge', 'grenade40mm',
        'grenade20mm', 'smaw_rocket', 'at4_rocket', 'javelin_rocket'];
    e.forEachRecipe({ type: 'pointblank:default' }, recipe => {
        const id = recipe.getId().substring(11);
        if (POINT_BLANK_AMMO.indexOf(id) < 0) {
            return;
        }
        const data = JSON.parse(recipe.json.toString());
        e.custom({
            type: "create:compacting",
	        ingredients: global.flatMap(data.ingredients, 
                ing => Array(ing.count).fill(ing.item ? { item: ing.item } : { tag: ing.tag })),
            results: [
                {
                    id: data.result.item,
                    amount: data.result.count
                }
            ]
        });
    });
});