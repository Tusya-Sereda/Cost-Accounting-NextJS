const {validationWhere, validationHowMuch} = require("../utilitis/manyUseFunc");

test("check on validation in input Where", () => {
  expect(validationWhere("uhsgerh")).toBe(true);
  expect(validationWhere("натпг4")).toBe(false);
  expect(validationWhere("55ыа")).toBe(false);
  expect(validationWhere("hello")).toBe(true);
  expect(validationWhere("15154sdfbfgxnfgt54815454gfn5dxf4")).toBe(true);
});

test("check on validation in input howMuch", () => {
  expect(validationHowMuch('64')).toBe(true);
  expect(validationHowMuch('64asc')).toBe(false);
  expect(validationHowMuch('sg64')).toBe(false);
  expect(validationHowMuch('15854654534687684')).toBe(true);
  expect(validationHowMuch('гпыо825')).toBe(false);
});
