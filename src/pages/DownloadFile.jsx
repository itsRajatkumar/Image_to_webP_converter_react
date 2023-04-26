import React from "react";

const DownloadFile = ({
  convertedImages,
  handleDownload,
  handleDownloadAll,
  handleDeleteConvertedImage,
}) => {
  return (
    <div className="container-fluid p-10">
      <div className="mb-5 mx-auto flex justify-end items-center">
        <button
          disabled={convertedImages.length === 0}
          onClick={handleDownloadAll}
          type="button"
          class={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${
            convertedImages.length === 0 && "opacity-50 cursor-not-allowed"
          }`}
        >
          Download All as Zip
          <svg
            aria-hidden="true"
            class="w-5 h-5 ml-2 -mr-1"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                <span class="">Image</span>
              </th>
              <th scope="col" class="px-6 py-3">
                Download
              </th>
              <th scope="col" class="px-6 py-3">
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {convertedImages.map((item, index) => {
              console.log(item);
              return (
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td class="w-1/3 h-1/3 p-4">
                    <img src={URL.createObjectURL(item)} alt="Apple Watch" />
                  </td>
                  <td class="px-6 h-full py-4">
                    <button
                      onClick={() => handleDownload(index)}
                      class="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
                    >
                      <span class="relative items-center justify-center p-0.5 inline-flex px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                        Download{" "}
                        <svg
                          fill="none"
                          stroke="currentColor"
                          className="h-6 w-6 ml-2"
                          stroke-width="1.5"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M12 9.75v6.75m0 0l-3-3m3 3l3-3m-8.25 6a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                          ></path>
                        </svg>
                      </span>
                    </button>
                    <a class="font-medium text-red-600 dark:text-red-500 hover:underline"></a>
                  </td>
                  <td class="px-6 h-full py-4 ">
                    <button
                      onClick={() => handleDeleteConvertedImage(index)}
                      type="button"
                      class="text-white inline-flex items-center justify-center bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                    >
                      Remove{" "}
                      <svg
                        fill="none"
                        stroke="currentColor"
                        className="h-6 w-6 ml-2"
                        stroke-width="1.5"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        ></path>
                      </svg>
                    </button>
                    <a class="font-medium text-red-600 dark:text-red-500 hover:underline"></a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DownloadFile;
