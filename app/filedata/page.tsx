"use client";
import React, { ChangeEvent, SyntheticEvent, useState } from "react";
import Image from "next/image";

const Page = () => {
  const [images, setImages] = useState([]);

  const submitHandler = async (e: SyntheticEvent) => {
    e.preventDefault();
    const formData = {
      images,
    };

    const res = await fetch(`/api/upload`, {
      method: "POST",
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    console.log(data);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files as FileList);

    // setImages([]);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImages((prevArray) => [...prevArray, reader.result] as any);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <div>
      <form
        encType="multipart/form-data"
        onSubmit={submitHandler}
        className="flex flex-col items-center gap-2"
      >
        <input
          type="file"
          name="upload_images"
          id="uploadFile"
          onChange={onChange}
          multiple
          accept="image/*"
        />
        <label htmlFor="uploadFile">Choose Images</label>
        <div className="flex flex-wrap gap-2">
          {images.map((img) => (
            <Image
              src={img}
              key={img}
              alt="Images Preview"
              width="100"
              height="100"
            />
          ))}
        </div>
        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default Page;
