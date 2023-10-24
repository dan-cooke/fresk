import { Cassette } from "@/app/types";
import { GetAllCassettesResponse, axiosClient, getAllCassettes } from "./api";
import MockAdapter from "axios-mock-adapter";

const apiMock = new MockAdapter(axiosClient);

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
        apiMock.onGet("/").replyOnce(200, mockApiResponse);
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

    describe("when the API returns an unsuccessful response", () => {
      beforeEach(() => {
        apiMock.onAny("/").replyOnce(401);
      });

      it("should throw an error", async () => {
        await expect(getAllCassettes()).rejects.toThrow(
          "Request failed with status code 401",
        );
      });
    });
  });
});
