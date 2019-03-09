// Used to upload file and it return file url which can be passed to ajax request with content type application/json
import Ajax from './ajax';
const UploadFileService = {
  post(data, url) {
      let authenticity_token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
      let options = {
          method: 'POST',
          url: url + "?&authenticity_token=" + authenticity_token,
          responseType: 'json',
          headers: {
              'Content-Type': 'multipart/form-data'
          },
          data: data
      };
      return new Promise((resolve, reject) => {
          Ajax.request(options)
              .then(response => {
                  resolve(response.data);
              })
              .catch(error => {
                if(error) {
                  error.message = error.message || `${error.status} ${error.statusText}`;
                  reject(error);
                }
              });
      });
  },
}
export default UploadFileService;
