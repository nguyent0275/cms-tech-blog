const { Post } = require('../models');

const postData = [
    {
        title: "The Robotic Wave at CES",
        content: "Discover the latest robotic innovations from CES 2024, where a variety of cutting-edge robots were unveiled.",
        user_id: 2
    },
    {
        title: "The 5 Best Electric Cars on the Market",
        content: "Let's talk about the five best electric cars in the world right now -- some of which aren't available in the U.S.",
        user_id: 3
    },
    {
        title: "Impressions of Meta Quest 3: The Must-Have VR Gift for the Holidays?",
        content: "Let's talk about what Meta Quest 3 got right, what it will need to improve, and what a killer app or game for this device might look like.",
        user_id: 1

    },
    {
        title: "With the Advent of AI, It's Time To Rethink Human Resources",
        content: "Still, too often, AI is positioned as a threat to employees instead of a benefit. Let's talk about the potential of AI to improve employee-employer relations and help executive...",
        user_id: 5
    },
    {
        title: "The Future of Handheld Gaming Could Dominate This Holiday Season",
        content: "Qualcomm has three new platforms for handheld gaming, targeting various user needs.",
        user_id: 4
    }
]

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;