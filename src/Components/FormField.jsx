import React from "react";

const FormField = ({ id, label, type = 'text', validation, register, errors }) => (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        id={id}
        type={type}
        {...register(id, validation)}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
      {errors[id] && <p className="text-red-500 text-xs mt-1">{errors[id].message}</p>}
    </div>
);

export default FormField;
  