import React from "react";
import { render, fireEvent } from "@testing-library/react";
import DeliveryFeeCalculator from "./components/DeliveryFeeCalculator";
import { debounce } from "lodash";

jest.mock("lodash", () => ({
  debounce: jest.fn((fn) => fn),
}));

describe("DeliveryFeeCalculator", () => {
  let cartValueInput: HTMLInputElement;
  let distanceInput: HTMLInputElement;
  let itemsInput: HTMLInputElement;
  let dateInput: HTMLInputElement;

  let deliveryFee: HTMLSpanElement;
  let submitOrder: HTMLButtonElement;

  beforeEach(() => {
    const { getByText, getByLabelText, getByTestId } = render(
      <DeliveryFeeCalculator />
    );

    cartValueInput = getByLabelText("Cart Value (€)") as HTMLInputElement;
    distanceInput = getByLabelText("Delivery Distance (m)") as HTMLInputElement;
    itemsInput = getByLabelText("Amount of items") as HTMLInputElement;
    // dateInput = getByLabelText("Time") as HTMLInputElement;

    submitOrder = getByText("Calculate Delivery Fee") as HTMLButtonElement;
    deliveryFee = getByTestId("delivery-fee") as HTMLSpanElement;
  });

  it("should debounce value, distance, items, and date change handlers", () => {
    expect(debounce).toHaveBeenCalledWith(expect.any(Function), 250);
    expect(debounce).toHaveBeenCalledWith(expect.any(Function), 250);
    expect(debounce).toHaveBeenCalledWith(expect.any(Function), 250);
    expect(debounce).toHaveBeenCalledWith(expect.any(Function), 250);
  });

  it("should calculate the correct delivery fee", () => {
    fireEvent.change(cartValueInput, { target: { value: "50" } });
    fireEvent.change(distanceInput, { target: { value: "2500" } });
    fireEvent.change(itemsInput, { target: { value: "7" } });
    // fireEvent.change(dateInput, { target: { value: "2022-11-25" } });
    fireEvent.click(submitOrder);

    expect(deliveryFee.textContent).toBe("Delivery Fee: € 2.00");
  });
});
