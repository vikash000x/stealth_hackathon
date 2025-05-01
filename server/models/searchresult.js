import mongoose from "mongoose";

const ExtractedSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  externalLink: {
    type: String
  }
});

const ClientIntelSchema = new mongoose.Schema({
  client: {
    type: String,
    required: true
  },
  extracted: {
    type: [ExtractedSchema],
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const SearchResultsss = mongoose.model('searchresultsss', ClientIntelSchema);
export default SearchResultsss;
