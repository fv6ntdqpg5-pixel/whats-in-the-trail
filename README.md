# What's in the Trail?

An interactive guide to aircraft contrails and the "chemtrail" claim. It shows why one aircraft draws a line across the sky and the next leaves nothing, what a spray program would take in gallons, trucks, mines and people, and which programs really do put material in the air. Every number on the page can be changed or checked.

A companion to [The Chemtrail Conspiracy](https://randybarnhill.substack.com/p/the-chemtrail-conspiracy) by Randy Barnhill, and to [Sea Level to Space](https://github.com/fv6ntdqpg5-pixel/sea-level-to-space) and [Overhead Now](https://github.com/fv6ntdqpg5-pixel/overhead-now).

## What is on the page

- **Fly through the sky**: a side-on slice of sky with humid pockets (ice-supersaturated regions). Move an aircraft up and down and its trail starts, stops and lasts according to the temperature and humidity at each spot. Settings for the day's temperature, the kind of sky and the engine generation.
- **Temperature and humidity chart**: the rule the scene follows, with regions for no trail, a short trail and a lasting trail.
- **Trail water**: how much ice a lasting trail holds per mile against what the engines put out, and how far a full payload of spray would reach.
- **Spray program ledger**: share of flights, gallons per flight and mix strength give aircraft refitted, tanker loads, yearly volume and the share of world mine output needed for silver iodide, strontium, barium, alumina and sulfur.
- **Who would have to know**: a headcount fed into a published model of how fast secrets leak.
- **What is real**: about 35 documented entries, each with a source: cloud seeding, Operation Popeye, the secret dispersal tests of the 1950s and 60s, geoengineering research, everyday spraying, items often cited as proof, and state and federal law since 2024. A chart ranks them by tonnage against the program set in the ledger.
- **Check it yourself**: six tests anyone can run. **Fair questions**: nine short answers with numbers.
- US and metric units, light and dark themes.

## Model and sources

- **Trail formation**: the Schmidt-Appleman criterion as set out by Schumann (1996, 2000). 1.23 kg of water per kg of fuel, 43.2 MJ/kg fuel energy, overall engine efficiency 0.23, 0.30 or 0.35. Saturation pressures over ice and supercooled water from Murphy and Koop (2005). ICAO standard atmosphere.
- **Persistence**: a trail lasts where humidity against ice is 100% or more. The length of short trails in the scene is drawn for illustration. The pockets are illustrative, sized from published measurements.
- **Trail water**: ice content and trail dimensions from Schumann and others (2017) and the IPCC aviation report (1999). Boeing 737-800 payload and an approximate cruise fuel burn of 2,500 kg an hour.
- **Ledger**: IATA flight, fleet and fuel figures (June 2026). Share of flights with lasting trails from Teoh and others (2024). World production from the USGS Mineral Commodity Summaries 2026. Liquid is counted at the weight of water as a round figure, with 6,000 gal tanker loads.
- **Secrecy**: Grimes (2016), with the most favourable leak rate from his three cases. It is a rough model and has been criticised in print. The page says so.

Full source links are in the page footer and beside each entry in the record.

Before publishing, the model was checked against published values, and the page text was reviewed separately for factual, physical and logical errors.

## Files

- `index.html`: the whole site. One self-contained file, no build step. Fonts load from Google Fonts.
- `test/model.test.js`: checks the physics and secrecy model inside `index.html` against published values. Run `node test/model.test.js`.

## Deploy

Static site. On Vercel: import this repository, framework preset "Other", no build command, output directory `/`.

## Corrections

Figures were checked in October 2026. If a number or a link is wrong, open an issue with a source.
