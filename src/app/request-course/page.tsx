
export default function RequestCourse() {
    return (
      <main className="max-w-3xl mx-auto px-4 py-8 pt-14">
        {/* Page Title */}
        <h1 className="text-3xl font-bold mb-6">Request a New Course</h1>
  
        {/* Instructions */}
        <p className="text-gray-700 mb-4">
          Please fill out the form below to request a new course. Our team will review your submission and add it to the list if approved.
        </p>
  
        {/* Form */}
        <form className="space-y-4">
          {/* Course Name */}
          <div>
            <label htmlFor="courseName" className="block text-sm font-medium text-gray-700">
              Course Name
            </label>
            <input
              type="text"
              id="courseName"
              name="courseName"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="e.g., Calculus II"
              required
            />
          </div>
  
          {/* Course Code */}
          <div>
            <label htmlFor="courseCode" className="block text-sm font-medium text-gray-700">
              Course Code
            </label>
            <input
              type="text"
              id="courseCode"
              name="courseCode"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="e.g., MATH102"
              required
            />
          </div>
  
          {/* Course Description */}
          <div>
            <label htmlFor="courseDescription" className="block text-sm font-medium text-gray-700">
              Course Description
            </label>
            <textarea
              id="courseDescription"
              name="courseDescription"
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Provide a brief description of the course."
            />
          </div>
  
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
          >
            Submit Request
          </button>
        </form>
      </main>
    );
  }