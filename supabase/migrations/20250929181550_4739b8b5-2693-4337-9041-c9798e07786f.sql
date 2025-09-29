-- Atualizar produtos com as novas imagens geradas
UPDATE public.products 
SET image_url = 'src/assets/nike-air-max-white.jpg'
WHERE name = 'Air Max 90 Classic';

UPDATE public.products 
SET image_url = 'src/assets/converse-chuck-taylor.jpg'
WHERE name = 'Chuck Taylor All Star';

UPDATE public.products 
SET image_url = 'src/assets/adidas-ultraboost.jpg'
WHERE name = 'Ultraboost 22';

UPDATE public.products 
SET image_url = 'src/assets/air-jordan-red.jpg'
WHERE name = 'Air Jordan 1 Mid';

UPDATE public.products 
SET image_url = 'src/assets/nike-air-force-pink.jpg'
WHERE name = 'Air Force 1 Shadow';

UPDATE public.products 
SET image_url = 'src/assets/kids-sneakers-colorful.jpg'
WHERE name = 'Air Max SC Kids';