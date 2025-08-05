import DishCard from "./DishCard";

const CategorySection = ({ category, dishes, addToCart }) => {
  return (
    <div className="w-full mb-12">
      {/* Category Title */}
      <h3 className="text-2xl sm:text-3xl font-extrabold text-indigo-400 mb-6 border-b border-gray-700 pb-3">
        {category.name}
      </h3>

      {/* If No Dishes */}
      {dishes.length === 0 ? (
        <p className="text-gray-400 italic text-center py-6">
          No dishes available in this category.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
          {dishes.map((dish) => (
            <DishCard key={dish._id} dish={dish} addToCart={addToCart} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategorySection;
