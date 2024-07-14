const fetchData = async (resId) => {
    const url = "https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=21.1458004&lng=79.0881546&restaurantId="+resId;
    
    const headers = {
      "Content-Type": "application/json",
      "Origin" : "https://www.swiggy.com",
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.3",
    };
  
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: headers,
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
  
  const menu = async (req, res) => {
    const { resId } = req.params
    try {
      const data = await fetchData(resId);
      res.json({data: data} );
    } catch (error) {
      res.status(400).json({ message: error });
    }
  };
  
  module.exports = { menu };
  