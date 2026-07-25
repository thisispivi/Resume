import assert from "node:assert/strict";
import { formatDateRange, formatDateValue, parseDurationString } from "./dates.ts";

assert.equal(formatDateValue("2021-03", "en-US"), "Mar 2021");
assert.equal(formatDateValue("2021", "en-US"), "2021");
assert.equal(formatDateValue("Summer 2019", "en-US"), "Summer 2019");
assert.equal(formatDateValue(undefined, "en-US"), "");
assert.equal(formatDateValue("2021-13", "en-US"), "2021-13");

assert.equal(
  formatDateRange({ startDate: "2021-03", isCurrent: true }, "en-US", "Present"),
  "Mar 2021 – Present",
);
assert.equal(
  formatDateRange({ startDate: "2018", endDate: "2020" }, "en-US", "Present"),
  "2018 – 2020",
);
assert.equal(formatDateRange({ endDate: "2020" }, "en-US", "Present"), "2020");
assert.equal(formatDateRange({}, "en-US", "Present"), "");

assert.deepEqual(parseDurationString("2021 - Present"), { startDate: "2021", isCurrent: true });
assert.deepEqual(parseDurationString("2021 – in corso"), { startDate: "2021", isCurrent: true });
assert.deepEqual(parseDurationString("2018 - 2020"), { startDate: "2018", endDate: "2020" });
assert.deepEqual(parseDurationString("Mar 2021 to Jun 2022"), {
  startDate: "Mar 2021",
  endDate: "Jun 2022",
});
assert.deepEqual(parseDurationString("2020"), { startDate: "2020" });
assert.deepEqual(parseDurationString("   "), {});
assert.deepEqual(parseDurationString("07/2022 - in corso"), {
  startDate: "2022-07",
  isCurrent: true,
});
assert.deepEqual(parseDurationString("09/2019 - 06/2022"), {
  startDate: "2019-09",
  endDate: "2022-06",
});
// An already-structured range must survive: a bare hyphen only splits with spaces.
assert.deepEqual(parseDurationString("2018-09"), { startDate: "2018-09" });
assert.deepEqual(parseDurationString("2018-09 – 2020-07"), {
  startDate: "2018-09",
  endDate: "2020-07",
});

console.log("dates self-check passed");
