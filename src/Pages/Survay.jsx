import React, { useState } from 'react';
import { useForm , control} from 'react-hook-form';
import { motion } from 'framer-motion';



const SurveyForm = () => {
    const { register, handleSubmit, watch, control, formState: { errors } } = useForm();
    const [submittedData, setSubmittedData] = useState(null);

    const surveyTopic = watch('surveyTopic', '');

    const onSubmit = (data) => {
      setSubmittedData(data);
    };

    return (
        <div className="flex justify-between items-center h-screen bg-gray-100 w-9/12 mx-auto gap-4 ">
            <motion.form initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }} onSubmit={handleSubmit(onSubmit)} className="border p-8 border-gray-200 bg-white rounded-lg shadow-lg max-w-md w-full flex flex-col gap-6">
                <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
                    <input
                      id="fullName"
                      type="text"
                      {...register('fullName', { required: 'Full Name is required' })}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    />
                    {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
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
                          message: 'Invalid email address',
                        },
                      })}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>
        
                <div>
                    <label className="block text-sm font-medium text-gray-700">Survey Topic</label>
                    <select
                      id="surveyTopic"
                      {...register('surveyTopic', { required: 'Survey Topic is required' })}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    >
                      <option value="">Select a topic</option>
                      <option value="Technology">Technology</option>
                      <option value="Health">Health</option>
                      <option value="Education">Education</option>
                    </select>
                    {errors.surveyTopic && <p className="text-red-500 text-xs mt-1">{errors.surveyTopic.message}</p>}
                </div>
      
                {surveyTopic === 'Technology' && (
                    <div>
                        <label htmlFor="favoriteLanguage" className="block text-sm font-medium text-gray-700">Favorite Programming Language</label>
                        <select
                          id="favoriteLanguage"
                          {...register('favoriteLanguage', { required: 'Favorite Programming Language is required' })}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                        >
                            <option value="">Select a language</option>
                            <option value="JavaScript">JavaScript</option>
                            <option value="Python">Python</option>
                            <option value="Java">Java</option>
                            <option value="C#">C#</option>
                        </select>
                        {errors.favoriteLanguage && <p className="text-red-500 text-xs mt-1">{errors.favoriteLanguage.message}</p>}
            
                        <div>
                            <label htmlFor="yearsExperience" className="block text-sm font-medium text-gray-700">Years of Experience</label>
                            <input
                              id="yearsExperience"
                              type="number"
                              {...register('yearsExperience', { required: 'Years of Experience is required', validate: value => value > 0 || 'Experience must be greater than 0' })}
                              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                            />
                            {errors.yearsExperience && <p className="text-red-500 text-xs mt-1">{errors.yearsExperience.message}</p>}
                        </div>
                    </div>
                )}
      
                {surveyTopic === 'Health' && (
                    <div>
                        <label htmlFor="exerciseFrequency" className="block text-sm font-medium text-gray-700">Exercise Frequency</label>
                        <select
                          id="exerciseFrequency"
                          {...register('exerciseFrequency', { required: 'Exercise Frequency is required' })}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                        >
                            <option value="">Select frequency</option>
                            <option value="Daily">Daily</option>
                            <option value="Weekly">Weekly</option>
                            <option value="Monthly">Monthly</option>
                            <option value="Rarely">Rarely</option>
                        </select>
                        {errors.exerciseFrequency && <p className="text-red-500 text-xs mt-1">{errors.exerciseFrequency.message}</p>}
            
                        <div>
                            <label htmlFor="dietPreference" className="block text-sm font-medium text-gray-700">Diet Preference</label>
                            <select
                              id="dietPreference"
                              {...register('dietPreference', { required: 'Diet Preference is required' })}
                              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                            >
                              <option value="">Select diet preference</option>
                              <option value="Vegetarian">Vegetarian</option>
                              <option value="Vegan">Vegan</option>
                              <option value="Non-Vegetarian">Non-Vegetarian</option>
                            </select>
                            {errors.dietPreference && <p className="text-red-500 text-xs mt-1">{errors.dietPreference.message}</p>}
                        </div>
                    </div>
                )}
      
                {surveyTopic === 'Education' && (
                    <div>
                        <label htmlFor="highestQualification" className="block text-sm font-medium text-gray-700">Highest Qualification</label>
                            <select
                              id="highestQualification"
                              {...register('highestQualification', { required: 'Highest Qualification is required' })}
                              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                            >
                              <option value="">Select qualification</option>
                              <option value="High School">High School</option>
                              <option value="Bachelor's">Bachelor's</option>
                              <option value="Master's">Master's</option>
                              <option value="PhD">PhD</option>
                            </select>
                        {errors.highestQualification && <p className="text-red-500 text-xs mt-1">{errors.highestQualification.message}</p>}
            
                        <div>
                            <label htmlFor="fieldOfStudy" className="block text-sm font-medium text-gray-700">Field of Study</label>
                            <input
                              id="fieldOfStudy"
                              type="text"
                              {...register('fieldOfStudy', { required: 'Field of Study is required' })}
                              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                            />
                            {errors.fieldOfStudy && <p className="text-red-500 text-xs mt-1">{errors.fieldOfStudy.message}</p>}
                        </div>
                    </div>
                )}
      
                <div>
                    <label htmlFor="feedback" className="block text-sm font-medium text-gray-700">Feedback</label>
                    <textarea
                      id="feedback"
                      {...register('feedback', { required: 'Feedback is required', minLength: { value: 50, message: 'Feedback must be at least 50 characters' } })}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    />
                    {errors.feedback && <p className="text-red-500 text-xs mt-1">{errors.feedback.message}</p>}
                </div>
        
                <button type="submit" className="mt-4 py-2 px-4 bg-indigo-600 text-white font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Submit
                </button>
            </motion.form>
    
            {submittedData && (
                <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }} 
                className="mt-8 p-6 bg-white border border-gray-200 rounded-lg shadow-md- w-1/2">
                    <h2 className="text-lg font-medium text-gray-700 uppercase">Submission Summary</h2>
                    <p><strong>Full Name:</strong> {submittedData.fullName}</p>
                    <p><strong>Email:</strong> {submittedData.email}</p>
                    <p><strong>Survey Topic:</strong> {submittedData.surveyTopic}</p>
                    {submittedData.surveyTopic === 'Technology' && (
                        <>
                            <p><strong>Favorite Programming Language:</strong> {submittedData.favoriteLanguage}</p>
                            <p><strong>Years of Experience:</strong> {submittedData.yearsExperience}</p>
                        </>
                    )}
                    {submittedData.surveyTopic === 'Health' && (
                        <>
                            <p><strong>Exercise Frequency:</strong> {submittedData.exerciseFrequency}</p>
                            <p><strong>Diet Preference:</strong> {submittedData.dietPreference}</p>
                        </>
                    )}
                    {submittedData.surveyTopic === 'Education' && (
                        <>
                            <p><strong>Highest Qualification:</strong> {submittedData.highestQualification}</p>
                            <p><strong>Field of Study:</strong> {submittedData.fieldOfStudy}</p>
                        </>
                    )}
                    <p><strong>Feedback:</strong> {submittedData.feedback}</p>
                </motion.div>
            )}
        </div>
    );
};

export default () => (
  <SurveyForm />
);
