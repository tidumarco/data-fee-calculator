import React, { useState } from "react";
import { debounce } from "lodash";
import {
  CartValue,
  DeliveryFee,
  Distance,
  Items,
  DeliveryDate,
  onChange,
} from "../types";

function DeliveryFeeCalculator() {
  const [cartValue, setCartValue] = useState<CartValue>(0);
  const [cartSurcharge, setCartSurcharge] = useState(0);
  const [distance, setDistance] = useState<Distance>(0);
  const [distanceSurcharge, setDistanceSurcharge] = useState(0);
  const [items, setItems] = useState<Items>(0);
  const [itemsSurcharge, setItemsSurcharge] = useState(0);
  const [date, setDate] = useState<DeliveryDate>("");
  const [total, setTotal] = useState(0);
  const [deliveryFee, setDeliveryFee] = useState<DeliveryFee>(0);

  function handleValueChange(e: onChange) {
    const newValue = e.target.value;
    const newValueNumber = parseFloat(newValue);
    setCartValue(newValueNumber);
  }

  function handleDistanceChange(e: onChange): void {
    const newDistance = e.target.value;
    const newDistanceNumber = parseInt(newDistance);
    setDistance(newDistanceNumber);
  }

  function handleItemsChange(e: onChange): void {
    const newItems = e.target.value;
    const newItemsNumber = parseInt(newItems);
    setItems(newItemsNumber);
    console.log(newItemsNumber);
  }

  function handleDateChange(e: onChange) {
    const date = e.target.value;
    setDate(date);
    console.log(date);
  }
  const debouncedValueOnChange = debounce(handleValueChange, 500);
  const debouncedDistanceOnchange = debounce(handleDistanceChange, 500);
  const debouncedItemsOnChange = debounce(handleItemsChange, 500);

  function handleCartSurcharge() {
    if (cartValue < 10 && cartValue > 0) {
      const cartValueNumber = cartValue;
      const cartSurchargeValue = 10 - cartValueNumber;
      setCartSurcharge(cartSurchargeValue);
    }
  }
  function handledistanceSurcharge() {
    let fee = 2;

    if (distance > 1000) {
      const additionalDistance = distance - 1000;
      fee += Math.ceil(additionalDistance / 500) * 1;
    }
    setDistanceSurcharge(Math.max(fee, 1));
  }

  function handleItemsSurcharge() {
    let itemsSurcharge = 0;
    if (items >= 5) {
      itemsSurcharge += (items - 4) * 0.5;
    }
    if (items > 12) {
      itemsSurcharge += 1.2;
    }
    setItemsSurcharge(itemsSurcharge);
  }

  function handleTotal() {
    let maxTotal = cartSurcharge + distanceSurcharge + itemsSurcharge;
    setTotal(maxTotal);
  }

  function onSubmit(e: React.FormEvent): void {
    e.preventDefault();
    handleCartSurcharge();
    handledistanceSurcharge();
    handleItemsSurcharge();
    handleTotal();
    setDeliveryFee(total);
  }

  return (
    <>
      <form onSubmit={onSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-medium mb-4">Delivery Fee Calculator</h2>
        <div className="mb-4">
          <label
            htmlFor="weight"
            className="block text-gray-700 font-medium mb-2"
          >
            Cart Value (€)
          </label>
          <input
            type="float"
            name="value"
            id="value"
            className="border border-gray-400 p-2 rounded-lg w-full"
            onChange={debouncedValueOnChange}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="distance"
            className="block text-gray-700 font-medium mb-2"
          >
            Delivery Distance (m)
          </label>
          <input
            type="number"
            name="distance"
            id="distance"
            className="border border-gray-400 p-2 rounded-lg w-full"
            onChange={debouncedDistanceOnchange}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="distance"
            className="block text-gray-700 font-medium mb-2"
          >
            Amount of items
          </label>
          <input
            type="number"
            name="items"
            id="items"
            className="border border-gray-400 p-2 rounded-lg w-full"
            onChange={debouncedItemsOnChange}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="distance"
            className="block text-gray-700 font-medium mb-2"
          >
            Time
          </label>
          <input
            type="datetime-local"
            name="date"
            id="date"
            value={date}
            className="border border-gray-400 p-2 rounded-lg w-full"
            onChange={handleDateChange}
          />
        </div>
        <button
          type="submit"
          className="bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600"
        >
          Calculate Delivery Fee
        </button>
        {deliveryFee > 0 && (
          <p className="mt-4 text-indigo-500 font-medium">
            Delivery Fee: € {total}
          </p>
        )}
      </form>
    </>
  );
}

export default DeliveryFeeCalculator;
