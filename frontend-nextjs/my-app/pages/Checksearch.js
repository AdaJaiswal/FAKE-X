import React from "react";

const Checksearch = () => {
  return (
    <div>
      <div class="mx-auto max-w-md">
        <div class="relative">
          <input
            type="text"
            placeholder="Search on YouTube"
            class="w-full px-4 py-2 text-xl rounded-lg shadow-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />

          <div class="absolute z-10 w-full bg-white mt-2 border border-gray-300 rounded-lg shadow-lg">
            <ul class="divide-y divide-gray-300">
              <li class="px-4 py-2 cursor-pointer hover:bg-gray-100">
                Suggestion 1
              </li>
              <li class="px-4 py-2 cursor-pointer hover:bg-gray-100">
                Suggestion 2
              </li>
              <li class="px-4 py-2 cursor-pointer hover:bg-gray-100">
                Suggestion 3
              </li>
              <li class="px-4 py-2 cursor-pointer hover:bg-gray-100">
                Suggestion 4
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checksearch;
