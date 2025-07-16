const MenuItemCard = ({ name, price, image, onAdd }) => (
  <div className="p-4 rounded-xl shadow bg-white flex flex-col items-center">
    <img src={image} alt={name} className="w-24 h-24 object-cover rounded" />
    <h3 className="text-lg mt-2 font-semibold">{name}</h3>
    <p className="text-gray-500">${price}</p>
    {onAdd && <button className="mt-2 bg-green-500 text-white px-4 py-1 rounded" onClick={onAdd}>Add</button>}
  </div>
);

export default MenuItemCard;
