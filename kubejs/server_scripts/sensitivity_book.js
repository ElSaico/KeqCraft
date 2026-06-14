// Priority: 40
// Sensitivity guide — Patchouli book, distributed on first village sight
// Crafting recipe is in data/verdant_gears/recipes/sensitivity_book.json

const BOOK_TAG = 'VerdantBookGiven'

ServerEvents.tick(event => {
  if (event.server.tickCount % 100 !== 0) return

  event.server.allLevels.forEach(level => {
    level.players.forEach(/** @param {import("@package/net/minecraft/server/level").$ServerPlayer} player */ player => {
      if (player.persistentData.getBoolean(BOOK_TAG)) return

      let nearby = level.getEntitiesWithin(/** @type {any} */ (player.getBoundingBox().inflate(32)))
      let hasVillager = false
      for (let i = 0; i < nearby.size(); i++) {
        if (nearby.get(i).type === 'minecraft:villager') {
          hasVillager = true
          break
        }
      }

      if (!hasVillager) return

      player.getServer().runCommandSilent(
        `give ${player.username} patchouli:guide_book[patchouli:book="verdant_gears:sensitivity_guide"] 1`
      )
      player.persistentData.putBoolean(BOOK_TAG, true)
    })
  })
})
