import django_filters
from .models import Product


class ProductFilter(django_filters.FilterSet):
    min_price = django_filters.NumberFilter(field_name='price', lookup_expr='gte')
    max_price = django_filters.NumberFilter(field_name='price', lookup_expr='lte')
    gender = django_filters.CharFilter(field_name='category__gender')
    category = django_filters.CharFilter(field_name='category__slug')
    brand = django_filters.CharFilter(lookup_expr='icontains')

    class Meta:
        model = Product
        fields = ['gender', 'category', 'brand', 'min_price', 'max_price']
