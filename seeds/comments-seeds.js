const { Comment } = require('../models');

const commentData = [
    {
        comment: "It's crazy to see the amount of innovation that happens in the Robotics industry ever year!",
        user_id: 1,
        post_id: 1,
        
    },
    {
        comment: "I just wish these EVs were more affordable :( .",
        user_id: 2,
        post_id: 2,
        
    },
    {
        comment: "I skipped the Quest 2, but I might just have to get myself this version",
        user_id: 4,
        post_id: 3,
        
    },
    {
        comment: "Oh boy, more jobs being affected by AI...",
        user_id: 4,
        post_id: 4,
        
    },
    {
        comment: "At this rate, phones will have better specs than the Swich!",
        user_id: 5,
        post_id: 5,
        
    },
    {
        comment: "Wrap it up Nintendo",
        user_id: 1,
        post_id: 5,
        
    },
    {
        comment: "Tesla autopilot fail incoming ",
        user_id: 5,
        post_id: 2,
        
    },
    {
        comment: "Anyone else creeped out about how fast robots and Ai are advancing?",
        user_id: 5,
        post_id: 1,
        
    }
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;