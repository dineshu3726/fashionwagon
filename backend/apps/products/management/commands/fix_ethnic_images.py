from django.core.management.base import BaseCommand
from apps.products.models import Category, Product, ProductImage

# Curated Indian ethnic wear / kurta specific Unsplash images
KURTA_IMAGES = [
    'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=600&q=80',
    'https://images.unsplash.com/photo-1617196034183-421b4040ed20?w=600&q=80',
    'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&q=80',
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80',
    'https://images.unsplash.com/photo-1592669241067-2a4ec7c09cc6?w=600&q=80',
    'https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?w=600&q=80',
    'https://images.unsplash.com/photo-1614846384571-1e15d5f22ffe?w=600&q=80',
    'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=600&q=80',
    'https://images.unsplash.com/photo-1601987077677-5346c4e1b3e7?w=600&q=80',
    'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=600&q=80',
    'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=600&q=80',
    'https://images.unsplash.com/photo-1603217879853-7c19b4c56ab1?w=600&q=80',
    'https://images.unsplash.com/photo-1550614000-4895a10e1bfd?w=600&q=80',
    'https://images.unsplash.com/photo-1614615573078-b1de7b06e485?w=600&q=80',
    'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=600&q=80',
]


class Command(BaseCommand):
    help = 'Fix kurta and ethnic category product images with Indian ethnic wear photos'

    def handle(self, *args, **options):
        ethnic_slugs = ['kurtas']
        categories = Category.objects.filter(slug__in=ethnic_slugs)

        if not categories.exists():
            self.stdout.write(self.style.WARNING('No ethnic categories found.'))
            return

        products = Product.objects.filter(category__in=categories).prefetch_related('images')
        total = products.count()
        self.stdout.write(f'Updating images for {total} kurta/ethnic products...')

        for idx, product in enumerate(products):
            new_url = KURTA_IMAGES[idx % len(KURTA_IMAGES)]
            img = product.images.filter(is_primary=True).first()
            if img:
                img.external_url = new_url
                img.save()
            else:
                ProductImage.objects.create(product=product, external_url=new_url, is_primary=True)

        self.stdout.write(self.style.SUCCESS(f'Updated {total} kurta products with ethnic wear images.'))
