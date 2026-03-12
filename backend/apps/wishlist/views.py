from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import WishlistItem
from .serializers import WishlistItemSerializer


class WishlistView(generics.ListAPIView):
    serializer_class = WishlistItemSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return WishlistItem.objects.filter(user=self.request.user).select_related('product')


class WishlistToggleView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, product_id):
        item, created = WishlistItem.objects.get_or_create(
            user=request.user,
            product_id=product_id,
        )
        if not created:
            item.delete()
            return Response({'status': 'removed'}, status=status.HTTP_200_OK)
        return Response({'status': 'added'}, status=status.HTTP_201_CREATED)
