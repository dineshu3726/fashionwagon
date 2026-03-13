from django.contrib import admin
from .models import Category, Product, ProductImage


class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 1
    fields = ('external_url', 'image', 'is_primary')


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('brand', 'name', 'category', 'price', 'discount_percent', 'stock', 'is_active')
    list_filter = ('category', 'is_active')
    search_fields = ('name', 'brand')
    inlines = [ProductImageInline]
    list_per_page = 25


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'gender', 'slug')
    prepopulated_fields = {'slug': ('name',)}


@admin.register(ProductImage)
class ProductImageAdmin(admin.ModelAdmin):
    list_display = ('product', 'external_url', 'is_primary')
