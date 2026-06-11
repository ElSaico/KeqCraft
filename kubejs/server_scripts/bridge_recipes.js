// Priority: 15
// Cross-pillar bridge recipes — Nature's Aura ↔ Occultism ↔ Create ↔ Iron's Spells

ServerEvents.recipes(event => {
  // ═══════════════════════════════════════════════════════════════
  //  POWER: Nature's Aura → Create boiler heat
  // ═══════════════════════════════════════════════════════════════

  event.custom({
    type: 'create:mixing',
    ingredients: [
      { item: 'naturesaura:gold_powder' },
      { item: 'create:brass_ingot' }
    ],
    results: [{ item: 'verdant_gears:aura_cog', count: 2 }],
    heatRequirement: 'heated'
  })

  event.shaped('4x create:shaft', [
    ' A ',
    'ASA',
    ' A '
  ], {
    A: 'naturesaura:infused_iron',
    S: 'create:shaft'
  })

  event.custom({
    type: 'create:pressing',
    ingredients: [{ item: 'naturesaura:infused_iron' }],
    results: [{ item: 'create:iron_sheet' }]
  })

  // ═══════════════════════════════════════════════════════════════
  //  LOGISTICS: Create ↔ Occultism spirit crafting
  // ═══════════════════════════════════════════════════════════════

  event.custom({
    type: 'create:mixing',
    ingredients: [
      { item: 'occultism:spirit_attuned_gem' },
      { item: 'create:brass_ingot' },
      { item: 'create:brass_ingot' }
    ],
    results: [{ item: 'verdant_gears:spirit_gear', count: 2 }],
    heatRequirement: 'superheated'
  })

  event.custom({
    type: 'occultism:spirit_fire',
    ingredient: { item: 'create:electron_tube' },
    result: { item: 'occultism:spirit_attuned_gem' }
  })

  event.shaped('create:deployer', [
    ' G ',
    'BPB',
    ' S '
  ], {
    G: 'verdant_gears:spirit_gear',
    B: 'create:brass_ingot',
    P: 'create:precision_mechanism',
    S: 'create:shaft'
  }).id('verdant_gears:spirit_deployer')

  // ═══════════════════════════════════════════════════════════════
  //  COMBAT: Scorched Guns ↔ Create fabrication
  // ═══════════════════════════════════════════════════════════════

  event.custom({
    type: 'create:sequenced_assembly',
    ingredient: { item: 'create:brass_sheet' },
    transitionalItem: { item: 'create:brass_sheet' },
    sequence: [
      {
        type: 'create:pressing',
        ingredients: [{ item: 'create:brass_sheet' }],
        results: [{ item: 'create:brass_sheet' }]
      },
      {
        type: 'create:deploying',
        ingredients: [{ item: 'create:brass_sheet' }, { item: 'minecraft:iron_ingot' }],
        results: [{ item: 'create:brass_sheet' }]
      },
      {
        type: 'create:pressing',
        ingredients: [{ item: 'create:brass_sheet' }],
        results: [{ item: 'create:brass_sheet' }]
      }
    ],
    results: [{ item: 'scorchedguns:bullet_item', count: 16 }],
    loops: 2
  }).id('verdant_gears:create_ammo')

  // ═══════════════════════════════════════════════════════════════
  //  COMBAT: Iron's Spells ↔ Create brass components
  // ═══════════════════════════════════════════════════════════════

  event.custom({
    type: 'create:mixing',
    ingredients: [
      { item: 'irons_spellbooks:arcane_essence' },
      { item: 'irons_spellbooks:arcane_essence' },
      { item: 'create:brass_ingot' }
    ],
    results: [{ item: 'verdant_gears:spell_brass', count: 2 }],
    heatRequirement: 'heated'
  })

  event.shaped('irons_spellbooks:scroll', [
    ' E ',
    'EPE',
    ' E '
  ], {
    E: 'irons_spellbooks:arcane_essence',
    P: 'minecraft:paper'
  }).id('verdant_gears:spell_scroll_craft')

  // ═══════════════════════════════════════════════════════════════
  //  STORAGE: Sophisticated Storage ↔ Create
  // ═══════════════════════════════════════════════════════════════

  event.custom({
    type: 'create:mechanical_crafting',
    pattern: ['BBB', 'BCB', 'BBB'],
    key: {
      B: { item: 'create:brass_sheet' },
      C: { item: 'minecraft:chest' }
    },
    result: { item: 'sophisticatedstorage:barrel' }
  })

  event.custom({
    type: 'create:mechanical_crafting',
    pattern: [' P ', 'PCP', ' P '],
    key: {
      P: { item: 'create:precision_mechanism' },
      C: { item: 'sophisticatedstorage:barrel' }
    },
    result: { item: 'sophisticatedstorage:gold_barrel' }
  })

  // ═══════════════════════════════════════════════════════════════
  //  MINING: Nature's Aura pickaxe boost via Create
  // ═══════════════════════════════════════════════════════════════

  event.custom({
    type: 'create:deploying',
    ingredients: [
      { item: 'naturesaura:infused_iron_pickaxe' },
      { item: 'create:electron_tube' }
    ],
    results: [{ item: 'naturesaura:infused_iron_pickaxe' }]
  }).id('verdant_gears:infused_pickaxe_tune')

  // ═══════════════════════════════════════════════════════════════
  //  FLIGHT: Create Aeronautics ↔ Iron's Spells
  // ═══════════════════════════════════════════════════════════════

  event.custom({
    type: 'create:mixing',
    ingredients: [
      { item: 'irons_spellbooks:arcane_essence' },
      { item: 'irons_spellbooks:arcane_essence' },
      { item: 'irons_spellbooks:arcane_essence' },
      { item: 'create:propeller' }
    ],
    results: [{ item: 'create_aeronautics:propeller', count: 1 }],
    heatRequirement: 'heated'
  }).id('verdant_gears:arcane_propeller')

  // ═══════════════════════════════════════════════════════════════
  //  OCCULTISM ↔ Nature's Aura
  // ═══════════════════════════════════════════════════════════════

  event.custom({
    type: 'occultism:spirit_fire',
    ingredient: { item: 'naturesaura:gold_powder' },
    result: { item: 'occultism:spirit_attuned_gem' }
  }).id('verdant_gears:aura_to_spirit')

  event.shapeless('2x naturesaura:gold_powder', [
    'occultism:spirit_attuned_gem',
    'minecraft:gold_ingot'
  ]).id('verdant_gears:spirit_to_aura')
})
