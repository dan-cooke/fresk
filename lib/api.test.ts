import { Cassette } from "@/app/types";
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
          { type: "Chrome" },
          { color: "Grey" },
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
          { playingTime: "090 minutes" },
          { type: "Chrome" },
          { color: "Grey" },
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
        const cassettes = await getAllCassettes();
        const expectedResponse: Cassette[] = [
          {
            id: "ae9b616f82",
            page: "http://www.tapedeck.org/400/sony_cdit_ii_90_080417.php",
            img: "http://www.tapedeck.org/400/sony_cdit_ii_90_080417.jpg",
            thumb:
              "http://www.tapedeck.org/400/sony_cdit_ii_90_080417_thumb.jpg",
            playingTime: "090 minutes",
            type: "Chrome",
            color: "Grey",
            brand: "Apple",
          },
          {
            id: "ae9b616f8d",
            page: "http://www.tapedeck.org/400/sony_cdit_ii_90_080417.php",
            img: "http://www.tapedeck.org/400/sony_cdit_ii_90_080417.jpg",
            thumb:
              "http://www.tapedeck.org/400/sony_cdit_ii_90_080417_thumb.jpg",
            playingTime: "090 minutes",
            type: "Chrome",
            color: "Grey",
            brand: "Sony",
          },
        ];

        expect(cassettes).toEqual(expectedResponse);
      });

      it("should sort the cassettes by brand name", async () => {
        const cassettes = await getAllCassettes();
        expect(cassettes[0].brand).toEqual("Apple");
        expect(cassettes[1].brand).toEqual("Sony");
      });
    });
  });
});
