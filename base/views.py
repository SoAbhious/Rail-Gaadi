from django.shortcuts import render

# Create your views here.
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import generics, permissions
from .models import *
from api.serializers import *
from django.http.response import JsonResponse
from rest_framework.permissions import IsAdminUser
from django.http.response import Http404
from django.views.decorators.csrf import csrf_exempt
from django.core.exceptions import ObjectDoesNotExist


class VerifyUserView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserView2(APIView):

    def get_user(self, pk):
        try:
            user = User.objects.get(id=pk)
            return user
        except User.DoesNotExist:
            raise Http404

    def get(self, request, pk=None):
        if pk:
            data = self.get_user(pk)
            serializer = UserSerializer2(data)
        else:
            data = User.objects.all()
            serializer = UserSerializer2(data, many=True)
        return Response(serializer.data)


class VerifyUser(APIView):

    def post(self, request):
        data = request.data
        serializer = UserSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            qs = User.objects.all().order_by('-id')[:1]
            serilizer1 = UserSerializer(qs, many=True)
            return Response(serilizer1.data)
        return JsonResponse("Failed to add user!!", safe=False)


class UserView(APIView):

    def post(self, request):
        data = request.data
        serializer = UserSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return JsonResponse("User added successfully!", safe=False)
        return JsonResponse("Failed to add user!!", safe=False)

    def get_user(self, pk):
        try:
            user = User.objects.get(id=pk)
            return user
        except User.DoesNotExist:
            raise Http404

    def get(self, request, pk=None):
        if pk:
            data = self.get_user(pk)
            serializer = UserSerializer(data)
        else:
            data = User.objects.all()
            serializer = UserSerializer(data, many=True)
        return Response(serializer.data)

    def put(self, request, pk=None):
        user = User.objects.get(id=pk)
        serializer = UserSerializer(instance=user, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return JsonResponse("User data updated successfully!", safe=False)
        return JsonResponse("User failed to update!", safe=False)

    def delete(self, request, pk=None):
        user = User.objects.get(id=pk)
        user.delete()
        return JsonResponse("User deleted successfully!", safe=False)

    @csrf_exempt
    def user_login(request):
        username = request.POST['username']
        password = request.POST['password']
        try:
            userData = User.objects.get(username=username, password=password)
        except ObjectDoesNotExist:
            userData = None
        if userData:
            if not userData.verify_status:
                return JsonResponse({'bool': False, 'msg': "Account not verified!!"})
            else:
                return JsonResponse({'bool': True, 'id': userData.id})
        else:
            return JsonResponse({'bool': False, 'msg': "Invalid username or password!!"})

    @csrf_exempt
    def verify_user(request, id):
        otp_digit = request.POST.get('otp_digit')
        user = User.objects.filter(id=id, otp_digit=otp_digit).first()
        if user:
            User.objects.filter(id=id, otp_digit=otp_digit).update(verify_status=True)
            return JsonResponse({'bool': True, 'id': user.id})
        else:
            return JsonResponse({'bool': False})


class AdminView(APIView):

    def get_admin(self, pk):
        try:
            admin = Admin.objects.get(id=pk)
            return admin
        except Admin.DoesNotExist:
            raise Http404

    def get(self, request, pk=None):
        if pk:
            data = self.get_admin(pk)
            serializer = AdminSerializer(data)
        else:
            data = Admin.objects.all()
            serializer = AdminSerializer(data, many=True)
        return Response(serializer.data)

    def put(self, request, pk=None):
        admin = Admin.objects.get(id=pk)
        serializer = AdminSerializer(instance=admin, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return JsonResponse("User data updated successfully!", safe=False)
        return JsonResponse("User failed to update!", safe=False)

    @csrf_exempt
    def admin_login(request):
        username = request.POST['username']
        password = request.POST['password']
        try:
            adminData = Admin.objects.get(username=username, password=password)
        except ObjectDoesNotExist:
            adminData = None
        if adminData:
            return JsonResponse({'bool': True, 'id': adminData.id})
        else:
            return JsonResponse({'bool': False, 'msg': "Invalid username or password!!"})


class BookingView(APIView):
    # lookup_field = 'id'

    def get_booking(self, pk):
        try:
            booking = Booking.objects.get(id=pk)
            return booking
        except Booking.DoesNotExist:
            raise Http404

    def get(self, request, pk=None):
        if pk:
            data = self.get_booking(pk)
            serializer = BookingSerializer(data)
        else:
            data = Booking.objects.all()
            serializer = BookingSerializer(data, many=True)
        return Response(serializer.data)

    def post(self, request):
        data = request.data
        serializer = NewBookingSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, safe=False)
        return JsonResponse(serializer.errors, safe=False)



class TicketView(APIView):

    def get_ticket(self, pk):
        try:
            ticket = Ticket.objects.get(id=pk)
            return ticket
        except Ticket.DoesNotExist:
            raise Http404

    def get(self, request, pk=None):
        if pk:
            data = self.get_ticket(pk)
            serializer = TicketSerializer(data)
        else:
            data = Ticket.objects.all()
            serializer = TicketSerializer(data, many=True)
        return Response(serializer.data)

    def post(self, request):
        data = request.data
        serializer = TicketPostSerializer(data=data, many=True)

        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, safe=False)
        return JsonResponse(serializer.errors, safe=False)


class PassengerView(APIView):

    def get_passenger(self, pk):
        try:
            passenger = Passenger.objects.get(id=pk)
            return passenger
        except Passenger.DoesNotExist:
            raise Http404

    def get(self, request, pk=None):
        if pk:
            data = self.get_passenger(pk)
            serializer = PassengerSerializer(data)
        else:
            data = Passenger.objects.all()
            serializer = PassengerSerializer(data, many=True)
        return Response(serializer.data)

    def put(self, request, pk=None):
        passenger = Passenger.objects.get(id=pk)
        serializer = PassengerSerializer(instance=passenger, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Passenger data updated successfully!", safe=False)
        return JsonResponse("Passenger failed to update!", safe=False)

    def post(self, request):
        data = request.data
        serializer = PassengerSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Passenger added successfully!", safe=False)
        return JsonResponse("Failed to add passenger!!", safe=False)

    def delete(self, request, pk=None):
        passenger = Passenger.objects.get(id=pk)
        passenger.delete()
        return JsonResponse("Passenger deleted successfully!", safe=False)


class StationView(APIView):

    def get_station(self, pk):
        try:
            station = Station.objects.get(id=pk)
            return station
        except Station.DoesNotExist:
            raise Http404

    def get(self, request, pk=None):
        if pk:
            data = self.get_station(pk)
            serializer = StationSerializer(data)
        else:
            data = Station.objects.all()
            serializer = StationSerializer(data, many=True)
        return Response(serializer.data)


class TrainView(APIView):

    def get_train(self, pk):
        try:
            train = Train.objects.get(id=pk)
            return train
        except Train.DoesNotExist:
            raise Http404

    def get(self, request, pk=None):
        if pk:
            data = self.get_train(pk)
            serializer = TrainSerializer(data)
        else:
            data = Train.objects.all()
            serializer = TrainSerializer(data, many=True)
        return Response(serializer.data)

    def post(self, request):
        data = request.data
        serializer = TrainSerializerPostPut(data=data)

        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Train added successfully!", safe=False)
        return JsonResponse("Failed to add train!", safe=False)

    def put(self, request, pk=None):
        train = Train.objects.get(id=pk)
        serializer = TrainSerializerPostPut(instance=train, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Train data updated successfully!", safe=False)
        return JsonResponse("Failed to update train!", safe=False)

    def delete(self, request, pk=None):
        train = Train.objects.get(id=pk)
        train.delete()
        return JsonResponse("Train deleted successfully!", safe=False)


class RouteView(APIView):

    def get_route(self, pk):
        try:
            route = Route.objects.get(id=pk)
            return route
        except Route.DoesNotExist:
            raise Http404

    def get(self, request, pk=None):
        if pk:
            data = self.get_route(pk)
            serializer = RouteSerializer(data)
        else:
            data = Route.objects.all()
            serializer = RouteSerializer(data, many=True)
        return Response(serializer.data)

    # def post(self, request):
    #     data = request.data
    #     serializer = RouteSerializerPost(data=data)
    #
    #     if serializer.is_valid():
    #         serializer.save()
    #         return JsonResponse("Route added successfully!", safe=False)
    #     return JsonResponse(serializer.errors, safe=False)
    def post(self, request):
        data = request.data
        serializer = RouteSerializerPutPost(data=data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return JsonResponse("Failed to add route!", safe=False)

    def put(self, request, pk=None):
        route = Route.objects.get(id=pk)
        serializer = RouteSerializerPutPost(instance=route, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Route data updated successfully!", safe=False)
        return JsonResponse("Route failed to update!", safe=False)

    def delete(self, request, pk=None):
        route = Route.objects.get(id=pk)
        route.delete()
        return JsonResponse("Route deleted successfully!", safe=False)


class HelperView(APIView):

    def post(self, request):
        data = request.data
        serializer = HelperSerializer(data=data, many=True)

        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Route stations added successfully", safe=False)
        return JsonResponse(serializer.errors, safe=False)


class HelperNewView(APIView):

    def post(self, request):
        source = request.POST.get('source')
        destination = request.POST.get('destination')
        date = request.POST.get('date')
        sourceRoutes = Helper.objects.filter(station=source)
        destRoutes = Helper.objects.filter(station=destination)
        sourceRoutes = [train for train in sourceRoutes if train.route in (route.route for route in destRoutes)]
        for train in sourceRoutes:
            for route in destRoutes:
                if train.route == route.route:
                    train.diff = route.number-train.number
                    break
        trainStatus = TrainStatus.objects.filter(date=date)
        trains = [source for source in trainStatus if source.route in (route.route for route in sourceRoutes)]
        for train in trains:
            for route in sourceRoutes:
                if train.route == route.route:
                    train.stations = route.diff
                    break
        serializer = TrainStatusSerializer(trains, many=True)
        return Response(serializer.data)


class AvailableTrainsAPIView(APIView):

    def get(self, request):
        route = request.GET.get('route')
        date = request.GET.get('date')
        trains = TrainStatus.objects.filter(route=route, date=date)
        serializer = TrainStatusSerializer(trains, many=True)
        return Response(serializer.data)


class NewPassengerView(APIView):

    def post(self, request):
        data = request.data
        serializer = PassengerSerializer(data=data, many=True)

        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, safe=False)
        return JsonResponse(serializer.errors, safe=False)


# def put(self, request, pk=None):
#     route = Route.objects.get(id=pk)
#     serializer = RouteSerializerPutPost(instance=route, data=request.data, partial=True)
#
#     if serializer.is_valid():
#         serializer.save()
#         return JsonResponse("Route data updated successfully!", safe=False)
#     return JsonResponse("Route failed to update!", safe=False)
#
# def delete(self, request, pk=None):
#     route = Route.objects.get(id=pk)
#     route.delete()
#     return JsonResponse("Route deleted successfully!")
