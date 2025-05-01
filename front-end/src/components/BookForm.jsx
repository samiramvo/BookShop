import React, { useState, useEffect } from "react";

const BookForm = ({ onSubmit, initialData, loading }) => {
  const [title, setTitle] = useState(initialData?.title || "");
  const [author, setAuthor] = useState(initialData?.author || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [image, setImage] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);

  useEffect(() => {
    setTitle(initialData?.title || "");
    setAuthor(initialData?.author || "");
    setDescription(initialData?.description || "");
    setImage(null); 
    if (initialData?.image) {
      setCoverPreview(`http://localhost:5000/${initialData.image}`);
    } else {
      setCoverPreview(null);
    }
    if (initialData) {
      initialData._id = initialData._id.toString();
    }
  }, [initialData]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setCoverPreview(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const imageData = initialData && !image ? initialData.image : image;
    onSubmit({ title, author, description, image: imageData });
  };


  return (
    <form onSubmit={handleSubmit}>
      <h2 className=" text-violettitle text-xl font-bold mb-4">{initialData ? "Modifier le livre" : "Ajouter un livre"}</h2>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Titre</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Auteur</label>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline min-h-[80px]"
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2">Image de couverture</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-700 border border-gray-300 rounded cursor-pointer focus:outline-none focus:border-green-500"
        />
        {coverPreview && (
          <div className="mt-2">
            <img src={coverPreview} alt="Aperçu couverture" className="max-h-32 rounded shadow" />
          </div>
        )}
      </div>
      <button
        type="submit"
        disabled={loading}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-2xl focus:outline-none focus:shadow-outline w-full"
      >
        {loading ? "Enregistrement..." : initialData ? "Mettre à jour" : "Ajouter"}
      </button>
    </form>
  );
};

export default BookForm;
