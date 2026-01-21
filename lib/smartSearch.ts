export interface SmartSearchFilters {
  search: string;
  filters: Record<string, string>;
}

export function parseSmartSearch(query: string): SmartSearchFilters {
  const filters: Record<string, string> = {};
  let cleanQuery = query.toLowerCase();

  // 1. Listing Type
  if (/\b(rent|lease|let)\b/i.test(cleanQuery)) {
    filters.listing_type = "rent";
    cleanQuery = cleanQuery.replace(/\b(for\s+)?(rent|lease|let)\b/gi, "");
  } else if (/\b(buy|sale|sell|purchase)\b/i.test(cleanQuery)) {
    filters.listing_type = "sale";
    cleanQuery = cleanQuery.replace(/\b(for\s+)?(buy|sale|sell|purchase)\b/gi, "");
  }

  // 2. Property Type
  // Map user terms to backend expected values if known, or pass as property_type
  // Common terms: apartment, flat, house, land, duplex, bungalow, shop, office
  const propertyTypes = [
    "apartment",
    "flat",
    "house",
    "land",
    "duplex",
    "bungalow",
    "shop",
    "office",
    "warehouse",
  ];
  
  for (const type of propertyTypes) {
    const regex = new RegExp(`\\b${type}s?\\b`, "i");
    if (regex.test(cleanQuery)) {
      // Map 'flat' to 'apartment' if backend prefers one, or keep distinct
      filters.property_type = type === "flat" ? "apartment" : type;
      // We don't necessarily remove property type from query as it helps context, 
      // but if we filter by it, maybe we should. Let's keep it for now in search text too 
      // unless we want strictly filter-only behavior. 
      // Decision: Remove from search text to avoid double-filtering issues if backend is strict.
      // cleanQuery = cleanQuery.replace(regex, ""); 
      break; // Assume one primary property type per search
    }
  }

  // 3. Location (Common Nigerian Locations - expandable list)
  const locations = [
    "lekki",
    "ikeja",
    "victoria island",
    "vi",
    "abuja",
    "yaba",
    "surulere",
    "magodo",
    "ajah",
    "ikoyi",
    "maryland",
    "gbagada",
    "osogbo",
    "ibadan",
    "port harcourt",
    "ph",
  ];

  for (const loc of locations) {
    const regex = new RegExp(`\\b${loc}\\b`, "i");
    if (regex.test(cleanQuery)) {
      filters.location = loc === "vi" ? "victoria island" : loc === "ph" ? "port harcourt" : loc;
      // cleanQuery = cleanQuery.replace(regex, "");
      break; 
    }
  }

  // 4. Price Parsing
  // Patterns: "under 5m", "at least 1m", "min 500k", "10,000,000"
  
  // Regex Breakdown:
  // Group 1: Min context (at least, min, above, from)
  // Group 2: Max context (under, below, max, budget)
  // Group 3: Currency symbol (optional, non-capturing)
  // Group 4: The Number
  // Group 5: Suffix (k, m, million, etc) - Optional now
  const priceRegex = /(?:(at\s*least|min|minimum|above|from)|(under|below|max|maximum|budget))?\s*(?:₦|NGN)?\s*(\d+(?:[.,]\d+)?)\s*(k|m|million|billion|b)?\b/i;
  const match = cleanQuery.match(priceRegex);

  if (match) {
    const minContext = match[1];
    const maxContext = match[2]; 
    
    let rawNum = parseFloat(match[3].replace(/,/g, ""));
    const multiplierStr = match[4]?.toLowerCase();
    
    let multiplier = 1;
    if (multiplierStr === "k") multiplier = 1000;
    else if (multiplierStr === "m" || multiplierStr === "million") multiplier = 1000000;
    else if (multiplierStr === "b" || multiplierStr === "billion") multiplier = 1000000000;

    const isPrice = multiplierStr || match[1] || match[2] || rawNum > 1000;

    if (isPrice) {
        const price = rawNum * multiplier;
        
        if (maxContext) {
            // "Under 5m" -> Max: 5m, Min: 0
            filters.price_max = price.toString();
            if (!filters.price_min) {
                filters.price_min = "0";
            }
        } else {
            // "At least 5m" (minContext) OR "5m" (Ambiguous)
            // User Request: "if... no clear indication... put it as min and assume a reasonable max"
            // So default behavior is Min Price.
            filters.price_min = price.toString();
            
            // We do not set a max price here ("reasonable max" = unlimited/undefined)
        }
        
        cleanQuery = cleanQuery.replace(match[0], "");
    }
  }

  // 5. Cleanup extra spaces
  cleanQuery = cleanQuery.replace(/\s+/g, " ").trim();

  return {
    search: cleanQuery,
    filters,
  };
}
