import React, { useState } from "react";
import { saveAs } from "file-saver";
import JSZip from "jszip";

const ImageConverter = () => {
  const [images, setImages] = useState([]);
  const [convertedImages, setConvertedImages] = useState([]);

  const handleImageChange = (event) => {
    const files = event.target.files;
    const uploadedImages = [...images];
    for (let i = 0; i < files.length; i++) {
      uploadedImages.push(files[i]);
    }
    setImages(uploadedImages);
  };

  const handleConversion = () => {
    const converted = [];
    const promises = images.map((image) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const img = new Image();
          img.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            canvas.getContext("2d").drawImage(img, 0, 0, img.width, img.height);
            canvas.toBlob((blob) => {
              converted.push(blob);
              resolve();
            }, "image/webp");
          };
          img.onerror = (err) => {
            reject(err);
          };
          img.src = reader.result;
        };
        reader.onerror = (err) => {
          reject(err);
        };
        reader.readAsDataURL(image);
      });
    });

    Promise.all(promises)
      .then(() => {
        setConvertedImages(converted);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleDownload = (index) => {
    saveAs(convertedImages[index], `image-${index}.webp`);
  };

  const handleDownloadAll = () => {
    const zip = new JSZip();
    convertedImages.forEach((blob, index) => {
      zip.file(`image-${index}.webp`, blob);
    });
    zip.generateAsync({ type: "blob" }).then((content) => {
      saveAs(content, "converted-images.zip");
    });
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageChange}
      />
      <button onClick={handleConversion}>Convert to WebP</button>
      {convertedImages.length > 0 && (
        <div>
          <h3>Converted Images</h3>
          {convertedImages.map((blob, index) => (
            <div key={index}>
              <button onClick={() => handleDownload(index)}>Download</button>
              <img src={URL.createObjectURL(blob)} alt={`image-${index}`} />
            </div>
          ))}
          <button onClick={handleDownloadAll}>Download All</button>
        </div>
      )}
    </div>
  );
};

export default ImageConverter;
