// server/controllers/searchController.js
import { runLangChainPipeline } from '../langchain/agent.js';
import { scrapeCompany } from '../services/scraper.js';
import SearchResultsss from '../models/searchresult.js'; // Import the new model


export const handleSearch = async (req, res) => {

  const { client } = req.query;

  const existing = await SearchResultsss.findOne({ client });


  if (existing){ 
    console.log("Found existing result in database  for client:");
   
    return res.json(existing);
}

console.log("data does not found in database, scraping for client:", client);
 const scraped = await scrapeCompany(client);
    
 const scrapedText = scraped 
  .map(item => `Title: ${item.title}\nDescription: ${item.description}\nLink: ${item.externalLink}`)
  .join('\n\n');

// ✅ Respond with scraped data
// res.json({ result: scraped });
const { extracted } = await runLangChainPipeline(scrapedText, client); 
 console.log("Extracted data in controller:");

// client is companyName
if (!Array.isArray(extracted)) {
  console.error("Extracted data is not an array:", extracted);
  return res.status(500).json({ error: "Extracted data is not an array" });
}
 

try {
  const result = new SearchResultsss({ client, extracted });
  await result.save();
  console.log("Saved result to database:");
  res.json(result);
} catch (error) {
  console.error("Error saving result:", error);
  res.status(500).json({ error: "Database save failed" });
}

};
