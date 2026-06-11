// Priority: 0

StartupEvents.registry('item', event => {
  event.create('verdant_gears:dormant_dragon_heart')
    .glow(true)
    .fireResistant(true)
    .maxStackSize(1)

  event.create('verdant_gears:dragon_scale')
    .fireResistant(true)

  event.create('verdant_gears:aura_cog')
    .glow(true)

  event.create('verdant_gears:spirit_gear')
    .glow(true)

  event.create('verdant_gears:spell_brass')
    .glow(true)
})
