-- Inserir produtos masculinos
INSERT INTO public.products (name, brand, price, original_price, image_url, category, gender, rating, is_new, is_sale, description, sizes) VALUES
('Air Max 90 Classic', 'Nike', 449.90, 599.90, '/placeholder.svg', 'running', 'masculino', 4.8, false, true, 'Tênis clássico com tecnologia Air Max e design icônico', ARRAY['39', '40', '41', '42', '43', '44', '45']),
('Chuck Taylor All Star', 'Converse', 299.90, NULL, '/placeholder.svg', 'lifestyle', 'masculino', 4.5, false, false, 'O clássico tênis de cano alto que nunca sai de moda', ARRAY['38', '39', '40', '41', '42', '43', '44']),
('Ultraboost 22', 'Adidas', 899.90, 1199.90, '/placeholder.svg', 'running', 'masculino', 4.9, false, true, 'Tênis de corrida com tecnologia Boost responsiva', ARRAY['39', '40', '41', '42', '43', '44', '45']),
('Air Jordan 1 Mid', 'Nike', 649.90, NULL, '/placeholder.svg', 'basketball', 'masculino', 4.7, true, false, 'Inspirado no lendário Air Jordan 1 original', ARRAY['40', '41', '42', '43', '44', '45']),
('Stan Smith', 'Adidas', 379.90, NULL, '/placeholder.svg', 'casual', 'masculino', 4.6, false, false, 'O tênis branco mais famoso do mundo', ARRAY['39', '40', '41', '42', '43', '44']),
('Vans Old Skool', 'Vans', 329.90, NULL, '/placeholder.svg', 'lifestyle', 'masculino', 4.4, false, false, 'Clássico skate com a icônica faixa lateral', ARRAY['38', '39', '40', '41', '42', '43', '44']);

-- Inserir produtos femininos  
INSERT INTO public.products (name, brand, price, original_price, image_url, category, gender, rating, is_new, is_sale, description, sizes) VALUES
('Air Force 1 Shadow', 'Nike', 549.90, 699.90, '/placeholder.svg', 'lifestyle', 'feminino', 4.8, false, true, 'Versão feminina do clássico com design em camadas', ARRAY['34', '35', '36', '37', '38', '39', '40']),
('Superstar Platform', 'Adidas', 499.90, NULL, '/placeholder.svg', 'lifestyle', 'feminino', 4.6, true, false, 'O icônico Superstar com solado plataforma', ARRAY['34', '35', '36', '37', '38', '39', '40']),
('Gel-Kayano 29', 'Asics', 699.90, 899.90, '/placeholder.svg', 'running', 'feminino', 4.9, false, true, 'Tênis de corrida com máximo suporte e conforto', ARRAY['34', '35', '36', '37', '38', '39', '40']),
('Puma Cali Sport', 'Puma', 429.90, NULL, '/placeholder.svg', 'lifestyle', 'feminino', 4.5, false, false, 'Estilo californiano com toque contemporâneo', ARRAY['34', '35', '36', '37', '38', '39', '40']),
('Classic Leather', 'Reebok', 349.90, NULL, '/placeholder.svg', 'casual', 'feminino', 4.3, false, false, 'Couro premium e conforto clássico', ARRAY['34', '35', '36', '37', '38', '39', '40']),
('Blazer Mid 77', 'Nike', 589.90, NULL, '/placeholder.svg', 'lifestyle', 'feminino', 4.7, true, false, 'Estilo vintage basketball reimaginado', ARRAY['34', '35', '36', '37', '38', '39', '40']);

-- Inserir produtos infantis
INSERT INTO public.products (name, brand, price, original_price, image_url, category, gender, rating, is_new, is_sale, description, sizes) VALUES
('Air Max SC Kids', 'Nike', 249.90, 299.90, '/placeholder.svg', 'running', 'infantil', 4.7, false, true, 'Versão infantil do clássico Air Max com fecho de velcro', ARRAY['27', '28', '29', '30', '31', '32', '33']),
('Superstar CF Kids', 'Adidas', 199.90, NULL, '/placeholder.svg', 'lifestyle', 'infantil', 4.5, false, false, 'O icônico Superstar adaptado para crianças', ARRAY['26', '27', '28', '29', '30', '31', '32']),
('Chuck Taylor Kids', 'Converse', 179.90, NULL, '/placeholder.svg', 'lifestyle', 'infantil', 4.4, true, false, 'O clássico All Star em versão infantil', ARRAY['26', '27', '28', '29', '30', '31', '32']),
('Suede Classic Kids', 'Puma', 219.90, 259.90, '/placeholder.svg', 'casual', 'infantil', 4.6, false, true, 'O clássico Suede em tamanho infantil', ARRAY['27', '28', '29', '30', '31', '32', '33']),
('Classic Nylon Kids', 'Reebok', 169.90, NULL, '/placeholder.svg', 'running', 'infantil', 4.3, false, false, 'Leve e confortável para os pequenos', ARRAY['26', '27', '28', '29', '30', '31', '32']),
('Old Skool Kids', 'Vans', 189.90, NULL, '/placeholder.svg', 'lifestyle', 'infantil', 4.4, true, false, 'O skate clássico para a nova geração', ARRAY['27', '28', '29', '30', '31', '32', '33']);

-- Inserir lançamentos (produtos marcados como novos)
INSERT INTO public.products (name, brand, price, original_price, image_url, category, gender, rating, is_new, is_sale, description, sizes) VALUES
('Air Max Plus TN', 'Nike', 899.90, NULL, '/placeholder.svg', 'running', 'masculino', 4.9, true, false, 'O revolucionário TN com design futurista', ARRAY['40', '41', '42', '43', '44', '45']),
('Yeezy Boost 350', 'Adidas', 1299.90, NULL, '/placeholder.svg', 'lifestyle', 'masculino', 5.0, true, false, 'Colaboração exclusiva com design inovador', ARRAY['39', '40', '41', '42', '43', '44']),
('Dunk Low Retro', 'Nike', 699.90, NULL, '/placeholder.svg', 'lifestyle', 'feminino', 4.8, true, false, 'Retorno do clássico basketball dos anos 80', ARRAY['35', '36', '37', '38', '39', '40']),
('Forum 84 High', 'Adidas', 549.90, NULL, '/placeholder.svg', 'lifestyle', 'masculino', 4.7, true, false, 'Basketball vintage com toque contemporâneo', ARRAY['40', '41', '42', '43', '44']),
('React Infinity Run', 'Nike', 749.90, NULL, '/placeholder.svg', 'running', 'feminino', 4.9, true, false, 'Tecnologia React para corridas longas', ARRAY['35', '36', '37', '38', '39', '40']),
('UltraBoost Light', 'Adidas', 999.90, NULL, '/placeholder.svg', 'running', 'masculino', 4.9, true, false, 'A versão mais leve do UltraBoost', ARRAY['40', '41', '42', '43', '44', '45']);