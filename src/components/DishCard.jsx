const DishCard = ({ dish, addToCart }) => {
  return (
    <div className="w-full max-w-[320px] bg-white/10 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden hover:scale-105 transition-transform duration-300 border border-white/10 group">
      {/* Dish Image */}
      {dish.image ? (
        <img
          src={dish.image}
          alt={dish.name}
          className="w-full h-48 object-cover group-hover:opacity-90 transition-opacity duration-300"
        />
      ) : (
        <div className="w-full h-48 bg-gray-800 flex items-center justify-center text-gray-400 text-sm">
          No Image Available
        </div>
      )}

      {/* Dish Info */}
      <div className="p-5 flex flex-col justify-between">
        <h4 className="text-xl font-bold text-white mb-1 truncate">
          {dish.name}
        </h4>
        <p className="text-lg font-semibold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent mb-6">
          ${dish.price.toFixed(2)}
        </p>

        {/* Add to Cart Button */}
        <button
          onClick={() => addToCart(dish)}
          className="w-full py-3 rounded-lg text-base font-semibold bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-green-600 hover:scale-105 transition-transform shadow-md text-white"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default DishCard;
