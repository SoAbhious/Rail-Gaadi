from django.urls import path
from . import views, base_manager

urlpatterns = [

    # ---------Booking----------
    path('booking/', views.BookingView.as_view()),
    path('booking/<int:pk>/', views.BookingView.as_view()),
    path('user-bookings/<int:pk>/', views.UserView2.as_view()),

    # ---------User----------
    path('user-passengers/<int:pk>/', views.UserView2.as_view()),
    path('user/<int:pk>/', views.UserView.as_view()),
    path('user-login', base_manager.user_login),
    path('verify-user/<int:id>', base_manager.verify_user),
    path('user/', views.UserView.as_view()),
    path('verify-user/', views.VerifyUser.as_view()),

    # ---------Admin----------
    path('admin/', views.AdminView.as_view()),
    path('admin/<int:pk>/', views.AdminView.as_view()),
    path('admin-login', base_manager.admin_login),

    # ---------Train----------
    path('train/', views.TrainView.as_view()),
    path('train/<int:pk>/', views.TrainView.as_view()),

    # ---------Passenger----------
    path('passenger/', views.PassengerView.as_view()),
    path('passenger/<int:pk>/', views.PassengerView.as_view()),
    path('post-passengers/', views.NewPassengerView.as_view()),

    # ---------Station----------
    path('stations/', views.StationNewView.as_view()),
    path('station/', views.StationView.as_view()),
    path('station/<int:pk>/', views.StationView.as_view()),

    # ---------Ticket----------
    path('ticket/', views.TicketView.as_view()),

    # ---------Helper----------
    path('helper-route/', views.HelperNewView.as_view()),
    path('helper-train/', views.AvailableTrainsAPIView.as_view()),
    path('train-report/', views.TrainStatusView.as_view()),
    path('helper-train/<int:pk>/', views.AvailableTrainsAPIView.as_view()),

    # ---------Route----------
    path('route/', views.RouteView.as_view()),
    path('route-stations/', views.HelperView.as_view()),
    path('route/<int:pk>/', views.RouteView.as_view()),
]
