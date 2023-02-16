export const sendingEmail = async (to, subject, content) => {
    // console.log('a')
    try {
      const response = await fetch(
        'http://203.247.166.29:8000/scheduler/react/sendingEmail/',{
            method:'POST',
            body: JSON.stringify({
                to: to,
                subject: subject,
                contents: content
              }),
              headers: {
                "Content-type": "application/json; charset=UTF-8"
              }
            

        }
      );
      const json = await response.json();
        return json;
    } catch (error) {
      console.error(error);
    }
  };
