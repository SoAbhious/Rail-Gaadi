from django.contrib import admin
from .models import *

admin.site.register(User)
admin.site.register(Admin)
admin.site.register(Route)
admin.site.register(Train)
admin.site.register(Station)
admin.site.register(Passenger)
admin.site.register(Booking)
admin.site.register(TrainStatus)
admin.site.register(RunningStatus)
admin.site.register(Timeslot)
admin.site.register(Helper)
admin.site.register(Ticket)