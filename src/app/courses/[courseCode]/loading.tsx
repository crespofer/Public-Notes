export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[40vh]">
      <svg
        className="animate-spin h-10 w-10 text-gray-400 mb-4"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        />
      </svg>
      <p className="text-lg text-gray-600 font-medium">Loading course notes...</p>
    </div>
  );
}