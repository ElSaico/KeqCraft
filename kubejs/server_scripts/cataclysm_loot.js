// Priority: 20
// Pillar-relevant loot in L_Ender's Cataclysm boss drops

LootJS.modifiers(event => {
  event.addLootTableModifier('cataclysm:entities/netherite_monstrosity')
    .randomChance(0.25)
    .addLoot(LootEntry.of('create:brass_ingot').setCount(8, 16))
  event.addLootTableModifier('cataclysm:entities/netherite_monstrosity')
    .randomChance(0.15)
    .addLoot('verdant_gears:aura_cog')

  event.addLootTableModifier('cataclysm:entities/ender_golem')
    .randomChance(0.30)
    .addLoot(LootEntry.of('irons_spellbooks:arcane_essence').setCount(4, 8))
  event.addLootTableModifier('cataclysm:entities/ender_golem')
    .randomChance(0.10)
    .addLoot('verdant_gears:spell_brass')

  event.addLootTableModifier('cataclysm:entities/ignis')
    .randomChance(0.20)
    .addLoot(LootEntry.of('naturesaura:infused_iron').setCount(4, 12))
  event.addLootTableModifier('cataclysm:entities/ignis')
    .randomChance(0.15)
    .addLoot(LootEntry.of('occultism:spirit_attuned_gem').setCount(2, 4))

  event.addLootTableModifier('cataclysm:entities/the_leviathan')
    .randomChance(0.20)
    .addLoot(LootEntry.of('verdant_gears:spirit_gear').setCount(2, 4))
  event.addLootTableModifier('cataclysm:entities/the_leviathan')
    .randomChance(0.35)
    .addLoot(LootEntry.of('create:precision_mechanism').setCount(2, 6))

  event.addLootTableModifier('cataclysm:entities/the_harbinger')
    .randomChance(0.15)
    .addLoot(LootEntry.of('verdant_gears:dragon_scale').setCount(2, 4))
  event.addLootTableModifier('cataclysm:entities/the_harbinger')
    .randomChance(0.25)
    .addLoot(LootEntry.of('irons_spellbooks:arcane_essence').setCount(6, 12))

  event.addLootTableModifier('cataclysm:entities/ancient_remnant')
    .randomChance(0.10)
    .addLoot('verdant_gears:dormant_dragon_heart')
  event.addLootTableModifier('cataclysm:entities/ancient_remnant')
    .randomChance(0.30)
    .addLoot(LootEntry.of('occultism:spirit_attuned_gem').setCount(4, 8))
})
