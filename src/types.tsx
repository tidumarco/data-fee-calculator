type DeliveryFee = number;
type Distance = number;
type Items = number;
type DeliveryDate = Date;
type onChange = React.ChangeEvent<HTMLInputElement>;
type CartValue = number;
type Rush = boolean;
type CartSurcharge = number;
type DistanceSurcharge = number;
type ItemsSurcharge = number;

type Order = {
  value: number;
  distance: number;
  items: number;
};
export type {
  Order,
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
};
