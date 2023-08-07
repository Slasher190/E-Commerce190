import { faker } from "@faker-js/faker";
import axios from "axios";
import cloudinary from "cloudinary";
import { Product } from "../models/productModel.js";

const getData = async (numProducts) => {
  const products = [];

  for (let i = 0; i < numProducts; i++) {
    const name = faker.commerce.productName();
    const description = faker.lorem.paragraph();
    const price = faker.datatype.number({ min: 100, max: 5000 });
    const category = faker.commerce.department();
    const stock = faker.datatype.number({ min: 1, max: 100 });
    const images = [];

    for (let j = 0; j < 3; j++) {
      console.log(category, " ______________ ");
    //   const unsplashApiUrl = `https://api.unsplash.com/photos/random?query=${name}&client_id=${process.env.UNPLASH_ACCESS_KEY}`;
    //   const response = await axios.get(unsplashApiUrl);
    //   const imageUrl = response.data.urls.regular;
    //   console.log(imageUrl);
        const imageUrl = faker.image.imageUrl(320, 320, category, true);
      // Generate a random image URL
      images.push({
        public_id: imageUrl,
        url: imageUrl,
      });
      //   const response = await axios.get(imageUrl, {
      //     responseType: "arraybuffer",
      //   });
      //   const imageBuffer = Buffer.from(response.data, "binary");

      //   // Upload image to Cloudinary
      //   const uploadResult = await cloudinary.v2.uploader.upload_stream(
      //     { resource_type: "auto" },
      //     async (error, result) => {
      //       if (error) {
      //         console.error("Error uploading image to Cloudinary:", error);
      //       } else {
      //         images.push({
      //           public_id: result.public_id,
      //           url: result.secure_url,
      //         });
      //       }
      //     }
      //   );

      //   // Pipe the image buffer to the Cloudinary upload stream
      //   const imageStream = cloudinary.v2.uploader.upload_stream(
      //     uploadResult.public_id
      //   );
      //   imageStream.end(imageBuffer);
    }

    products.push({
      name,
      description,
      price,
      category,
      stock,
      images,
    });
  }

  return products;
};

// Call the function to generate fake products
export const generateFakeProducts = async (req, res, next) => {
  console.log(" called ...");
  try {
    const data = await getData(1000);
    const user = "646499a682db8cff2a2576a1"; // Assuming you have the user ID available in req.user

    const products = await Promise.all(
      data.map(async (productData) => {
        return await Product.create({
          ...productData,
          user, // Include the user field
        });
      })
    );

    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    next(error);
  }
};
