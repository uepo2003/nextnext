"use client";

import React from "react";
import { PhotoDndUploader } from "../photoDndUploader";
import { FaIcons } from "react-icons/fa6";

export const PhotoUploader = ({
  onChange,
}: {
  onChange: (file: Blob) => void;
}) => {
  return (
    <PhotoDndUploader
      className="bg-center bg-cover"
      areaClassName="flex flex-col justify-center items-center text-center h-72 border-2 border-dashed border-gray-200 rounded-[var(--border-radius)] bg-no-repeat bg-center bg-gray-100 bg-contain transition duration-200"
      dragActiveClassName="text-white bg-gray-900"
      maxUploadFileSize={1024 * 1024 * 15}
      maxUploadRectSize={3840}
      onChange={onChange}
    >
      {(isDragActive) => (
        <>
          <FaIcons
            type="upload"
            size="large"
            className="w-32 h-32"
            color={isDragActive ? "orange" : "gray"}
          />
          <div className="font-bold text-lg mt-4">
            ここに写真をドロップするか
            <br />
            クリックしてファイルを選択
          </div>
        </>
      )}
    </PhotoDndUploader>
  );
};
