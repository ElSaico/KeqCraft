// Priority: 20
// Pillar-relevant loot in L_Ender's Cataclysm boss drops

ServerEvents.entityLootTables(event => {
  event.modifyEntity('cataclysm:netherite_monstrosity', table => {
    table.addPool(pool => {
      pool.addItem('create:brass_ingot').setCount(8, 16)
      pool.addCondition({ condition: 'minecraft:random_chance', chance: 0.25 })
    })
    table.addPool(pool => {
      pool.addItem('verdant_gears:aura_cog')
      pool.addCondition({ condition: 'minecraft:random_chance', chance: 0.15 })
    })
  })

  event.modifyEntity('cataclysm:ender_golem', table => {
    table.addPool(pool => {
      pool.addItem('irons_spellbooks:arcane_essence').setCount(4, 8)
      pool.addCondition({ condition: 'minecraft:random_chance', chance: 0.30 })
    })
    table.addPool(pool => {
      pool.addItem('verdant_gears:spell_brass')
      pool.addCondition({ condition: 'minecraft:random_chance', chance: 0.10 })
    })
  })

  event.modifyEntity('cataclysm:ignis', table => {
    table.addPool(pool => {
      pool.addItem('naturesaura:infused_iron').setCount(4, 12)
      pool.addCondition({ condition: 'minecraft:random_chance', chance: 0.20 })
    })
    table.addPool(pool => {
      pool.addItem('occultism:spirit_attuned_gem').setCount(2, 4)
      pool.addCondition({ condition: 'minecraft:random_chance', chance: 0.15 })
    })
  })

  event.modifyEntity('cataclysm:the_leviathan', table => {
    table.addPool(pool => {
      pool.addItem('verdant_gears:spirit_gear').setCount(2, 4)
      pool.addCondition({ condition: 'minecraft:random_chance', chance: 0.20 })
    })
    table.addPool(pool => {
      pool.addItem('create:precision_mechanism').setCount(2, 6)
      pool.addCondition({ condition: 'minecraft:random_chance', chance: 0.35 })
    })
  })

  event.modifyEntity('cataclysm:the_harbinger', table => {
    table.addPool(pool => {
      pool.addItem('verdant_gears:dragon_scale').setCount(2, 4)
      pool.addCondition({ condition: 'minecraft:random_chance', chance: 0.15 })
    })
    table.addPool(pool => {
      pool.addItem('irons_spellbooks:arcane_essence').setCount(6, 12)
      pool.addCondition({ condition: 'minecraft:random_chance', chance: 0.25 })
    })
  })

  event.modifyEntity('cataclysm:ancient_remnant', table => {
    table.addPool(pool => {
      pool.addItem('verdant_gears:dormant_dragon_heart')
      pool.addCondition({ condition: 'minecraft:random_chance', chance: 0.10 })
    })
    table.addPool(pool => {
      pool.addItem('occultism:spirit_attuned_gem').setCount(4, 8)
      pool.addCondition({ condition: 'minecraft:random_chance', chance: 0.30 })
    })
  })
})
