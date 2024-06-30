export const getAspectRatio = (file: File): Promise<number> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const image = new Image();
      image.onload = () => {
        resolve(image.width / image.height);
      };
      image.src = reader.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const cropImage = (file: File, aspectRatio: number): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const image = new Image();
      image.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Failed to get 2D context"));
          return;
        }

        const width = image.width;
        const height = image.height;
        let cropWidth = width;
        let cropHeight = height;

        if (width / height > aspectRatio) {
          cropWidth = height * aspectRatio;
        } else {
          cropHeight = width / aspectRatio;
        }

        canvas.width = cropWidth;
        canvas.height = cropHeight;
        ctx.drawImage(
          image,
          (width - cropWidth) / 2,
          (height - cropHeight) / 2,
          cropWidth,
          cropHeight,
          0,
          0,
          cropWidth,
          cropHeight
        );

        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error("Failed to crop image"));
            }
          },
          "image/jpeg",
          0.9
        );
      };
      image.src = reader.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const resizeImage = (
  blob: Blob,
  width: number,
  height: number
): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const image = new Image();
      image.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Failed to get 2D context"));
          return;
        }

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(image, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error("Failed to resize image"));
            }
          },
          "image/jpeg",
          0.9
        );
      };
      image.src = reader.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};
