export const menuBackend = async () => {
    // console.log('a')
    try {
      const response = await fetch(
        'http://203.247.166.29:8000/menu/api/lists/'    
      );
      const json = await response.json();
        return json;
    } catch (error) {
      console.error(error);
    }
  };
