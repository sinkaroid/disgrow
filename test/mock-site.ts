import c from "../src/utils/options";
import p from "phin";

for (const url of 
  [c.DBLSTATISTICS, c.OVERWATCHWTF]) {
  p({ url }).then(res => {
    if (res.statusCode !== 200) {
      console.log(`${url} is not available, status code: ${res.statusCode}`);
    }
    else {
      console.log(`${url} is available, can be scraped`);
    }
  });
}