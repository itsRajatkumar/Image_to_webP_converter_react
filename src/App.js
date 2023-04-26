import React, { useState } from "react";
import { saveAs } from "file-saver";
import JSZip from "jszip";
import { Routes, Route, useNavigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import SelectFile from "./pages/SelectFile";
import DownloadFile from "./pages/DownloadFile";

const ImageConverter = () => {
  const [images, setImages] = useState([]);
  const [convertedImages, setConvertedImages] = useState([]);
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(0);
  const [quality, setQuality] = useState(0.8);
  const [isConverting, setIsConverting] = useState(false);
  const navigate = useNavigate();
  const handleImageChange = (event) => {
    const files = event.target.files;
    const uploadedImages = [...images];
    for (let i = 0; i < files.length; i++) {
      uploadedImages.push(files[i]);
    }
    setImages(uploadedImages);
  };

  const handleConversion = () => {
    setIsConverting(true);
    const converted = [];
    const promises = images.map((image) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const img = new Image();
          img.onload = () => {
            const canvas = document.createElement("canvas");
            // canvas.width = img.width;
            // canvas.height = img.height;
            if (height === 0) {
              canvas.width = width;
              canvas.height = (width * img.height) / img.width;
            } else {
              canvas.width = width;
              canvas.height = height;
            }
            canvas
              .getContext("2d")
              .drawImage(img, 0, 0, canvas.width, canvas.height);
            canvas.toBlob(
              (blob) => {
                converted.push(blob);
                resolve();
              },
              "image/webp",
              quality
            );
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
        navigate("/download");
        setIsConverting(false);
      })
      .catch((err) => {
        setIsConverting(false);
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

  const handleDelete = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };

  const handleDeleteConvertedImage = (index) => {
    const updatedImages = [...convertedImages];
    updatedImages.splice(index, 1);
    setConvertedImages(updatedImages);
  };

  const onDropFileHandler = (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    const uploadedImages = [...images];
    for (let i = 0; i < files.length; i++) {
      uploadedImages.push(files[i]);
    }
    setImages(uploadedImages);
  };

  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <SelectFile
              handleImageChange={handleImageChange}
              handleConversion={handleConversion}
              handleDelete={handleDelete}
              onDropFileHandler={onDropFileHandler}
              images={images}
              width={width}
              setWidth={setWidth}
              height={height}
              setHeight={setHeight}
              quality={quality}
              setQuality={setQuality}
              isConverting={isConverting}
              setIsConverting={setIsConverting}
            />
          }
        />
        <Route
          path="/download"
          element={
            <DownloadFile
              convertedImages={convertedImages}
              handleDownload={handleDownload}
              handleDownloadAll={handleDownloadAll}
              handleDeleteConvertedImage={handleDeleteConvertedImage}
            />
          }
        />
      </Routes>
    </>
  );
};

export default ImageConverter;
