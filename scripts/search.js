// search.js
function handleSearch(query) {
    if (!query) return;
  
    // Define keywords for determining the target page
    const mountainKeywords = ['mountain', 'mt', 'peak', 'hill'];
    const parkKeywords = [
      'park', 'national', 'memorial', 'reserve', 'forest',
      'garden', 'preserve', 'sanctuary', 'wildlife', 'trail', 'island'
    ];
  
    // Check if the query contains any park-related keywords
    const isPark = parkKeywords.some(keyword => query.toLowerCase().includes(keyword));
    // Check if the query contains any mountain-related keywords
    const isMountain = mountainKeywords.some(keyword => query.toLowerCase().includes(keyword));
  
    // Determine the redirect URL based on the query
    let redirectUrl = 'mountains.html'; // Default to mountains page
    if (isPark && !isMountain) {
      redirectUrl = 'national-parks.html';
    }
  
    // Encode the search query
    const encodedQuery = encodeURIComponent(query);
  
    // Redirect to the target page with the query as a parameter
    window.location.href = `${redirectUrl}?search=${encodedQuery}`;
  }
  