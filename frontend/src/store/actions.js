import { REQUEST_PRODUCT_LIST_TO_SPRING } from './mutation-types';
import axios from 'axios';

export default {
  requestCreateProductToSpring({}, payload) {
    const { name, description, price, stock, files } = payload;
    let formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('stock', stock);
    for (let idx = 0; idx < files.length; idx++) {
      formData.append('imageDataList[' + idx + ']', files[idx]);
    }
    return axios
      .post('http://localhost:7777/product/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(() => {
        alert('상품 등록 성공!');
      })
      .catch(() => {
        alert('문제 발생!');
      });
  },

  requestProductListToSpring({ commit }) {
    return axios.get('http://localhost:7777/product/list').then((res) => {
      commit(REQUEST_PRODUCT_LIST_TO_SPRING, res.data);
    });
  },
};