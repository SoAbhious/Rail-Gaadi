from django.urls import path
from . import views

urlpatterns = [
    path('booking/', views.BookingView.as_view()),
    path('booking/<int:pk>/', views.BookingView.as_view()),
    path('user-bookings/<int:pk>/', views.UserView2.as_view()),
    path('user-passengers/<int:pk>/', views.UserView2.as_view()),
    path('ticket/', views.TicketView.as_view()),
    path('passenger/', views.PassengerView.as_view()),
    path('passenger/<int:pk>/', views.PassengerView.as_view()),
    path('train/', views.TrainView.as_view()),
    path('train/<int:pk>/', views.TrainView.as_view()),
    path('user/<int:pk>/', views.UserView.as_view()),
    path('admin/<int:pk>/', views.AdminView.as_view()),
    path('station/', views.StationView.as_view()),
    path('user/', views.UserView.as_view()),
    path('admin/', views.AdminView.as_view()),
    path('verify-user/', views.VerifyUser.as_view()),
    path('admin-login', views.AdminView.admin_login),
    path('user-login', views.UserView.user_login),
    path('verify-user/<int:id>', views.UserView.verify_user),
    path('route/', views.RouteView.as_view()),
    path('route/<int:pk>/', views.RouteView.as_view()),
    # path('add/', views.addData),
]