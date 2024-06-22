import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import FormField from '../Components/FormField';

const positions = ['Developer', 'Designer', 'Manager'];
const skills = ['JavaScript', 'CSS', 'Python', 'React', 'Node.js'];

const ApplicationRegistrationForm = () => {
    const {
        register,
        handleSubmit,
        watch,
        control,
        formState: { errors },
    } = useForm();
    const [submittedData, setSubmittedData] = useState(null);
  
    const position = watch('position', '');
    const selectedSkills = watch('skills', []);
    const interviewTime = watch('preferredInterviewTime', null);
  
    const onSubmit = data => setSubmittedData(data);
  
    return (
      <div className="flex justify-between items-center h-screen w-9/12 mx-auto">
        <motion.form
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          onSubmit={handleSubmit(onSubmit)}
          className='border p-8 border-gray-200 bg-white rounded-lg shadow-lg max-w-md w-full flex flex-col gap-6'
        >
          <FormField
            id="fullName"
            label="Full Name"
            register={register}
            validation={{ required: 'Full Name is required' }}
            errors={errors}
          />
          <FormField
            id="email"
            label="Email"
            type="email"
            register={register}
            validation={{
              required: 'Email is required',
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                message: 'Invalid email address',
              },
            }}
            errors={errors}
          />
          <FormField
            id="phoneNumber"
            label="Phone Number"
            type="number"
            register={register}
            validation={{ required: 'Phone Number is required' }}
            errors={errors}
          />
          <div>
            <label className="block text-sm font-medium text-gray-700">Applying for Position</label>
            <select
              id="position"
              {...register('position', { required: 'Position is required' })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Select a position</option>
              {positions.map(pos => (
                <option key={pos} value={pos}>{pos}</option>
              ))}
            </select>
            {errors.position && <p className="text-red-500 text-xs mt-1">{errors.position.message}</p>}
          </div>
          <AnimatePresence>
            {(position === 'Developer' || position === 'Designer') && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5 }}
              >
                <FormField
                  id="relevantExperience"
                  label="Relevant Experience (years)"
                  type="number"
                  register={register}
                  validation={{
                    required: 'Relevant Experience is required',
                    validate: value => value > 0 || 'Experience must be greater than 0',
                  }}
                  errors={errors}
                />
              </motion.div>
            )}
            {position === 'Designer' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5 }}
              >
                <FormField
                  id="portfolioURL"
                  label="Portfolio URL"
                  register={register}
                  validation={{
                    required: 'Portfolio URL is required',
                    pattern: {
                      value: /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/,
                      message: 'Invalid URL',
                    },
                  }}
                  errors={errors}
                />
              </motion.div>
            )}
            {position === 'Manager' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5 }}
              >
                <FormField
                  id="managementExperience"
                  label="Management Experience"
                  register={register}
                  validation={{ required: 'Management Experience is required' }}
                  errors={errors}
                />
              </motion.div>
            )}
          </AnimatePresence>
          <div>
            <label className="block text-sm font-medium text-gray-700">Additional Skills</label>
            {skills.map(skill => (
              <div key={skill} className="flex items-center">
                <input
                  id={`skills.${skill}`}
                  type="checkbox"
                  {...register(`skills.${skill}`)}
                  className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                />
                <label htmlFor={`skills.${skill}`} className="ml-2 block text-sm leading-5 text-gray-900">{skill}</label>
              </div>
            ))}
            {errors.skills && <p className="text-red-500 text-xs mt-1">{errors.skills.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Preferred Interview Time</label>
            <Controller
              control={control}
              name="preferredInterviewTime"
              rules={{ required: 'Preferred Interview Time is required' }}
              render={({ field }) => (
                <DatePicker
                  selected={field.value}
                  onChange={field.onChange}
                  showTimeSelect
                  dateFormat="Pp"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              )}
            />
            {errors.preferredInterviewTime && <p className="text-red-500 text-xs mt-1">{errors.preferredInterviewTime.message}</p>}
          </div>
          <button
            type="submit"
            className="mt-4 py-2 px-4 bg-indigo-600 text-white font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </motion.form>
  
        {submittedData && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-8 p-6 bg-white border border-gray-200 rounded-lg shadow-md space-y-4"
          >
            <h2 className="text-lg font-medium text-gray-700 uppercase">Submission Summary</h2>
            <p><strong>Full Name:</strong> {submittedData.fullName}</p>
            <p><strong>Email:</strong> {submittedData.email}</p>
            <p><strong>Phone Number:</strong> {submittedData.phoneNumber}</p>
            <p><strong>Position:</strong> {submittedData.position}</p>
            {submittedData.relevantExperience && <p><strong>Relevant Experience:</strong> {submittedData.relevantExperience} years</p>}
            {submittedData.portfolioURL && <p><strong>Portfolio URL:</strong> {submittedData.portfolioURL}</p>}
            {submittedData.managementExperience && <p><strong>Management Experience:</strong> {submittedData.managementExperience}</p>}
            <div>
              <h2 className="text-lg font-medium text-gray-700 uppercase">skills:</h2>
              <ul className="list-disc ml-5 space-y-2">
                {Object.entries(submittedData.skills).filter(([key, value]) => value).map(([key]) => (
                  <li key={key}>{key}</li>
                ))}
              </ul>
            </div>
            <p><strong>Preferred Interview Time:</strong> {new Date(submittedData.preferredInterviewTime).toLocaleString()}</p>
          </motion.div>
        )}
      </div>
    );
};  
  
export default ApplicationRegistrationForm;
  