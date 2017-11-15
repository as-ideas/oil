// Custom Data - Mobile Endgeräte splitten
// 1. Targetable + Filterable/ allocable wählen
// 2. Visit wählen
// 3. String wählen
// 4. Custom Code wählen
// 5. Folgenden "Custom evaluation code" einfügen
if (Kameleoon.Internals.runtime.deviceType) return {'value': Kameleoon.Internals.runtime.deviceType}; else return null;



