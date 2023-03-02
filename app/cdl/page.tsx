"use client";
import React, { ChangeEvent, SyntheticEvent, useState } from "react";
import Image from "next/image";

const Page = () => {
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const submitHandler = async (e: SyntheticEvent) => {
    e.preventDefault();
    const formData = {
      images,
    };

    // const config = {
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // };

    // const { data } = await axios.post(`/api/upload`, formData, config);
    const res = await fetch(`/api/upload`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    console.log(data);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files as FileList);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImages((prevArray) => [...prevArray, reader.result] as any);
          setImagesPreview((prevArray) => [...prevArray, reader.result] as any);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <div>
      <form encType="multipart/form-data" onSubmit={submitHandler}>
        <input
          type="file"
          name="upload_images"
          id="customFile"
          onChange={onChange}
          multiple
        />
        <label htmlFor="customFile">Choose Images</label>
        {imagesPreview.map((img) => (
          <Image
            src={img}
            key={img}
            alt="Images Preview"
            className="mt-3 mr-2"
            width="100"
            height="100"
          />
        ))}
        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default Page;
