module.exports = {
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1", // Optional: Configure aliases for your webpack paths
  },
  transform: {
    "^.+\\.jsx?$": "babel-jest", // Process JavaScript files with Babel
  },
};
