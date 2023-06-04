import { render, screen } from "@testing-library/react";
import { MainApp } from "../MainApp";

describe("MainApp Component", () => {
  test("renders without crashing", () => {
    render(<MainApp />);

    const linkElement = screen.getByText(/NightDriverStrip/i);
    expect(linkElement).toBeInTheDocument();
  });
});