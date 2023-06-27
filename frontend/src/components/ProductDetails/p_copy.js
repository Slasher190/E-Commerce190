import React from "react";
import { Typography, Box, Grid, Card, CardContent, Button } from "@mui/material";
import Rating from "@mui/material/Rating";
import { styled } from "@mui/system";
import Carousel from "react-material-ui-carousel";
const ProductDetail = () => {
  const product = {
    name: "Sample Product",
    rating: 4.5,
    description: "This is a sample product description.",
    price: 19.99,
    inStock: true,
    images: [
      "https://m.media-amazon.com/images/I/61XX59hS-+L._UY695_.jpg",
      "https://m.media-amazon.com/images/I/61BDHVSfxRL._UY695_.jpg",
      "https://m.media-amazon.com/images/I/61zyWZN97PL._UY695_.jpg",
    ],
    reviews: generateReviews(5),
  };

  function generateReviews(count) {
    const reviews = [];
    for (let i = 1; i <= count; i++) {
      reviews.push({
        author: `Review Author ${i}`,
        rating: Math.floor(Math.random() * 5) + 1,
        comment: `This is review ${i} for the product.`,
      });
    }
    return reviews;
  }
  const addToCart = () => {
    // Add the product to the cart
    console.log("Product added to cart");
  };

  const increaseQuantity = () => {
    setCartQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    if (cartQuantity > 1) {
      setCartQuantity((prevQuantity) => prevQuantity - 1);
    }
  };
  const [selectedImageIndex, setSelectedImageIndex] = React.useState(0);
  const [cartQuantity, setCartQuantity] = React.useState(1);

   return (
    <Box mt={4} sx={{ p: "6vmax" }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={2}>
          <Card>
            <CardContent>
              <ThumbnailGallery
                images={product.images}
                selectedImageIndex={selectedImageIndex}
                onImageClick={(index) => setSelectedImageIndex(index)}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Carousel
                autoPlay={true}
                indicators={true}
                navButtonsAlwaysVisible={true}
                navButtonsProps={{
                  style: { backgroundColor: "#ffffff", borderRadius: 0 },
                }}
                style={{ maxWidth: "100%", height: "auto" }}
                index={selectedImageIndex}
              >
                {product.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Product Image ${index + 1}`}
                    style={{
                      width: "100%",
                      maxHeight: "400px",
                      objectFit: "contain",
                    }}
                  />
                ))}
              </Carousel>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                {product.name}
              </Typography>
              <Box mb={2}>
                <Rating name="product-rating" value={product.rating} readOnly />
              </Box>
              <Typography variant="body1" color="textSecondary" gutterBottom>
                {product.description}
              </Typography>
              <Typography variant="h6" gutterBottom>
                Price: ${product.price.toFixed(2)}
              </Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                {product.inStock ? "In Stock" : "Out of Stock"}
              </Typography>
              <Box mt={2}>
                <Typography variant="h6" gutterBottom>
                  Reviews
                </Typography>
                {product.reviews.map((review, index) => (
                  <ReviewCard key={index}>
                    <CardContent>
                      <Typography variant="subtitle2" gutterBottom>
                        {review.author}
                      </Typography>
                      <Rating
                        name={`review-rating-${index}`}
                        value={review.rating}
                        readOnly
                      />
                      <Typography variant="body2" color="textSecondary">
                        {review.comment}
                      </Typography>
                    </CardContent>
                  </ReviewCard>
                ))}
              </Box>
              <Box mt={2}>
                <Typography variant="h6" gutterBottom>
                  Quantity
                </Typography>
                <Box display="flex" alignItems="center">
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={decreaseQuantity}
                  >
                    -
                  </Button>
                  <Typography
                    variant="body1"
                    component="span"
                    style={{ margin: "0 10px" }}
                  >
                    {cartQuantity}
                  </Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={increaseQuantity}
                  >
                    +
                  </Button>
                </Box>
              </Box>
              <Box mt={2}>
                <Button variant="contained" onClick={addToCart}>
                  Add to Cart
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

const ReviewCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const ThumbnailGallery = ({ images, selectedImageIndex, onImageClick }) => (
  <Box display="flex" flexDirection="column" alignItems="center">
    {images.map((image, index) => (
      <ThumbnailImage
        key={index}
        src={image}
        alt={`Product Image ${index + 1}`}
        className={index === selectedImageIndex ? "active" : ""}
        onClick={() => onImageClick(index)}
      />
    ))}
  </Box>
);

const ThumbnailImage = styled("img")({
  width: "100px",
  height: "100px",
  objectFit: "cover",
  cursor: "pointer",
  margin: "8px",
  borderRadius: "4px",
  border: "2px solid transparent",
  "&.active": {
    border: "2px solid #000000",
  },
});

export default ProductDetail;
