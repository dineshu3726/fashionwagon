from django.core.management.base import BaseCommand
from apps.products.models import Category, Product, ProductImage

CATEGORY_IMAGES = {
    'kurtas': [
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
        'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=600&q=80',
        'https://images.unsplash.com/photo-1550614000-4895a10e1bfd?w=600&q=80',
        'https://images.unsplash.com/photo-1614615573078-b1de7b06e485?w=600&q=80',
    ],
    'dresses': [
        'https://images.unsplash.com/photo-1572804013427-4d7ca7268217?w=600&q=80',
        'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&q=80',
        'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&q=80',
        'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80',
        'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&q=80',
        'https://images.unsplash.com/photo-1583846717393-dc2412c95ed7?w=600&q=80',
        'https://images.unsplash.com/photo-1554412933-514a83d2f3c8?w=600&q=80',
        'https://images.unsplash.com/photo-1612336307429-8a898d10e223?w=600&q=80',
        'https://images.unsplash.com/photo-1580651315530-69c8e0026377?w=600&q=80',
        'https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?w=600&q=80',
    ],
    'tops': [
        'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&q=80',
        'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=600&q=80',
        'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&q=80',
        'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80',
        'https://images.unsplash.com/photo-1532635241-17e820acc59f?w=600&q=80',
        'https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?w=600&q=80',
        'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?w=600&q=80',
        'https://images.unsplash.com/photo-1604176354204-9268737828e4?w=600&q=80',
        'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=600&q=80',
        'https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?w=600&q=80',
    ],
    'shirts': [
        'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&q=80',
        'https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?w=600&q=80',
        'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&q=80',
        'https://images.unsplash.com/photo-1589310243389-96a5483213a8?w=600&q=80',
        'https://images.unsplash.com/photo-1563630423918-b58f07336ac5?w=600&q=80',
        'https://images.unsplash.com/photo-1598032895397-b9472444bf93?w=600&q=80',
        'https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=600&q=80',
        'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600&q=80',
        'https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=600&q=80',
        'https://images.unsplash.com/photo-1625772452859-1c03d5bf1137?w=600&q=80',
    ],
    'tshirts': [
        'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80',
        'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=600&q=80',
        'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=600&q=80',
        'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&q=80',
        'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&q=80',
        'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80',
        'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=600&q=80',
        'https://images.unsplash.com/photo-1523381294911-8d3cead13475?w=600&q=80',
        'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=600&q=80',
        'https://images.unsplash.com/photo-1554568218-0f1715e72254?w=600&q=80',
    ],
    'jeans': [
        'https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&q=80',
        'https://images.unsplash.com/photo-1604176354204-9268737828e4?w=600&q=80',
        'https://images.unsplash.com/photo-1555689502-c4b22d76c56f?w=600&q=80',
        'https://images.unsplash.com/photo-1475178626620-a4d074967452?w=600&q=80',
        'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&q=80',
        'https://images.unsplash.com/photo-1582552938357-32b906df40cb?w=600&q=80',
        'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&q=80',
        'https://images.unsplash.com/photo-1560243563-062bfc001d68?w=600&q=80',
        'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=600&q=80',
        'https://images.unsplash.com/photo-1565084888279-aca607bb7ecd?w=600&q=80',
    ],
    'kids-wear': [
        'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=600&q=80',
        'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=600&q=80',
        'https://images.unsplash.com/photo-1471286174890-9c112ac6476f?w=600&q=80',
        'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=600&q=80',
        'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=600&q=80',
        'https://images.unsplash.com/photo-1543852786-1cf6624b9987?w=600&q=80',
        'https://images.unsplash.com/photo-1591348278863-a8fb3887e2aa?w=600&q=80',
        'https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?w=600&q=80',
    ],
    'accessories': [
        'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80',
        'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80',
        'https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=600&q=80',
        'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&q=80',
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80',
        'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600&q=80',
        'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=600&q=80',
        'https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=600&q=80',
    ],
}


class Command(BaseCommand):
    help = 'Fix product images for all categories with relevant photos'

    def handle(self, *args, **options):
        total_updated = 0

        for slug, images in CATEGORY_IMAGES.items():
            category = Category.objects.filter(slug=slug).first()
            if not category:
                self.stdout.write(self.style.WARNING(f'Category not found: {slug}'))
                continue

            products = Product.objects.filter(category=category).prefetch_related('images')
            count = products.count()

            for idx, product in enumerate(products):
                new_url = images[idx % len(images)]
                img = product.images.filter(is_primary=True).first()
                if img:
                    img.external_url = new_url
                    img.save()
                else:
                    ProductImage.objects.create(product=product, external_url=new_url, is_primary=True)

            total_updated += count
            self.stdout.write(self.style.SUCCESS(f'  {slug}: updated {count} products'))

        self.stdout.write(self.style.SUCCESS(f'\nDone! {total_updated} products updated with relevant images.'))
