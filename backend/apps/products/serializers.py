from rest_framework import serializers
from .models import Category, Product, ProductImage


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ['id', 'image', 'is_primary']


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'gender', 'slug']


class ProductSerializer(serializers.ModelSerializer):
    images = ProductImageSerializer(many=True, read_only=True)
    category = CategorySerializer(read_only=True)
    discounted_price = serializers.ReadOnlyField()

    class Meta:
        model = Product
        fields = [
            'id', 'name', 'brand', 'category', 'price',
            'discount_percent', 'discounted_price', 'sizes',
            'colors', 'stock', 'rating', 'review_count',
            'is_active', 'images', 'created_at',
        ]
