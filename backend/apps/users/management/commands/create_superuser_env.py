from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from decouple import config


class Command(BaseCommand):
    help = 'Create superuser from environment variables if not exists'

    def handle(self, *args, **options):
        username = config('SUPERUSER_USERNAME', default='')
        email = config('SUPERUSER_EMAIL', default='')
        password = config('SUPERUSER_PASSWORD', default='')

        if not username or not password:
            self.stdout.write('Skipping superuser creation — SUPERUSER_USERNAME/PASSWORD not set.')
            return

        if User.objects.filter(username=username).exists():
            self.stdout.write(f'Superuser "{username}" already exists.')
            return

        User.objects.create_superuser(username=username, email=email, password=password)
        self.stdout.write(self.style.SUCCESS(f'Superuser "{username}" created successfully.'))
