import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import bcrypt from 'bcryptjs';
import User from '../models/user.js';

// JWT Strategy
passport.use(
  new JwtStrategy(
    {
      secretOrKey: "e8d3a477d8e6b4c3fb4b00756bf3feca784e2e1a9396d7d834af0602e1d6eaa7", // Use environment variable
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    async (jwtPayload, done) => {
      try {
        // Find the user by ID stored in the JWT payload
        const user = await User.findById(jwtPayload.id);

        if (!user) {
          return done(null, false, { message: 'User not found' });
        }

        // User exists, pass the user object to the next middleware
        return done(null, user);
      } catch (error) {
        // Handle errors
        return done(error, false);
      }
    }
  )
);

// Local Strategy
passport.use(
  new LocalStrategy(
    async (username, password, done) => {
      try {
        const user = await User.findOne({ username });
        if (!user) {
          return done(null, false, { message: 'Incorrect username' });
        }

        // Check if password matches
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return done(null, false, { message: 'Incorrect password' });
        }

        return done(null, user); // Successful authentication
      } catch (err) {
        return done(err);
      }
    }
  )
);

// Serialize User
passport.serializeUser((user, done) => {
  done(null, user._id);
});

// Deserialize User
passport.deserializeUser(async (_id, done) => {
  try {
    const user = await User.findById(_id);
    if (!user) {
      return done(null, false, { message: 'User not found during deserialization' });
    }
    done(null, user);
  } catch (error) {
    done(error);
  }
});

export default passport;
