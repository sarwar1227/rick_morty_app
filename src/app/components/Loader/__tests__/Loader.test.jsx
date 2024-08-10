import { render } from "@testing-library/react";
import Loader from "../Loader.component";

describe("Loader Component", () => {
  test("renders without crashing", () => {
    render(<Loader />);
  });
});
