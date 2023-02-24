# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.core.mail import send_mail
from django.db import models
from rest_framework import serializers


class Admin(models.Model):
    username = models.CharField(max_length=255, blank=True, null=False)
    firstname = models.CharField(max_length=255, blank=True, null=False)
    lastname = models.CharField(max_length=255, blank=True, null=False)
    password = models.CharField(max_length=255, blank=True, null=False)
    gender = models.CharField(max_length=6, blank=True, null=False)
    dob = models.DateField(blank=True, null=False)
    email = models.CharField(max_length=255, blank=True, null=False)
    phone = models.CharField(max_length=10, blank=True, null=False)
    aadhar = models.CharField(max_length=12, blank=True, null=False)

    def __str__(self):
        return f'{self.firstname} {self.lastname}'

    class Meta:
        managed = False
        db_table = 'admin'


class AuthGroup(models.Model):
    name = models.CharField(unique=True, max_length=150)

    class Meta:
        managed = False
        db_table = 'auth_group'


class AuthGroupPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    group = models.ForeignKey(AuthGroup, on_delete=models.CASCADE)
    permission = models.ForeignKey('AuthPermission', on_delete=models.CASCADE)

    class Meta:
        managed = False
        db_table = 'auth_group_permissions'
        unique_together = (('group', 'permission'),)


class AuthPermission(models.Model):
    name = models.CharField(max_length=255)
    content_type = models.ForeignKey('DjangoContentType', on_delete=models.CASCADE)
    codename = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'auth_permission'
        unique_together = (('content_type', 'codename'),)


class AuthUser(models.Model):
    password = models.CharField(max_length=128)
    last_login = models.DateTimeField(blank=True, null=False)
    is_superuser = models.IntegerField()
    username = models.CharField(unique=True, max_length=150)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    email = models.CharField(max_length=254)
    is_staff = models.IntegerField()
    is_active = models.IntegerField()
    date_joined = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'auth_user'


class AuthUserGroups(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AuthUser, on_delete=models.CASCADE)
    group = models.ForeignKey(AuthGroup, on_delete=models.CASCADE)

    class Meta:
        managed = False
        db_table = 'auth_user_groups'
        unique_together = (('user', 'group'),)


class AuthUserUserPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AuthUser, on_delete=models.CASCADE)
    permission = models.ForeignKey(AuthPermission, on_delete=models.CASCADE)

    class Meta:
        managed = False
        db_table = 'auth_user_user_permissions'
        unique_together = (('user', 'permission'),)


class AuthtokenToken(models.Model):
    key = models.CharField(primary_key=True, max_length=40)
    created = models.DateTimeField()
    user = models.OneToOneField(AuthUser, on_delete=models.CASCADE)

    class Meta:
        managed = False
        db_table = 'authtoken_token'


class Passenger(models.Model):
    mobile = models.CharField(max_length=255)
    age = models.IntegerField(blank=True, null=False)
    userid = models.ForeignKey('User', on_delete=models.CASCADE, db_column='userid', related_name='passenger1')
    name = models.CharField(max_length=255, null=False)

    def __str__(self):
        return f'{self.name}'

    class Meta:
        managed = False
        db_table = 'passenger'


class Station(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(unique=True, max_length=255, blank=True, null=False)
    address = models.CharField(max_length=255, blank=True, null=False)
    station_code = models.CharField(max_length=255, blank=False, null=False, unique=True)

    def __str__(self):
        return f'{self.name}'

    class Meta:
        managed = False
        db_table = 'station'


class Train(models.Model):
    name = models.CharField(unique=True, max_length=255)
    source = models.ForeignKey(Station, on_delete=models.CASCADE, db_column='source', related_name="source3")
    destination = models.ForeignKey(Station, on_delete=models.CASCADE, db_column='destination', related_name="dest3")
    traveltime = models.IntegerField(blank=True, null=False)
    sl = models.IntegerField(blank=True, null=False)
    ac1 = models.IntegerField(blank=True, null=False)
    ac2 = models.IntegerField(blank=True, null=False)
    ac3 = models.IntegerField(blank=True, null=False)

    def __str__(self):
        return f'{self.name}'

    class Meta:
        managed = False
        db_table = 'train'


class Booking(models.Model):
    userid = models.ForeignKey('User', on_delete=models.CASCADE, db_column='userid', related_name='booking1')
    train = models.ForeignKey(Train, on_delete=models.CASCADE, db_column='train', related_name="train")
    source = models.ForeignKey(Station, on_delete=models.CASCADE, db_column='source', blank=True, null=False,
                               related_name="source1")
    destination = models.ForeignKey(Station, on_delete=models.CASCADE, db_column='destination', related_name="dest1")
    class_field = models.CharField(db_column='class',
                                   max_length=2)  # Field renamed because it was a Python reserved word.
    traveldate = models.DateField(blank=True, null=False)
    fare = models.IntegerField()

    def __str__(self):
        return f'{self.id}'

    class Meta:
        managed = False
        db_table = 'booking'


class DjangoAdminLog(models.Model):
    action_time = models.DateTimeField()
    object_id = models.TextField(blank=True, null=False)
    object_repr = models.CharField(max_length=200)
    action_flag = models.PositiveSmallIntegerField()
    change_message = models.TextField()
    content_type = models.ForeignKey('DjangoContentType', on_delete=models.CASCADE, blank=True, null=False)
    user = models.ForeignKey(AuthUser, on_delete=models.CASCADE)

    class Meta:
        managed = False
        db_table = 'django_admin_log'


class DjangoContentType(models.Model):
    app_label = models.CharField(max_length=100)
    model = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'django_content_type'
        unique_together = (('app_label', 'model'),)


class DjangoMigrations(models.Model):
    id = models.BigAutoField(primary_key=True)
    app = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    applied = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_migrations'


class DjangoSession(models.Model):
    session_key = models.CharField(primary_key=True, max_length=40)
    session_data = models.TextField()
    expire_date = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_session'


class Helper(models.Model):
    route = models.ForeignKey('Route', on_delete=models.CASCADE, db_column='route')
    station = models.ForeignKey('Station', on_delete=models.CASCADE, db_column='station')
    number = models.IntegerField(blank=False, null=False)

    def __str__(self):
        return f'{self.route} {self.number}'

    class Meta:
        managed = False
        db_table = 'helper'


class Route(models.Model):
    name = models.CharField(unique=True, max_length=255, blank=True, null=False)
    source = models.ForeignKey('Station', on_delete=models.CASCADE, db_column='source', related_name="source2")
    destination = models.ForeignKey('Station', on_delete=models.CASCADE, db_column='destination', related_name="dest2")

    def __str__(self):
        return f'{self.name}'

    class Meta:
        managed = False
        db_table = 'route'


class RunningStatus(models.Model):
    train = models.ForeignKey('Train', on_delete=models.CASCADE, db_column='train')
    leftfrom = models.ForeignKey('Station', on_delete=models.CASCADE, db_column='leftfrom', related_name="source4")
    arrivingat = models.ForeignKey('Station', on_delete=models.CASCADE, db_column='arrivingat', related_name="dest4")

    def __str__(self):
        return f'{self.train}'

    class Meta:
        managed = False
        db_table = 'running_status'


class Timeslot(models.Model):
    station = models.ForeignKey(Station, on_delete=models.CASCADE, db_column='station')
    train = models.ForeignKey('Train', on_delete=models.CASCADE, db_column='train')
    route = models.ForeignKey(Route, on_delete=models.CASCADE, db_column='route')
    arrival = models.DateTimeField()
    departure = models.DateTimeField()

    def __str__(self):
        return f'{self.station} {self.train}'

    class Meta:
        managed = False
        db_table = 'timeslot'


class TrainStatus(models.Model):
    train = models.ForeignKey(Train, on_delete=models.CASCADE, db_column='train')
    sl = models.IntegerField()
    ac1 = models.IntegerField()
    ac2 = models.IntegerField()
    ac3 = models.IntegerField()
    status = models.CharField(max_length=9, blank=True, null=False)
    date = models.DateField(blank=False, null=False)
    time = models.TimeField(blank=False, null=False)
    route = models.ForeignKey(Route, on_delete=models.CASCADE, db_column='route')
    stations = models.IntegerField(default=0)

    def __str__(self):
        return f'{self.train}'

    class Meta:
        managed = False
        db_table = 'train_status'


class User(models.Model):
    username = models.CharField(unique=True, max_length=255, blank=True, null=False)
    firstname = models.CharField(max_length=255, blank=True, null=False)
    lastname = models.CharField(max_length=255, blank=True, null=False)
    password = models.CharField(max_length=255, blank=True, null=False)
    gender = models.CharField(max_length=6, blank=True, null=False)
    dob = models.DateField(blank=True, null=False)
    email = models.CharField(unique=True, max_length=255, blank=True, null=False)
    phone = models.CharField(unique=True, max_length=10, blank=True, null=False)
    aadhar = models.CharField(unique=True, max_length=12, blank=True, null=False)
    verify_status = models.BooleanField(default=False)
    otp_digit = models.CharField(max_length=6, null=True)

    def __str__(self):
        return f'{self.firstname} {self.lastname}'

    class Meta:
        managed = False
        db_table = 'user'


class Ticket(models.Model):
    bookingid = models.ForeignKey(Booking, on_delete=models.CASCADE, db_column='bookingid', related_name='ticket')
    passenger = models.ForeignKey(Passenger, on_delete=models.CASCADE, db_column='passenger')

    def __str__(self):
        return f'{self.bookingid} {self.passenger}'

    class Meta:
        managed = False
        db_table = 'ticket'

