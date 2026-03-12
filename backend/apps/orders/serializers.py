from rest_framework import serializers
from .models import Order, OrderItem
from apps.products.serializers import ProductSerializer


class OrderItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    product_id = serializers.IntegerField(write_only=True)
    subtotal = serializers.ReadOnlyField()

    class Meta:
        model = OrderItem
        fields = ['id', 'product', 'product_id', 'size', 'quantity', 'price', 'subtotal']


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = ['id', 'status', 'total_amount', 'shipping_address', 'items', 'created_at']
        read_only_fields = ['status']


class CreateOrderSerializer(serializers.Serializer):
    shipping_address = serializers.CharField()
    items = serializers.ListField(child=serializers.DictField())

    def create(self, validated_data):
        user = self.context['request'].user
        items_data = validated_data.pop('items')
        total = sum(item['price'] * item['quantity'] for item in items_data)
        order = Order.objects.create(
            user=user,
            total_amount=total,
            shipping_address=validated_data['shipping_address'],
        )
        for item in items_data:
            OrderItem.objects.create(
                order=order,
                product_id=item['product_id'],
                size=item['size'],
                quantity=item['quantity'],
                price=item['price'],
            )
        return order
