// make ores always return the preferred material variant
LootJS.modifiers(e => {
    e.addBlockModifier('#c:ores').modifyLoot('#c:raw_materials', item => {
        const target = AlmostUnified.getVariantItemTarget(item);
        if (target.isEmpty()) {
            return item;
        }
        target.setCount(item.getCount());
        return target;
    });
});