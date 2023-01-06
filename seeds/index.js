const mongoose = require('mongoose');
const cities = require('./cities')
const Campground = require('../models/campground')
const { places, descriptors } = require('./seedHelpers')
//mongoose

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)]

const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random()*1000)
        const price = Math.floor(Math.random() * 20);
        const camp = new Campground({
            author: '63accbc03d1bae1482c86b0a',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: 'https://source.unsplash.com/collection/483251',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis obcaecati ipsam, nostrum tempore quibusdam quas. At, odit? Distinctio minima quidem dolores, dolor officia aliquam assumenda veritatis tenetur harum delectus deserunt!',
            price,
            image: [
                {
                  url: 'https://res.cloudinary.com/dwjhxlhdg/image/upload/v1672693158/YelpCamp/qcsoc4aq7k3z0rsofd1a.jpg',
                  filename: 'YelpCamp/qcsoc4aq7k3z0rsofd1a'
                },
                {
                  url: 'https://res.cloudinary.com/dwjhxlhdg/image/upload/v1672693159/YelpCamp/o6dbaxbbeqhrxdmcncle.webp',
                  filename: 'YelpCamp/o6dbaxbbeqhrxdmcncle'
                }
              ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});