import { GetAllCassettesResponse, getAllCassettes } from "./api";

global.fetch = jest.fn();

describe("API", () => {
  describe("getAllCassettes", () => {
    let mockApiResponse: GetAllCassettesResponse = [
      {
        ae9b616f8d: [
          { page: "http://www.tapedeck.org/400/sony_cdit_ii_90_080417.php" },
          { img: "http://www.tapedeck.org/400/sony_cdit_ii_90_080417.jpg" },
          {
            thumb:
              "http://www.tapedeck.org/400/sony_cdit_ii_90_080417_thumb.jpg",
          },
          { playingTime: "090 minutes" },
          { type: "Idk" },
          { color: "Chrome" },
          { brand: "Sony" },
        ],
      },
      {
        ae9b616f82: [
          { page: "http://www.tapedeck.org/400/sony_cdit_ii_90_080417.php" },
          { img: "http://www.tapedeck.org/400/sony_cdit_ii_90_080417.jpg" },
          {
            thumb:
              "http://www.tapedeck.org/400/sony_cdit_ii_90_080417_thumb.jpg",
          },
          { playingTime: "120 minutes" },
          { type: "Hello" },
          { color: "Chrome" },
          { brand: "Apple" },
        ],
      },

      {
        ae9b616f81: [
          { page: "http://www.tapedeck.org/400/sony_cdit_ii_90_080417.php" },
          { img: "http://www.tapedeck.org/400/sony_cdit_ii_90_080417.jpg" },
          {
            thumb:
              "http://www.tapedeck.org/400/sony_cdit_ii_90_080417_thumb.jpg",
          },
          { playingTime: "60 minutes" },
          { type: "World" },
          { color: "Yellow" },
          { brand: "Apple" },
        ],
      },
    ];
    describe("when the API returns a successful response", () => {
      beforeEach(() => {
        (fetch as jest.Mock).mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve(mockApiResponse),
        } as Response);
      });

      it("should map the API response to a consumable format", async () => {
        const { cassettes } = await getAllCassettes();

        expect(cassettes).toMatchInlineSnapshot(`
[
  {
    "brand": "Apple",
    "color": "Chrome",
    "id": "ae9b616f82",
    "img": "http://www.tapedeck.org/400/sony_cdit_ii_90_080417.jpg",
    "page": "http://www.tapedeck.org/400/sony_cdit_ii_90_080417.php",
    "playingTime": "120 minutes",
    "thumb": "http://www.tapedeck.org/400/sony_cdit_ii_90_080417_thumb.jpg",
    "type": "Hello",
  },
  {
    "brand": "Apple",
    "color": "Yellow",
    "id": "ae9b616f81",
    "img": "http://www.tapedeck.org/400/sony_cdit_ii_90_080417.jpg",
    "page": "http://www.tapedeck.org/400/sony_cdit_ii_90_080417.php",
    "playingTime": "60 minutes",
    "thumb": "http://www.tapedeck.org/400/sony_cdit_ii_90_080417_thumb.jpg",
    "type": "World",
  },
  {
    "brand": "Sony",
    "color": "Chrome",
    "id": "ae9b616f8d",
    "img": "http://www.tapedeck.org/400/sony_cdit_ii_90_080417.jpg",
    "page": "http://www.tapedeck.org/400/sony_cdit_ii_90_080417.php",
    "playingTime": "090 minutes",
    "thumb": "http://www.tapedeck.org/400/sony_cdit_ii_90_080417_thumb.jpg",
    "type": "Idk",
  },
]
`);
      });

      it("should sort the cassettes by brand name", async () => {
        const { cassettes } = await getAllCassettes();
        expect(cassettes[0].brand).toEqual("Apple");
        expect(cassettes[1].brand).toEqual("Apple");
        expect(cassettes[2].brand).toEqual("Sony");
      });

      it("should be able to filter by brand name", async () => {
        const { cassettes } = await getAllCassettes({ brand: "Apple" });

        expect(cassettes.length).toEqual(2);
        expect(cassettes[0].brand).toEqual("Apple");
        expect(cassettes[1].brand).toEqual("Apple");
      });
      it("should be able to filter by color ", async () => {
        const { cassettes } = await getAllCassettes({ color: "Chrome" });

        expect(cassettes.length).toEqual(2);
        expect(cassettes[0].color).toEqual("Chrome");
        expect(cassettes[1].color).toEqual("Chrome");
      });

      it("should be able to filter by type ", async () => {
        const { cassettes } = await getAllCassettes({ type: "World" });

        expect(cassettes.length).toEqual(1);
        expect(cassettes[0].type).toEqual("World");
      });
      it("should be able to filter by playingTime ", async () => {
        const { cassettes } = await getAllCassettes({
          playingTime: "60 minutes",
        });

        expect(cassettes.length).toEqual(1);
        expect(cassettes[0].playingTime).toEqual("60 minutes");
      });
      it("should be able to combine categories using an AND relationship", async () => {
        const { cassettes } = await getAllCassettes({
          color: "Chrome",
          brand: "Apple",
        });

        expect(cassettes.length).toEqual(1);
        expect(cassettes[0].color).toEqual("Chrome");
        expect(cassettes[0].brand).toEqual("Apple");
      });

      it("should support pagination", async () => {
        const { cassettes } = await getAllCassettes(undefined, {
          page: 0,
          pageSize: 1,
        });
        expect(cassettes.length).toEqual(1);
      });
    });
  });
});
