const fetchData = async (next) => {
    const url = "https://www.swiggy.com/dapi/restaurants/list/update";
    const headers = {
      "Content-Type": "application/json",
      "Origin": "https://www.swiggy.com",
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.3"
    };
  
    const data = {
      lat: "22.71700",
      lng: "75.83370",
      nextOffset: "CJhlELQ4KICYmrbgvvTqZTCnEzgC",
      page_type: "DESKTOP_WEB_LISTING",
      seoParams: {
        apiName: "FoodHomePage",
        pageType: "FOOD_HOMEPAGE",
        seoUrl: "https://www.swiggy.com/",
      },
      widgetOffset: {
        NewListingView_category_bar_chicletranking_TwoRows: "",
        NewListingView_category_bar_chicletranking_TwoRows_Rendition: "",
        Restaurant_Group_WebView_SEO_PB_Theme: "",
        collectionV5RestaurantListWidget_SimRestoRelevance_food_seo: next,
        inlineFacetFilter: "",
        restaurantCountWidget: "",
      },
      _csrf: "hyvuBRXdkoKm-CvUqQR-l1X9E7SXG3URb9QyBvHE",
    };
  
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error("Error in fetching swiggy restaurant data Api");
      }
  
      const jsonResponse = await response.json();
      return jsonResponse?.data;
    } catch (error) {
      console.error("Error:", error);
      return error;
    }
  };
  
  const update = async (req, res) => {
    const { startIndex } = req.body
    try {
      const data = await fetchData(startIndex.toString());
      res.json({ 
        data 
      });
    } catch (error) {
      res.status(400).json({ message: error });
    }
  };
  
  module.exports = { update };
  