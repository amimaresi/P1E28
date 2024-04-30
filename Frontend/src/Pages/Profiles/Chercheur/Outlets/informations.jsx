import { useState } from 'react';

export default function Informations() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('form is being submitted...');
    setIsSubmitting(true);

    const data = {};
    // TODO: prepare the data for the backend API.

    try {
      // send the actual data to the API
      console.log("Hey, I'm submitting!");
    } catch (error) {
      console.log('Oh no!');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 grid-rows-4 gap-x-12 gap-y-12">
          <input type="text" name="" id="" placeholder="ESI" />
          <input type="text" name="" id="" placeholder="diplome" />
          <input type="text" name="" id="" placeholder="Grade" />
          <input type="text" name="" id="" placeholder="Projet" />
          <input type="text" name="" id="" placeholder="Email" />
          <input type="number" name="" id="" placeholder="24" />
          <input type="text" name="" id="" placeholder="Tel" />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-lg bg-blue-900 px-3 py-1 text-white hover:bg-blue-600 disabled:bg-blue-700"
        >
          Enregistrer
        </button>
      </form>
    </>
  );
}
