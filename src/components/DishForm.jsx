import React, { useState, useEffect, useRef } from "react";
import api from "../api/api.config";

const DishForm = ({ categoryId, onDishAdded, editingDish, clearEditing }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const dropRef = useRef(null);

  useEffect(() => {
    if (editingDish) {
      setName(editingDish.name);
      setPrice(editingDish.price);
      setDescription(editingDish.description || "");
      setPreviewUrl(editingDish.image || null);
      setImageFile(null);
    }
  }, [editingDish]);

  const handleImageChange = (file) => {
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = () => setPreviewUrl(reader.result);
    reader.readAsDataURL(file);
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) handleImageChange(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      handleImageChange(file);
    }
  };

  const convertToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !price || (!imageFile && !editingDish)) {
      return alert("Please fill all fields and upload an image");
    }

    try {
      let base64Image = "";
      if (imageFile) base64Image = await convertToBase64(imageFile);

      const payload = {
        name,
        price,
        description,
        categoryId,
        image: base64Image,
      };

      if (editingDish) {
        await api.put(`/restaurant/dish/${editingDish._id}`, payload);
      } else {
        await api.post("/restaurant/dish", payload);
      }

      setName("");
      setPrice("");
      setDescription("");
      setImageFile(null);
      setPreviewUrl(null);
      onDishAdded();
      if (clearEditing) clearEditing();
    } catch (err) {
      console.error("Failed to submit dish:", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-lg"
    >
      {/* Dish Name */}
      <input
        type="text"
        placeholder="Dish Name"
        className="w-full px-4 py-3 rounded-lg bg-gray-900/40 border border-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      {/* Price */}
      <input
        type="number"
        placeholder="Price"
        className="w-full px-4 py-3 rounded-lg bg-gray-900/40 border border-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      {/* Description */}
      <textarea
        placeholder="Description"
        className="w-full px-4 py-3 rounded-lg bg-gray-900/40 border border-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 resize-none"
        rows="3"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      {/* Drag & Drop Upload */}
      <div
        ref={dropRef}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => dropRef.current.querySelector("input").click()}
        className="border-2 border-dashed border-gray-600 rounded-xl p-6 text-center cursor-pointer hover:border-indigo-500 transition bg-gray-900/40"
      >
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="Preview"
            className="mx-auto w-32 h-32 object-cover rounded-lg shadow-md"
          />
        ) : (
          <p className="text-gray-400">Drag & drop an image here, or click to upload</p>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileInputChange}
          className="hidden"
        />
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          type="submit"
          className="w-full sm:w-auto px-6 py-3 rounded-lg font-semibold bg-gradient-to-r from-indigo-500 to-purple-500 hover:scale-105 transition-transform shadow-lg text-white"
        >
          {editingDish ? "Update Dish" : "Add Dish"}
        </button>
        {editingDish && (
          <button
            type="button"
            className="w-full sm:w-auto px-6 py-3 rounded-lg font-semibold bg-gray-700 hover:bg-gray-600 transition text-white"
            onClick={clearEditing}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default DishForm;
