const storeData = async (key: string, value: string) => {
  try {
    const jsonValue = JSON.stringify(value);
    await window.localStorage.setItem(`@${key}`, jsonValue);
    console.log('AsyncStorage set success')
  } catch (e) {
    console.log('AsyncStorage set error ', e);
  }
};

const getData =  (key: string) => {
  try {
      const jsonValue =  window.localStorage.getItem(`@${key}`);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log('AsyncStorage get error ', e);
  }
};

const removeData = async (key: string) => {
  try {
    await window.localStorage.removeItem(`@${key}`)
  } catch(e) {
    console.log('AsyncStorage removeData error ', e);
  }

  console.log('Done.')
}

const clearAll = async () => {
  try {
    await window.localStorage.clear()
  } catch(e) {
    console.log('AsyncStorage clearAll error ', e);
  }

  console.log('Done.')
}


export { storeData, getData, removeData };