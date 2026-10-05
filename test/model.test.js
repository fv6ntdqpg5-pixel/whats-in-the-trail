// Checks the physics and secrecy model inside index.html against published values.
// Run: node test/model.test.js
const fs = require('fs'), path = require('path'), assert = require('assert');
const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const src = html.slice(html.indexOf('/*MODEL-START*/'), html.indexOf('/*MODEL-END*/'));
const m = new Function(src + '\nreturn {isa,pIce,pLiq,slopeG,tangentT,forms,threshT,leakOdds,yearsToOdds,EI_W,CP,EPS,QF};')();
const near = (a, b, tol, what) => { assert(Math.abs(a - b) <= tol, what + ': got ' + a + ', expected ' + b + ' ± ' + tol); console.log('ok  ' + what); };

// Murphy & Koop (2005): both curves meet at the triple point, 611.657 Pa at 273.16 K
near(m.pIce(273.16), 611.657, 0.01, 'ice saturation at the triple point');
near(m.pLiq(273.16), 611.657, 0.01, 'liquid saturation at the triple point');
near(m.pIce(233.15), 12.844, 0.01, 'ice saturation at -40 C');
near(m.pLiq(233.15), 18.912, 0.01, 'liquid saturation at -40 C');

// ICAO standard atmosphere
near(m.isa(11000).T, 216.65, 0.01, 'temperature at 11 km');
near(m.isa(11000).P, 22632, 5, 'pressure at 11 km');
near(m.isa(10668).P / 100, 238.4, 0.3, 'pressure at 35,000 ft (hPa)');

// Schmidt-Appleman: the tangent point matches Schumann's (1996) fit for the threshold at liquid saturation
for (const G of [1.2, 1.676, 1.955, 2.6]) {
  const fit = -46.46 + 9.43 * Math.log(G - 0.053) + 0.72 * Math.pow(Math.log(G - 0.053), 2);
  near(m.tangentT(G) - 273.15, fit, 0.1, 'threshold temperature at G = ' + G + ' Pa/K');
}
// Colder is always better for formation, and drier air needs colder temperatures
const P = m.isa(10668).P;
assert(m.threshT(P, 0.3, 0.35) < m.threshT(P, 1.0, 0.35)); console.log('ok  drier air needs colder air');
assert(m.threshT(P, 0.6, 0.23) < m.threshT(P, 0.6, 0.35)); console.log('ok  efficient engines form trails in warmer air');
assert(m.forms(m.isa(10668).T, P, 0.45, 0.35) === true); console.log('ok  trail forms at 35,000 ft on a standard day');
assert(m.forms(m.isa(7315).T, m.isa(7315).P, 0.45, 0.35) === false); console.log('ok  no trail at 24,000 ft on a standard day');

// Grimes (2016), PLOS ONE: published results
near(m.leakOdds(30000, 6), 0.5, 0.005, 'PRISM calibration: 30,000 people, 6 years, even odds');
near(m.yearsToOdds(411000, 0.95), 3.68, 0.02, 'Moon-hoax case: 411,000 people fail in 3.68 years');
near(m.leakOdds(2521, 5), 0.05, 0.001, '2,521 people keep a secret 5 years at 5% odds');
near(m.leakOdds(502, 25), 0.05, 0.001, '502 people keep a secret 25 years at 5% odds');
console.log('\nAll model checks passed.');
