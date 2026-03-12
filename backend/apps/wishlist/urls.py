from django.urls import path
from .views import WishlistView, WishlistToggleView

urlpatterns = [
    path('', WishlistView.as_view(), name='wishlist'),
    path('toggle/<int:product_id>/', WishlistToggleView.as_view(), name='wishlist-toggle'),
]
