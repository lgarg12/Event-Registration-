import React, { useState } from 'react';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { FaPlusCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';

const EventRegistrationForm = () => {
    const { register, handleSubmit, watch, control, formState: { errors } } = useForm();
    const { fields, append, remove } = useFieldArray({
      control,
      name: 'guests'
    });
    const [submittedData, setSubmittedData] = useState(null);
  
    const onSubmit = data => {
      setSubmittedData(data);
    };
  
    const isAttendingWithGuest = watch('attendingWithGuest', false);
  
    return (
        <div className="flex justify-between items-center h-screen w-9/12 mx-auto">
        <motion.form initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          onSubmit={handleSubmit(onSubmit)}
          className='border p-8 border-gray-200 bg-white rounded-lg shadow-lg max-w-md w-full flex flex-col gap-6'>
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                      id="name"
                      {...register('name', { required: 'Name is required' })}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                </div>
      
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      id="email"
                      type="email"
                      {...register('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                          message: 'Invalid email address'
                        }
                      })}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>
        
                <div>
                    <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age</label>
                    <input
                      id="age"
                      type="number"
                      {...register('age', {
                        required: 'Age is required',
                        valueAsNumber: true,
                        validate: value => value > 0 || 'Age must be greater than 0'
                      })}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    {errors.age && <p className="text-red-500 text-xs mt-1">{errors.age.message}</p>}
                </div>
      
                <div>
                    <label className="block text-sm font-medium text-gray-700">Are you attending with a guest?</label>
                    <div className="mt-2 flex gap-4">
                        <label className="flex items-center">
                            <input
                              type="radio"
                              value="yes"
                              {...register('attendingWithGuest', { required: true })}
                              className="form-radio text-indigo-600"
                            />
                            <span className="ml-2">Yes</span>
                        </label>
                        <label className="flex items-center">
                            <input
                              type="radio"
                              value="no"
                              {...register('attendingWithGuest', { required: true })}
                              className="form-radio text-indigo-600"
                            />
                            <span className="ml-2">No</span>
                        </label>
                    </div>
                </div>
      
                {isAttendingWithGuest === 'yes' && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Guests</label>
                        {fields.map((field, index) => (
                          <div key={field.id} className="flex items-center gap-2 mt-2">
                            <input
                              id={`guestName-${index}`}
                              {...register(`guests.${index}.name`, { required: 'Guest name is required' })}
                              placeholder="Guest Name"
                              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                            <button type="button" onClick={() => remove(index)} className="text-red-500">
                              Remove
                            </button>
                        {errors.guests?.[index]?.name && <p className="text-red-500 text-xs mt-1">{errors.guests[index].name.message}</p>}
                    </div>
                    ))}
                  <button type="button" onClick={() => append({ name: '' })} className="mt-2 flex items-center gap-2 text-indigo-600">
                    <FaPlusCircle />
                    Add Guest
                  </button>
                  </div>
                )}
      
                <button type="submit" className="mt-4 py-2 px-4 bg-indigo-600 text-white font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Submit
                </button>
            </motion.form>
    
    
          {submittedData && (
            <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }} 
            className="mt-8 p-6 bg-white border border-gray-200 rounded-lg shadow-md space-y-4">
              <h2 className="text-lg font-medium text-gray-700 uppercase">Submission Summary</h2>
              <p><strong>Name:</strong> {submittedData.name}</p>
              <p><strong>Email:</strong> {submittedData.email}</p>
              <p><strong>Age:</strong> {submittedData.age}</p>
              <p><strong>Attending with Guest:</strong> {submittedData.attendingWithGuest}</p>
              {submittedData.attendingWithGuest === 'yes' && submittedData.guests && (
                <div>
                  <strong className="text-gray-700 uppercase">Guests:</strong>
                  <ul className="list-disc ml-5 space-y-2">
                    {submittedData.guests.map((guest, index) => (
                      <li key={index}> {guest.name}</li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          )}
        </div>
    );
};

export default EventRegistrationForm;
