const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
require('dotenv').config()
const express = require('express')

const app = express();
const port = process.env.PORT || 3000

// using middleware
app.use(cors());




const uri = "mongodb+srv://huntUser:muhammad98@muhammadcluster.h7migjc.mongodb.net/?retryWrites=true&w=majority&appName=MuhammadCluster";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

     const db = client.db("huntFoodsDB");
    const allFoodCollection = db.collection("allFoods") 


    app.get("/allFoods", async(req, res)=>{
      const search = req.query.search;
      const category = req.query.category;
      const region = req.query.region;
      const sort = req.query.sort;
      const price = req.query.price;

      let query = {};
      if (search) {
        query.name = { $regex: search, $options: "i" };
      }
      if (category) {
        query.category = category;
      }
      if (region) {
        query.region = region;
      }
      if (price) {
        const [minPrice, maxPrice] = price.split("-").map(Number);
        query.price = { $gte: minPrice, $lte: maxPrice };
      }
      const result = await allFoodCollection.find(query).toArray();
      if (result.length === 0) {
        return res.status(204).send();
      }
      res.send(result);
    })


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);





app.get('/', (req, res) => {
  res.send('My server is running!')
})

app.listen(port, () => {
  console.log(`My app listening on port ${port}`)
})