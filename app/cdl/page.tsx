"use client";
import React, { FormEvent, SyntheticEvent, useState } from "react";
import { CldImage, CldUploadButton } from "next-cloudinary";
import Image from "next/image";
import { Blob } from "buffer";
import axios from "axios";

const Page = () => {
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = {
      images,
    };

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(`/api/upload`, formData, config);
    console.log(data);
  };

  const onChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImages((oldArray) => [...oldArray, reader.result]);
          setImagesPreview((oldArray) => [...oldArray, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <div>
      <form
        className="shadow-lg"
        encType="multipart/form-data"
        onSubmit={submitHandler}
      >
        <input
          type="file"
          name="room_images"
          className="custom-file-input"
          id="customFile"
          onChange={onChange}
          multiple
        />
        <label className="custom-file-label" htmlFor="customFile">
          Choose Images
        </label>
        {imagesPreview.map((img) => (
          <img
            src={img}
            key={img}
            alt="Images Preview"
            className="mt-3 mr-2"
            width="55"
            height="52"
          />
        ))}
        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default Page;
