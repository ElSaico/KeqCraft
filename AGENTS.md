# Agent Notes — Verdant Gears

## KubeJS 2101 + ProbeJS Type Pitfalls

### `$Type` vs `$Type_` (underscore suffix)

ProbeJS generates two variants for most Minecraft classes:
- `$Type` — the concrete Java class (e.g. `$AABB`, `$BlockPos`, `$ItemStack`)
- `$Type_` — the flexible "input" wrapper that KubeJS accepts (e.g. `$AABB_`, `$BlockPos_`, `$ItemStack_`)

Methods that RETURN values use the concrete `$Type`.
Methods that ACCEPT parameters use the flexible `$Type_`.

**The concrete type is NOT assignable to the flexible type** in the generated typings. This means passing a method's return value directly into another method's parameter will produce a type error even though it works at runtime.

Fix: cast through `any` at the boundary:
```js
level.getEntitiesWithin(/** @type {any} */ (player.getBoundingBox().inflate(32)))
```

Common occurrences:
- `$AABB` → `$AABB_` (bounding box queries)
- `$BlockPos` → `$BlockPos_` (block state operations)
- `$ItemStack` → `$ItemStack_` (recipe outputs)
- `$Entity` → subclass cast (e.g. `$EnderDragon`)

### Generic class statics

`Java.loadClass()` returns an opaque type. To access static fields, cast with `typeof`:
```js
/** @type {typeof import("@package/path/to/class").$ClassName} */
const $ClassName = /** @type {any} */ (Java.loadClass('full.java.class.Name'))
```

Generic classes (like `$EnderDragonPhase<T>`) have statics typed with specific type params that don't match the general form. Compare by `.getId()` instead of reference equality.

### Event entity narrowing

Event handlers return `$Entity` even for type-filtered events. Narrow with JSDoc + any cast:
```js
/** @type {import("@package/net/minecraft/world/entity/boss/enderdragon").$EnderDragon} */
const dragon = /** @type {any} */ (event.entity)
```

## Build & Deploy

- `packwiz refresh` after any mod file changes
- Server export: `packwiz curseforge export --side server`
- 14 mods are CurseForge-sourced (metadata only) — require `packwiz serve` or manual download for bare deploys
- `side = "client"` mods are excluded from server exports
