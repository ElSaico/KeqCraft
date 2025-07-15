ServerEvents.tags('item', e => {
    // allow more sources of salt on Create: Food recipes
    e.add('c:salt', 'mekanism:salt');
    e.add('c:salt', 'refurbished_furniture:sea_salt');
});