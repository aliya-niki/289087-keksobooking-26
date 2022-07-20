const GET_URL = 'https://26.javascript.pages.academy/keksobooking/data';
const POST_URL = 'https://26.javascript.pages.academy/keksobooking';

const getData = async (onSuccess, onError) => {
  try {
    const response = await fetch(GET_URL);

    if (!response.ok) {
      throw new Error('Не удалость загрузить данные объявлений.');
    }

    const data = await response.json();
    onSuccess(data);
  } catch (error) {
    onError(error.message);
  }
};

const sendData = async (onSuccess, onError, body) => {
  try {
    const response = await fetch(POST_URL, {
      method: 'POST',
      body,
    });

    if (!response.ok) {
      throw new Error('Не удалось отправить форму объявления.');
    }

    onSuccess();
  } catch (error) {
    onError(error.message);
  }

};

export {getData, sendData};
