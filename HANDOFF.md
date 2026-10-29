# Handoff

Notes so any new chat or model can pick up where work left off. Update this file whenever work ships.

## Where things stand (29 October 2026)

- **Live page**: claude.ai artifact https://claude.ai/artifact/6Dto2wCmzNXAt5J3uFETHg. `index.html` in this repo is the same page with its own `<head>` for a static deploy.
- **Latest change**: added "Now look up from the ground" under the side-view sky in *Fly through the sky*. A "See it from the ground" button in the side view's control bar jumps to it.

## How the ground view works

- Code lives in the block headed `/* ---------- the view from the ground ---------- */`, just before `/* ---------- boot ---------- */`. It starts from `gInit()` at boot.
- It reuses the page's own model (`isa`, `forms`, `threshT`, `airAt`, `rhiAt`, `PRESETS`, `shortLife`) and the shared state `S`, so the side view and ground view always agree. The model block between `/*MODEL-START*/` and `/*MODEL-END*/` was not touched; `node test/model.test.js` still passes.
- Both aircraft fly parallel tracks along the slice: amber eastbound at `S.altFt`, white westbound at the preset's `bFt`. Ground-track metres map to side-view km by `gKm()`, centred on `GXC[preset]` so a humid pocket sits overhead.
- Each trail point is classed (none, short, lasting) by `airAt()` where it was laid, and reclassed when units, altitude, temperature, sky or engine change. The class and fade time ride in the fourth component of each point sent to the shader.
- Rendering is WebGL 2: single-scattering sky, two trail layers composited far to near, sunlight dimmed along its path to each trail. The "humid air" overlay is a screen-space hatch where `rhiAt` at each aircraft's height is 100% or more, within 30 km of the tracks.
- It draws only while on screen (IntersectionObserver), follows the Play/Pause button, and shows a fallback message if WebGL 2 is missing.

## Approximations (stated on the page)

- Lasting-trail widening of 60 m a minute, procedural texture on old trails, short-trail fade time from `shortLife()`.
- Pocket shapes are the side view's illustrative pockets, extended across the tracks.

## Related

- **Contrail Sky** (https://claude.ai/artifact/C4hktM2L61jfBo5BKdmL7a): the standalone technical prototype the ground view came from, with a comparison table and sliders. Kept as a separate page for now.

## Open items

- Check smoothness on a real iPhone. If it stutters, lower the resolution scale in `gResize()` (now 0.62) or the sky steps in the shader (now 10).
