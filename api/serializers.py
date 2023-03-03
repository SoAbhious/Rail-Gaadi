from rest_framework import serializers
from base.models import *


class PassengerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Passenger
        fields = '__all__'


class TicketSerializer(serializers.ModelSerializer):
    passenger = PassengerSerializer(serializers.ModelSerializer)

    class Meta:
        model = Ticket
        fields = '__all__'


class TicketPostSerializer(serializers.ModelSerializer):

    class Meta:
        model = Ticket
        fields = '__all__'


class BookingSerializer(serializers.ModelSerializer):
    ticket = TicketSerializer(many=True, read_only=True)

    class Meta:
        model = Booking
        fields = '__all__'
        depth = 1


class NewBookingSerializer(serializers.ModelSerializer):
    ticket = TicketSerializer(many=True, read_only=True)

    class Meta:
        model = Booking
        fields = '__all__'


class UserSerializer2(serializers.ModelSerializer):
    booking1 = BookingSerializer(many=True, read_only=True)
    passenger1 = PassengerSerializer(many=True, read_only=True)

    class Meta:
        model = User
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

    def create(self, validate_data):
        email = self.validated_data['email']
        otp_digit = self.validated_data['otp_digit']
        instance = super(UserSerializer, self).create(validate_data)
        send_mail(
            'Verify Account!',
            'Please verify your account',
            'abhig46342@gmail.com',
            [email],
            fail_silently=False,
            html_message=f'<p>Your OTP is</p><p>{otp_digit}</p>'
        )
        return instance


class AdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = Admin
        fields = '__all__'


class StationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Station
        fields = '__all__'


class TrainSerializer(serializers.ModelSerializer):
    class Meta:
        model = Train
        fields = '__all__'
        depth = 1


class TrainSerializerPostPut(serializers.ModelSerializer):
    class Meta:
        model = Train
        fields = '__all__'


class HelperSerializer(serializers.ModelSerializer):
    class Meta:
        model = Helper
        fields = '__all__'


class RouteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Route
        fields = '__all__'
        depth = 1


class RouteSerializerPutPost(serializers.ModelSerializer):
    class Meta:
        model = Route
        fields = '__all__'


class TrainStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = TrainStatus
        fields = '__all__'
        depth = 1


class TrainStatusPutSerializer(serializers.ModelSerializer):
    class Meta:
        model = TrainStatus
        fields = '__all__'

