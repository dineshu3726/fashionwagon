from rest_framework import generics, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import Product, Category
from .serializers import ProductSerializer, CategorySerializer
from .filters import ProductFilter


class ProductListView(generics.ListAPIView):
    queryset = Product.objects.filter(is_active=True).prefetch_related('images').select_related('category')
    serializer_class = ProductSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_class = ProductFilter
    search_fields = ['name', 'brand', 'category__name']
    ordering_fields = ['price', 'rating', 'created_at', 'discount_percent']
    ordering = ['-created_at']


class ProductDetailView(generics.RetrieveAPIView):
    queryset = Product.objects.filter(is_active=True).prefetch_related('images').select_related('category')
    serializer_class = ProductSerializer


class CategoryListView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
