import React from "react";

const ShowSelectedFile = ({ images, handleDelete }) => {
  return (
    <div className="container-fluid mt-5">
      {images && images.length > 0 && (
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">
                  <span class="sr-only">Image</span>
                  Images
                </th>
                <th scope="col" class="px-6 py-3">
                  Name
                </th>
                <th scope="col" class="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {images.map((item, index) => {
                return (
                  <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td class="w-1/2 h-1/3 p-4">
                      <img src={URL.createObjectURL(item)} alt="Apple Watch" />
                    </td>
                    <td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {item.name}
                    </td>
                    <td class="px-6 py-4">
                      {/* <a
                        class="font-medium text-red-600 dark:text-red-500 hover:underline"
                        >
                      Red
                      </a> */}
                      <button
                        onClick={() => handleDelete(index)}
                        type="button"
                        class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ShowSelectedFile;
