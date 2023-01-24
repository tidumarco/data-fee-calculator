import React, { useState } from "react";

// interface FormData {
//   value: Number;
//   items: Number;
//   distance: Number;
// }

const DeliveryFeeCalculator: React.FC = () => {
  const [value, setValue] = useState(0);
  const [distance, setDistance] = useState<number>(0);
  const [items, setItems] = useState<number>(0);
  const [date, setDate] = useState<string>("");
  const [deliveryFee, setDeliveryFee] = useState(0);

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const newValue = e.target.value;
    const newValueNumber = parseFloat(newValue);
    setValue(newValueNumber);
    console.log(newValueNumber);
  };

  const handleDistanceChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const newDistance = e.target.value;
    const newDistanceNumber = parseInt(newDistance);
    setDistance(newDistanceNumber);
    console.log(newDistanceNumber);
  };

  const handleItemsChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const newItems = e.target.value;
    const newItemsNumber = parseInt(newItems);
    setItems(newItemsNumber);
    console.log(newItemsNumber);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value;
    setDate(date);
    console.log(date);
  };

  const onSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setDeliveryFee(100);
  };

  return (
    <form
      onSubmit={() => onSubmit}
      className="bg-white p-6 rounded-lg shadow-md"
    >
      <h2 className="text-lg font-medium mb-4">Delivery Fee Calculator</h2>
      <div className="mb-4">
        <label
          htmlFor="weight"
          className="block text-gray-700 font-medium mb-2"
        >
          Cart Value (€)
        </label>
        <input
          type="number"
          name="value"
          id="value"
          value={value}
          className="border border-gray-400 p-2 rounded-lg w-full"
          onChange={handleValueChange}
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
          value={distance}
          className="border border-gray-400 p-2 rounded-lg w-full"
          onChange={handleDistanceChange}
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
          value={items}
          className="border border-gray-400 p-2 rounded-lg w-full"
          onChange={handleItemsChange}
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
          Delivery Fee: ${deliveryFee.toFixed(2)}
        </p>
      )}
    </form>
  );
};

export default DeliveryFeeCalculator;
