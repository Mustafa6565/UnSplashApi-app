import axios from "axios";
import { toast } from "react-toastify";

axios.defaults.baseURL = "https://api.unsplash.com/";

// axios.defaults.withCredentials = true;

axios.interceptors.response.use(
    (response) => {
        console.log("API isteği başarılı:", response);
        return response;
    },
    (error) => {
        const { response } = error;

        if (response) {
            const { data, status } = response;
            let errorMessage = "Bilinmeyen bir hata oluştu.";
            if (data && data.errors && Array.isArray(data.errors)) {
                errorMessage = data.errors.join(", ");
            } else if (data && data.errors) {
                errorMessage = data.errors;
            } else if (data && data.message) {
                errorMessage = data.message;
            } else {
                errorMessage = `API Hatası: ${status}`;
            }

            switch (status) {
                case 400: // Bad Request
                    toast.error(`Geçersiz İstek: ${errorMessage}`);
                    break;
                case 401: // Unauthorized (API Anahtarı eksik veya yanlış)
                    toast.error(`Kimlik Doğrulama Hatası: ${errorMessage}. Unsplash Access Key'inizi kontrol edin.`);
                    break;
                case 403: // Forbidden (Limit aşıldı veya izin yok)
                    toast.error(`Erişim Engellendi: ${errorMessage}. API kullanım limitinizi aşmış olabilirsiniz.`);
                    break;
                case 404: // Not Found
                    toast.error(`Kaynak Bulunamadı: ${errorMessage}`);
                    break;
                case 429: // Too Many Requests (Çok fazla istek)
                    toast.error(`Çok Fazla İstek: ${errorMessage}. Lütfen biraz bekleyip tekrar deneyin.`);
                    break;
                case 500: // Internal Server Error
                    toast.error(`Sunucu Hatası: ${errorMessage}`);
                    break;
                default: // Diğer Hatalar için 
                    toast.error(`Beklenmedik Hata (${status}): ${errorMessage}`);
                    break;
            }
        } else {
            toast.error("Ağ Hatası: Sunucuya ulaşılamıyor.");
            console.error("Axios Hata (no response):", error);
        }
        return Promise.reject(error);
    }
);

// CRUD metodlarını içeren genel nesne
const methods = {
    get: (url, config) => axios.get(url, config).then((response) => response.data),
    post: (url, body, config) => axios.post(url, body, config).then((response) => response.data),
    put: (url, body, config) => axios.put(url, body, config).then((response) => response.data),
    delete: (url, config) => axios.delete(url, config).then((response) => response.data)
};

export const unsplashApi = {

    listPhotos: (page = 1, perPage = 15, accessKey) => {
        if (!accessKey) {
            console.error("Unsplash Access Key listPhotos metodu için gerekli!");
            return Promise.reject(new Error("Unsplash Access Key bulunamadı."));
        }
        return methods.get("photos", {
            params: {
                page: page,
                per_page: perPage,
            },
            headers: {
                Authorization: `Client-ID ${accessKey}`,
            },
        });
    },

    searchPhotos: (query, page = 1, perPage = 20, accessKey) => {
        if (!accessKey) {
            console.error("Unsplash Access Key searchPhotos metodu için gerekli!");
            return Promise.reject(new Error("Unsplash Access Key bulunamadı."));
        }
        return methods.get("search/photos", {
            params: {
                query: query,
                page: page,
                per_page: perPage,
            },
            headers: {
                Authorization: `Client-ID ${accessKey}`,
            },
        });
    },

};