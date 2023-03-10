import React, { useEffect, useState } from "react";
import { debounce } from "lodash";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {
  Alert,
  CartValue,
  DeliveryFee,
  Distance,
  Items,
  DeliveryDate,
  onChange,
  Rush,
  CartSurcharge,
  DistanceSurcharge,
  ItemsSurcharge,
} from "../types";

function DeliveryFeeCalculator() {
  const formatWeekday = new Intl.DateTimeFormat(undefined, { weekday: "long" })
    .format;
  const [cartValue, setCartValue] = useState<CartValue>(0);
  const [cartSurcharge, setCartSurcharge] = useState<CartSurcharge>(0);
  const [distance, setDistance] = useState<Distance>(0);
  const [distanceSurcharge, setDistanceSurcharge] =
    useState<DistanceSurcharge>(0);
  const [items, setItems] = useState<Items>(0);
  const [itemsSurcharge, setItemsSurcharge] = useState<ItemsSurcharge>(0);
  const [date, setDate] = useState<DeliveryDate>(new Date());
  const weekday = date ? formatWeekday(date) : null;
  const [rush, setRush] = useState<Rush>(false);
  const [deliveryFee, setDeliveryFee] = useState<DeliveryFee>(0);
  const [alert, setAlert] = useState<Alert>("");

  function handleValueChange(e: onChange) {
    const newValue = e.target.value;
    const newValueNumber = parseFloat(newValue);
    setCartValue(newValueNumber);
  }

  function handleDistanceChange(e: onChange) {
    const newDistance = e.target.value;
    const newDistanceNumber = Number(newDistance);
    setDistance(newDistanceNumber);
  }

  function handleItemsChange(e: onChange) {
    const newItems = e.target.value;
    const newItemsNumber = Number(newItems);
    setItems(newItemsNumber);
  }

  function handleDateChange(newDate: Date) {
    setDate(newDate);
  }
  const debouncedValueOnChange = debounce(handleValueChange, 250);
  const debouncedDistanceOnchange = debounce(handleDistanceChange, 250);
  const debouncedItemsOnChange = debounce(handleItemsChange, 250);
  const debouncedDateOnChange = debounce(handleDateChange, 250);

  useEffect(() => {
    function handleCartSurcharge() {
      if (cartValue < 10) {
        const cartSurchargeValue = 10 - cartValue;
        setCartSurcharge(cartSurchargeValue < 0 ? 0 : cartSurchargeValue);
      } else {
        setCartSurcharge(0);
      }
    }
    function handleDistanceSurcharge() {
      let fee = 2;
      if (distance > 1000) {
        const additionalDistance = distance - 1000;
        fee += Math.ceil(additionalDistance / 500) * 1;
      }
      setDistanceSurcharge(Math.max(fee, 1));
    }

    function handleItemsSurcharge() {
      let newItemsSurcharge = 0;
      if (items >= 5) {
        newItemsSurcharge += (items - 4) * 0.5;
      }
      if (items > 12) {
        newItemsSurcharge += 1.2;
      }
      setItemsSurcharge(newItemsSurcharge);
    }

    function handleRushHourSurcharge() {
      const newTotal = deliveryFee * 1.2;
      if (
        weekday === "Friday" &&
        date.getHours() >= 15 &&
        date.getHours() <= 19
      ) {
        setRush(true);
      }
      if (rush === true) {
        setAlert("Rush hour surcharge applied");
        setDeliveryFee(Math.min(newTotal, 15));
        setRush(false);
      }
    }

    function calculateSurcharges() {
      handleCartSurcharge();
      handleDistanceSurcharge();
      handleItemsSurcharge();
      handleRushHourSurcharge();
    }
    calculateSurcharges();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    cartSurcharge,
    cartValue,
    date,
    deliveryFee,
    distance,
    distanceSurcharge,
    items,
    itemsSurcharge,
    weekday,
  ]);

  function handleTotal() {
    const maxTotal = cartSurcharge + distanceSurcharge + itemsSurcharge;
    if (cartValue >= 100) {
      setDeliveryFee(0);
    } else {
      setDeliveryFee(Math.min(maxTotal, 15));
    }
  }
  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    handleTotal();
    setAlert("");
  }

  return (
    <div
      className="bg-center bg-cover h-screen w-screen flex items-center justify-center"
      style={{ backgroundImage: "url(/background.jpg)" }}
    >
      <form
        onSubmit={onSubmit}
        className="backdrop-blur-md bg-white p-6 rounded-lg shadow-md w-1/4"
      >
        <h2 className="text-lg font-medium mb-4">Delivery Fee Calculator</h2>
        <div className="mb-4">
          <label
            htmlFor="value"
            className="block text-gray-700 font-medium mb-2"
          >
            Cart Value (???)
          </label>
          <input
            type="float"
            name="value"
            id="value"
            className="border border-gray-400 p-2 w-1/2 rounded-lg w-full"
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
            className="border border-gray-400 p-2 w-1/2 rounded-lg w-full"
            onChange={debouncedDistanceOnchange}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="items"
            className="block text-gray-700 font-medium mb-2"
          >
            Amount of items
          </label>
          <input
            type="number"
            name="items"
            id="items"
            className="border border-gray-400 p-2 w-1/2 rounded-lg w-full"
            onChange={debouncedItemsOnChange}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="time"
            className="block text-gray-700 font-medium mb-2"
          >
            Day {weekday}
          </label>
          {alert && (
            <p
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              {alert}
            </p>
          )}
          <DatePicker
            id="date"
            selected={date}
            onChange={debouncedDateOnChange}
            showDisabledMonthNavigation
            className="border border-gray-400 p-2 w-full rounded-lg mb-2"
          />
          <label
            htmlFor="time"
            className="block text-gray-700 font-medium mb-2"
          >
            Time {date.getHours().toString().padStart(2, "0")}:
            {date.getMinutes().toString().padStart(2, "0")}
          </label>
          <DatePicker
            id="time"
            selected={date}
            onChange={debouncedDateOnChange}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="HH:mm"
            showDisabledMonthNavigation
            className="border border-gray-400 p-2 w-full rounded-lg"
          />
        </div>

        <div className="flex items-center justify-center">
          <button
            type="submit"
            id="submit"
            className="bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600"
          >
            Calculate Delivery Fee
          </button>
        </div>

        {deliveryFee >= 0 && (
          <p
            data-testid="delivery-fee"
            className="mt-4 text-indigo-500 font-medium flex items-center justify-center"
          >
            Delivery Fee: ??? {deliveryFee.toFixed(2)}
          </p>
        )}
      </form>
    </div>
  );
}

export default DeliveryFeeCalculator;
