from django.core.management.base import BaseCommand
from apps.products.models import Category, Product, ProductImage
import urllib.request
import os
from django.conf import settings


# Using picsum.photos for free placeholder fashion images
PRODUCT_IMAGES = {
    'women': [
        'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80',
        'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&q=80',
        'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&q=80',
        'https://images.unsplash.com/photo-1572804013427-4d7ca7268217?w=600&q=80',
        'https://images.unsplash.com/photo-1554412933-514a83d2f3c8?w=600&q=80',
        'https://images.unsplash.com/photo-1583846717393-dc2412c95ed7?w=600&q=80',
    ],
    'men': [
        'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600&q=80',
        'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&q=80',
        'https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=600&q=80',
        'https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=600&q=80',
        'https://images.unsplash.com/photo-1625772452859-1c03d5bf1137?w=600&q=80',
        'https://images.unsplash.com/photo-1594938298603-c8148c4b4b6e?w=600&q=80',
    ],
    'kids': [
        'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=600&q=80',
        'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=600&q=80',
        'https://images.unsplash.com/photo-1471286174890-9c112ac6476f?w=600&q=80',
        'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=600&q=80',
    ],
}

CATEGORIES = [
    {'name': 'Kurtas', 'gender': 'women', 'slug': 'kurtas'},
    {'name': 'Dresses', 'gender': 'women', 'slug': 'dresses'},
    {'name': 'Tops', 'gender': 'women', 'slug': 'tops'},
    {'name': 'Shirts', 'gender': 'men', 'slug': 'shirts'},
    {'name': 'T-Shirts', 'gender': 'men', 'slug': 'tshirts'},
    {'name': 'Jeans', 'gender': 'men', 'slug': 'jeans'},
    {'name': 'Kids Wear', 'gender': 'kids', 'slug': 'kids-wear'},
    {'name': 'Accessories', 'gender': 'unisex', 'slug': 'accessories'},
]

PRODUCTS = [
    # Women's Kurtas
    {'name': 'Floral Embroidered Kurta', 'brand': 'Biba', 'category_slug': 'kurtas',
     'description': 'Beautiful floral embroidered kurta perfect for festive occasions. Made from premium cotton blend with intricate embroidery work.',
     'price': 1499, 'discount_percent': 30, 'sizes': ['XS','S','M','L','XL','XXL'], 'colors': ['Blue', 'Pink', 'White'], 'stock': 50, 'rating': 4.3, 'review_count': 128},

    {'name': 'Straight Cut Cotton Kurta', 'brand': 'W', 'category_slug': 'kurtas',
     'description': 'Comfortable straight cut kurta in breathable cotton fabric. Perfect for daily wear.',
     'price': 999, 'discount_percent': 20, 'sizes': ['S','M','L','XL'], 'colors': ['Yellow', 'Green', 'Orange'], 'stock': 80, 'rating': 4.1, 'review_count': 95},

    {'name': 'Anarkali Kurta Set', 'brand': 'Libas', 'category_slug': 'kurtas',
     'description': 'Elegant Anarkali style kurta set with matching dupatta. Ideal for parties and celebrations.',
     'price': 2499, 'discount_percent': 40, 'sizes': ['S','M','L','XL','XXL'], 'colors': ['Red', 'Maroon', 'Navy'], 'stock': 30, 'rating': 4.6, 'review_count': 214},

    # Women's Dresses
    {'name': 'Flowy Midi Dress', 'brand': 'H&M', 'category_slug': 'dresses',
     'description': 'Lightweight flowy midi dress with floral print. Perfect for brunches and casual outings.',
     'price': 1799, 'discount_percent': 25, 'sizes': ['XS','S','M','L'], 'colors': ['Floral Blue', 'Floral Pink'], 'stock': 45, 'rating': 4.4, 'review_count': 167},

    {'name': 'Wrap Maxi Dress', 'brand': 'Zara', 'category_slug': 'dresses',
     'description': 'Chic wrap-style maxi dress with tie waist. Effortlessly stylish for evening events.',
     'price': 3299, 'discount_percent': 35, 'sizes': ['XS','S','M','L','XL'], 'colors': ['Black', 'Emerald', 'Rust'], 'stock': 25, 'rating': 4.7, 'review_count': 89},

    {'name': 'Bodycon Mini Dress', 'brand': 'Forever 21', 'category_slug': 'dresses',
     'description': 'Stretch bodycon mini dress for a chic night-out look. Made from comfortable scuba fabric.',
     'price': 1299, 'discount_percent': 0, 'sizes': ['XS','S','M','L'], 'colors': ['Black', 'Red', 'White'], 'stock': 60, 'rating': 4.0, 'review_count': 52},

    # Women's Tops
    {'name': 'Puff Sleeve Crop Top', 'brand': 'Vero Moda', 'category_slug': 'tops',
     'description': 'Trendy puff sleeve crop top in soft cotton. Pairs beautifully with high-waist jeans.',
     'price': 799, 'discount_percent': 15, 'sizes': ['XS','S','M','L'], 'colors': ['White', 'Black', 'Lilac'], 'stock': 100, 'rating': 4.2, 'review_count': 73},

    {'name': 'Striped Linen Top', 'brand': 'Marks & Spencer', 'category_slug': 'tops',
     'description': 'Classic striped linen top for a relaxed everyday look. Breathable and comfortable.',
     'price': 1199, 'discount_percent': 20, 'sizes': ['S','M','L','XL','XXL'], 'colors': ['Blue-White', 'Black-White'], 'stock': 70, 'rating': 4.3, 'review_count': 41},

    # Men's Shirts
    {'name': 'Oxford Button-Down Shirt', 'brand': 'Peter England', 'category_slug': 'shirts',
     'description': 'Classic Oxford weave button-down shirt. Perfect for formal and business casual settings.',
     'price': 1299, 'discount_percent': 30, 'sizes': ['S','M','L','XL','XXL','3XL'], 'colors': ['White', 'Light Blue', 'Mint'], 'stock': 90, 'rating': 4.4, 'review_count': 203},

    {'name': 'Linen Casual Shirt', 'brand': 'Allen Solly', 'category_slug': 'shirts',
     'description': 'Relaxed fit linen shirt ideal for summer. Semi-formal look with comfort.',
     'price': 1799, 'discount_percent': 25, 'sizes': ['S','M','L','XL','XXL'], 'colors': ['Beige', 'Sky Blue', 'Olive'], 'stock': 65, 'rating': 4.5, 'review_count': 156},

    {'name': 'Floral Print Casual Shirt', 'brand': 'Jack & Jones', 'category_slug': 'shirts',
     'description': 'Vibrant floral print shirt for a vacation-ready look. 100% cotton, full sleeves.',
     'price': 1599, 'discount_percent': 40, 'sizes': ['S','M','L','XL'], 'colors': ['Multicolor'], 'stock': 40, 'rating': 4.1, 'review_count': 68},

    # Men's T-Shirts
    {'name': 'Classic Crew Neck T-Shirt', 'brand': 'H&M', 'category_slug': 'tshirts',
     'description': 'Essential crew neck t-shirt in soft jersey fabric. Perfect for layering or wearing solo.',
     'price': 499, 'discount_percent': 10, 'sizes': ['XS','S','M','L','XL','XXL'], 'colors': ['White', 'Black', 'Navy', 'Grey'], 'stock': 200, 'rating': 4.2, 'review_count': 312},

    {'name': 'Polo T-Shirt', 'brand': 'Lacoste', 'category_slug': 'tshirts',
     'description': 'Iconic polo t-shirt with ribbed collar and 2-button placket. Premium pique cotton.',
     'price': 3999, 'discount_percent': 15, 'sizes': ['S','M','L','XL','XXL'], 'colors': ['White', 'Navy', 'Red', 'Green'], 'stock': 55, 'rating': 4.8, 'review_count': 489},

    {'name': 'Graphic Print T-Shirt', 'brand': 'Bewakoof', 'category_slug': 'tshirts',
     'description': 'Fun graphic print t-shirt in bio-washed fabric for a lived-in feel.',
     'price': 399, 'discount_percent': 50, 'sizes': ['S','M','L','XL','XXL'], 'colors': ['White', 'Black', 'Charcoal'], 'stock': 150, 'rating': 3.9, 'review_count': 178},

    # Men's Jeans
    {'name': 'Slim Fit Dark Denim', 'brand': "Levi's", 'category_slug': 'jeans',
     'description': "Levi's signature slim fit jeans in dark indigo wash. Stretch fabric for all-day comfort.",
     'price': 3499, 'discount_percent': 20, 'sizes': ['28','30','32','34','36','38'], 'colors': ['Dark Blue', 'Black'], 'stock': 75, 'rating': 4.6, 'review_count': 341},

    {'name': 'Regular Fit Mid-Wash Jeans', 'brand': 'Wrangler', 'category_slug': 'jeans',
     'description': 'Classic regular fit jeans in mid-wash denim. 5-pocket styling with durable construction.',
     'price': 2199, 'discount_percent': 30, 'sizes': ['30','32','34','36','38'], 'colors': ['Mid Blue', 'Light Blue'], 'stock': 85, 'rating': 4.3, 'review_count': 127},

    # Kids
    {'name': 'Colourful Dungaree Set', 'brand': 'H&M Kids', 'category_slug': 'kids-wear',
     'description': 'Adorable dungaree set for kids with adjustable straps and playful prints. Easy to wear.',
     'price': 899, 'discount_percent': 20, 'sizes': ['2Y','3Y','4Y','5Y','6Y','7Y'], 'colors': ['Blue', 'Pink', 'Yellow'], 'stock': 60, 'rating': 4.5, 'review_count': 93},

    {'name': 'Cotton T-Shirt & Shorts Set', 'brand': 'United Colors of Benetton', 'category_slug': 'kids-wear',
     'description': 'Comfortable cotton co-ord set for kids. Soft fabric perfect for everyday play.',
     'price': 699, 'discount_percent': 15, 'sizes': ['3Y','4Y','5Y','6Y','7Y','8Y'], 'colors': ['Red', 'Navy', 'Green'], 'stock': 80, 'rating': 4.3, 'review_count': 61},

    {'name': 'Floral Frock Dress', 'brand': 'Mothercare', 'category_slug': 'kids-wear',
     'description': 'Sweet floral frock dress for little girls. Soft cotton with lace trim detailing.',
     'price': 799, 'discount_percent': 25, 'sizes': ['2Y','3Y','4Y','5Y','6Y'], 'colors': ['Pink', 'Lavender'], 'stock': 45, 'rating': 4.6, 'review_count': 48},

    # Accessories
    {'name': 'Canvas Tote Bag', 'brand': 'DailyObjects', 'category_slug': 'accessories',
     'description': 'Sturdy canvas tote bag with inner pockets. Perfect for everyday use.',
     'price': 899, 'discount_percent': 10, 'sizes': ['One Size'], 'colors': ['Natural', 'Black', 'Navy'], 'stock': 120, 'rating': 4.4, 'review_count': 87},

    {'name': 'Leather Belt', 'brand': 'Hidesign', 'category_slug': 'accessories',
     'description': 'Genuine leather belt with brushed metal buckle. Classic style for formal and casual wear.',
     'price': 1499, 'discount_percent': 20, 'sizes': ['S','M','L','XL'], 'colors': ['Brown', 'Black'], 'stock': 90, 'rating': 4.5, 'review_count': 112},
]


def download_image(url, dest_path):
    os.makedirs(os.path.dirname(dest_path), exist_ok=True)
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req, timeout=15) as response:
        with open(dest_path, 'wb') as f:
            f.write(response.read())


class Command(BaseCommand):
    help = 'Seed the database with sample fashion products'

    def handle(self, *args, **options):
        self.stdout.write('🌱 Seeding categories...')

        # Create categories
        cat_map = {}
        for cat_data in CATEGORIES:
            cat, created = Category.objects.get_or_create(
                slug=cat_data['slug'],
                defaults={'name': cat_data['name'], 'gender': cat_data['gender']}
            )
            cat_map[cat_data['slug']] = cat
            if created:
                self.stdout.write(f'  ✓ Created category: {cat.name}')

        self.stdout.write('\n🌱 Seeding products...')

        media_root = settings.MEDIA_ROOT
        img_dir = os.path.join(media_root, 'products')

        # Image index counters per gender
        img_idx = {'women': 0, 'men': 0, 'kids': 0, 'unisex': 0}

        for i, p_data in enumerate(PRODUCTS):
            if Product.objects.filter(name=p_data['name'], brand=p_data['brand']).exists():
                self.stdout.write(f'  → Skipping (exists): {p_data["brand"]} {p_data["name"]}')
                continue

            category = cat_map.get(p_data['category_slug'])
            gender = category.gender if category else 'unisex'

            product = Product.objects.create(
                name=p_data['name'],
                brand=p_data['brand'],
                category=category,
                description=p_data['description'],
                price=p_data['price'],
                discount_percent=p_data['discount_percent'],
                sizes=p_data['sizes'],
                colors=p_data['colors'],
                stock=p_data['stock'],
                rating=p_data['rating'],
                review_count=p_data['review_count'],
            )

            # Try to download and attach an image
            gender_key = gender if gender in PRODUCT_IMAGES else 'women'
            img_list = PRODUCT_IMAGES[gender_key]
            url = img_list[img_idx[gender_key] % len(img_list)]
            img_idx[gender_key] += 1

            filename = f'product_{product.id}_{gender_key}.jpg'
            dest = os.path.join(img_dir, filename)

            try:
                download_image(url, dest)
                ProductImage.objects.create(
                    product=product,
                    image=f'products/{filename}',
                    is_primary=True,
                )
                self.stdout.write(f'  ✓ {product.brand} — {product.name} [image saved]')
            except Exception as e:
                self.stdout.write(self.style.WARNING(f'  ✓ {product.brand} — {product.name} [no image: {e}]'))

        self.stdout.write(self.style.SUCCESS('\n✅ Done! Sample data seeded successfully.'))
        self.stdout.write(f'   Total products: {Product.objects.count()}')
        self.stdout.write(f'   Total categories: {Category.objects.count()}')
