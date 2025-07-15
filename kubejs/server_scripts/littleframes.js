ServerEvents.recipes(e => {
    // standalone recipe from the LittleFrames author for worlds without LittleTiles
    e.shaped(
        Item.of('littleframes:creative_pic_frame', 1),
        [
            'PWP',
            'WGW',
            'PWP',
        ],
        {
            P: '#minecraft:planks',
            W: '#minecraft:wool',
            G: 'minecraft:glowstone'
        }
    );
});