from django.contrib import admin
from .models import Category, Product, ProductImage


class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 3


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('brand', 'name', 'category', 'price', 'discount_percent', 'stock', 'is_active')
    list_filter = ('category', 'is_active', 'brand')
    search_fields = ('name', 'brand')
    inlines = [ProductImageInline]


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'gender', 'slug')
    prepopulated_fields = {'slug': ('name',)}
