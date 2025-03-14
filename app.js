const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const bcrypt = require('bcrypt');
const path = require('path');
const flash = require('connect-flash');
const User = require('./models/User'); // Adjust path if necessary
const Game = require('./models/Game'); // Adjust path if necessary
const Cart = require('./models/Cart'); // Ensure you have a Cart model defined

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB connection details
const mongoURI = 'mongodb://localhost:27017/gamerhub'; // MongoDB connection

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files
app.use(flash()); // Flash for error messages

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Session management
app.use(session({
    secret: 'secretcode', // Hardcoded session secret
    resave: false,
    saveUninitialized: false
}));

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Middleware to initialize cart in session if it doesn't exist
app.use((req, res, next) => {
    if (!req.session.cart) {
        req.session.cart = { items: [] }; // Initialize cart if it doesn't exist
    }
    next();
});

// Passport Local Strategy
passport.use(new LocalStrategy(
    { usernameField: 'email' },
    async (email, password, done) => {
        try {
            const user = await User.findOne({ email });
            if (!user) {
                return done(null, false, { message: 'Incorrect email.' });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return done(null, false, { message: 'Incorrect password.' });
            }

            return done(null, user);
        } catch (err) {
            return done(err);
        }
    }
));

// Serialize and deserialize user
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});

// MongoDB connection
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('MongoDB connected');
    // Start the server after successful connection
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
})
.catch(err => {
    console.error('MongoDB connection error:', err);
});

// Routes

// Home route to display signup
app.get('/', (req, res) => {
    res.render('signup', { message: req.flash('error') }); // Send error messages if any
});

// Base route to display games with categories
app.get('/base', isAuthenticated, async (req, res) => {
    try {
        const upcomingGames = await Game.find({ category: 'upcoming' });
        const featuredGames = await Game.find({ category: 'featured' });
        const latestGames = await Game.find({ category: 'latest' });

        console.log('Upcoming Games:', upcomingGames); // Log the fetched games

        res.render('base', {
            upcomingGames: upcomingGames,
            featuredGames: featuredGames,
            latestGames: latestGames,
            message: req.flash('error')
        });
    } catch (error) {
        console.error('Error fetching games:', error); // Log any errors
        res.status(500).send('Error fetching games');
    }
});

// Signup route
app.post('/auth/signup', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        if (!username || !email || !password) {
            req.flash('error', 'All fields are required.');
            return res.redirect('/');
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            req.flash('error', 'User with this email already exists.');
            return res.redirect('/');
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        res.redirect('/signin');
    } catch (err) {
        console.error('Error during signup:', err.message);
        req.flash('error', 'Error during signup.');
        res.redirect('/');
    }
});

// Signin route
app.get('/signin', (req, res) => {
    res.render('signin', { message: req.flash('error') });
});

// Signin authentication
app.post('/auth/signin', passport.authenticate('local', {
    successRedirect: '/base',
    failureRedirect: '/signin',
    failureFlash: true
}));

app.get('/signup', (req, res) => {
    res.render('signup', { message: req.flash('error') });
});

// Authentication check middleware
function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash('error', 'Please sign in to access this page.');
    res.redirect('/signin');
}

// Route to view the cart
app.get('/cart', isAuthenticated, async (req, res) => {
    const cart = req.session.cart; // Get cart from the session
    res.render('cart', { cart }); // Pass cart to the EJS template
});

// Route to add a game to the cart
app.post('/cart/add', async (req, res) => {
    const gameId = req.body.gameId;
    const quantity = parseInt(req.body.quantity, 10) || 1;

    try {
        // Fetch the game details from the Game model
        const game = await Game.findById(gameId);
        if (!game) {
            console.log(`Game not found for ID: ${gameId}`);
            return res.status(404).send('Game not found');
        }

        // Log the entire game object to check its contents
        console.log('Fetched game details:', game);

        // Add the item to the session cart
        const existingItemIndex = req.session.cart.items.findIndex(item => item.gameId.toString() === gameId.toString());
        if (existingItemIndex > -1) {
            req.session.cart.items[existingItemIndex].quantity += quantity;
        } else {
            const cartItem = {
                gameId: game._id,
                title: game.title,
                price: game.price,
                imgUrl: game.imgUrl, // Change this from imageUrl to imgUrl
                quantity: quantity
            };
            req.session.cart.items.push(cartItem);
        }

        // Redirect to the cart page
        res.redirect('/cart');
    } catch (error) {
        console.error('Error adding game to cart:', error);
        res.status(500).send('Error adding game to cart');
    }
});



// Route to remove a game from the cart
app.post('/cart/remove', isAuthenticated, (req, res) => {
    const { gameId } = req.body; // Get the gameId from the request body

    // Filter out the item that matches the gameId
    req.session.cart.items = req.session.cart.items.filter(item => item.gameId !== gameId);

    // Redirect to the cart page
    res.redirect('/cart');
});
