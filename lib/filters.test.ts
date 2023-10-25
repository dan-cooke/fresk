import { Cassette } from "@/app/types";
import { getFilterOptions } from "./filters";

describe("getFilterOptions", () => {
  let cassettes: Cassette[] = [
    {
      brand: "Apple",
      color: "Chrome",
      id: "ae9b616f82",
      img: "http://www.tapedeck.org/400/sony_cdit_ii_90_080417.jpg",
      page: "http://www.tapedeck.org/400/sony_cdit_ii_90_080417.php",
      playingTime: "120 minutes",
      thumb: "http://www.tapedeck.org/400/sony_cdit_ii_90_080417_thumb.jpg",
      type: "Hello",
    },
    {
      brand: "Sony",
      color: "Chrome",
      id: "ae9b616f82",
      img: "http://www.tapedeck.org/400/sony_cdit_ii_90_080417.jpg",
      page: "http://www.tapedeck.org/400/sony_cdit_ii_90_080417.php",
      playingTime: "60 minutes",
      thumb: "http://www.tapedeck.org/400/sony_cdit_ii_90_080417_thumb.jpg",
      type: "World",
    },
  ];

  it("should create the correct filter options based on the available cassettes", () => {
    const filters = getFilterOptions(cassettes);

    expect(filters).toMatchInlineSnapshot(`
{
  "brands": [
    "Apple",
    "Sony",
  ],
  "colors": [
    "Chrome",
  ],
  "playingTimes": [
    "120 minutes",
    "60 minutes",
  ],
  "types": [
    "Hello",
    "World",
  ],
}
`);
  });
});
