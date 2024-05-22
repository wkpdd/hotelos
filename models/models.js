// Import Sequelize and database connection
// env
require('dotenv').config()

const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize( process.env.DATABASE, process.env.DBUSERNAME, process.env.DBPASSWORD, {
    host: process.env.HOST,
    dialect: 'mysql' // Or any other dialect you're using
});

// Define Hotel model
const Hotel = sequelize.define('Hotel', {
    hotel_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: DataTypes.STRING,
    location: DataTypes.STRING,
    description: DataTypes.TEXT,
    rating: DataTypes.FLOAT,
    image_url: DataTypes.STRING
});
const Floor = sequelize.define('Floor', {
    floor_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    hotel_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Hotel,
            key: 'hotel_id'
        }
    },
    floor_number: DataTypes.STRING
});
// Define Room model
const Room = sequelize.define('Room', {
    room_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    room_number: DataTypes.STRING,
    floor_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Floor,
            key: 'floor_id'
        }
    },
    type: DataTypes.STRING,
    price: DataTypes.FLOAT,
    available: DataTypes.BOOLEAN
});

// Define Floor model


// Define Booking model
const Booking = sequelize.define('Booking', {
    booking_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    check_in_date: DataTypes.DATE,
    check_out_date: DataTypes.DATE,
    status: DataTypes.STRING
});

// Define Models model
const User = sequelize.define('User', {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
});

// Define user Access
const Role = sequelize.define('Role', {
    role_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    name: DataTypes.STRING
});
const UserAccess = sequelize.define('UserAccess', {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: User,
            key: 'user_id'
        }
    },
    role_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: Role,
            key: 'role_id'
        }
    }
});


// Define Role model



// Define Review model
const Review = sequelize.define('Review', {
    review_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    rating: DataTypes.FLOAT,
    comment: DataTypes.TEXT,
    created_at: DataTypes.DATE
});

// Define Admin model
const Admin = sequelize.define('Admin', {
    admin_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
});

const ResponseMessages = sequelize.define('ResponseMessages', {
    message_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    message: DataTypes.STRING
});

// Define relationships
Hotel.hasMany(Room, { foreignKey: 'hotel_id' });
Hotel.hasMany(Floor, { foreignKey: 'hotel_id' });
Floor.belongsTo(Hotel, { foreignKey: 'hotel_id' });
Room.belongsTo(Hotel, { foreignKey: 'hotel_id' });

Hotel.hasMany(Review, { foreignKey: 'hotel_id' });
Review.belongsTo(Hotel, { foreignKey: 'hotel_id' });

User.hasMany(Booking, { foreignKey: 'user_id' });
Booking.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(Review, { foreignKey: 'user_id' });
Review.belongsTo(User, { foreignKey: 'user_id' });

User.hasOne(Admin, { foreignKey: 'user_id' });
Admin.belongsTo(User, { foreignKey: 'user_id' });

// Sync models with the database
sequelize.sync({ force: false }).then(() => {
    console.log('Database & tables created!');
}).catch(err => {
    console.error('Unable to create database & tables:', err);
});

// Export models
module.exports = {
    Hotel,
    Room,
    Booking,
    User,
    Review,
    Admin,
    Floor,
    Role,
    ResponseMessages
};
