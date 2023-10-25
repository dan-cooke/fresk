import { fireEvent, render, screen } from "@testing-library/react";
import { Filters } from "./filters";
import { act } from "react-dom/test-utils";

const push = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push,
  }),
}));
describe("Filters", () => {
  it("should render the correct filter dropdowns", () => {
    render(
      <Filters
        searchParams={{} as any}
        availableFilters={{
          brands: ["test"],
          colors: ["colors"],
          types: ["types"],
          playingTimes: ["playingTimes"],
        }}
      />,
    );

    expect(screen.getByLabelText("Brand")).toBeInTheDocument();
    expect(screen.getByLabelText("Type")).toBeInTheDocument();
    expect(screen.getByLabelText("Color")).toBeInTheDocument();
    expect(screen.getByLabelText("Playing Time")).toBeInTheDocument();
  });
  describe("when a filter is selected", () => {
    it("should update the url", () => {
      render(
        <Filters
          searchParams={{} as any}
          availableFilters={{
            brands: ["test"],
            colors: ["colors"],
            types: ["types"],
            playingTimes: ["playingTimes"],
          }}
        />,
      );
      const brand = screen.getByLabelText("Brand");
      act(() => {
        fireEvent.click(brand);
      });
      const testOption = screen.getByText("test");

      act(() => {
        fireEvent.click(testOption);
      });
      expect(push).toHaveBeenCalledWith("http://localhost/?brand=test");
    });
  });
});
