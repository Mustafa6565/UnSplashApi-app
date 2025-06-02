import { Container, Typography, CircularProgress, Alert, Box } from "@mui/material";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import Pagination from '@mui/material/Pagination';
import { useContext, useEffect, useState } from "react";
import { StateContext } from "../../Context/StateContext";
import { unsplashApi } from "../../api/unsplashApi"; // Doğru yolda olduğundan emin olun

// Renk dizisi
const colors = [
    { id: 1, color: "#189AB4" },
    { id: 2, color: "#189FB4" },
    { id: 3, color: "#189AB4" },
    { id: 4, color: "#1B9AB4" },
    { id: 5, color: "#1845B4" },
    { id: 6, color: "#2E86C1" }, // Ek renkler
    { id: 7, color: "#5DADE2" },
    { id: 8, color: "#A9CCE3" },
    { id: 9, color: "#D6EAF8" },
    { id: 10, color: "#AED6F1" },
];

export default function Photos() {
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
    const { pagination, setPagination } = useContext(StateContext);

    // API'den her sayfada kaç fotoğraf çektiğimizi tanımlayalım
    const PER_PAGE_PHOTOS = 15;

    useEffect(() => {
        if (!UNSPLASH_ACCESS_KEY) {
            setError(new Error("Unsplash Access Key bulunamadı! .env dosyasını kontrol edin ve VITE_UNSPLASH_ACCESS_KEY değişkenini ekleyin."));
            setLoading(false);
            return;
        }

        const fetchPhotos = async () => {
            try {
                setLoading(true);
                const data = await unsplashApi.listPhotos(pagination, PER_PAGE_PHOTOS, UNSPLASH_ACCESS_KEY);

                setPhotos(data);
                setLoading(false);

            } catch (err) {
                setError(err);
                setLoading(false);
                console.error("Fotoğraflar çekilirken bir hata oluştu:", err);
            }
        };

        fetchPhotos();
    }, [UNSPLASH_ACCESS_KEY, pagination]);

    const handleChange = (event, value) => {
        setPagination(value);
    };

    if (loading) {
        return (
            <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
                <CircularProgress />
                <Typography variant="h6" sx={{ ml: 2 }}>Fotoğraflar yükleniyor...</Typography>
            </Container>
        );
    }

    if (error) {
        return (
            <Container sx={{ mt: 4, mb: 4, textAlign: 'center' }}>
                <Alert severity="error">
                    Hata: {error.message}. Lütfen .env dosyasındaki Unsplash Access Key'inizi ve internet bağlantınızı kontrol edin.
                </Alert>
            </Container>
        );
    }

    // --- Boşlukları Doldurma Mantığı ---
    // API'den gelen fotoğraf sayısına göre boşlukları hesaplayalım
    const remainingSlots = PER_PAGE_PHOTOS - photos.length;
    const placeholderItems = [];
    if (remainingSlots > 0) {
        for (let i = 0; i < remainingSlots; i++) {
            // Renk dizisinden rastgele bir renk seç
            const randomColor = colors[Math.floor(Math.random() * colors.length)].color;
            // Benzersiz bir key sağlamak için rastgele bir ID kullan
            placeholderItems.push(
                <ImageListItem
                    key={`placeholder-${pagination}-${i}`} // Pagination ve index ile benzersiz key
                    // Quilted varyant için cols ve rows ayarlamaları
                    // Bu placeholder'lar için de dinamik boyutlar verebiliriz
                    cols={Math.random() > 0.5 ? 1 : 0.5} // Rastgele 1 veya yarım sütun
                    rows={Math.random() > 0.5 ? 2 : 1}   // Rastgele 1 veya 2 satır
                >
                    <Box sx={{
                        width: '100%',
                        height: '100%',
                        backgroundColor: randomColor,
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '1.5rem',
                        opacity: 0.8, // Hafif şeffaflık
                    }}>
                        {/* Opsiyonel: Boşluklara metin veya ikon ekleyebilirsiniz */}
                        {/* <Typography variant="caption">Boşluk</Typography> */} b
                    </Box>
                </ImageListItem>
            );
        }
    }
    // --- Boşlukları Doldurma Mantığı Bitti ---

    return (
        <Container sx={{ mt: 4, mb: 4, textAlign: 'center' }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Unsplash Fotoğraf Galerisi
            </Typography>

            {!loading && !error && photos.length === 0 && (
                <Typography variant="subtitle1" sx={{ mt: 3 }}>
                    Hiç fotoğraf bulunamadı.
                </Typography>
            )}

            {!loading && !error && (
                <ImageList
                    variant="quilted"
                    cols={4}
                    rowHeight={250}
                    gap={8}
                    sx={{ width: '100%', height: 'auto', overflowY: 'hidden' }}
                >
                    {/* API'den gelen fotoğraflar */}
                    {photos.map((item) => (
                        <ImageListItem
                            key={item.id}
                            cols={item.width > item.height ? 1 : 1}
                            rows={item.height > item.width ? 2 : 1}
                        >
                            <img
                                srcSet={`${item.urls.small}?w=200&h=200&fit=crop&auto=format 1x,
                                         ${item.urls.small}?w=200&h=200&fit=crop&auto=format&dpr=2 2x`}
                                src={`${item.urls.full}?w=200&h=200&fit=crop&auto=format`}
                                alt={item.alt_description || 'Unsplash Photo'}
                                loading="lazy"
                                style={{ borderRadius: '8px', objectFit: 'cover', width: '100%', height: '100%' }}
                            />
                            <ImageListItemBar
                                title={item.alt_description || 'Untitled'}
                                subtitle={<span>by: <a href={item.user.links.html} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>{item.user.name}</a></span>}
                                actionIcon={
                                    <IconButton
                                        sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                        aria-label={`info about ${item.alt_description || 'photo'}`}
                                        href={item.links.html}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <InfoIcon />
                                    </IconButton>
                                }
                            />
                        </ImageListItem>
                    ))}

                    {/* Oluşturulan placeholder'lar */}
                    {placeholderItems}
                </ImageList>
            )}

            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Pagination count={10} page={pagination} onChange={handleChange} color="primary" showFirstButton showLastButton />
            </Box>
        </Container>
    );
}