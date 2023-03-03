from django.shortcuts import render

# Create your views here.
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import generics, permissions

from .base_manager import func
from .models import *
from api.serializers import *
from django.http.response import JsonResponse
from rest_framework.permissions import IsAdminUser
from django.http.response import Http404
from django.views.decorators.csrf import csrf_exempt
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.pagination import PageNumberPagination


class CustomPagination(PageNumberPagination):
    page_size = 4
    page_size_query_param = 'page_size'
    max_page_size = 20
    page_query_param = 'page'


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
        try:
            if pk:
                data = self.get_user(pk)
                serializer = UserSerializer2(data)
            else:
                data = User.objects.all()
                serializer = UserSerializer2(data, many=True)
            return Response(serializer.data)
        except Exception as e:
            return e


class VerifyUser(APIView):

    def post(self, request):
        try:
            data = request.data
            serializer = UserSerializer(data=data)

            if serializer.is_valid():
                serializer.save()
                qs = User.objects.all().order_by('-id')[:1]
                serilizer1 = UserSerializer(qs, many=True)
                return Response(serilizer1.data)
            return JsonResponse("Failed to add user!!", safe=False)
        except Exception as e:
            return e


class UserView(APIView):
    pagination_class = CustomPagination

    @property
    def paginator(self):
        """The paginator instance associated with the view, or `None`."""
        if not hasattr(self, '_paginator'):
            if self.pagination_class is None:
                self._paginator = None
            else:
                self._paginator = self.pagination_class()
        return self._paginator

    def paginate_queryset(self, queryset):
        """Return a single page of results, or `None` if pagination is disabled."""
        if self.paginator is None:
            return None
        return self.paginator.paginate_queryset(queryset, self.request, view=self)

    def get_paginated_response(self, data):
        """Return a paginated style `Response` object for the given output data."""
        assert self.paginator is not None
        return self.paginator.get_paginated_response(data)

    def post(self, request):
        try:
            data = request.data
            serializer = UserSerializer(data=data)

            if serializer.is_valid():
                serializer.save()
                return JsonResponse("User added successfully!", safe=False)
            return JsonResponse("Failed to add user!!", safe=False)
        except Exception as e:
            return e

    def get_user(self, pk):
        try:
            user = User.objects.get(id=pk)
            return user
        except User.DoesNotExist:
            raise Http404

    def get(self, request, pk=None):
        try:
            if pk:
                data = self.get_user(pk)
                serializer = UserSerializer(data)
                return Response(serializer.data)
            else:
                data = User.objects.all()
                page = self.paginate_queryset(data)
                serializer = UserSerializer(page, many=True)
                return self.get_paginated_response(serializer.data)
        except Exception as e:
            return e

    def put(self, request, pk=None):
        try:
            user = User.objects.get(id=pk)
            serializer = UserSerializer(instance=user, data=request.data, partial=True)

            if serializer.is_valid():
                serializer.save()
                return JsonResponse("User data updated successfully!", safe=False)
            return JsonResponse("User failed to update!", safe=False)
        except Exception as e:
            return e

    def delete(self, request, pk=None):
        try:
            user = User.objects.get(id=pk)
            user.delete()
            return JsonResponse("User deleted successfully!", safe=False)
        except Exception as e:
            return e


class AdminView(APIView):

    def get_admin(self, pk):
        try:
            admin = Admin.objects.get(id=pk)
            return admin
        except Admin.DoesNotExist:
            raise Http404

    def get(self, request, pk=None):
        try:
            if pk:
                data = self.get_admin(pk)
                serializer = AdminSerializer(data)
            else:
                data = Admin.objects.all()
                serializer = AdminSerializer(data, many=True)
            return Response(serializer.data)
        except Exception as e:
            return e

    def put(self, request, pk=None):
        try:
            admin = Admin.objects.get(id=pk)
            serializer = AdminSerializer(instance=admin, data=request.data, partial=True)

            if serializer.is_valid():
                serializer.save()
                return JsonResponse("User data updated successfully!", safe=False)
            return JsonResponse("User failed to update!", safe=False)
        except Exception as e:
            return e


class BookingView(APIView):
    # lookup_field = 'id'

    def get_booking(self, pk):
        try:
            booking = Booking.objects.get(id=pk)
            return booking
        except Booking.DoesNotExist:
            raise Http404

    def get(self, request, pk=None):
        try:
            if pk:
                data = self.get_booking(pk)
                serializer = BookingSerializer(data)
            else:
                data = Booking.objects.all()
                serializer = BookingSerializer(data, many=True)
            return Response(serializer.data)
        except Exception as e:
            return e

    def post(self, request):
        try:
            data = request.data
            serializer = NewBookingSerializer(data=data)

            if serializer.is_valid():
                serializer.save()
                return JsonResponse(serializer.data, safe=False)
            return JsonResponse(serializer.errors, safe=False)
        except Exception as e:
            return e



class TicketView(APIView):

    def get_ticket(self, pk):
        try:
            ticket = Ticket.objects.get(id=pk)
            return ticket
        except Ticket.DoesNotExist:
            raise Http404

    def get(self, request, pk=None):
        try:
            if pk:
                data = self.get_ticket(pk)
                serializer = TicketSerializer(data)
            else:
                data = Ticket.objects.all()
                serializer = TicketSerializer(data, many=True)
            return Response(serializer.data)
        except Exception as e:
            return e

    def post(self, request):
        try:
            data = request.data
            serializer = TicketPostSerializer(data=data, many=True)

            if serializer.is_valid():
                serializer.save()
                return JsonResponse(serializer.data, safe=False)
            return JsonResponse(serializer.errors, safe=False)
        except Exception as e:
            return e


class PassengerView(APIView):

    def get_passenger(self, pk):
        try:
            passenger = Passenger.objects.get(id=pk)
            return passenger
        except Passenger.DoesNotExist:
            raise Http404

    def get(self, request, pk=None):
        try:
            if pk:
                data = self.get_passenger(pk)
                serializer = PassengerSerializer(data)
            else:
                data = Passenger.objects.all()
                serializer = PassengerSerializer(data, many=True)
            return Response(serializer.data)
        except Exception as e:
            return e

    def put(self, request, pk=None):
        try:
            passenger = Passenger.objects.get(id=pk)
            serializer = PassengerSerializer(instance=passenger, data=request.data, partial=True)

            if serializer.is_valid():
                serializer.save()
                return JsonResponse("Passenger data updated successfully!", safe=False)
            return JsonResponse("Passenger failed to update!", safe=False)
        except Exception as e:
            return e

    def post(self, request):
        try:
            data = request.data
            serializer = PassengerSerializer(data=data)

            if serializer.is_valid():
                serializer.save()
                return JsonResponse("Passenger added successfully!", safe=False)
            return JsonResponse("Failed to add passenger!!", safe=False)
        except Exception as e:
            return e

    def delete(self, request, pk=None):
        try:
            passenger = Passenger.objects.get(id=pk)
            passenger.delete()
            return JsonResponse("Passenger deleted successfully!", safe=False)
        except Exception as e:
            return e


class StationView(APIView):

    def get_station(self, pk):
        try:
            station = Station.objects.get(id=pk)
            return station
        except Station.DoesNotExist:
            raise Http404

    def get(self, request, pk=None):
        try:
            if pk:
                data = self.get_station(pk)
                serializer = StationSerializer(data)
            else:
                data = Station.objects.all()
                serializer = StationSerializer(data, many=True)
            return Response(serializer.data)
        except Exception as e:
            return e

    def post(self, request):
        try:
            data = request.data
            serializer = StationSerializer(data=data)

            if serializer.is_valid():
                serializer.save()
                return JsonResponse("Station added successfully!", safe=False)
            return JsonResponse(serializer.errors, safe=False)
        except Exception as e:
            return e

    def put(self, request, pk=None):
        try:
            train = Station.objects.get(id=pk)
            serializer = StationSerializer(instance=train, data=request.data, partial=True)

            if serializer.is_valid():
                serializer.save()
                return JsonResponse("Station data updated successfully!", safe=False)
            return JsonResponse(serializer.errors, safe=False)
        except Exception as e:
            return e

    def delete(self, request, pk=None):
        try:
            station = Station.objects.get(id=pk)
            station.delete()
            return JsonResponse("Station deleted successfully!", safe=False)
        except Exception as e:
            return e


class TrainView(APIView):

    def get_train(self, pk):
        try:
            train = Train.objects.get(id=pk)
            return train
        except Train.DoesNotExist:
            raise Http404

    def get(self, request, pk=None):
        try:
            if pk:
                data = self.get_train(pk)
                serializer = TrainSerializer(data)
            else:
                data = Train.objects.all()
                serializer = TrainSerializer(data, many=True)
            return Response(serializer.data)
        except Exception as e:
            return e

    def post(self, request):
        try:
            data = request.data
            serializer = TrainSerializerPostPut(data=data)

            if serializer.is_valid():
                serializer.save()
                return JsonResponse("Train added successfully!", safe=False)
            return JsonResponse("Failed to add train!", safe=False)
        except Exception as e:
            return e

    def put(self, request, pk=None):
        try:
            train = Train.objects.get(id=pk)
            serializer = TrainSerializerPostPut(instance=train, data=request.data, partial=True)

            if serializer.is_valid():
                serializer.save()
                return JsonResponse("Train data updated successfully!", safe=False)
            return JsonResponse("Failed to update train!", safe=False)
        except Exception as e:
            return e

    def delete(self, request, pk=None):
        try:
            train = Train.objects.get(id=pk)
            train.delete()
            return JsonResponse("Train deleted successfully!", safe=False)
        except Exception as e:
            return e


class RouteView(APIView):

    def get_route(self, pk):
        try:
            route = Route.objects.get(id=pk)
            return route
        except Route.DoesNotExist:
            raise Http404

    def get(self, request, pk=None):
        try:
            if pk:
                data = self.get_route(pk)
                serializer = RouteSerializer(data)
            else:
                data = Route.objects.all()
                serializer = RouteSerializer(data, many=True)
            return Response(serializer.data)
        except Exception as e:
            return e

    def post(self, request):
        try:
            data = request.data
            serializer = RouteSerializerPutPost(data=data)

            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return JsonResponse("Failed to add route!", safe=False)
        except Exception as e:
            return e

    def put(self, request, pk=None):
        try:
            route = Route.objects.get(id=pk)
            serializer = RouteSerializerPutPost(instance=route, data=request.data, partial=True)

            if serializer.is_valid():
                serializer.save()
                return JsonResponse("Route data updated successfully!", safe=False)
            return JsonResponse("Route failed to update!", safe=False)
        except Exception as e:
            return e

    def delete(self, request, pk=None):
        try:
            route = Route.objects.get(id=pk)
            route.delete()
            return JsonResponse("Route deleted successfully!", safe=False)
        except Exception as e:
            return e


class HelperView(APIView):

    def post(self, request):
        try:
            data = request.data
            serializer = HelperSerializer(data=data, many=True)

            if serializer.is_valid():
                serializer.save()
                return JsonResponse("Route stations added successfully", safe=False)
            return JsonResponse(serializer.errors, safe=False)
        except Exception as e:
            return e


class HelperNewView(APIView):

    def post(self, request):
        try:
            source = request.POST.get('source')
            destination = request.POST.get('destination')
            date = request.POST.get('date')
            return func(source, destination, date)
        except Exception as e:
            return e


class TrainStatusView(APIView):

    def get_train(self, pk):
        try:
            train = TrainStatus.objects.get(id=pk)
            return train
        except TrainStatus.DoesNotExist:
            raise Http404

    def get(self, request, pk=None):
        try:
            if pk:
                data = self.get_train(pk)
                serializer = TrainStatusSerializer(data)
            else:
                data = TrainStatus.objects.all()
                serializer = TrainStatusSerializer(data, many=True)
            return Response(serializer.data)
        except Exception as e:
            return e


class AvailableTrainsAPIView(APIView):

    def get(self, request):
        try:
            route = request.GET.get('route')
            date = request.GET.get('date')
            trains = TrainStatus.objects.filter(route=route, date=date)
            serializer = TrainStatusSerializer(trains, many=True)
            return Response(serializer.data)
        except Exception as e:
            return e

    def put(self, request, pk=None):
        try:
            train = TrainStatus.objects.get(id=pk)
            serializer = TrainStatusPutSerializer(instance=train, data=request.data, partial=True)

            if serializer.is_valid():
                serializer.save()
                return JsonResponse("Seats updated successfully!", safe=False)
            return JsonResponse(serializer.errors, safe=False)
        except Exception as e:
            return e


class NewPassengerView(APIView):

    def post(self, request):
        try:
            data = request.data
            serializer = PassengerSerializer(data=data, many=True)

            if serializer.is_valid():
                serializer.save()
                return JsonResponse(serializer.data, safe=False)
            return JsonResponse(serializer.errors, safe=False)
        except Exception as e:
            return e



