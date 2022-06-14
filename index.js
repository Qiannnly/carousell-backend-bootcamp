import cors from "cors";
import express from "express";

import db from "./db/models/index.cjs";
const { Listing } = db;

const PORT = 3000;
const app = express();

// Enable CORS access to this server
app.use(cors());

// Enable reading JSON request bodies
app.use(express.json());

// Retrieve all listings. No authentication required.
app.get("/listings", async (req, res) => {
  const listings = await Listing.findAll();
  res.json(listings);
});

// Create listing. Requires authentication.
app.post("/listings", async (req, res) => {
  // TODO: Get seller email from auth, query Users table for seller ID

  // Create new listing
  const newListing = await Listing.create({
    title: req.body.title,
    category: req.body.category,
    condition: req.body.condition,
    price: req.body.price,
    description: req.body.description,
    shippingDetails: req.body.shippingDetails,
    BuyerId: null,
    SellerId: "REPLACE_ME", // TODO: Replace with Seller ID of authenticated seller
  });

  // Respond with new listing
  res.json(newListing);
});

// Retrieve specific listing. No authentication required.
app.get("/listings/:listingId", async (req, res) => {
  const listing = await Listing.findByPk(req.params.listingId);
  res.json(listing);
});

// Buy specific listing. Requires authentication.
app.put("/listings/:listingId/buy", async (req, res) => {
  // TODO: Get buyer email from auth, query Users table for buyer ID
  await Listing.update(
    { BuyerId: "REPLACE_ME" },
    {
      where: {
        id: req.params.listingId,
      },
    }
  );
  // Respond to acknowledge update
  res.end();
});

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});
