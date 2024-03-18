import * as cacheController from "../controllers/cache"
<<<<<<< HEAD
// import { importLocalData } from "../graphql/mutations"
// import API from '../amplify/API';
=======
import { importLocalData } from "../graphql/mutations"
import API from '../amplify/API';
>>>>>>> main

const uploadLocal = async () => {
  const localData = cacheController.getLocalData();
  if (localData) {
<<<<<<< HEAD
    // try {
    //   await API.execute(importLocalData, { input: JSON.stringify(localData) });
    //   cacheController.deleteLocalData();
    // } catch { /* empty */ }
=======
    try {
      await API.execute(importLocalData, { input: JSON.stringify(localData) });
      cacheController.deleteLocalData();
    } catch { /* empty */ }
>>>>>>> main
  }
}

export default uploadLocal;
